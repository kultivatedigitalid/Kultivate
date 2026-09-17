const { chromium } = require('C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');
const fs = require('node:fs/promises');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4321/en/', { waitUntil: 'networkidle' });
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(__dirname, 'before-services.png') });
  console.log(JSON.stringify({ title: await page.title(), viewport: await page.evaluate(() => ({width: innerWidth, document: document.documentElement.scrollWidth})) }));
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
