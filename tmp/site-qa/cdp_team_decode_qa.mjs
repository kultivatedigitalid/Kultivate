import fs from 'node:fs/promises';

const target = (await fetch('http://localhost:9222/json').then((response) => response.json())).find((item) => item.type === 'page');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});
let nextId = 0;
const pending = new Map();
const waiters = new Map();
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (pending.has(message.id)) {
    const item = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) item.reject(new Error(message.error.message));
    else item.resolve(message.result);
    return;
  }
  for (const resolve of waiters.get(message.method) ?? []) resolve(message.params);
  waiters.delete(message.method);
});
function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}
function once(method) {
  return new Promise((resolve) => waiters.set(method, [...(waiters.get(method) ?? []), resolve]));
}
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 900 });
const loaded = once('Page.loadEventFired');
await send('Page.navigate', { url: 'http://localhost:4321/en/about/' });
await loaded;
const result = await send('Runtime.evaluate', {
  awaitPromise: true,
  returnByValue: true,
  expression: `(async () => {
    document.querySelector('.team-section')?.scrollIntoView({ block: 'start' });
    const images = [...document.querySelectorAll('.team-grid img')];
    await Promise.all(images.map((image) => image.decode().catch(() => null)));
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return images.map((image) => {
      const style = getComputedStyle(image);
      const rect = image.getBoundingClientRect();
      return { alt: image.alt, currentSrc: image.currentSrc, complete: image.complete, naturalWidth: image.naturalWidth, opacity: style.opacity, visibility: style.visibility, display: style.display, rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height } };
    });
  })()`,
});
const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false, fromSurface: true });
await fs.writeFile('cdp-en-about-team-decoded.png', Buffer.from(screenshot.data, 'base64'));
console.log(JSON.stringify(result.result.value, null, 2));
socket.close();
