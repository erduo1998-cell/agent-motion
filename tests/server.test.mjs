import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { startServer } from '../serve.mjs';

test('static server: Unicode paths, media ranges, HEAD, malformed URLs and boundaries', async () => {
  const folder = await mkdtemp(path.join(tmpdir(), 'three test-'));
  const root = path.join(folder, '项目 space');
  await mkdir(root);
  await writeFile(path.join(root, '片 段.mp4'), '0123456789');
  await writeFile(path.join(root, '.env'), 'secret');
  await mkdir(path.join(root, 'film'));
  await writeFile(path.join(root, 'film/index.html'), '<title>Film</title>');
  await writeFile(path.join(folder, 'outside.txt'), 'private');
  const { server, url } = await startServer({ root, port: 0 });
  try {
    const index = await fetch(url + '/film/'); assert.equal(index.status, 200); assert.match(await index.text(), /Film/);
    const file = url + '/' + encodeURIComponent('片 段.mp4');
    let res = await fetch(file); assert.equal(res.status, 200); assert.equal(await res.text(), '0123456789');
    res = await fetch(file, { headers: { Range: 'bytes=2-5' } }); assert.equal(res.status, 206); assert.equal(await res.text(), '2345');
    res = await fetch(file, { headers: { Range: 'bytes=-3' } }); assert.equal(res.status, 206); assert.equal(await res.text(), '789');
    res = await fetch(file, { method: 'HEAD', headers: { Range: 'bytes=2-5' } }); assert.equal(res.status, 206); assert.equal(res.headers.get('content-length'), '4'); assert.equal(await res.text(), '');
    for (const range of ['bytes=20-', 'bytes=-0', 'bytes=5-2', 'bytes=0-1,3-4']) assert.equal((await fetch(file, { headers: { Range: range } })).status, 416);
    assert.equal((await fetch(url + '/%E0%A4%A')).status, 400);
    assert.equal((await fetch(url + '/.env')).status, 403);
    assert.equal((await fetch(url + '/..%5coutside.txt')).status, 403);
    assert.equal((await fetch(url + '/C:%5cprivate')).status, 403);
    assert.equal((await fetch(file, { method: 'POST' })).status, 405);
    // Junctions work without Windows Developer Mode; links must not escape the root.
    await symlink(folder, path.join(root, 'escape'), process.platform === 'win32' ? 'junction' : 'dir');
    assert.equal((await fetch(url + '/escape/outside.txt')).status, 403);
  } finally {
    await new Promise(resolve => server.close(resolve));
    await rm(folder, { recursive: true, force: true });
  }
});
