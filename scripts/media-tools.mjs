import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { root } from './runtime.mjs';

export function mediaPath(name) {
  if (!['ffmpeg', 'ffprobe'].includes(name)) throw new Error(`Unknown media tool: ${name}`);
  if (process.env[name.toUpperCase() + '_PATH']) return process.env[name.toUpperCase() + '_PATH'];
  const managed = path.join(root, '.runtime', 'media', ...(process.platform === 'win32' ? ['Library', 'bin', name + '.exe'] : ['bin', name]));
  return existsSync(managed) ? managed : name;
}
export function mediaEnvironment() {
  return { ...process.env, PATH: [path.dirname(mediaPath('ffmpeg')), process.env.PATH || process.env.Path || ''].join(path.delimiter), FFMPEG_PATH: mediaPath('ffmpeg'), FFPROBE_PATH: mediaPath('ffprobe'), PYTHONUTF8: '1' };
}
export function mediaReady(name) {
  const result = spawnSync(mediaPath(name), ['-version'], { encoding: 'utf8', timeout: 60000, windowsHide: true });
  if (result.status !== 0) return false;
  if (name !== 'ffmpeg') return true;
  const encoders = spawnSync(mediaPath(name), ['-hide_banner', '-encoders'], { encoding: 'utf8', timeout: 60000, windowsHide: true });
  return encoders.status === 0 && /\blibx264\b/.test(encoders.stdout);
}
