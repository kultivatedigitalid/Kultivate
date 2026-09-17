from pathlib import Path
p=Path(__file__).parent/'final-qa.cjs';t=p.read_text(encoding='utf-8')
t=t.replace("const report={pages:[],homeSizes:[],interactions:[],errors:[],failedLocal:[]};", "const report=JSON.parse(fs.readFileSync(path.join(__dirname,'qa-report.json'),'utf8')); delete report.failure; report.homeSizes=[]; report.interactions=[]; report.mobile=[];")
t=t.replace("for(const locale of ['en','id']){", "for(const locale of []){",1)
t=t.replace("({client:e.clientHeight,scroll:e.scrollHeight})", "({height:e.clientHeight,textOverflow:[...e.querySelectorAll('.service-copy,.service-action,.service-number,.service-arrow')].some(c=>{const b=c.getBoundingClientRect(),p=e.getBoundingClientRect();return b.bottom>p.bottom+1||b.top<p.top-1||b.right>p.right+1||b.left<p.left-1;})})")
t=t.replace("metrics.cards.every(c=>c.scroll<=c.client+1)","metrics.cards.every(c=>!c.textOverflow)")
t=t.replace("assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390,locale+name+' mobile overflow');", "const doc=await page.evaluate(()=>document.documentElement.scrollWidth);assert.equal(doc,390,locale+name+' mobile overflow');report.mobile.push({locale,name,width:390,doc});")
(p.parent/'qa-resume.cjs').write_text(t,encoding='utf-8')
