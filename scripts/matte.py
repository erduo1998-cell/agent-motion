"""Local CPU video matting with an independently downloaded RVM ONNX model.

No upstream implementation source is vendored. The external model retains its
upstream terms; the project license does not relicense it. Outputs are silent
CFR companion layers, with matched frame counts and a synchronization manifest.
"""
import argparse
import hashlib
import json
import math
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import time
from fractions import Fraction

ROOT = Path(__file__).resolve().parents[1]
MODEL_SHA256 = '88d4531297118f595bf2fd60f6f566aec2e559393802d1f436c380f0cbbd2828'


def sha256(path):
    value = hashlib.sha256()
    with open(path, 'rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            value.update(chunk)
    return value.hexdigest()


def model_path():
    return ROOT / '.runtime' / 'models' / 'rvm_mobilenetv3_fp32.onnx'


def load_session():
    import numpy as np
    import onnxruntime as ort
    model = model_path()
    if not model.is_file() or sha256(model) != MODEL_SHA256:
        raise RuntimeError('RVM model missing or checksum mismatch. Run npm run onboard first.')
    options = ort.SessionOptions()
    options.intra_op_num_threads = min(4, os.cpu_count() or 1)
    session = ort.InferenceSession(str(model), sess_options=options, providers=['CPUExecutionProvider'])
    expected = ['src', 'r1i', 'r2i', 'r3i', 'r4i', 'downsample_ratio']
    if [entry.name for entry in session.get_inputs()] != expected:
        raise RuntimeError('Unexpected RVM model input contract')
    return np, ort, session


def infer(np, session, rgb, states, ratio):
    source = rgb.transpose(2, 0, 1)[None].astype(np.float32) / 255.0
    inputs = {'src': source, 'downsample_ratio': np.array([ratio], dtype=np.float32)}
    inputs.update({f'r{i + 1}i': state for i, state in enumerate(states)})
    foreground, alpha, *states = session.run(None, inputs)
    if not np.isfinite(foreground).all() or not np.isfinite(alpha).all():
        raise RuntimeError('Non-finite model output')
    color = np.clip(foreground[0].transpose(1, 2, 0) * 255.0, 0, 255).round().astype(np.uint8)
    mask = np.clip(alpha[0, 0] * 255.0, 0, 255).round().astype(np.uint8)
    return color, mask, states


def check_model():
    np, ort, session = load_session()
    states = [np.zeros((1, 1, 1, 1), dtype=np.float32) for _ in range(4)]
    for value in [24, 96]:
        rgb = np.full((64, 64, 3), value, dtype=np.uint8)
        color, alpha, states = infer(np, session, rgb, states, 1.0)
        assert color.shape == (64, 64, 3) and alpha.shape == (64, 64)
    return {'ok': True, 'model': model_path().name, 'sha256': MODEL_SHA256,
            'runtime': ort.__version__, 'provider': session.get_providers(), 'recurrentFrames': 2}


def probe(filename):
    result = subprocess.run([os.environ.get('FFPROBE_PATH', 'ffprobe'), '-v', 'error',
                             '-show_streams', '-show_format', '-of', 'json', str(filename)],
                            capture_output=True, text=True, timeout=30, check=True)
    return json.loads(result.stdout)


def read_exact(stream, length):
    chunks = bytearray()
    while len(chunks) < length:
        part = stream.read(length - len(chunks))
        if not part:
            break
        chunks.extend(part)
    if chunks and len(chunks) != length:
        raise RuntimeError('Truncated decoded video frame')
    return bytes(chunks)


def run(args):
    source = Path(args.input).expanduser().resolve()
    output = Path(args.output).expanduser().resolve()
    if not source.is_file():
        raise ValueError(f'Input video not found: {source}')
    if output.exists():
        raise ValueError('Output directory already exists. Choose a new --output directory; existing work is never overwritten.')
    if args.seconds is not None and (not math.isfinite(args.seconds) or args.seconds <= 0):
        raise ValueError('--seconds must be positive')
    if args.max_size < 64 or args.max_size > 4096:
        raise ValueError('--max-size must be between 64 and 4096')
    metadata = probe(source)
    video = next((item for item in metadata['streams'] if item['codec_type'] == 'video'), None)
    if not video:
        raise ValueError('Input has no video stream')
    width, height = int(video['width']), int(video['height'])
    rotation = next((item.get('rotation', 0) for item in video.get('side_data_list', []) if 'rotation' in item), 0)
    if abs(round(rotation)) % 180 == 90:
        width, height = height, width
    scale = min(1.0, args.max_size / max(width, height))
    width, height = max(2, int(width * scale) // 2 * 2), max(2, int(height * scale) // 2 * 2)
    try:
        rate = Fraction(args.fps or video.get('avg_frame_rate', '0/1'))
    except (ValueError, ZeroDivisionError):
        raise ValueError('Invalid source frame rate; provide --fps such as 30 or 30000/1001')
    if rate <= 0 or rate > 120:
        raise ValueError('Frame rate must be greater than zero and at most 120; provide --fps')
    fps = f'{rate.numerator}/{rate.denominator}'
    np, ort, session = load_session()
    states = [np.zeros((1, 1, 1, 1), dtype=np.float32) for _ in range(4)]
    ratio = min(1.0, 512.0 / max(width, height))
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = Path(tempfile.mkdtemp(prefix='.matting-', dir=output.parent))
    processes, logs = [], []
    frame_count, started = 0, time.monotonic()
    ffmpeg = os.environ.get('FFMPEG_PATH', 'ffmpeg')
    limit = ['-t', str(args.seconds)] if args.seconds else []
    decoder_args = [ffmpeg, '-hide_banner', '-loglevel', 'error', '-nostdin', '-i', str(source),
                    *limit, '-map', '0:v:0', '-an', '-vf', f'fps={fps},scale={width}:{height}',
                    '-pix_fmt', 'rgb24', '-f', 'rawvideo', 'pipe:1']
    try:
        for filename in ['decode.log', 'foreground.log', 'alpha.log']:
            logs.append(open(temporary / filename, 'w+b'))
        decoder = subprocess.Popen(decoder_args, stdout=subprocess.PIPE, stderr=logs[0])
        processes.append(decoder)
        encoders = []
        for index, (name, pixel_format, quality) in enumerate([('foreground', 'rgb24', '18'), ('alpha', 'gray', '0')]):
            alpha_range = ['-vf', 'scale=in_range=pc:out_range=pc', '-color_range', 'pc'] if name == 'alpha' else []
            command = [ffmpeg, '-hide_banner', '-loglevel', 'error', '-nostdin', '-n', '-f', 'rawvideo',
                       '-pix_fmt', pixel_format, '-s', f'{width}x{height}', '-r', fps, '-i', 'pipe:0',
                       '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', quality, *alpha_range,
                       '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(temporary / f'{name}.mp4')]
            encoder = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=logs[index + 1])
            encoders.append(encoder)
            processes.append(encoder)
        while True:
            data = read_exact(decoder.stdout, width * height * 3)
            if not data:
                break
            rgb = np.frombuffer(data, dtype=np.uint8).reshape(height, width, 3)
            color, mask, states = infer(np, session, rgb, states, ratio)
            encoders[0].stdin.write(color.tobytes())
            encoders[1].stdin.write(mask.tobytes())
            frame_count += 1
            if frame_count == 1 or frame_count % 100 == 0:
                print(f'Matting {float(frame_count / rate):.1f}s / {frame_count} frames; elapsed {time.monotonic() - started:.1f}s', flush=True)
        decoder.stdout.close()
        for encoder in encoders:
            encoder.stdin.close()
        codes = [process.wait(timeout=120) for process in processes]
        if any(codes) or frame_count == 0:
            raise RuntimeError(f'Video processing failed (exit codes {codes}, frames {frame_count})')
        for name in ['foreground.mp4', 'alpha.mp4']:
            encoded = probe(temporary / name)['streams'][0]
            if int(encoded.get('nb_frames', -1)) != frame_count or (encoded['width'], encoded['height']) != (width, height):
                raise RuntimeError(f'Encoded layer frame mismatch: {name}')
        report = {'schemaVersion': 1, 'source': str(source), 'sourceSha256': sha256(source),
                  'model': 'RVM MobileNetV3 FP32 ONNX', 'modelSha256': MODEL_SHA256,
                  'runtime': ort.__version__, 'provider': 'CPUExecutionProvider',
                  'width': width, 'height': height, 'fps': fps, 'frames': frame_count,
                  'duration': float(frame_count / rate), 'sourceStart': 0,
                  'foreground': 'foreground.mp4', 'alpha': 'alpha.mp4',
                  'alphaMeaning': 'white = opaque person, black = transparent background',
                  'timing': 'CFR resampling on original source timeline, beginning at source time zero; not source-frame-index equivalence for VFR inputs',
                  'audio': 'Silent layers. Use the original recording as the single speech audio track.',
                  'qualityStatus': 'Inference and layer synchronization checked. Inspect hair, hands, motion and cuts in the actual film before delivery.',
                  'secondsElapsed': time.monotonic() - started}
        (temporary / 'matting.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        for log in logs:
            log.close()
        temporary.rename(output)
        print(f'OK: {output / "matting.json"}', flush=True)
    except BaseException:
        for process in processes:
            if process.poll() is None:
                process.kill()
        for process in processes:
            process.wait()
        for log in logs:
            if log.closed:
                continue
            log.flush()
            log.seek(0)
            detail = log.read().decode('utf-8', errors='replace')[-1500:]
            if detail:
                print(detail, file=sys.stderr)
            log.close()
        shutil.rmtree(temporary)
        raise


def main():
    parser = argparse.ArgumentParser(description='Create synchronized person/alpha video layers with local CPU RVM. Run npm run onboard first.')
    parser.add_argument('--input')
    parser.add_argument('--output')
    parser.add_argument('--seconds', type=float, help='Process the first N seconds for a trial')
    parser.add_argument('--max-size', type=int, default=1920, help='Longest output side, default 1920 (preserves full HD); lower for a faster trial')
    parser.add_argument('--fps', help='Optional CFR output rate, e.g. 30 or 30000/1001; default source average')
    parser.add_argument('--check', action='store_true', help='Verify model checksum and two recurrent inference frames')
    args = parser.parse_args()
    if args.check:
        print(json.dumps(check_model()))
    elif not args.input or not args.output:
        parser.error('--input and --output are required')
    else:
        run(args)


if __name__ == '__main__':
    try:
        main()
    except (Exception, KeyboardInterrupt) as error:
        print(f'Matting failed: {error}', file=sys.stderr)
        sys.exit(1)
