import { readFile, readdir, lstat, mkdir, copyFile, writeFile } from 'node:fs/promises';
import { resolve, relative, dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(join(root, 'release.config.json'), 'utf8'));
const checkOnly = process.argv.includes('--check');
const suffix = new Date().toISOString().replace(/[:.]/g, '-');
const destination = join(root, 'dist', `agent-motion-${suffix}`);
const files = [];
const errors = [];
const excludedNames = new Set(['node_modules', '__pycache__', '.DS_Store', '.git']);
async function add(rel) {
  const path = join(root, rel);
  const info = await lstat(path);
  if (info.isSymbolicLink()) throw new Error(`Symlinks are not distributable: ${rel}`);
  if (excludedNames.has(rel.split('/').at(-1)) || /\.(pyc|pyo|log)$/.test(rel)) return;
  if (info.isDirectory()) {
    for (const name of (await readdir(path)).sort()) await add(`${rel}/${name}`);
    return;
  }
  if (!info.isFile()) throw new Error(`Not a regular file: ${rel}`);
  if (rel.startsWith('reference-library/')) {
    const subtree = rel.split('/')[1];
    if (!['typography', 'analysis'].includes(subtree)) throw new Error(`Private reference library excluded: ${rel}`);
    if (subtree === 'analysis' && !['.md', '.json'].includes(extname(rel))) throw new Error(`Analysis library must be text/JSON only: ${rel}`);
    if (subtree === 'analysis' && /(?:^|\/)(?:transcript|subtitles?|captions?)(?:[.-]|$)/i.test(rel)) throw new Error(`Raw transcript excluded: ${rel}`);
  }
  if (/(^|\/)(\.env(?:\..*)?|credentials[^/]*|id_rsa|id_ed25519)$/.test(rel)) throw new Error(`Private file: ${rel}`);
  if (info.size > 50 * 1024 * 1024) throw new Error(`File exceeds 50 MiB: ${rel}`);
  files.push(rel);
}
for (const path of config.files) await add(path);
for (const path of config.directories) await add(path);
const fileSet = new Set(files);
for (const rel of files) {
  if (!['.md', '.json', '.yaml', '.yml', '.html', '.mjs', '.py', '.txt'].includes(extname(rel))) continue;
  const value = await readFile(join(root, rel), 'utf8');
  if (rel.startsWith('reference-library/analysis/') && /data:(?:video|audio|image)\/|base64,|<video\b|<audio\b|!\[[^\]]*\]\(|[A-Za-z0-9+/]{2048,}={0,2}/i.test(value)) errors.push(`Embedded reference media excluded: ${rel}`);
  // This script contains signatures, not credentials. Never print matching content.
  if (rel !== 'scripts/package-release.mjs') {
    if (/\/(?:Users|home)\/erduo(?:\/|\b)|codex-clipboard-|-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----|\b(?:sk-proj-|ghp_)[A-Za-z0-9_-]{20,}/.test(value)) errors.push(`Private data signature in ${rel}`);
  }
  if (extname(rel) !== '.md') continue;
  for (const match of value.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    let target = match[1].replace(/^<|>$/g, '').split('#')[0].split('?')[0];
    if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
    try { target = decodeURIComponent(target); } catch {}
    const absolute = resolve(root, dirname(rel), target);
    const dest = relative(root, absolute).split('\\').join('/');
    if (!fileSet.has(dest) && !files.some(p => p.startsWith(`${dest.replace(/\/$/, '')}/`))) errors.push(`Unshipped link in ${rel}: ${target}`);
  }
}
if (errors.length) throw new Error(errors.join('\n'));
const manifest = [];
for (const rel of files.sort()) {
  const data = await readFile(join(root, rel));
  manifest.push({ path: rel, bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') });
  if (!checkOnly) {
    const dest = join(destination, rel);
    await mkdir(dirname(dest), { recursive: true });
    await copyFile(join(root, rel), dest);
  }
}
const bytes = manifest.reduce((sum, item) => sum + item.bytes, 0);
if (!checkOnly) await writeFile(join(destination, 'RELEASE-MANIFEST.json'), JSON.stringify({ formatVersion: 1, files: manifest, bytes }, null, 2) + '\n');
console.log(JSON.stringify({ status: 'pass', mode: checkOnly ? 'check' : 'export', files: files.length, bytes, ...(checkOnly ? {} : { destination }) }, null, 2));
