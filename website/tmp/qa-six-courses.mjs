import { writeFile } from 'node:fs/promises';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const oldResourceStatus = await fetch('http://localhost:4321/id/learn/resources/search-priority-map/').then((response) => response.status);
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

const navigate = async (url, wait = 1100) => {
  await send('Page.navigate', { url });
  await delay(wait);
};

const screenshot = async (path) => {
  const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(path, Buffer.from(result.data, 'base64'));
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

await navigate('http://localhost:4321/id/learn/');
const indexDesktop = await evaluate(`({
  cards: document.querySelectorAll('.learn-series-card').length,
  courseHrefs: Array.from(document.querySelectorAll('.learn-series-card > a')).map((link) => link.getAttribute('href')),
  roadmapCount: document.querySelectorAll('[data-service-quiz]').length,
  roadmapOrigin: document.querySelector('[data-service-quiz]')?.getAttribute('data-origin'),
  worksheetLinks: document.querySelectorAll('a[href*="/learn/resources/"]').length,
  horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
})`);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/six-courses-index-desktop.png');

await navigate('http://localhost:4321/id/learn/seo-business-growth/');
const courseInitial = await evaluate(`({
  moduleButtons: document.querySelectorAll('[data-lesson-select]').length,
  lessonPanels: document.querySelectorAll('[data-lesson-panel]').length,
  videoPlaceholders: document.querySelectorAll('.lesson-card__graphic').length,
  visiblePanels: Array.from(document.querySelectorAll('[data-lesson-panel]')).filter((panel) => !panel.hidden).length,
  completeButtons: document.querySelectorAll('[data-lesson-complete]').length,
  roadmapOrigin: document.querySelector('[data-service-quiz]')?.getAttribute('data-origin'),
  roadmapSeries: document.querySelector('[data-service-quiz]')?.getAttribute('data-series-id'),
  worksheetSections: document.querySelectorAll('.learn-resource, [data-learning-resource]').length
})`);
await evaluate(`document.querySelector('[data-lesson-panel]:not([hidden]) [data-lesson-complete]')?.click()`);
await delay(150);
const progress = await evaluate(`({
  count: document.querySelector('[data-learn-progress-count]')?.textContent.trim(),
  pressed: document.querySelector('[data-lesson-panel]:not([hidden]) [data-lesson-complete]')?.getAttribute('aria-pressed')
})`);
await evaluate(`document.querySelector('[data-lesson-panel]:not([hidden]) [data-step-direction="next"]')?.click()`);
await delay(150);
const navigation = await evaluate(`({
  hash: location.hash,
  visibleLesson: document.querySelector('[data-lesson-panel]:not([hidden])')?.getAttribute('data-lesson-panel')
})`);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/six-courses-course-desktop.png');

await evaluate(`window.__learnEvents = []; window.addEventListener('kultivate:funnel', (event) => window.__learnEvents.push(event.detail)); document.querySelector('[data-quiz-start]')?.click()`);
await delay(700);
const roadmapStart = await evaluate(`({ state: document.querySelector('[data-service-quiz]')?.getAttribute('data-quiz-state'), events: window.__learnEvents })`);

await navigate('http://localhost:4321/en/learn/');
const englishIndex = await evaluate(`({
  cards: document.querySelectorAll('.learn-series-card').length,
  firstTitle: document.querySelector('.learn-series-card h3')?.textContent.trim(),
  roadmapOrigin: document.querySelector('[data-service-quiz]')?.getAttribute('data-origin')
})`);

await send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844,
});
await navigate('http://localhost:4321/id/learn/');
const indexMobile = await evaluate(`({
  width: window.innerWidth,
  cards: document.querySelectorAll('.learn-series-card').length,
  horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
  heroWidth: document.querySelector('h1')?.getBoundingClientRect().width
})`);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/six-courses-index-mobile.png');

console.log(JSON.stringify({ oldResourceStatus, indexDesktop, courseInitial, progress, navigation, roadmapStart, englishIndex, indexMobile, exceptions }, null, 2));
socket.close();
