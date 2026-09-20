import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export function findPython() {
  const managed = path.join(root, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
  if (!process.env.PYTHON && existsSync(managed)) {
    const result = spawnSync(managed, ['-c', 'import sys; sys.exit(0 if sys.version_info >= (3, 10) else 1)'], { encoding: 'utf8', timeout: 10000, windowsHide: true });
    if (result.status !== 0) throw new Error('Project Python is not usable. Rerun node scripts/bootstrap.mjs to diagnose .venv.');
    return { command: managed, prefix: [], executable: managed };
  }
  const candidates = process.env.PYTHON
    ? [[process.env.PYTHON, []]]
    : process.platform === 'win32'
      ? [['py', ['-3']], ['python', []], ['python3', []]]
      : [['python3', []], ['python', []], ...['3.14', '3.13', '3.12', '3.11', '3.10'].map(version => ['python' + version, []])];
  for (const [command, prefix] of candidates) {
    const result = spawnSync(command, [...prefix, '-c', 'import sys; print(sys.executable); sys.exit(0 if sys.version_info >= (3, 10) else 1)'], { encoding: 'utf8', timeout: 10000, windowsHide: true });
    if (result.status === 0) return { command, prefix, executable: result.stdout.trim() };
  }
  throw new Error('Python 3.10+ is required. Install Python and reopen the terminal, or set PYTHON to its executable path (without arguments).');
}
export function runPython(script, args = [], options = {}) {
  const { command, prefix } = findPython();
  return spawnSync(command, [...prefix, script, ...args], {
    cwd: root, stdio: 'inherit', windowsHide: true,
    env: { ...process.env, PYTHONUTF8: '1' }, ...options,
  });
}
