import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { uvAsset, UV_ASSETS, checkMattingPlatform, privateEnvironment, venvPython, verifyDigest, ensurePython, npmCliPath } from '../scripts/bootstrap.mjs';

const script = fileURLToPath(new URL('../scripts/bootstrap.mjs', import.meta.url));
function temporary(t) {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'motion bootstrap 空格-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

test('--plan and --help neither write nor invoke package installation', t => {
  const dir = temporary(t);
  for (const arg of ['--plan', '--help']) {
    const result = spawnSync(process.execPath, [script, arg], { cwd: dir, encoding: 'utf8', env: { ...process.env, PATH: '' } });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, arg === '--plan' ? /requirements-matting\.txt/ : /Node\.js 22/);
    assert.deepEqual(readdirSync(dir), []);
  }
});

test('unknown options fail before side effects', t => {
  const dir = temporary(t);
  const result = spawnSync(process.execPath, [script, '--skip-checks'], { cwd: dir, encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /未知参数/);
  assert.deepEqual(readdirSync(dir), []);
});

test('six pinned official assets have distinct SHA256 digests; unsupported targets fail', () => {
  assert.equal(Object.keys(UV_ASSETS).length, 6);
  const digests = new Set();
  for (const key of Object.keys(UV_ASSETS)) {
    const [platform, arch] = key.split('-');
    const asset = uvAsset(platform, arch);
    assert.match(asset.url, /^https:\/\/github\.com\/astral-sh\/uv\/releases\/download\/0\.12\.17\/uv-/);
    assert.match(asset.sha256, /^[a-f0-9]{64}$/);
    assert.equal(asset.name.endsWith('.zip'), platform === 'win32');
    digests.add(asset.sha256);
  }
  assert.equal(digests.size, 6);
  assert.throws(() => uvAsset('linux', 'ia32'), /暂不支持/);
});

test('tampered downloads are rejected before execution', () => {
  const bytes = Buffer.from('official-test-fixture');
  const expected = createHash('sha256').update(bytes).digest('hex');
  assert.doesNotThrow(() => verifyDigest(bytes, expected));
  assert.throws(() => verifyDigest(Buffer.from('tampered'), expected), /SHA256/);
});

test('environment keeps runtime inside project and strips unrelated Python activation', t => {
  const dir = temporary(t);
  const source = { PATH: '/example', VIRTUAL_ENV: '/unrelated', PYTHONPATH: '/modules', PYTHONHOME: '/global' };
  const env = privateEnvironment(dir, source);
  for (const key of ['UV_CACHE_DIR', 'UV_PYTHON_INSTALL_DIR', 'UV_PYTHON_BIN_DIR', 'UV_TOOL_DIR', 'UV_TOOL_BIN_DIR', 'npm_config_cache', 'PLAYWRIGHT_BROWSERS_PATH']) {
    assert.ok(env[key].startsWith(path.join(dir, '.runtime') + path.sep), key);
  }
  for (const key of ['VIRTUAL_ENV', 'PYTHONPATH', 'PYTHONHOME']) assert.equal(env[key], undefined);
  assert.equal(env.PATH, source.PATH);
  assert.equal(source.VIRTUAL_ENV, '/unrelated');
  assert.equal(venvPython(dir, 'win32'), path.join(dir, '.venv', 'Scripts', 'python.exe'));
  assert.equal(venvPython(dir, 'darwin'), path.join(dir, '.venv', 'bin', 'python'));
});

test('an unusable existing venv is preserved and explained, never recreated', t => {
  const dir = temporary(t);
  mkdirSync(path.join(dir, '.venv'));
  const sentinel = path.join(dir, '.venv', 'user-data.txt');
  writeFileSync(sentinel, 'keep this');
  assert.throws(() => ensurePython(dir, 'must-not-run'), /已保留全部内容.*重命名/);
  assert.equal(readFileSync(sentinel, 'utf8'), 'keep this');
  assert.deepEqual(readdirSync(path.join(dir, '.venv')), ['user-data.txt']);
});

test('npm is invoked through its JS entry rather than cmd.exe interpolation', () => {
  const cli = npmCliPath();
  assert.ok(existsSync(cli));
  assert.equal(path.basename(cli), 'npm-cli.js');
  const result = spawnSync(process.execPath, [cli, '--version'], { encoding: 'utf8', windowsHide: true });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout.trim(), /^\d+\.\d+\.\d+/);
});

test('unsupported Windows ARM matting stops before installation', () => {
  assert.throws(() => checkMattingPlatform('win32', 'arm64'), /onnxruntime 1\.22\.1.*x64.*Node\.js/);
  for (const [platform, arch] of [['win32','x64'],['darwin','x64'],['darwin','arm64'],['linux','x64'],['linux','arm64']]) {
    assert.doesNotThrow(() => checkMattingPlatform(platform, arch));
  }
});
