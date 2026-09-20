import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { startServer } from '../serve.mjs';
import { launchBrowser } from './browser.mjs';
import { mediaPath } from './media-tools.mjs';

const output = await mkdtemp(path.join(tmpdir(), 'threejs smoke-'));
let browser, server;
try {
  const service = await startServer({ port: 0 });
  server = service.server;
  browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width: 320, height: 180 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${service.url}/tests/fixtures/smoke.html`);
  await page.waitForFunction(() => window.film?.ready, null, { timeout: 15000 });
  async function capture(time, filename) {
    const pixel = await page.evaluate(t => window.film.renderAt(t), time);
    assert.ok(pixel.slice(0, 3).some(value => value > 0), 'WebGL center pixel must be rendered');
    return page.screenshot(filename ? { path: path.join(output, filename) } : {});
  }
  const first = await capture(0);
  const later = await capture(0.5);
  assert.notDeepEqual(first, later, 'Different absolute times must produce different frames');
  assert.deepEqual(await capture(0), first, 'Seeking backward must reproduce the exact frame');
  for (let frame = 0; frame < 12; frame++) await capture(frame / 12, `frame-${String(frame).padStart(4, '0')}.png`);
  assert.deepEqual(errors, [], 'Browser page errors');
  const filmPath = path.join(output, 'smoke.mp4');
  const encode = spawnSync(mediaPath('ffmpeg'), ['-hide_banner', '-loglevel', 'error', '-y', '-framerate', '12', '-i', path.join(output, 'frame-%04d.png'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', filmPath], { encoding: 'utf8', windowsHide: true, timeout: 60000 });
  assert.equal(encode.status, 0, encode.error?.message || encode.stderr);
  const probe = spawnSync(mediaPath('ffprobe'), ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', filmPath], { encoding: 'utf8', windowsHide: true, timeout: 10000 });
  assert.equal(probe.status, 0, probe.error?.message || probe.stderr);
  const metadata = JSON.parse(probe.stdout);
  const video = metadata.streams.find(stream => stream.codec_type === 'video');
  assert.equal(video.width, 320); assert.equal(video.height, 180);
  assert.equal(video.nb_frames, '12'); assert.equal(video.codec_name, 'h264');
  assert.ok(Math.abs(Number(metadata.format.duration) - 1) < 0.05);
  await writeFile(path.join(output, 'result.json'), JSON.stringify({ ok: true, platform: process.platform, node: process.version, browser: browser.version(), frames: 12, width: 320, height: 180, fps: 12, duration: 1, scope: 'Synthetic scene: WebGL, deterministic seeking, screenshots and silent H.264 encoding. Not talking-head/agent quality validation.' }, null, 2));
  console.log(`PASS: Three.js WebGL, absolute-time seek, 12-frame H.264 encode and ffprobe.\nArtifacts: ${output}`);
} catch (error) {
  console.error(`Smoke test failed: ${error.stack}\nArtifacts: ${output}`);
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (server) await new Promise(resolve => server.close(resolve));
}
