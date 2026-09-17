import { writeFile } from 'node:fs/promises';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const target = await fetch('http://127.0.0.1:9224/json/new?about:blank', { method: 'PUT' }).then((response) => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let messageId = 0;
const pending = new Map();
const exceptions = [];
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text);
  if (!message.id || !pending.has(message.id)) return;
  const entry = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) entry.reject(new Error(message.error.message));
  else entry.resolve(message.result);
});

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++messageId;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const navigate = async (url) => {
  await send('Page.navigate', { url });
  await delay(1000);
};
const screenshot = async (path) => {
  const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(path, Buffer.from(result.data, 'base64'));
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

await navigate('http://localhost:4321/en/services/');
await evaluate(`document.querySelector('[data-quiz-start]')?.click()`);
await delay(600);
await evaluate(`document.querySelector('#website-growth-roadmap')?.scrollIntoView({ block: 'start' })`);
await delay(250);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/roadmap-questions-light-detail.png');

await navigate('http://localhost:4321/en/learn/seo-business-growth/#lesson-measure-seo-beyond-rankings');
await evaluate(`document.querySelector('.learn-roadmap-cta')?.scrollIntoView({ block: 'center' })`);
await delay(180);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/learn-final-lesson-roadmap-cta.png');

await send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844
});
await navigate('http://localhost:4321/en/learn/seo-business-growth/');
const mobileInitial = await evaluate(`({
  firstVisibleSection: document.elementFromPoint(195, 150)?.closest('.learn-player, .learn-modules')?.className,
  videoTop: document.querySelector('.lesson-card__visual')?.getBoundingClientRect().top,
  modulesTop: document.querySelector('.learn-modules')?.getBoundingClientRect().top,
  horizontalOverflow: document.documentElement.scrollWidth > innerWidth
})`);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/learn-course-video-first-mobile.png');

await evaluate(`document.querySelector('[data-lesson-select="map-demand-before-keywords"]')?.click()`);
await delay(850);
const mobileNavigation = await evaluate(`({
  hash: location.hash,
  visibleLesson: document.querySelector('[data-lesson-panel]:not([hidden])')?.getAttribute('data-lesson-panel'),
  playerTop: Math.round(document.querySelector('.learn-player')?.getBoundingClientRect().top ?? -999)
})`);

console.log(JSON.stringify({ mobileInitial, mobileNavigation, exceptions }, null, 2));
socket.close();
