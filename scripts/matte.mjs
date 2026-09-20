import path from 'node:path';
import { runPython, root } from './runtime.mjs';
import { mediaEnvironment } from './media-tools.mjs';
const args = process.argv.slice(2);
const result = runPython(path.join(root, 'scripts', 'matte.py'), args, { env: mediaEnvironment() });
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
