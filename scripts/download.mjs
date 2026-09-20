import { createHash, randomUUID } from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, rename, rm, stat } from 'node:fs/promises';
import { dirname } from 'node:path';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

export async function fileHash(filename) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(filename)) hash.update(chunk);
  return hash.digest('hex');
}
export async function downloadVerified(asset, destination) {
  if (!/^https:\/\//.test(asset.url) || !/^[a-f0-9]{64}$/.test(asset.sha256)) throw new Error('Download requires HTTPS and a pinned SHA-256.');
  try {
    if ((await stat(destination)).isFile() && await fileHash(destination) === asset.sha256) return destination;
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await mkdir(dirname(destination), { recursive: true });
  const temporary = destination + '.' + randomUUID() + '.part';
  console.log(`Downloading ${asset.url.split('/').at(-1)} …`);
  try {
    const response = await fetch(asset.url, { signal: AbortSignal.timeout(600000) });
    if (!response.ok || !response.body) throw new Error(`Download returned HTTP ${response.status}`);
    let bytes = 0;
    const counter = new Transform({ transform(chunk, encoding, callback) {
      bytes += chunk.length;
      callback(asset.bytes && bytes > asset.bytes ? new Error('Download exceeds pinned size') : null, chunk);
    } });
    await pipeline(Readable.fromWeb(response.body), counter, createWriteStream(temporary, { flags: 'wx' }));
    if (asset.bytes && bytes !== asset.bytes) throw new Error('Downloaded size does not match');
    if (await fileHash(temporary) !== asset.sha256) throw new Error('Downloaded checksum does not match; file was not installed');
    await rename(temporary, destination);
    return destination;
  } catch (error) {
    await rm(temporary, { force: true });
    throw new Error(`${error.message}. Check network access to ${new URL(asset.url).hostname} and rerun the same setup command.`);
  }
}
