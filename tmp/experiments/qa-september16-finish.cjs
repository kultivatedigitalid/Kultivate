const {chromium}=require('C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const file=path.join(__dirname,'qa-september16.json');
 const report=JSON.parse(fs.readFileSync(file,'utf8'));
 delete report.failure;
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:4321')&&r.status()>=400)report.requests.push(r.url());});
  const go=async(url)=>{const r=await page.goto('http://127.0.0.1:4321'+url,{waitUntil:'networkidle'});assert.equal(r.status(),200);await page.waitForSelector('html.atmosphere-ready');};
  await go('/en/services/');await page.locator('[data-quiz-start]').click();
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('.site-colors .site-color-field:last-child')).opacity==='0',{},{timeout:6000});
  report.quizFieldFade=true;
  await go('/en/insights/');await page.locator('[data-topic]').nth(2).click();
  await page.waitForTimeout(800);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390);
  report.blogFilter=true;
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>!document.querySelector('.ribbon-field canvas'));
  assert(await page.locator('.site-colors').isVisible());
  report.reducedMotion=true;
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.requests,[]);report.passed=true;
 }catch(e){report.failure=e.stack;report.passed=false;process.exitCode=1;}
 finally{fs.writeFileSync(file,JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();}
})();
