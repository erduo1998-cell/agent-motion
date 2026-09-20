import { spawnSync } from 'node:child_process';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { root } from './runtime.mjs';
import { installMedia } from './install-media.mjs';
import { downloadVerified } from './download.mjs';
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
try {
  if (args.some(arg => !['--with-deps', '--core-only', '--managed-media'].includes(arg))) throw new Error('Usage: npm run setup -- [--with-deps] [--core-only] [--managed-media]');
  await installMedia({ forceManaged: args.includes('--managed-media') || process.env.AGENT_MOTION_FORCE_MANAGED_MEDIA === '1' });
  const cli = path.join(path.dirname(require.resolve('playwright-core/package.json')), 'cli.js');
  const browsers = process.env.PLAYWRIGHT_BROWSERS_PATH || path.join(root, '.runtime', 'browsers');
  await mkdir(browsers, { recursive: true });
  const result = spawnSync(process.execPath, [cli, 'install', ...(args.includes('--with-deps') ? ['--with-deps'] : []), 'chromium'], { stdio: 'inherit', windowsHide: true, env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: browsers, PLAYWRIGHT_SKIP_BROWSER_GC: '1' } });
  if (result.status !== 0) throw new Error(result.error?.message || 'Chromium install failed; check network. Linux system packages may require npm run setup -- --with-deps.');
  if (!args.includes('--core-only')) {
    const descriptor = JSON.parse(await readFile(path.join(root, 'scripts', 'rvm-model.json'), 'utf8'));
    const folder = path.join(root, '.runtime', 'models');
    await downloadVerified(descriptor.model, path.join(folder, 'rvm_mobilenetv3_fp32.onnx'));
    await downloadVerified(descriptor.license, path.join(folder, 'RVM-LICENSE'));
    await writeFile(path.join(folder, 'RVM-SOURCE.json'), JSON.stringify(descriptor, null, 2) + '\n');
    console.log('RVM model verified. Upstream terms retained in .runtime/models/RVM-LICENSE.');
  }
  console.log('Media tools and browser prepared. First-time users: npm run onboard. Check complete matting readiness: npm run doctor -- --matting.');
} catch (error) {
  console.error(`Setup failed: ${error.message}`);
  process.exitCode = 1;
}
