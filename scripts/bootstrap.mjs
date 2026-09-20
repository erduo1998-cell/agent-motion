import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync, chmodSync, copyFileSync, mkdtempSync, rmSync, realpathSync, lstatSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const UV_VERSION = '0.12.17';
// Official astral-sh/uv GitHub release asset digests, verified 2026-09-20.
// https://github.com/astral-sh/uv/releases/tag/0.12.17
export const UV_ASSETS = Object.freeze({
  'darwin-arm64': ['aarch64-apple-darwin.tar.gz', '85f00cbdc6dd3e97eba4c31b4d014375a9fdfe8f570023b84e5102fc3456896b'],
  'darwin-x64': ['x86_64-apple-darwin.tar.gz', '8dcf05a8c809bb3c471d2b614788ba27a6e41298fc8c31ac84b5f4339fd468e5'],
  'win32-x64': ['x86_64-pc-windows-msvc.zip', 'a252121d5b59398fcb137c6ea448176459a44010f33f67e0072305a637119ca7'],
  'win32-arm64': ['aarch64-pc-windows-msvc.zip', '3e1aa6849d77f0e00dc865e4afab5c5b32de053e21fe35bf5ad5cec3734ec976'],
  'linux-x64': ['x86_64-unknown-linux-gnu.tar.gz', 'fa82fd8dde8e8eefdecada6aa0889666556cfceb690d06e0c3bca49eb3070a63'],
  'linux-arm64': ['aarch64-unknown-linux-gnu.tar.gz', 'd636d1b678e9e7f367ecb22b46bd1cabbed234d6bc3b4d96365d2b507f72f86c'],
});

export function uvAsset(platform = process.platform, arch = process.arch) {
  const asset = UV_ASSETS[`${platform}-${arch}`];
  if (!asset) throw new Error(`暂不支持自动准备 ${platform}/${arch}。请使用 macOS、Windows 或基于 glibc 的 Linux，搭配 x64 / arm64 Node.js。`);
  const name = `uv-${asset[0]}`;
  return { name, sha256: asset[1], url: `https://github.com/astral-sh/uv/releases/download/${UV_VERSION}/${name}` };
}

export function checkMattingPlatform(platform = process.platform, arch = process.arch) {
  if (platform === 'win32' && arch === 'arm64') {
    throw new Error('当前抠像依赖 onnxruntime 1.22.1 没有 Windows ARM64 安装包。请安装 x64 版本 Node.js（https://nodejs.org/zh-cn/download）后重新启动，或使用受支持的 macOS / Linux 系统。');
  }
  uvAsset(platform, arch);
}

export function privateEnvironment(projectRoot, source = process.env) {
  const runtime = path.join(projectRoot, '.runtime');
  const env = { ...source, PYTHONUTF8: '1', PYTHONNOUSERSITE: '1',
    UV_NO_CONFIG: '1', UV_NO_MODIFY_PATH: '1',
    UV_CACHE_DIR: path.join(runtime, 'uv-cache'),
    UV_PYTHON_INSTALL_DIR: path.join(runtime, 'python'),
    UV_PYTHON_BIN_DIR: path.join(runtime, 'python-bin'),
    UV_TOOL_DIR: path.join(runtime, 'uv-tools'),
    UV_TOOL_BIN_DIR: path.join(runtime, 'uv-tools-bin'),
    npm_config_cache: path.join(runtime, 'npm-cache'),
    PLAYWRIGHT_BROWSERS_PATH: path.join(runtime, 'browsers'),
    PLAYWRIGHT_SKIP_BROWSER_GC: '1',
  };
  // An unrelated active venv or Python module path must not contaminate this project.
  delete env.VIRTUAL_ENV;
  delete env.PYTHONHOME;
  delete env.PYTHONPATH;
  return env;
}

export function venvPython(projectRoot, platform = process.platform) {
  return path.join(projectRoot, '.venv', ...(platform === 'win32' ? ['Scripts', 'python.exe'] : ['bin', 'python']));
}

export function bootstrapPlan() {
  return [
    'npm ci：在本项目安装锁定的 Node 依赖。',
    `下载并校验官方 uv ${UV_VERSION}；只写入 .runtime/。`,
    '使用已有 Python 3.10–3.13 创建 .venv；没有合适版本则自动下载隔离的 Python 3.12。',
    '在 .venv 安装 scripts/requirements-matting.txt 中的抠像依赖。',
    '运行 setup：准备 FFmpeg / ffprobe、Chromium 和抠像模型。',
    '运行 doctor --matting 与 matting-smoke：检查环境并实际推理、编码。',
  ];
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', windowsHide: true, ...options });
  if (result.error || result.status !== 0) {
    throw new Error(`${path.basename(command)} ${args.slice(0, 2).join(' ')} 执行失败：${result.error?.message || `退出码 ${result.status ?? result.signal}`}`);
  }
  return result;
}

export function inspectPython(command, prefix = [], options = {}) {
  const probe = 'import sys, json, venv; print(json.dumps({"executable":sys.executable,"prefix":sys.prefix,"version":list(sys.version_info[:2])})); sys.exit(0 if (3,10) <= sys.version_info[:2] < (3,14) else 1)';
  const result = spawnSync(command, [...prefix, '-c', probe], { encoding: 'utf8', timeout: 10000, windowsHide: true, ...options });
  if (result.status !== 0) return null;
  try { return JSON.parse(result.stdout.trim()); } catch { return null; }
}

export function findExistingPython(env = process.env, platform = process.platform) {
  const versions = ['3.12', '3.11', '3.10', '3.13'];
  const candidates = [
    ...(env.PYTHON ? [[env.PYTHON, []]] : []),
    ...versions.map(v => [`python${v}`, []]),
    ...(platform === 'win32' ? versions.map(v => ['py', [`-${v}`]]) : []),
    ['python3', []], ['python', []],
  ];
  for (const [command, prefix] of candidates) {
    const found = inspectPython(command, prefix, { env });
    if (found) return found.executable;
  }
  return null;
}

export function verifyDigest(data, expected, label = 'download') {
  const actual = createHash('sha256').update(data).digest('hex');
  if (actual !== expected) throw new Error(`${label} SHA256 校验失败，文件不会被执行。请检查网络后重试。`);
}

export async function ensureUv(projectRoot, env = privateEnvironment(projectRoot)) {
  const asset = uvAsset();
  const downloads = path.join(projectRoot, '.runtime', 'downloads');
  mkdirSync(downloads, { recursive: true });
  const archive = path.join(downloads, `${UV_VERSION}-${asset.name}`);
  if (existsSync(archive)) {
    // Cache corruption is a hard error, not permission to execute an unchecked binary.
    try { verifyDigest(readFileSync(archive), asset.sha256, archive); }
    catch (error) { throw new Error(`${error.message}\n请删除这个损坏的 uv 缓存文件后重试：${archive}`); }
  } else {
    console.log(`下载官方 uv：${asset.url}`);
    const response = await fetch(asset.url, { signal: AbortSignal.timeout(180000) });
    if (!response.ok) throw new Error(`uv 下载失败：HTTP ${response.status}。请检查 GitHub 网络连接后重试。`);
    const bytes = Buffer.from(await response.arrayBuffer());
    verifyDigest(bytes, asset.sha256, asset.name);
    writeFileSync(archive, bytes, { flag: 'wx' });
  }
  // Re-extract the verified archive, rather than trusting a stale executable cache.
  const unpacked = mkdtempSync(path.join(downloads, 'uv-unpack-'));
  try {
    if (process.platform === 'win32') {
      run('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', 'Expand-Archive -LiteralPath $env:AGENT_MOTION_UV_ARCHIVE -DestinationPath $env:AGENT_MOTION_UV_DEST -Force'], {
        env: { ...env, AGENT_MOTION_UV_ARCHIVE: archive, AGENT_MOTION_UV_DEST: unpacked },
      });
    } else run('tar', ['-xzf', archive, '-C', unpacked], { env });
    const name = process.platform === 'win32' ? 'uv.exe' : 'uv';
    const stem = asset.name.replace(/\.(?:tar\.gz|zip)$/, '');
    const source = [path.join(unpacked, name), path.join(unpacked, stem, name)].find(existsSync);
    if (!source) throw new Error('官方 uv 压缩包中未找到可执行文件。');
    const targetDir = path.join(projectRoot, '.runtime', 'uv', UV_VERSION);
    mkdirSync(targetDir, { recursive: true });
    const target = path.join(targetDir, name);
    copyFileSync(source, target);
    if (process.platform !== 'win32') chmodSync(target, 0o755);
    run(target, ['--version'], { env });
    return target;
  } finally { rmSync(unpacked, { recursive: true, force: true }); }
}

export function ensurePython(projectRoot, uv, env = privateEnvironment(projectRoot)) {
  const python = venvPython(projectRoot);
  const directory = path.join(projectRoot, '.venv');
  if (existsSync(directory)) {
    if (lstatSync(directory).isSymbolicLink()) throw new Error('现有 .venv 是符号链接。为避免修改项目外环境，请先将此链接重命名为 .venv-backup，再重新运行。');
    const found = inspectPython(python, [], { env });
    const normalize = p => process.platform === 'win32' ? path.resolve(p).toLowerCase() : path.resolve(p);
    if (!found || normalize(found.prefix) !== normalize(directory)) {
      throw new Error(`现有 ${directory} 不可用或不是 Python 3.10–3.13 的隔离环境。已保留全部内容；请将 .venv 文件夹重命名为 .venv-backup 后重新运行（不要覆盖已有备份）。`);
    }
    console.log(`复用项目 Python：${python}`);
    return python;
  }
  const existing = findExistingPython(env);
  if (existing) {
    console.log(`使用已有 Python 创建项目隔离环境：${existing}`);
    run(uv, ['venv', '--python', existing, '--no-python-downloads', directory], { cwd: projectRoot, env });
  } else {
    console.log('未找到合适的 Python，正在下载项目私有 Python 3.12。');
    run(uv, ['python', 'install', '3.12', '--no-bin', '--no-registry'], { cwd: projectRoot, env });
    run(uv, ['venv', '--python', '3.12', '--managed-python', directory], { cwd: projectRoot, env });
  }
  if (!inspectPython(python, [], { env })) throw new Error('项目 Python 创建后未通过验证。');
  return python;
}

export function npmCliPath(env = process.env) {
  const nodeDir = path.dirname(process.execPath);
  const fromPath = (env.PATH || env.Path || '').split(path.delimiter).flatMap(dir => {
    try {
      const resolved = realpathSync(path.join(dir, 'npm'));
      return path.basename(resolved) === 'npm-cli.js' ? [resolved] : [];
    } catch { return []; }
  });
  const candidates = [
    env.npm_execpath?.endsWith('npm-cli.js') ? env.npm_execpath : null,
    path.join(nodeDir, 'node_modules', 'npm', 'bin', 'npm-cli.js'),
    path.resolve(nodeDir, '..', 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js'),
    // Homebrew's Node executable may be resolved into its Cellar directory.
    ...fromPath,
    '/opt/homebrew/lib/node_modules/npm/bin/npm-cli.js', '/usr/local/lib/node_modules/npm/bin/npm-cli.js',
    '/usr/share/nodejs/npm/bin/npm-cli.js', '/usr/lib/node_modules/npm/bin/npm-cli.js',
  ].filter(Boolean);
  const found = candidates.find(existsSync);
  if (!found) throw new Error('未找到 npm。请从 https://nodejs.org/zh-cn/download 安装包含 npm 的 Node.js 22+，然后重新打开本启动文件。');
  return found;
}

export async function main(args = process.argv.slice(2)) {
  if (args.includes('--help')) {
    console.log('用法：node scripts/bootstrap.mjs [--plan]\n首次完整准备环境与本地抠像。--plan 只显示计划，不下载、不写入。\n需要 Node.js 22+：https://nodejs.org/zh-cn/download');
    return;
  }
  if (args.some(arg => arg !== '--plan')) throw new Error('未知参数。请运行 node scripts/bootstrap.mjs --help。');
  if (args.includes('--plan')) { console.log(bootstrapPlan().map((step, i) => `${i + 1}. ${step}`).join('\n')); return; }
  if (Number(process.versions.node.split('.')[0]) < 22) throw new Error('需要 Node.js 22+。请从 https://nodejs.org/zh-cn/download 安装新版，关闭终端后重新打开本启动文件。');
  checkMattingPlatform();
  const env = privateEnvironment(root);
  console.log('开始准备 Agent Motion。首次需要联网下载依赖、浏览器和抠像模型；依赖保存在项目内；Linux 若缺少浏览器系统库会提示另外安装。');
  run(process.execPath, [npmCliPath(env), 'ci'], { cwd: root, env });
  const uv = await ensureUv(root, env);
  const python = ensurePython(root, uv, env);
  env.PYTHON = python;
  run(uv, ['pip', 'install', '--python', python, '-r', path.join(root, 'scripts', 'requirements-matting.txt')], { cwd: root, env });
  for (const [script, ...flags] of [['setup.mjs'], ['doctor.mjs', '--matting'], ['matting-smoke.mjs']]) {
    run(process.execPath, [path.join(root, 'scripts', script), ...flags], { cwd: root, env });
  }
  console.log('\n安装与抠像工具链检查通过！\n下一步：将原视频与完整 SRT 放入 inputs/，用智能体打开本项目，发送：\n“先读 AGENTS.md 和两个项目 Skill，用 inputs/ 中的原视频与字幕制作完整口播动效，必须完成真实人物抠像，检查实际画面与声音，交付 MP4 和可编辑工程。”');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error(`\n准备未完成：${error.message}\n修复提示中的问题后，重新打开 start.command / start.bat，或运行 node scripts/bootstrap.mjs。`);
    process.exitCode = 1;
  });
}
