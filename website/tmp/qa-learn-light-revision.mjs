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

const navigate = async (url, wait = 1000) => {
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
const learnIndex = await evaluate(`({
  courses: document.querySelectorAll('.learn-series-card').length,
  roadmapCount: document.querySelectorAll('[data-service-quiz]').length,
  finalCtaCount: document.querySelectorAll('.final-cta').length,
  finalCtaTitle: document.querySelector('.final-cta h2')?.textContent.trim(),
  horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
})`);

await navigate('http://localhost:4321/en/learn/seo-business-growth/');
const courseInitial = await evaluate(`(() => {
  const back = document.querySelector('.learn-player__topbar a')?.getBoundingClientRect();
  const video = document.querySelector('[data-lesson-panel]:not([hidden]) .lesson-card__visual')?.getBoundingClientRect();
  const rootStyle = getComputedStyle(document.querySelector('.learn-series-page'));
  return {
    modules: document.querySelectorAll('[data-lesson-select]').length,
    placeholders: document.querySelectorAll('.lesson-card__graphic').length,
    playerIntroCount: document.querySelectorAll('.learn-player__intro').length,
    playerH1Count: document.querySelectorAll('.learn-player > h1, .learn-player header h1').length,
    sidebarH1: document.querySelector('.learn-modules h1')?.textContent.trim(),
    backAboveVideo: Boolean(back && video && back.bottom <= video.top + 1),
    backRightAligned: Boolean(back && video && Math.abs(back.right - video.right) < 3),
    roadmapCount: document.querySelectorAll('[data-service-quiz]').length,
    finalCtaCount: document.querySelectorAll('.final-cta').length,
    backgroundImage: rootStyle.backgroundImage,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
  };
})()`);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/learn-course-light-desktop.png');

await evaluate(`document.querySelector('[data-lesson-select="measure-seo-beyond-rankings"]')?.click()`);
await delay(180);
const finalLesson = await evaluate(`({
  visibleLesson: document.querySelector('[data-lesson-panel]:not([hidden])')?.getAttribute('data-lesson-panel'),
  roadmapCtaVisible: Boolean(document.querySelector('[data-lesson-panel]:not([hidden]) .learn-roadmap-cta')),
  roadmapHref: document.querySelector('[data-lesson-panel]:not([hidden]) [data-learn-roadmap-link]')?.getAttribute('href'),
  inlineRoadmapCount: document.querySelectorAll('[data-service-quiz]').length
})`);

await navigate('http://localhost:4321/en/services/');
await evaluate(`document.querySelector('[data-quiz-start]')?.click()`);
await delay(620);
const roadmapQuestions = await evaluate(`(() => {
  const questions = document.querySelector('.quiz-questions');
  const style = questions ? getComputedStyle(questions) : null;
  return {
    state: document.querySelector('[data-service-quiz]')?.getAttribute('data-quiz-state'),
    background: style?.backgroundColor,
    radius: style?.borderRadius,
    visibleQuestion: document.querySelector('.question-panel:not([hidden]) legend')?.textContent.trim(),
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
  };
})()`);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/roadmap-questions-light.png');

await navigate('http://localhost:4321/en/contact/');
const contactForm = await evaluate(`(() => {
  const input = document.querySelector('.form-input');
  const fieldStyle = input ? getComputedStyle(input) : null;
  const wrapper = document.querySelector('.contact-form-col');
  const wrapperStyle = wrapper ? getComputedStyle(wrapper) : null;
  return {
    borderTop: fieldStyle?.borderTopWidth,
    borderBottom: fieldStyle?.borderBottomWidth,
    radius: fieldStyle?.borderRadius,
    background: fieldStyle?.backgroundColor,
    wrapperRadius: wrapperStyle?.borderRadius,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
  };
})()`);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/contact-borderless-desktop.png');

await send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844
});
await navigate('http://localhost:4321/id/learn/seo-business-growth/');
const courseMobile = await evaluate(`({
  width: innerWidth,
  horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
  backVisible: Boolean(document.querySelector('.learn-player__topbar a')),
  placeholderVisible: Boolean(document.querySelector('[data-lesson-panel]:not([hidden]) .lesson-card__graphic')),
  finalCtaCount: document.querySelectorAll('.final-cta').length
})`);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/learn-course-light-mobile.png');

console.log(JSON.stringify({ learnIndex, courseInitial, finalLesson, roadmapQuestions, contactForm, courseMobile, exceptions }, null, 2));
socket.close();
