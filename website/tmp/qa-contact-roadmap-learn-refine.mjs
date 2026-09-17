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
const navigate = async (url, wait = 1500) => {
  await send('Page.navigate', { url });
  await delay(wait);
};
const screenshot = async (path) => {
  const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(path, Buffer.from(result.data, 'base64'));
};

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1260, height: 628, deviceScaleFactor: 1, mobile: false });

await navigate('http://127.0.0.1:4322/en/learn/seo-business-growth/');
const learn = await evaluate(`(() => {
  const header = document.querySelector('.site-header, header');
  const modules = document.querySelector('.learn-modules');
  const video = document.querySelector('.lesson-card__visual');
  const headerRect = header?.getBoundingClientRect();
  const modulesRect = modules?.getBoundingClientRect();
  const videoRect = video?.getBoundingClientRect();
  return {
    headerBottom: Math.round(headerRect?.bottom ?? -1),
    contentsTop: Math.round(modulesRect?.top ?? -1),
    gapAfterHeader: Math.round((modulesRect?.top ?? 0) - (headerRect?.bottom ?? 0)),
    videoTop: Math.round(videoRect?.top ?? -1),
    videoBottom: Math.round(videoRect?.bottom ?? -1),
    viewportHeight: innerHeight,
    videoFullyVisible: Boolean(videoRect && videoRect.top >= (headerRect?.bottom ?? 0) && videoRect.bottom <= innerHeight),
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth
  };
})()`);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/learn-compact-above-fold.png');

await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await navigate('http://127.0.0.1:4322/en/services/');
await evaluate(`document.querySelector('#website-growth-roadmap')?.scrollIntoView({ block: 'start' })`);
const roadmap = await evaluate(`new Promise((resolve) => {
  const started = performance.now();
  const check = () => {
    const shell = document.querySelector('[data-service-quiz]');
    const load = shell?.getAttribute('data-load-state');
    if (load !== 'pending' || performance.now() - started > 5000) {
      const intro = document.querySelector('.quiz-intro');
      const style = intro ? getComputedStyle(intro) : null;
      resolve({ load, backgroundImage: style?.backgroundImage, backgroundColor: style?.backgroundColor });
      return;
    }
    setTimeout(check, 80);
  };
  check();
})`);
await delay(800);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/roadmap-gradient-muted.png');

await navigate('http://127.0.0.1:4322/en/contact/');
const contact = await evaluate(`(() => {
  const field = document.querySelector('.form-input');
  const link = document.querySelector('.contact-link-item');
  const wrapper = document.querySelector('.contact-form-col');
  const info = document.querySelector('.info-card');
  field?.focus();
  const fieldStyle = field ? getComputedStyle(field) : null;
  const linkStyle = link ? getComputedStyle(link) : null;
  const wrapperStyle = wrapper ? getComputedStyle(wrapper) : null;
  const infoStyle = info ? getComputedStyle(info) : null;
  return {
    fieldBorders: fieldStyle ? [fieldStyle.borderTopWidth, fieldStyle.borderRightWidth, fieldStyle.borderBottomWidth, fieldStyle.borderLeftWidth] : [],
    fieldShadow: fieldStyle?.boxShadow,
    fieldRadius: fieldStyle?.borderRadius,
    fieldBackground: fieldStyle?.backgroundColor,
    linkBorders: linkStyle ? [linkStyle.borderTopWidth, linkStyle.borderRightWidth, linkStyle.borderBottomWidth, linkStyle.borderLeftWidth] : [],
    wrapperBorder: wrapperStyle?.borderTopWidth,
    wrapperShadow: wrapperStyle?.boxShadow,
    infoBorder: infoStyle?.borderTopWidth,
    infoShadow: infoStyle?.boxShadow,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth
  };
})()`);
await evaluate(`document.querySelector('.contact-form')?.scrollIntoView({ block: 'center' })`);
await delay(500);
await screenshot('C:/Users/Joshua/OneDrive/Documents/Kultivate/website/tmp/contact-fully-borderless.png');

await send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844
});
await navigate('http://127.0.0.1:4322/en/learn/seo-business-growth/');
const mobile = await evaluate(`(() => {
  const video = document.querySelector('.lesson-card__visual')?.getBoundingClientRect();
  const header = document.querySelector('.site-header, header')?.getBoundingClientRect();
  return {
    videoTop: Math.round(video?.top ?? -1),
    videoBottom: Math.round(video?.bottom ?? -1),
    headerBottom: Math.round(header?.bottom ?? -1),
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth
  };
})()`);

console.log(JSON.stringify({ learn, roadmap, contact, mobile, exceptions }, null, 2));
socket.close();
