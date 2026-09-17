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
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
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
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  return result.result.value;
};
const navigate = async (url) => {
  await send('Page.navigate', { url });
  await delay(1400);
};
const screenshot = async (path) => {
  const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(path, Buffer.from(result.data, 'base64'));
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

await navigate('http://localhost:4322/en/learn/seo-business-growth/');
await evaluate(`document.querySelector('.final-cta')?.scrollIntoView({ block: 'start' })`);
await delay(1200);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/learn-footer-seam-final.png');

await navigate('http://localhost:4322/en/services/');
await evaluate(`document.querySelector('#website-growth-roadmap')?.scrollIntoView({ block: 'start' })`);
const roadmapState = await evaluate(`new Promise((resolve) => {
  const started = performance.now();
  const check = () => {
    const load = document.querySelector('[data-service-quiz]')?.getAttribute('data-load-state');
    if (load !== 'pending' || performance.now() - started > 5000) {
      resolve({ load, state: document.querySelector('[data-service-quiz]')?.getAttribute('data-quiz-state') });
      return;
    }
    setTimeout(check, 80);
  };
  check();
})`);
await delay(500);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/roadmap-intro-soft-white-ready.png');

console.log(JSON.stringify({ roadmapState }, null, 2));
socket.close();
