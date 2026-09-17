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
    message.error ? item.reject(new Error(message.error.message)) : item.resolve(message.result);
    return;
  }
  for (const resolve of events.get(message.method) ?? []) resolve(message.params);
  events.delete(message.method);
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

const pause = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

async function navigate(url) {
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url });
  await loaded;
  await pause(850);
}

async function screenshot(name) {
  const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
  await fs.writeFile(name, Buffer.from(result.data, 'base64'));
}

async function inspectPage(url, heroSelector) {
  await navigate(url);
  return JSON.parse(await evaluate(`JSON.stringify({
    h1: document.querySelector('h1')?.textContent?.trim(),
    heroImage: document.querySelector(${JSON.stringify(heroSelector)})?.getAttribute('src'),
    heroImageLoaded: Boolean(document.querySelector(${JSON.stringify(heroSelector)})?.complete && document.querySelector(${JSON.stringify(heroSelector)})?.naturalWidth > 0),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  })`));
}

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 900 });

await navigate('http://localhost:4321/en/');
const home = JSON.parse(await evaluate(`JSON.stringify((() => {
  const track = document.querySelector('.brand-track');
  const whyCards = [...document.querySelectorAll('.reason-item')];
  return {
    hero: document.querySelector('.hero h1')?.textContent?.trim(),
    ctas: [...document.querySelectorAll('.hero-actions a')].map((node) => node.textContent.trim()),
    brandLabel: document.querySelector('.brand-band__intro > span')?.textContent?.trim(),
    brandHeadline: document.querySelector('.brand-band__intro h2')?.textContent?.trim(),
    brandCopy: document.querySelector('.brand-band__intro p')?.textContent?.trim(),
    logoGroups: document.querySelectorAll('.brand-group').length,
    logosPerGroup: [...document.querySelectorAll('.brand-group')].map((group) => group.children.length),
    logoBackgrounds: [...document.querySelectorAll('.brand-group li')].slice(0, 9).map((node) => getComputedStyle(node).backgroundColor),
    marqueeAnimation: track ? { name: getComputedStyle(track).animationName, duration: getComputedStyle(track).animationDuration } : null,
    servicesBackground: getComputedStyle(document.querySelector('.services-section')).backgroundImage,
    servicesTitle: document.querySelector('#services-title')?.textContent?.trim(),
    whyTitle: document.querySelector('#why-title')?.textContent?.trim(),
    whyPosition: getComputedStyle(document.querySelector('.why-intro')).position,
    whyHeights: whyCards.map((node) => Math.round(node.getBoundingClientRect().height)),
    trailingHeadlinePeriods: [...document.querySelectorAll('h1,h2,h3')].map((node) => node.textContent.trim()).filter((text) => text.endsWith('.')),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
})())`));

await evaluate(`document.querySelector('.services-section').scrollIntoView({block:'start'}); true`);
await pause(750);
await screenshot('v5-home-services.png');
const serviceRect = JSON.parse(await evaluate(`JSON.stringify((() => { const rect = document.querySelector('.service-panel').getBoundingClientRect(); return { x:rect.x, y:rect.y, width:rect.width, height:rect.height }; })())`));
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: serviceRect.x + serviceRect.width / 2, y: serviceRect.y + serviceRect.height / 2 });
await pause(650);
const serviceHover = JSON.parse(await evaluate(`JSON.stringify({
  clipPath: getComputedStyle(document.querySelector('.service-panel .service-media')).clipPath,
  imageLoaded: Boolean(document.querySelector('.service-panel img')?.complete && document.querySelector('.service-panel img')?.naturalWidth > 0),
  lazyState: document.querySelector('.service-panel img')?.dataset.lazyState
})`));

await evaluate(`document.querySelector('.why-kultivate').scrollIntoView({block:'start'}); true`);
await pause(700);
const whyBefore = JSON.parse(await evaluate(`JSON.stringify((() => { const intro=document.querySelector('.why-intro'); const card=document.querySelector('.reason-item'); const rect=card.getBoundingClientRect(); return { introTop:Math.round(intro.getBoundingClientRect().top), cardTop:Math.round(rect.top), cardHeight:Math.round(rect.height), rect:{x:rect.x,y:rect.y,width:rect.width,height:rect.height} }; })())`));
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: whyBefore.rect.x + whyBefore.rect.width / 2, y: Math.min(whyBefore.rect.y + whyBefore.rect.height / 2, 850) });
await pause(650);
const whyHover = JSON.parse(await evaluate(`JSON.stringify({
  height: Math.round(document.querySelector('.reason-item').getBoundingClientRect().height),
  imageOpacity: getComputedStyle(document.querySelector('.reason-item img')).opacity
})`));
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 20, y: 20 });
await evaluate(`window.scrollBy({top:360,behavior:'instant'}); true`);
await pause(350);
const whyAfter = JSON.parse(await evaluate(`JSON.stringify({
  introTop: Math.round(document.querySelector('.why-intro').getBoundingClientRect().top),
  cardTop: Math.round(document.querySelector('.reason-item').getBoundingClientRect().top)
})`));
await screenshot('v5-home-why.png');

await navigate('http://localhost:4321/en/services/');
const services = JSON.parse(await evaluate(`JSON.stringify({
  h1: document.querySelector('h1')?.textContent?.trim(),
  meta: [...document.querySelectorAll('.service-row__meta')].map((node) => node.textContent.trim()),
  results: [...document.querySelectorAll('.service-row__copy h3')].map((node) => ({ text:node.textContent.trim(), length:node.textContent.trim().length, width:Math.round(node.getBoundingClientRect().width) })),
  descriptions: [...document.querySelectorAll('.service-row__copy > p')].map((node) => ({ text:node.textContent.trim(), length:node.textContent.trim().length })),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
})`));
await screenshot('v5-services-hero.png');

await navigate('http://localhost:4321/en/about/');
const about = JSON.parse(await evaluate(`JSON.stringify({
  h1: document.querySelector('h1')?.textContent?.trim(),
  heroImage: document.querySelector('.about-hero > img')?.getAttribute('src'),
  heroLoaded: Boolean(document.querySelector('.about-hero > img')?.complete && document.querySelector('.about-hero > img')?.naturalWidth > 0),
  journeySteps: [...document.querySelectorAll('.journey-steps h3')].map((node) => node.textContent.trim()),
  literalLabels: [...document.querySelectorAll('body *')].map((node) => node.childElementCount === 0 ? node.textContent.trim() : '').filter((text) => ['Our vision','Our essence','How we work'].includes(text)),
  teamCount: document.querySelectorAll('.team-grid .person').length,
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
})`));
await evaluate(`document.querySelector('.about-culture').scrollIntoView({block:'start'}); true`);
await pause(850);
await screenshot('v5-about-culture.png');

await navigate('http://localhost:4321/en/insights/');
const blog = JSON.parse(await evaluate(`JSON.stringify((() => {
  const featured=document.querySelector('.featured-block');
  const top=document.querySelector('.top-stories');
  const archive=document.querySelector('.archive-block');
  return {
    h1:document.querySelector('h1')?.textContent?.trim(),
    heroImage:document.querySelector('.blog-hero > img')?.getAttribute('src'),
    featured:document.querySelector('#featured-title')?.textContent?.trim(),
    topStories:document.querySelectorAll('.top-grid > a').length,
    archiveStories:document.querySelectorAll('.archive-card').length,
    featuredToTopGap:Math.round(top.getBoundingClientRect().top-featured.getBoundingClientRect().bottom),
    topToArchiveGap:archive ? Math.round(archive.getBoundingClientRect().top-top.getBoundingClientRect().bottom) : null,
    overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth
  };
})())`));
await evaluate(`document.querySelector('.featured-block').scrollIntoView({block:'start'}); true`);
await pause(650);
await screenshot('v5-blog-featured.png');

const interiorPages = {};
for (const [name, url, selector] of [
  ['work','http://localhost:4321/en/work/','.interior-hero__image'],
  ['contact','http://localhost:4321/en/contact/','.interior-hero__image'],
  ['privacy','http://localhost:4321/en/privacy/','.interior-hero__image'],
  ['serviceDetail','http://localhost:4321/en/services/seo/','.service-hero > img']
]) interiorPages[name] = await inspectPage(url, selector);

await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true, screenWidth: 390, screenHeight: 844 });
const mobile = {};
for (const [name, url] of [
  ['home','http://localhost:4321/en/'],
  ['services','http://localhost:4321/en/services/'],
  ['about','http://localhost:4321/en/about/'],
  ['blog','http://localhost:4321/en/insights/']
]) {
  await navigate(url);
  mobile[name] = JSON.parse(await evaluate(`JSON.stringify({
    h1: document.querySelector('h1')?.textContent?.trim(),
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    overflow: document.documentElement.scrollWidth-document.documentElement.clientWidth
  })`));
}

console.log(JSON.stringify({ home, serviceHover, whyBefore, whyHover, whyAfter, services, about, blog, interiorPages, mobile }, null, 2));
socket.close();
