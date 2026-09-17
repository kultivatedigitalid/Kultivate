const {chromium}=require('C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const report={runs:[],errors:[],webglWarnings:[],requests:[]};
 try{
  const page=await browser.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(/Too many active WebGL|CONTEXT_LOST|INVALID_OPERATION/i.test(m.text()))report.webglWarnings.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:4321')&&r.status()>=400)report.requests.push(r.url());});
  for(const width of [1440,390]){
   await page.setViewportSize({width,height:width===1440?900:844});
   for(const route of ['/en/','/id/learn/']){
    await page.goto('http://127.0.0.1:4321'+route,{waitUntil:'networkidle'});
    await page.waitForSelector('.atmosphere-tile canvas');
    const start=await page.locator('.atmosphere-tile').first().evaluate(el=>el.getBoundingClientRect().top+scrollY);
    const height=await page.evaluate(()=>document.body.getBoundingClientRect().height);
    let maxCanvases=0;
    for(const y of Array.from({length:9},(_,i)=>i*(height-page.viewportSize().height)/8)){
     await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(220);
     const state=await page.evaluate(()=>{
      const root=document.querySelector('.site-atmosphere'),r=root.getBoundingClientRect();
      return {position:getComputedStyle(root).position,rootTop:r.top+scrollY,height:r.height,
       tileTop:document.querySelector('.atmosphere-tile').getBoundingClientRect().top+scrollY,
       canvases:root.querySelectorAll('canvas').length,overflow:document.documentElement.scrollWidth>innerWidth,
       covered:[...root.querySelectorAll('canvas')].some(c=>{const r=c.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0;})};
     });
     assert.equal(state.position,'absolute');assert(Math.abs(state.rootTop)<1);assert(Math.abs(state.tileTop-start)<1);assert(Math.abs(state.height-height)<1);assert(state.covered);assert(!state.overflow);maxCanvases=Math.max(maxCanvases,state.canvases);
    }
    assert(maxCanvases<=4);
    await page.locator('.atmosphere-toggle').click();assert.equal(await page.locator('.site-atmosphere canvas').count(),0);
    await page.locator('.atmosphere-toggle').click();await page.waitForSelector('.atmosphere-tile canvas');
    await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>!document.querySelector('.site-atmosphere canvas'));
    await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForSelector('.atmosphere-tile canvas');
    await page.evaluate(()=>scrollTo({top:1600,behavior:'instant'}));await page.waitForTimeout(450);
    await page.screenshot({path:path.join(__dirname,'document-ribbon-'+width+'-'+(route==='/en/'?'home':'learn')+'.jpg'),type:'jpeg',quality:80});
    report.runs.push({width,route,height,maxCanvases,documentAnchored:true,pauseAndReducedMotion:true});
   }
  }
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.requests,[]);assert.deepEqual(report.webglWarnings,[]);report.passed=true;
 }catch(e){report.failure=e.stack;process.exitCode=1;}
 finally{fs.writeFileSync(path.join(__dirname,'qa-document-ribbon.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();}
})();
