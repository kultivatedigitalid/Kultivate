const {chromium}=require('C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const out=__dirname;
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const report={pages:[],geometry:[],errors:[],requests:[]};
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:4321')&&r.status()>=400)report.requests.push(r.url());});
  const go=async(url)=>{const r=await page.goto('http://127.0.0.1:4321'+url,{waitUntil:'networkidle'});assert.equal(r.status(),200);await page.waitForSelector('html.atmosphere-ready');await page.waitForTimeout(350);};
  const shot=async(name,selector)=>{await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(700);await page.screenshot({path:path.join(out,'revision-'+name+'.jpg'),type:'jpeg',quality:76});};
  for(const[width,height]of [[1440,900],[1280,720],[390,844]]){
   await page.setViewportSize({width,height});
   for(const locale of ['en','id']){
    await go('/'+locale+'/');await shot('home-'+locale+'-'+width,'#services');
    const home=await page.locator('#services').evaluate(el=>({height:el.getBoundingClientRect().height,title:el.querySelector('h2').textContent,doc:document.documentElement.scrollWidth,
      overflow:[...el.querySelectorAll('.service-panel')].some(p=>[...p.querySelectorAll('.service-copy,.service-action')].some(c=>c.getBoundingClientRect().bottom>p.getBoundingClientRect().bottom+1))}));
    report.geometry.push({width,locale,...home});assert.equal(home.doc,width);assert(!home.overflow);if(width>=1000)assert(home.height<=height-72+1,JSON.stringify(home));
   }
  }
  await page.setViewportSize({width:1440,height:900});
  await go('/en/');await shot('home-layering','#services');
  report.layers=await page.evaluate(()=>({background:getComputedStyle(document.querySelector('.site-colors')).zIndex,ribbon:getComputedStyle(document.querySelector('.site-atmosphere')).zIndex,content:getComputedStyle(document.querySelector('#main-content')).zIndex,position:getComputedStyle(document.querySelector('.site-atmosphere')).position}));
  assert.deepEqual(report.layers,{background:'0',ribbon:'1',content:'2',position:'fixed'});
  // Foreground panels must not change when the moving canvas is hidden.
  await page.mouse.move(5,90);await page.waitForTimeout(700);
  await page.locator('.services-foundation').screenshot({path:path.join(out,'foreground-moving.png')});
  await page.locator('.atmosphere-toggle').click();await page.mouse.move(5,90);await page.waitForTimeout(700);
  await page.locator('.services-foundation').screenshot({path:path.join(out,'foreground-paused.png')});
  assert.equal(await page.locator('.ribbon-field canvas').count(),0);
  await page.locator('.atmosphere-toggle').click();await page.waitForSelector('.ribbon-field canvas');

  for(const[width,height]of [[1440,900],[390,844]]){
   await page.setViewportSize({width,height});
   for(const[name,url,sel]of [['about','/en/about/','.about-partnership'],['work','/en/work/','[data-cluster="1"]'],['learn','/en/learn/','.learn-course-band.light-field'],['learn-cta','/en/learn/','.final-cta--learn'],['blog','/en/insights/','.story-feature'],['services','/en/services/','#website-growth-roadmap']]){
    await go(url);await shot(name+'-'+width,sel);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,name+' overflow');report.pages.push({name,width});
    if(name==='work'){
      const gaps=await page.locator('.portfolio-cluster').evaluateAll(rows=>rows.slice(1).map((r,i)=>r.getBoundingClientRect().top-rows[i].getBoundingClientRect().bottom));
      assert(gaps.every(g=>Math.abs(g)<1),JSON.stringify(gaps));report.geometry.push({width,portfolioRowGaps:gaps});
    }
    if(name==='learn-cta'){
      await page.locator('.final-cta--learn').evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-innerHeight*.45,behavior:'instant'}));await page.waitForTimeout(400);await page.screenshot({path:path.join(out,'revision-learn-boundary-'+width+'.jpg'),type:'jpeg',quality:82});
    }
   }
  }
  await go('/en/about/');assert.equal(await page.locator('h1').textContent(),'Digital Partner for Your Priorities');
  await go('/en/services/');await page.locator('[data-quiz-start]').click();await page.waitForTimeout(800);
  assert.equal(await page.locator('.site-color-field').last().evaluate(el=>getComputedStyle(el).opacity),'0');
  await go('/en/insights/');await page.locator('[data-topic]').nth(2).click();await page.waitForTimeout(700);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390);
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(200);assert.equal(await page.locator('.ribbon-field canvas').count(),0);
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.requests,[]);report.passed=true;
 }catch(e){report.failure=e.stack;process.exitCode=1;}finally{fs.writeFileSync(path.join(out,'qa-september16.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();}
})();
