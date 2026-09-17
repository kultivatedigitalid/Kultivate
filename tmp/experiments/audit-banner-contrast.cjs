const {chromium}=require('C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path');
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const audit=[];
for(const[url,sel]of [['/en/insights/','.editorial'],['/en/services/visual-strategy/','.service-principles'],['/en/learn/','.learn-course-band.light-field']]){
 await page.goto('http://127.0.0.1:4321'+url,{waitUntil:'networkidle'});await page.waitForSelector('html.atmosphere-ready');
 if(url.includes('insights')){await page.locator(sel).evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-400,behavior:'instant'}));await page.screenshot({path:path.join(__dirname,'blog-boundary-before.jpg'),quality:82});}
 audit.push({url,light:await page.locator('.light-field').evaluateAll(roots=>roots.flatMap(root=>[...root.querySelectorAll('*')].filter(el=>el.children.length===0&&el.textContent.trim()).map(el=>({text:el.textContent.trim().slice(0,70),class:el.className,color:getComputedStyle(el).color,background:getComputedStyle(el).backgroundColor}))))});
}console.log(JSON.stringify(audit));await browser.close();})();
