import fs from 'node:fs/promises';

const targets = await fetch('http://localhost:9222/json').then((response) => response.json());
const target = targets.find((item) => item.type === 'page');
if (!target) throw new Error('No browser page target is available');

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let nextId = 0;
const pending = new Map();
const events = new Map();
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const item = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) item.reject(new Error(message.error.message));
    else item.resolve(message.result);
    return;
  }
  const listeners = events.get(message.method) ?? [];
  events.delete(message.method);
  for (const resolve of listeners) resolve(message.params);
});

function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

function once(method) {
  return new Promise((resolve) => events.set(method, [...(events.get(method) ?? []), resolve]));
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function navigate(url) {
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url });
  await loaded;
  await new Promise((resolve) => setTimeout(resolve, 750));
}

async function screenshot(name) {
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
  await fs.writeFile(name, Buffer.from(shot.data, 'base64'));
}

async function scrollAndShot(selector, name) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({ block: 'start' }); true`);
  await new Promise((resolve) => setTimeout(resolve, 800));
  await screenshot(name);
}

await send('Page.enable');
await send('Runtime.enable');

await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 900 });
await navigate('http://localhost:4321/en/');
const homeDesktop = JSON.parse(await evaluate(`JSON.stringify((() => {
  const systemTitle = document.querySelector('#system-title');
  const systemStyle = systemTitle && getComputedStyle(systemTitle);
  const systemRect = systemTitle?.getBoundingClientRect();
  return {
    hero: document.querySelector('.hero h1')?.textContent?.trim(),
    ctas: [...document.querySelectorAll('.hero-actions a')].map((node) => node.textContent.trim()),
    sectionOrder: [...document.querySelectorAll('.home-flow > *')].map((node) => node.className),
    workTitle: document.querySelector('#work-title')?.textContent?.trim(),
    brandLogoCount: document.querySelectorAll('.brand-band__logos li').length,
    brandDisclaimer: document.querySelector('.brand-band__intro p')?.textContent?.trim(),
    servicesTitle: document.querySelector('#services-title')?.textContent?.trim(),
    serviceImages: [...document.querySelectorAll('.services-grid img')].map((node) => node.getAttribute('src')),
    systemTitle: systemTitle?.textContent?.trim(),
    systemLines: systemRect && systemStyle ? Math.round(systemRect.height / parseFloat(systemStyle.lineHeight)) : null,
    whyTitle: document.querySelector('#why-title')?.textContent?.trim(),
    whyPosition: getComputedStyle(document.querySelector('.why-intro')).position,
    whyCardsHeight: [...document.querySelectorAll('.reason-item')].map((node) => Math.round(node.getBoundingClientRect().height)),
    featuredBlog: document.querySelector('#insights-title')?.textContent?.trim(),
    footerCredit: document.querySelector('.footer-credit')?.textContent?.trim(),
    lazyStates: [...document.querySelectorAll('img[loading="lazy"]')].reduce((acc, node) => { acc[node.dataset.lazyState || 'none'] = (acc[node.dataset.lazyState || 'none'] || 0) + 1; return acc; }, {}),
    servicesBackground: getComputedStyle(document.querySelector('.services-section')).backgroundImage,
    whyBackground: getComputedStyle(document.querySelector('.why-kultivate')).backgroundImage,
    trailingHeadlinePeriods: [...document.querySelectorAll('h1,h2,h3')].map((node) => node.textContent.trim()).filter((text) => text.endsWith('.')),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
})())`));
await scrollAndShot('.services-section', 'v4-home-services.png');
await scrollAndShot('.why-kultivate', 'v4-home-why.png');

await navigate('http://localhost:4321/en/services/');
const servicesDesktop = JSON.parse(await evaluate(`JSON.stringify({
  h1: document.querySelector('h1')?.textContent?.trim(),
  description: document.querySelector('.interior-hero p')?.textContent?.trim(),
  names: [...document.querySelectorAll('.service-row h2')].map((node) => node.textContent.trim()),
  images: [...document.querySelectorAll('.service-row img')].map((node) => node.getAttribute('src')),
  heroImage: document.querySelector('.interior-hero__image')?.getAttribute('src'),
  trailingHeadlinePeriods: [...document.querySelectorAll('h1,h2,h3')].map((node) => node.textContent.trim()).filter((text) => text.endsWith('.')),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
})`));
await screenshot('v4-services-hero.png');

await navigate('http://localhost:4321/en/about/');
const aboutDesktop = JSON.parse(await evaluate(`JSON.stringify({
  h1: document.querySelector('h1')?.textContent?.trim(),
  storyLabels: [...document.querySelectorAll('.story-row__label p')].map((node) => node.textContent.trim()),
  cultureImage: document.querySelector('.about-culture img')?.getAttribute('src'),
  teamCount: document.querySelectorAll('.team-grid .person').length,
  teamLoaded: [...document.querySelectorAll('.team-grid img')].every((node) => node.complete && node.naturalWidth > 0),
  trailingHeadlinePeriods: [...document.querySelectorAll('h1,h2,h3')].map((node) => node.textContent.trim()).filter((text) => text.endsWith('.')),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
})`));
await scrollAndShot('.about-culture', 'v4-about-culture.png');

await navigate('http://localhost:4321/en/insights/');
const blogDesktop = JSON.parse(await evaluate(`JSON.stringify({
  h1: document.querySelector('h1')?.textContent?.trim(),
  featured: document.querySelector('#featured-title')?.textContent?.trim(),
  topStories: document.querySelectorAll('.top-stories > a').length,
  archiveStories: document.querySelectorAll('.archive-card').length,
  topics: [...document.querySelectorAll('.topic-row li')].map((node) => node.textContent.trim()),
  trailingHeadlinePeriods: [...document.querySelectorAll('h1,h2,h3')].map((node) => node.textContent.trim()).filter((text) => text.endsWith('.')),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
})`));
await screenshot('v4-blog-index.png');

await navigate('http://localhost:4321/en/insights/website-as-the-system-center/');
const articleDesktop = JSON.parse(await evaluate(`JSON.stringify({
  h1: document.querySelector('h1')?.textContent?.trim(),
  summary: document.querySelector('.article-summary')?.textContent?.trim(),
  tocItems: document.querySelectorAll('.article-toc li').length,
  related: document.querySelectorAll('.related-posts a').length,
  bodyHeadings: [...document.querySelectorAll('.article-body h2')].map((node) => node.textContent.trim()),
  trailingHeadlinePeriods: [...document.querySelectorAll('h1,h2,h3')].map((node) => node.textContent.trim()).filter((text) => text.endsWith('.')),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
})`));
await screenshot('v4-blog-article.png');

await navigate('http://localhost:4321/id/');
const idHome = JSON.parse(await evaluate(`JSON.stringify({
  hero: document.querySelector('.hero h1')?.textContent?.trim(),
  workTitle: document.querySelector('#work-title')?.textContent?.trim(),
  servicesTitle: document.querySelector('#services-title')?.textContent?.trim(),
  systemTitle: document.querySelector('#system-title')?.textContent?.trim(),
  whyTitle: document.querySelector('#why-title')?.textContent?.trim(),
  featuredBlog: document.querySelector('#insights-title')?.textContent?.trim(),
  brandDisclaimer: document.querySelector('.brand-band__intro p')?.textContent?.trim()
})`));

await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true, screenWidth: 390, screenHeight: 844 });
const mobile = {};
for (const [name, url] of [
  ['home', 'http://localhost:4321/en/'],
  ['services', 'http://localhost:4321/en/services/'],
  ['about', 'http://localhost:4321/en/about/'],
  ['blog', 'http://localhost:4321/en/insights/'],
  ['article', 'http://localhost:4321/en/insights/website-as-the-system-center/']
]) {
  await navigate(url);
  mobile[name] = JSON.parse(await evaluate(`JSON.stringify({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    h1: document.querySelector('h1')?.textContent?.trim()
  })`));
  if (name === 'home') {
    const systemLines = JSON.parse(await evaluate(`JSON.stringify((() => { const node = document.querySelector('#system-title'); const style = getComputedStyle(node); return { lines: Math.round(node.getBoundingClientRect().height / parseFloat(style.lineHeight)), text: node.textContent.trim() }; })())`));
    mobile[name].systemLines = systemLines;
    await screenshot('v4-home-mobile.png');
  }
}

console.log(JSON.stringify({ homeDesktop, servicesDesktop, aboutDesktop, blogDesktop, articleDesktop, idHome, mobile }, null, 2));
socket.close();
