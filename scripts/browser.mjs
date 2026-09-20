import { existsSync } from 'node:fs';
import path from 'node:path';
import { root } from './runtime.mjs';

// Configure the project cache before Playwright resolves its browser registry.
const localBrowsers = path.join(root, '.runtime', 'browsers');
if (!process.env.PLAYWRIGHT_BROWSERS_PATH && existsSync(localBrowsers)) process.env.PLAYWRIGHT_BROWSERS_PATH = localBrowsers;
const { chromium } = await import('playwright-core');
export async function launchBrowser(options = {}) {
  const defaults = process.env.BROWSER_EXECUTABLE
    ? { executablePath: process.env.BROWSER_EXECUTABLE }
    : process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {};
  return chromium.launch({ headless: true, ...defaults, ...options });
}
