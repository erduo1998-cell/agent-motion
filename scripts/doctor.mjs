import { spawnSync } from 'node:child_process';
import { findPython } from './runtime.mjs';
import { launchBrowser } from './browser.mjs';
const report = { platform: process.platform, arch: process.arch, checks: [] };
function record(name, ok, detail) { report.checks.push({ name, ok, detail }); }
record('node', Number(process.versions.node.split('.')[0]) >= 22, process.version);
try { record('python', true, findPython().executable); } catch (error) { record('python', false, error.message); }
for (const tool of ['ffmpeg', 'ffprobe']) {
  const executable = process.env[tool.toUpperCase() + '_PATH'] || tool;
  const result = spawnSync(executable, ['-version'], { encoding: 'utf8', timeout: 10000, windowsHide: true });
  record(tool, result.status === 0, result.status === 0 ? result.stdout.split(/\r?\n/)[0] : `Not available: ${executable}. Install FFmpeg and reopen the terminal, or set ${tool.toUpperCase()}_PATH.`);
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
