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
const events = new Map();

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
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

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844,
});

const loaded = once('Page.loadEventFired');
await send('Page.navigate', { url: 'http://localhost:4321/en/' });
await loaded;
await new Promise((resolve) => setTimeout(resolve, 1200));

const metrics = await send('Runtime.evaluate', {
  returnByValue: true,
  expression: `JSON.stringify((() => {
    const heading = document.querySelector('.hero h1')?.getBoundingClientRect();
    const body = document.querySelector('.hero-content > p')?.getBoundingClientRect();
    const actions = document.querySelector('.hero-actions')?.getBoundingClientRect();
    return {
      innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      heading: heading && { left: heading.left, right: heading.right, width: heading.width },
      body: body && { left: body.left, right: body.right, width: body.width },
      actions: actions && { left: actions.left, right: actions.right, width: actions.width },
      title: document.querySelector('.hero h1')?.textContent?.trim(),
      ctas: [...document.querySelectorAll('.hero-actions a')].map((item) => item.textContent.trim()),
    };
  })())`,
});

const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
await fs.writeFile('cdp-en-home-mobile.png', Buffer.from(screenshot.data, 'base64'));
console.log(metrics.result.value);
socket.close();
