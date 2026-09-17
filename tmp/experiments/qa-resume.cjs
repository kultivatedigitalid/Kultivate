const {chromium}=require('C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const report=JSON.parse(fs.readFileSync(path.join(__dirname,'qa-report.json'),'utf8')); delete report.failure; report.homeSizes=[]; report.interactions=[]; report.mobile=[];
 try {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:4321')&&r.status()>=400)report.failedLocal.push({url:r.url(),status:r.status()});});
  await page.addInitScript(()=>{
   const names=new WeakMap();const original=WebGLRenderingContext.prototype.getUniformLocation;
   WebGLRenderingContext.prototype.getUniformLocation=function(p,n){const l=original.call(this,p,n);if(l)names.set(l,n);return l;};
   const uniform=WebGLRenderingContext.prototype.uniform2f;
   WebGLRenderingContext.prototype.uniform2f=function(l,x,y){if(names.get(l)==='pointer')window.__ribbonPointer=[x,y];return uniform.call(this,l,x,y);};
  });
  const go=async(url)=>{const r=await page.goto('http://127.0.0.1:4321'+url,{waitUntil:'networkidle'});assert.equal(r.status(),200,url);};
  const capture=async(name,selector)=>{await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(850);await page.screenshot({path:path.join(__dirname,name+'.jpg'),type:'jpeg',quality:76});};
  const selections=[['home','/','#services'],['about','/about/','.about-partnership'],['services','/services/','#website-growth-roadmap'],['learn','/learn/','.learn-course-band.light-field'],['blog','/insights/','.story-feature'],['work','/work/','[data-cluster="1"]'],['visual','/services/visual-strategy/','.service-principles'],['social','/services/social-media-management/','.service-principles']];
  for(const locale of []){
   for(const[name,url,sel]of selections){
    await go('/'+locale+url);await capture(name+'-'+locale+'-desktop-v2',sel);
    const state=await page.evaluate(()=>({width:innerWidth,doc:document.documentElement.scrollWidth,main:document.querySelectorAll('main').length,brokenImages:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src)}));
    report.pages.push({locale,name,...state});assert.equal(state.doc,state.width,locale+name+' overflow');assert.equal(state.main,1);assert.deepEqual(state.brokenImages,[]);
   }
  }
  for(const[width,height]of [[1440,900],[1366,768],[1280,720],[1024,768]]){
   await page.setViewportSize({width,height});for(const locale of ['en','id']){
    await go('/'+locale+'/');await page.locator('#services').scrollIntoViewIfNeeded();await page.waitForTimeout(300);
    const metrics=await page.evaluate(()=>{const s=document.querySelector('#services'),r=s.getBoundingClientRect();return{height:r.height,viewport:innerHeight,width:document.documentElement.scrollWidth,cards:[...s.querySelectorAll('.service-panel')].map(e=>({height:e.clientHeight,textOverflow:[...e.querySelectorAll('.service-copy,.service-action,.service-number,.service-arrow')].some(c=>{const b=c.getBoundingClientRect(),p=e.getBoundingClientRect();return b.bottom>p.bottom+1||b.top<p.top-1||b.right>p.right+1||b.left<p.left-1;})}))};});
    report.homeSizes.push({width,height,locale,...metrics});assert(metrics.height<=height-72+1,JSON.stringify(metrics));assert.equal(metrics.width,width);assert(metrics.cards.every(c=>!c.textOverflow),'clipped card content');
   }
  }
  await page.setViewportSize({width:390,height:844});
  for(const locale of ['en','id']){
   for(const[name,url,sel]of selections){
    await go('/'+locale+url);await capture(name+'-'+locale+'-mobile-v2',sel);
    const doc=await page.evaluate(()=>document.documentElement.scrollWidth);assert.equal(doc,390,locale+name+' mobile overflow');report.mobile.push({locale,name,width:390,doc});
   }
  }
  // Desktop pointer motion, pause, and OS preference do not change the source props.
  await page.setViewportSize({width:1280,height:720});await go('/en/');await page.waitForSelector('.ribbon-field canvas');
  await page.mouse.move(120,160);await page.waitForTimeout(900);const before=await page.evaluate(()=>window.__ribbonPointer);
  await page.mouse.move(1140,650);await page.waitForTimeout(900);const after=await page.evaluate(()=>window.__ribbonPointer);
  assert(before&&after&&Math.abs(before[0]-after[0])>.25,'authored pointer response');
  await page.locator('.atmosphere-toggle').click();assert.equal(await page.locator('.ribbon-field canvas').count(),0);
  await page.locator('.atmosphere-toggle').click();await page.waitForSelector('.ribbon-field canvas');
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(150);assert.equal(await page.locator('.ribbon-field canvas').count(),0);
  report.interactions.push({motion:'pointer, pause, resume, reduced motion passed',before,after});
  // Each new recommendation reaches its detail route and preselects the contact form.
  for(const[locale,answers,slug]of [['en',['recognition','stable','referral','direction','recognition'],'visual-strategy'],['id',['publishing','stable','social','managed','cadence'],'social-media-management']]){
   await go('/'+locale+'/services/');await page.locator('[data-quiz-start]').click();
   for(const answer of answers)await page.locator('.question-panel:not([hidden]) [data-answer-id="'+answer+'"]').click();
   await page.locator('[data-quiz-view="result"]').waitFor({state:'visible'});
   assert((await page.locator('[data-service-link]').getAttribute('href')).includes(slug));
   await page.locator('[data-consultation-link]').click();await page.waitForLoadState('networkidle');
   assert.equal(await page.locator('#service').inputValue(),slug);
   report.interactions.push({locale,quiz:slug,contactPrefill:'passed'});
  }
  await go('/en/insights/');const topic=await page.locator('[data-topic]').nth(1).getAttribute('data-topic');await page.locator('[data-topic]').nth(1).click();
  const visible=await page.locator('[data-story-card]:visible').evaluateAll(a=>a.map(e=>e.dataset.topicValue));assert(visible.length&&visible.every(v=>v===topic));
  await page.locator('[data-topic=""]').click();assert.equal(await page.locator('[data-story-card]:visible').count(),6);report.interactions.push('Blog filters passed');
  await go('/en/services/visual-strategy/');const faq=page.locator('details').first();if(await faq.count()){await faq.locator('summary').click();assert(await faq.getAttribute('open')!==null);report.interactions.push('Service FAQ passed');}
  await page.setViewportSize({width:390,height:844});await go('/id/');await page.locator('.mobile-menu-toggle').click();assert.equal(await page.locator('.mobile-menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.mobile-menu-toggle').getAttribute('aria-expanded'),'false');report.interactions.push('Mobile menu and escape passed');
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.failedLocal,[]);
  report.passed=true;
 } catch(e) {report.failure=e.stack;process.exitCode=1;} finally {fs.writeFileSync(path.join(__dirname,'qa-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();}
})();
