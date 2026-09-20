import { spawnSync } from 'node:child_process';
import { findPython, root, runPython } from './runtime.mjs';
import path from 'node:path';
import { mediaPath, mediaEnvironment } from './media-tools.mjs';
import { launchBrowser } from './browser.mjs';
const report = { platform: process.platform, arch: process.arch, checks: [] };
function record(name, ok, detail) { report.checks.push({ name, ok, detail }); }
record('node', Number(process.versions.node.split('.')[0]) >= 22, process.version);
try { record('python', true, findPython().executable); } catch (error) { record('python', false, error.message); }
for (const tool of ['ffmpeg', 'ffprobe']) {
  const executable = mediaPath(tool);
  const result = spawnSync(executable, ['-version'], { encoding: 'utf8', timeout: 10000, windowsHide: true });
  record(tool, result.status === 0, result.status === 0 ? result.stdout.split(/\r?\n/)[0] : `Not available: ${executable}. Install FFmpeg and reopen the terminal, or set ${tool.toUpperCase()}_PATH.`);
}
const encoders = spawnSync(mediaPath('ffmpeg'), ['-hide_banner', '-encoders'], { encoding: 'utf8', timeout: 10000, windowsHide: true });
record('h264-encoder', encoders.status === 0 && /\blibx264\b/.test(encoders.stdout || ''), encoders.status === 0 && /\blibx264\b/.test(encoders.stdout || '') ? 'libx264 available' : 'Run npm run onboard, or choose an FFmpeg build with libx264.');
if (process.argv.includes('--matting')) {
  try {
    const result = runPython(path.join(root, 'scripts', 'matte.py'), ['--check'], { env: mediaEnvironment(), stdio: 'pipe', encoding: 'utf8', timeout: 60000 });
    record('rvm-matting', result.status === 0, result.status === 0 ? JSON.parse(result.stdout) : (result.stderr?.trim() || result.error?.message || 'Run npm run onboard.'));
  } catch (error) { record('rvm-matting', false, error.message); }
}
let browser;
try {
  browser = await launchBrowser();
  const page = await browser.newPage();
  const result = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    return gl ? { version: gl.getParameter(gl.VERSION), renderer: gl.getParameter(gl.RENDERER) } : null;
  });
  record('chromium-webgl2', Boolean(result), result || 'WebGL2 unavailable; check graphics drivers or headless rendering support.');
} catch (error) {
  record('chromium-webgl2', false, `Run npm run setup, or set BROWSER_EXECUTABLE/BROWSER_CHANNEL. ${error.message.split('\n')[0]}`);
} finally { await browser?.close(); }
report.ok = report.checks.every(check => check.ok);
if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`Platform: ${report.platform} ${report.arch}`);
  for (const check of report.checks) console.log(`${check.ok ? 'PASS' : 'FAIL'} ${check.name}: ${typeof check.detail === 'string' ? check.detail : JSON.stringify(check.detail)}`);
  console.log('Checks cover local tooling, not finished-film visual/audio quality or an agent provider.');
}
process.exitCode = report.ok ? 0 : 1;
