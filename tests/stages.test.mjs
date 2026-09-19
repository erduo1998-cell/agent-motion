import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { root } from '../scripts/runtime.mjs';
function run(args) {
  return spawnSync(process.execPath, [path.join(root, 'scripts/read-stage.mjs'), ...args], { cwd: root, encoding: 'utf8', windowsHide: true });
}
test('stage manifest resolves every source; pagination preserves hash and rejects changed packets', () => {
  const list = run(['--list']); assert.equal(list.status, 0, list.stderr); assert.match(list.stdout, /assets:/);
  const first = run(['--stage', 'srt', '--kind', 'talking-head']); assert.equal(first.status, 0, first.stderr); assert.match(first.stdout, /END_PAGE 1\//);
  assert.match(first.stdout, /NEXT_READ node scripts\/read-stage.mjs/);
  const hash = first.stdout.match(/packet ([a-f0-9]{64})/)[1];
  const second = run(['--stage', 'srt', '--page', '2', '--expect', hash]); assert.equal(second.status, 0, second.stderr); assert.match(second.stdout, /END_PAGE 2\//);
  const changed = run(['--stage', 'srt', '--page', '2', '--expect', 'wrong']); assert.equal(changed.status, 2); assert.match(changed.stderr, /Source changed/);
});
test('distributed skill integrity matches current files and excludes caches', async () => {
  const metadata = JSON.parse(await readFile(path.join(root, '.agents/motion-craft-install.json'), 'utf8'));
  for (const [name, expected] of Object.entries(metadata.fileHashes)) {
    assert.ok(!name.includes('__pycache__') && !name.endsWith('.pyc'));
    const data = await readFile(path.join(root, '.agents/skills', name));
    assert.equal(createHash('sha256').update(data).digest('hex'), expected, name);
  }
});
