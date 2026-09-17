const {chromium}=require('C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});const file=path.join(__dirname,'qa-service-banners-gaps.json');const report=JSON.parse(fs.readFileSync(file));
try{const page=await browser.newPage({reducedMotion:'reduce'});page.on('pageerror',e=>report.errors.push(e.message));
for(const width of [1440,390]){
 await page.setViewportSize({width,height:width===1440?900:844});
 await page.goto('http://127.0.0.1:4321/en/insights/',{waitUntil:'networkidle'});await page.waitForSelector('html.atmosphere-ready');
 assert.equal(await page.locator('.editorial').evaluate(el=>getComputedStyle(el,'::before').display),'none');
 await page.locator('.editorial').evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-innerHeight*.45,behavior:'instant'}));await page.waitForTimeout(150);
 await page.screenshot({path:path.join(__dirname,'blog-handoff-'+width+'.jpg'),quality:88});
 report['blogBoundary'+width]=await page.locator('.editorial').evaluate(el=>el.getBoundingClientRect().top);
 await page.goto('http://127.0.0.1:4321/en/services/visual-strategy/',{waitUntil:'networkidle'});await page.waitForSelector('html.atmosphere-ready');await page.locator('.service-principles').scrollIntoViewIfNeeded();
 const label=page.locator('.service-principles .section-kicker');assert.equal(await label.evaluate(el=>getComputedStyle(el).color),'rgb(11, 32, 51)');
 await page.screenshot({path:path.join(__dirname,'light-field-contrast-'+width+'.jpg'),quality:88});
 const rect=await label.boundingBox();report['contrastSample'+width]={x:Math.round(rect.x+rect.width/2),y:Math.round(rect.y+rect.height/2),color:[11,32,51]};
 await label.evaluate(el=>el.style.visibility='hidden');await page.screenshot({path:path.join(__dirname,'light-field-background-'+width+'.jpg'),quality:88});
}assert.deepEqual(report.errors,[]);report.passed=true;
}catch(e){report.failure=e.stack;report.passed=false;process.exitCode=1;}finally{fs.writeFileSync(file,JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,errors:report.errors,failure:report.failure}));await browser.close();}})();
