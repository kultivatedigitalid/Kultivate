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
  if (message.method === 'Runtime.exceptionThrown') {
    exceptions.push(message.params.exceptionDetails.exception?.description ?? message.params.exceptionDetails.text);
  }
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
const navigate = async (url, wait = 1200) => {
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

await navigate('http://localhost:4322/en/learn/seo-business-growth/');
const beforeSwitch = await evaluate(`({
  lesson: document.querySelector('[data-lesson-panel]:not([hidden])')?.getAttribute('data-lesson-panel'),
  controlsBorder: getComputedStyle(document.querySelector('.learn-player__controls')).borderTopWidth,
  relatedBorder: getComputedStyle(document.querySelector('.learn-related__layout')).borderTopWidth,
  learnSurface: getComputedStyle(document.querySelector('.learn-series-page')).backgroundImage,
  learnCtaClass: document.querySelector('.final-cta')?.className,
  learnCtaSurface: getComputedStyle(document.querySelector('.final-cta')).backgroundImage,
  footerSurface: getComputedStyle(document.querySelector('.footer')).backgroundImage,
  horizontalOverflow: document.documentElement.scrollWidth > innerWidth
})`);
await evaluate(`document.querySelector('[data-lesson-select="map-demand-before-keywords"]')?.click()`);
await delay(60);
const duringSwitch = await evaluate(`({
  lesson: document.querySelector('[data-lesson-panel]:not([hidden])')?.getAttribute('data-lesson-panel'),
  playerAnimations: document.querySelector('.learn-player')?.getAnimations().map((animation) => animation.playState),
  panelAnimations: document.querySelector('[data-lesson-panel]:not([hidden])')?.getAnimations().map((animation) => animation.playState),
  hash: location.hash
})`);
await delay(650);
const afterSwitch = await evaluate(`({
  lesson: document.querySelector('[data-lesson-panel]:not([hidden])')?.getAttribute('data-lesson-panel'),
  playerInlineHeight: document.querySelector('.learn-player')?.style.height,
  playerAnimations: document.querySelector('.learn-player')?.getAnimations().length,
  panelAnimations: document.querySelector('[data-lesson-panel]:not([hidden])')?.getAnimations().length
})`);
await evaluate(`document.querySelector('.final-cta')?.scrollIntoView({ block: 'start' })`);
await delay(180);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/learn-footer-seam-desktop.png');

await navigate('http://localhost:4322/en/services/');
await evaluate(`document.querySelector('#website-growth-roadmap')?.scrollIntoView({ block: 'start' })`);
await delay(500);
const roadmapIntro = await evaluate(`({
  load: document.querySelector('[data-service-quiz]')?.getAttribute('data-load-state'),
  background: getComputedStyle(document.querySelector('.quiz-intro')).backgroundColor,
  radius: getComputedStyle(document.querySelector('.quiz-intro')).borderRadius,
  headingColor: getComputedStyle(document.querySelector('.quiz-intro h2')).color,
  buttonBackground: getComputedStyle(document.querySelector('.quiz-intro .btn')).backgroundColor,
  buttonBorder: getComputedStyle(document.querySelector('.quiz-intro .btn')).borderTopWidth
})`);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/roadmap-intro-soft-white.png');

await navigate('http://localhost:4322/en/contact/');
const contact = await evaluate(`(() => {
  const field = document.querySelector('.form-input');
  const wrapper = document.querySelector('.contact-form-col');
  const fieldStyle = getComputedStyle(field);
  const wrapperStyle = getComputedStyle(wrapper);
  return {
    fieldBorders: [fieldStyle.borderTopWidth, fieldStyle.borderRightWidth, fieldStyle.borderBottomWidth, fieldStyle.borderLeftWidth],
    fieldRadius: fieldStyle.borderRadius,
    fieldBackground: fieldStyle.backgroundColor,
    wrapperBackground: wrapperStyle.backgroundColor,
    wrapperPadding: wrapperStyle.padding,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth
  };
})()`);
await evaluate(`document.querySelector('.contact-form')?.scrollIntoView({ block: 'center' })`);
await delay(120);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/contact-borderless-rounded.png');

await send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844
});
await navigate('http://localhost:4322/en/learn/seo-business-growth/');
await evaluate(`document.querySelector('[data-lesson-select="map-demand-before-keywords"]')?.click()`);
await delay(60);
const mobileDuringSwitch = await evaluate(`({
  panelAnimations: document.querySelector('[data-lesson-panel]:not([hidden])')?.getAnimations().map((animation) => animation.playState),
  horizontalOverflow: document.documentElement.scrollWidth > innerWidth
})`);
await delay(650);
const mobileAfterSwitch = await evaluate(`({
  lesson: document.querySelector('[data-lesson-panel]:not([hidden])')?.getAttribute('data-lesson-panel'),
  playerTop: Math.round(document.querySelector('.learn-player')?.getBoundingClientRect().top ?? -999),
  horizontalOverflow: document.documentElement.scrollWidth > innerWidth
})`);

console.log(JSON.stringify({ beforeSwitch, duringSwitch, afterSwitch, roadmapIntro, contact, mobileDuringSwitch, mobileAfterSwitch, exceptions }, null, 2));
socket.close();
