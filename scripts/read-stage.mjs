import path from 'node:path';
import { root, runPython } from './runtime.mjs';
try {
  const result = runPython(path.join(root, '.agents/skills/motion-craft/scripts/read-stage.py'), process.argv.slice(2));
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
