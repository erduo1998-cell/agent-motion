import { chromium } from 'playwright-core';

// No machine-specific Chrome path. Explicit configuration wins over defaults.
export async function launchBrowser(options = {}) {
  const defaults = process.env.BROWSER_EXECUTABLE
    ? { executablePath: process.env.BROWSER_EXECUTABLE }
    : process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {};
  return chromium.launch({ headless: true, ...defaults, ...options });
}
