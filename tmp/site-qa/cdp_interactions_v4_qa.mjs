const targets = await fetch('http://localhost:9222/json').then((response) => response.json());
const target = targets.find((item) => item.type === 'page');
if (!target) throw new Error('No browser page target is available');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });

let id = 0;
const pending = new Map();
const waiters = new Map();
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const item = pending.get(message.id);
    pending.delete(message.id);
    message.error ? item.reject(new Error(message.error.message)) : item.resolve(message.result);
  }
  for (const resolve of waiters.get(message.method) ?? []) resolve(message.params);
  waiters.delete(message.method);
});
const send = (method, params = {}) => new Promise((resolve, reject) => { const requestId = ++id; pending.set(requestId, { resolve, reject }); socket.send(JSON.stringify({ id: requestId, method, params })); });
const once = (method) => new Promise((resolve) => waiters.set(method, [...(waiters.get(method) ?? []), resolve]));
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
const pause = (duration) => new Promise((resolve) => setTimeout(resolve, duration));
const navigate = async (url) => { const loaded = once('Page.loadEventFired'); await send('Page.navigate', { url }); await loaded; await pause(700); };

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false, screenWidth: 1440, screenHeight: 900 });

await navigate('http://localhost:4321/en/');
await evaluate(`document.querySelector('.services-section').scrollIntoView({block:'start'}); true`);
await pause(900);
const serviceRect = JSON.parse(await evaluate(`JSON.stringify((() => { const rect = document.querySelector('.service-panel').getBoundingClientRect(); return { x: rect.x, y: rect.y, width: rect.width, height: rect.height }; })())`));
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: serviceRect.x + serviceRect.width / 2, y: serviceRect.y + serviceRect.height / 2 });
await pause(650);
const serviceHover = JSON.parse(await evaluate(`JSON.stringify({
  image: document.querySelector('.service-panel img')?.getAttribute('src'),
  imageLoaded: Boolean(document.querySelector('.service-panel img')?.complete && document.querySelector('.service-panel img')?.naturalWidth > 0),
  lazyState: document.querySelector('.service-panel img')?.dataset.lazyState,
  clipPath: getComputedStyle(document.querySelector('.service-panel .service-media')).clipPath
})`));

await evaluate(`document.querySelector('.why-kultivate').scrollIntoView({block:'start'}); true`);
await pause(900);
const whyBefore = JSON.parse(await evaluate(`JSON.stringify((() => { const intro = document.querySelector('.why-intro'); const card = document.querySelector('.reason-item'); const heading = document.querySelector('#why-title'); const style = getComputedStyle(heading); return { introTop: Math.round(intro.getBoundingClientRect().top), cardTop: Math.round(card.getBoundingClientRect().top), lines: Math.round(heading.getBoundingClientRect().height / parseFloat(style.lineHeight)) }; })())`));
await evaluate(`window.scrollBy({top:520,behavior:'instant'}); true`);
await pause(400);
const whyAfter = JSON.parse(await evaluate(`JSON.stringify((() => { const intro = document.querySelector('.why-intro'); const card = document.querySelector('.reason-item'); return { introTop: Math.round(intro.getBoundingClientRect().top), cardTop: Math.round(card.getBoundingClientRect().top), imageOpacity: getComputedStyle(card.querySelector('img')).opacity, lazyState: card.querySelector('img').dataset.lazyState }; })())`));

await navigate('http://localhost:4321/en/about/');
await evaluate(`document.querySelector('.team-section').scrollIntoView({block:'start'}); true`);
await pause(1100);
const teamLazy = JSON.parse(await evaluate(`JSON.stringify([...document.querySelectorAll('.team-grid img')].map((image) => ({ complete: image.complete && image.naturalWidth > 0, state: image.dataset.lazyState })))`));

console.log(JSON.stringify({ serviceHover, whyBefore, whyAfter, teamLazy }, null, 2));
socket.close();
