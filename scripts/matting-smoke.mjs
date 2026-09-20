import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { root, runPython } from './runtime.mjs';
import { mediaPath, mediaEnvironment } from './media-tools.mjs';

const output = await mkdtemp(path.join(tmpdir(), 'agent-motion matting-'));
try {
  // Alpha is numerical opacity, not display luminance: preserve the full 0..255 range.
  const levels = [0, 1, 16, 32, 64, 128, 235, 254, 255];
  const ramp = Buffer.alloc(18 * 2);
  for (let y = 0; y < 2; y++) for (let x = 0; x < 18; x++) ramp[y * 18 + x] = levels[Math.floor(x / 2)];
  const rampPath = path.join(output, 'alpha-levels.mp4');
  const encoded = spawnSync(mediaPath('ffmpeg'), ['-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'gray', '-s', '18x2', '-r', '1', '-i', 'pipe:0', '-frames:v', '1', '-c:v', 'libx264', '-crf', '0', '-vf', 'scale=in_range=pc:out_range=pc', '-color_range', 'pc', '-pix_fmt', 'yuv420p', rampPath], { input: ramp, timeout: 30000, windowsHide: true });
  assert.equal(encoded.status, 0, encoded.stderr?.toString());
  const decoded = spawnSync(mediaPath('ffmpeg'), ['-v', 'error', '-i', rampPath, '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1'], { timeout: 30000, windowsHide: true });
  assert.equal(decoded.status, 0, decoded.stderr?.toString());
  for (let pixel = 0; pixel < ramp.length; pixel++) for (let channel = 0; channel < 3; channel++) assert.equal(decoded.stdout[pixel * 3 + channel], ramp[pixel], 'Alpha levels must survive video decoding');
  const input = path.join(output, 'synthetic input.mp4');
  const fixture = spawnSync(mediaPath('ffmpeg'), ['-hide_banner', '-loglevel', 'error', '-nostdin', '-f', 'lavfi', '-i', 'testsrc2=size=160x96:rate=6', '-t', '0.5', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', input], { encoding: 'utf8', timeout: 30000, windowsHide: true });
  assert.equal(fixture.status, 0, fixture.error?.message || fixture.stderr);
  const destination = path.join(output, 'person layers');
  const inference = runPython(path.join(root, 'scripts', 'matte.py'), ['--input', input, '--output', destination], { env: mediaEnvironment(), timeout: 120000 });
  assert.equal(inference.status, 0, inference.error?.message || 'RVM conversion failed');
  const report = JSON.parse(await readFile(path.join(destination, 'matting.json'), 'utf8'));
  assert.equal(report.frames, 3);
  assert.equal(report.fps, '6/1');
  assert.equal(report.duration, 0.5);
  assert.equal(report.provider, 'CPUExecutionProvider');
  assert.equal(report.width, 160);
  assert.equal(report.height, 96);
  for (const name of ['foreground.mp4', 'alpha.mp4']) {
    const decode = spawnSync(mediaPath('ffmpeg'), ['-v', 'error', '-i', path.join(destination, name), '-f', 'null', '-'], { encoding: 'utf8', timeout: 30000, windowsHide: true });
    assert.equal(decode.status, 0, decode.error?.message || decode.stderr);
  }
  const repeat = runPython(path.join(root, 'scripts', 'matte.py'), ['--input', input, '--output', destination], { env: mediaEnvironment(), encoding: 'utf8', stdio: 'pipe', timeout: 10000 });
  assert.notEqual(repeat.status, 0, 'Existing output must never be overwritten');
  assert.match(repeat.stderr, /already exists/);
  await writeFile(path.join(output, 'result.json'), JSON.stringify({ ok: true, platform: process.platform, frames: report.frames, scope: 'Real CPU RVM inference, recurrent frames, synchronized H.264 layer encoding and full decode of a synthetic fixture. This does not validate human matting quality.' }, null, 2) + '\n');
  console.log(`PASS: RVM model + CPU inference + synchronized layers + H.264 decode.\nArtifacts: ${output}`);
} catch (error) {
  console.error(`Matting smoke failed: ${error.message}\nArtifacts: ${output}`);
  process.exitCode = 1;
}
