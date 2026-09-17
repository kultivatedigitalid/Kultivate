const {chromium}=require('C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});const report={banners:[],gaps:[],errors:[],requests:[]};
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  page.on('pageerror',e=>report.errors.push(e.message));page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:4321')&&r.status()>=400)report.requests.push(r.url());});
  const go=async(url)=>{await page.goto('http://127.0.0.1:4321'+url,{waitUntil:'networkidle'});await page.waitForSelector('html.atmosphere-ready');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),page.viewportSize().width);};
  const shot=async(name)=>page.screenshot({path:path.join(__dirname,name+'.jpg'),type:'jpeg',quality:82});
  const expected={'seo':'seo-gradient.webp','web-services':'web-services-gradient.webp','social-media-management':'aeo-geo-gradient.webp','visual-strategy':'insights-gradient.webp'};
  for(const width of [1440,390]){
   await page.setViewportSize({width,height:width===1440?900:844});
   for(const locale of ['en','id'])for(const [slug,banner]of Object.entries(expected)){
    await go('/'+locale+'/services/'+slug+'/');
    const image=page.locator('.hero-shell .hero-visual img');assert.equal(await image.count(),1);assert((await image.getAttribute('src')).endsWith(banner));assert(await image.evaluate(i=>i.complete&&i.naturalWidth>0));
    report.banners.push({width,locale,slug,banner});
    if(locale==='en'&&width===1440)await shot('restored-banner-'+slug);
   }
   await go('/en/work/');await page.locator('.portfolio-grid').scrollIntoViewIfNeeded();
   const gaps=await page.locator('.portfolio-cluster').evaluateAll(rows=>rows.slice(1).map((r,i)=>r.getBoundingClientRect().top-rows[i].getBoundingClientRect().bottom));const expectedGap=Math.min(22,Math.max(12,width*.015));assert(gaps.every(g=>Math.abs(g-expectedGap)<.1));
   if(width===390){const inside=await page.locator('.portfolio-cluster').first().evaluate(el=>{const [a,b]=el.children;return b.getBoundingClientRect().top-a.getBoundingClientRect().bottom});assert.equal(inside,12);}
   report.gaps.push({width,gaps});await shot('restored-work-gaps-'+width);
   await go('/en/insights/');assert.notEqual(await page.locator('.hero-shell--insights').evaluate(e=>getComputedStyle(e).maskImage),'none');
   assert.equal(await page.locator('.topic-row').evaluate(e=>getComputedStyle(e).borderTopWidth),'0px');
   await page.locator('.editorial').evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-innerHeight*.45,behavior:'instant'}));await page.waitForTimeout(200);await shot('blog-handoff-'+width);
   await page.locator('[data-topic]').nth(2).click();await page.waitForTimeout(150);assert(await page.locator('[data-topic]').nth(2).getAttribute('aria-pressed')==='true');
   await go('/en/services/visual-strategy/');await page.locator('.service-principles').scrollIntoViewIfNeeded();
   assert.equal(await page.locator('.service-principles .section-kicker').evaluate(el=>getComputedStyle(el).color),'rgb(32, 61, 81)');await shot('light-field-contrast-'+width);
   const label=page.locator('.service-principles .section-kicker');const rect=await label.boundingBox();
   report['contrastSample'+width]={x:Math.round(rect.x+rect.width/2),y:Math.round(rect.y+rect.height/2),color:[32,61,81]};
   await label.evaluate(el=>el.style.visibility='hidden');await shot('light-field-background-'+width);
  }
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.requests,[]);report.passed=true;
 }catch(e){report.failure=e.stack;process.exitCode=1;}
 finally{fs.writeFileSync(path.join(__dirname,'qa-service-banners-gaps.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();}
})();
