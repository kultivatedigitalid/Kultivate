const {chromium}=require('C:/Users/Joshua/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const checks=[['home','/en/','#services'],['about','/en/about/','.about-partnership'],['services','/en/services/','#website-growth-roadmap'],['learn','/en/learn/','.learn-course-band.light-field'],['blog','/en/insights/','.story-feature'],['work','/en/work/','[data-cluster="1"]']];
 for(const[name,url,selector]of checks){
  await page.goto('http://localhost:4321'+url,{waitUntil:'networkidle'});
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({path:path.join(__dirname,name+'-v1.png')});
  console.log(name,await page.evaluate(s=>({width:innerWidth,document:document.documentElement.scrollWidth,height:document.querySelector(s).getBoundingClientRect().height,canvas:!!document.querySelector('.ribbon-field canvas')}),selector));
 }
 await page.setViewportSize({width:1366,height:768});
 await page.goto('http://localhost:4321/id/',{waitUntil:'networkidle'});
 await page.locator('#services').scrollIntoViewIfNeeded();await page.waitForTimeout(800);
 await page.screenshot({path:path.join(__dirname,'home-id-laptop-v1.png')});
 console.log('id laptop',await page.locator('#services').boundingBox(),errors);
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
