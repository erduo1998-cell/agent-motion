import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { root } from './runtime.mjs';
// Expand tests in Node, not in a POSIX shell: npm uses cmd.exe on Windows.
const tests = readdirSync(path.join(root, 'tests')).filter(name => name.endsWith('.test.mjs')).sort().map(name => path.join(root, 'tests', name));
const result = spawnSync(process.execPath, ['--test', ...tests], { cwd: root, stdio: 'inherit', windowsHide: true });
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
