import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
if (args.some(arg => arg !== '--with-deps')) {
  console.error('Usage: npm run setup -- [--with-deps]');
  process.exitCode = 2;
} else {
  const cli = path.join(path.dirname(require.resolve('playwright-core/package.json')), 'cli.js');
  const result = spawnSync(process.execPath, [cli, 'install', ...(args.includes('--with-deps') ? ['--with-deps'] : []), 'chromium'], { stdio: 'inherit', windowsHide: true, env: { ...process.env, PLAYWRIGHT_SKIP_BROWSER_GC: '1' } });
  if (result.error) console.error(result.error.message);
  process.exitCode = result.status ?? 1;
  if (process.exitCode === 0) console.log('Chromium installed. Run npm run doctor to check Python, FFmpeg and WebGL.');
}
