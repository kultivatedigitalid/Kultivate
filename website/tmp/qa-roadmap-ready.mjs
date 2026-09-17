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
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'http://localhost:4321/en/services/' });
await delay(1800);
await evaluate(`document.querySelector('#website-growth-roadmap')?.scrollIntoView({ block: 'start' })`);
await delay(350);
const before = await evaluate(`({
  load: document.querySelector('[data-service-quiz]')?.getAttribute('data-load-state'),
  state: document.querySelector('[data-service-quiz]')?.getAttribute('data-quiz-state')
})`);
await evaluate(`document.querySelector('[data-quiz-start]')?.click()`);
await delay(1100);
const after = await evaluate(`({
  load: document.querySelector('[data-service-quiz]')?.getAttribute('data-load-state'),
  state: document.querySelector('[data-service-quiz]')?.getAttribute('data-quiz-state'),
  questionHidden: document.querySelector('.quiz-questions')?.hidden,
  question: document.querySelector('.question-panel:not([hidden]) legend')?.textContent.trim()
})`);
const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
await writeFile('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/roadmap-questions-ready.png', Buffer.from(result.data, 'base64'));
console.log(JSON.stringify({ before, after }, null, 2));
socket.close();
