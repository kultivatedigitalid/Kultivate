import fs from 'node:fs/promises';

const targets = await fetch('http://localhost:9222/json').then((response) => response.json());
const target = targets.find((item) => item.type === 'page');
if (!target) throw new Error('No browser page target is available.');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let nextId = 0;
const pending = new Map();
const eventWaiters = new Map();
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const item = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) item.reject(new Error(message.error.message));
    else item.resolve(message.result);
    return;
  }
  for (const resolve of eventWaiters.get(message.method) ?? []) resolve(message.params);
  eventWaiters.delete(message.method);
});
function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}
function once(method) {
  return new Promise((resolve) => eventWaiters.set(method, [...(eventWaiters.get(method) ?? []), resolve]));
}
async function navigate(url) {
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url });
  await loaded;
  await new Promise((resolve) => setTimeout(resolve, 900));
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return result.result.value;
}

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 900 });

await navigate('http://localhost:4321/en/about/');
await evaluate(`document.querySelector('.team-section')?.scrollIntoView({ block: 'start' }); true`);
await new Promise((resolve) => setTimeout(resolve, 1200));
const teamMetrics = JSON.parse(await evaluate(`JSON.stringify({
  members: [...document.querySelectorAll('.team-grid .person')].map((person) => ({
    name: person.querySelector('h3')?.textContent?.trim(),
    role: person.querySelector('p')?.textContent?.trim(),
    loaded: Boolean(person.querySelector('img')?.complete && person.querySelector('img')?.naturalWidth > 0),
    loading: person.querySelector('img')?.getAttribute('loading')
  })),
  heading: document.querySelector('#team-title')?.textContent?.trim()
})`));
const teamShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
await fs.writeFile('cdp-en-about-team.png', Buffer.from(teamShot.data, 'base64'));

await navigate('http://localhost:4321/en/services/');
const serviceMetrics = JSON.parse(await evaluate(`JSON.stringify({
  heading: document.querySelector('h1')?.textContent?.trim(),
  serviceNames: [...document.querySelectorAll('main h2, main h3')].map((item) => item.textContent.trim()).filter((text) => ['SEO','AEO & GEO','Web Services','Content Management'].includes(text)),
  hasCould: /\\bcould\\b/i.test(document.body.innerText),
  legacyPositioning: /Social Media Management|SEO AGENCY IN INDONESIA|See our SEO system/i.test(document.body.innerText)
})`));

await navigate('http://localhost:4321/en/');
const homeMetrics = JSON.parse(await evaluate(`JSON.stringify({
  title: document.querySelector('.hero h1')?.textContent?.trim(),
  heroCtas: [...document.querySelectorAll('.hero-actions a')].map((item) => item.textContent.trim()),
  sectionOrder: [...document.querySelectorAll('main > *')].map((item) => item.className || item.tagName),
  hasCould: /\\bcould\\b/i.test(document.body.innerText),
  hasRemovedLabel: /SEO AGENCY IN INDONESIA/i.test(document.body.innerText)
})`));

console.log(JSON.stringify({ teamMetrics, serviceMetrics, homeMetrics }, null, 2));
socket.close();
