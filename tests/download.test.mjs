import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { downloadVerified } from '../scripts/download.mjs';
const payload = Buffer.from('verified model fixture');
const asset = { url: 'https://example.invalid/model.onnx', bytes: payload.length, sha256: createHash('sha256').update(payload).digest('hex') };

test('verified cache avoids a network request', async t => {
  const folder = await mkdtemp(path.join(tmpdir(), 'download test '));
  t.after(() => rm(folder, { recursive: true, force: true }));
  const filename = path.join(folder, 'model');
  await writeFile(filename, payload);
  t.mock.method(globalThis, 'fetch', () => { throw new Error('network must not be used'); });
  await downloadVerified(asset, filename);
  assert.deepEqual(await readFile(filename), payload);
});
test('bad download never replaces existing data and leaves no partial executable', async t => {
  const folder = await mkdtemp(path.join(tmpdir(), 'download test '));
  t.after(() => rm(folder, { recursive: true, force: true }));
  const filename = path.join(folder, 'model');
  await writeFile(filename, 'previous cache');
  t.mock.method(globalThis, 'fetch', async () => new Response(Buffer.alloc(payload.length)));
  await assert.rejects(downloadVerified(asset, filename), /checksum/);
  assert.equal(await readFile(filename, 'utf8'), 'previous cache');
  assert.deepEqual(await readdir(folder), ['model']);
});
test('verified download installs only complete matching bytes', async t => {
  const folder = await mkdtemp(path.join(tmpdir(), 'download test '));
  t.after(() => rm(folder, { recursive: true, force: true }));
  const filename = path.join(folder, 'model');
  t.mock.method(globalThis, 'fetch', async () => new Response(payload));
  await downloadVerified(asset, filename);
  assert.deepEqual(await readFile(filename), payload);
});
test('untrusted transport and missing digest are rejected before fetch', async () => {
  await assert.rejects(downloadVerified({ ...asset, url: 'http://example.invalid/model' }, 'unused'), /HTTPS/);
  await assert.rejects(downloadVerified({ ...asset, sha256: '' }, 'unused'), /SHA-256/);
});
