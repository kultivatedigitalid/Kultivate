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

await navigate('http://127.0.0.1:4322/en/services/');
await evaluate(`document.querySelector('#website-growth-roadmap')?.scrollIntoView({ block: 'start' })`);
await evaluate(`new Promise((resolve) => {
  const started = performance.now();
  const check = () => {
    const load = document.querySelector('[data-service-quiz]')?.getAttribute('data-load-state');
    if (load !== 'pending' || performance.now() - started > 5000) resolve(load);
    else setTimeout(check, 80);
  };
  check();
})`);
await delay(700);
const roadmapIntro = await evaluate(`(() => {
  const roadmap = document.querySelector('.roadmap');
  const intro = document.querySelector('.quiz-intro');
  const backdrop = roadmap ? getComputedStyle(roadmap, '::before') : null;
  const introStyle = intro ? getComputedStyle(intro) : null;
  return {
    backdropOpacity: backdrop?.opacity,
    backdropImage: backdrop?.backgroundImage,
    introBackground: introStyle?.backgroundColor,
    introBackgroundImage: introStyle?.backgroundImage,
    introRadius: introStyle?.borderRadius,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth
  };
})()`);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/roadmap-background-only.png');
await evaluate(`document.querySelector('[data-quiz-start]')?.click()`);
await delay(900);
const roadmapQuestions = await evaluate(`(() => {
  const roadmap = document.querySelector('.roadmap');
  return {
    backdropOpacity: roadmap ? getComputedStyle(roadmap, '::before').opacity : null,
    introHidden: document.querySelector('.quiz-intro')?.hidden,
    questionsHidden: document.querySelector('.quiz-questions')?.hidden
  };
})()`);

await navigate('http://127.0.0.1:4322/en/contact/');
const contactInfo = await evaluate(`(() => {
  const card = document.querySelector('.info-card');
  const office = document.querySelector('.office-card');
  const link = document.querySelector('.contact-link-item');
  const cardStyle = card ? getComputedStyle(card) : null;
  const officeStyle = office ? getComputedStyle(office) : null;
  const linkStyle = link ? getComputedStyle(link) : null;
  return {
    cardBackground: cardStyle?.backgroundColor,
    cardPadding: cardStyle?.padding,
    cardRadius: cardStyle?.borderRadius,
    cardBorder: cardStyle?.borderTopWidth,
    officeBackground: officeStyle?.backgroundColor,
    officeBorder: officeStyle?.borderTopWidth,
    linkBackground: linkStyle?.backgroundColor,
    linkBorder: linkStyle?.borderTopWidth,
    linkMinHeight: linkStyle?.minHeight,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth
  };
})()`);
await evaluate(`document.querySelector('.contact-info-col')?.scrollIntoView({ block: 'center' })`);
await delay(500);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/contact-info-open-borderless.png');

await send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844
});
await navigate('http://127.0.0.1:4322/en/contact/');
const mobile = await evaluate(`({
  horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
  cardBackground: getComputedStyle(document.querySelector('.info-card')).backgroundColor,
  linkMinHeight: getComputedStyle(document.querySelector('.contact-link-item')).minHeight
})`);

console.log(JSON.stringify({ roadmapIntro, roadmapQuestions, contactInfo, mobile, exceptions }, null, 2));
socket.close();
