from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]/'website'
def write(p,t):
    f=ROOT/p;f.parent.mkdir(parents=True,exist_ok=True);f.write_text(t,encoding='utf-8',newline='\n')
def change(p,a,b):
    t=(ROOT/p).read_text(encoding='utf-8');assert a in t,(p,a[:60]);write(p,t.replace(a,b))
change('src/styles/global.css','.home-flow.home-flow > .flow-section::after {','.home-flow.home-flow > .flow-section:not(.light-field)::after {')
change('src/styles/global.css','.page-flow.page-flow > .flow-section::after {','.page-flow.page-flow > .flow-section:not(.light-field):not(.portfolio-section)::after {')
change('src/styles/atmosphere.css','opacity:.16;','opacity:.10;')
change('src/styles/atmosphere.css','z-index:-1; inset:0; pointer-events:none;','z-index:-1; inset:0; height:auto; pointer-events:none;\n  mask-image:linear-gradient(180deg,transparent 0%,#000 12%,#000 88%,transparent 100%);')
change('src/styles/atmosphere.css','rgba(137,177,206,.22) 10%,#b5d1e2 26%,#d5e9f2 43%,#a5c7df 68%,rgba(58,112,156,.25) 88%','rgba(137,177,206,.4) 8%,#b5d1e2 18%,#d5e9f2 43%,#a5c7df 80%,rgba(58,112,156,.25) 94%')
change('src/components/work/PortfolioGallery.astro','z-index:0; inset:0; pointer-events:none;','z-index:0; inset:0; height:auto; pointer-events:none; mask-image:linear-gradient(180deg,transparent,#000 15%,#000 85%,transparent);')
write('src/components/services/ServicePrinciples.astro','''---
import type { ServiceDetail } from '../../data/services';
interface Props { locale:'id'|'en'; service:ServiceDetail; }
const { locale, service } = Astro.props;
---
<section class="service-principles flow-section light-field" aria-labelledby="principles-title" data-scroll-key="service-principles">
  <div class="container principles-layout">
    <header>
      <span class="section-kicker">{locale === 'id' ? 'Cara kami menentukan arah' : 'What guides the work'}</span>
      <h2 id="principles-title">{service.principles[0]}</h2>
      <p>{service.description}</p>
    </header>
    <ol>
      {service.principles.map((principle,index) => <li><span class="text-mono">0{index+1}</span><h3>{principle}</h3></li>)}
    </ol>
  </div>
</section>
<style>
  .service-principles { padding-block:clamp(180px,18vw,260px); }
  .principles-layout { display:grid; grid-template-columns:1.1fr .9fr; gap:clamp(60px,10vw,140px); align-items:center; }
  .principles-layout h2 { color:#0b2033; max-width:15ch; font-size:clamp(2.8rem,4.6vw,5rem); line-height:.99; letter-spacing:-.045em; margin:20px 0 28px; }
  .principles-layout p { color:#28485f; max-width:50ch; }
  .principles-layout ol { list-style:none; }
  .principles-layout li { padding:26px 0; display:grid; grid-template-columns:32px 1fr; gap:18px; border-bottom:1px solid rgba(14,56,83,.2); }
  .principles-layout li:last-child { border:0; }
  .principles-layout .text-mono { padding-top:5px; color:#335b75; }
  .principles-layout h3 { color:#0b2033; font-size:clamp(1.3rem,2vw,2rem); line-height:1.18; font-weight:500; }
  @media(max-width:760px) { .principles-layout { grid-template-columns:1fr; gap:36px; } .service-principles::after { background:linear-gradient(180deg,transparent,#b7d2e3 16%,#e4f1f7 35%,#b4d1e3 84%,transparent); } }
</style>
''')
for loc in ['en','id']:
    p=f'src/pages/{loc}/services/[slug].astro'
    change(p,"import ServiceEvidence from '../../../components/services/ServiceEvidence.astro';","import ServicePrinciples from '../../../components/services/ServicePrinciples.astro';")
    change(p,'<ServiceEvidence locale={locale} serviceTitle={service.title} />','<ServicePrinciples locale={locale} service={service} />')
with (ROOT/'src/vendor/threeui/README.md').open('a',encoding='utf-8') as f:f.write('\nThe source CSS references `./fonts/fragment-mono.woff2`, although the registered asset list is empty. The Latin WOFF2 was supplied from the official Google Fonts distribution (https://fonts.gstatic.com/s/fragmentmono/v6/4iCr6K5wfMRRjxp0DA6-2CLnB4NHhg.woff2); its OFL license is in `src/shaders/fonts/`. The CSS and its path remain unchanged.\n')
print('Restored fields hidden by legacy selectors, refined edge fades and added source-based service principles.')
