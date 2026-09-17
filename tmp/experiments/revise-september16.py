from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]/'website'
def write(p,t):
    f=ROOT/p;f.parent.mkdir(parents=True,exist_ok=True);f.write_text(t,encoding='utf-8',newline='\n')
def change(p,a,b):
    t=(ROOT/p).read_text(encoding='utf-8');assert a in t,(p,a[:70]);write(p,t.replace(a,b))

# Three independent paint planes: page colors, one fixed ribbon, foreground.
# Registered ThreeUI files and supplied props are deliberately untouched.
write('src/components/shared/SiteAtmosphere.tsx','''import { useEffect, useRef, useState } from 'react';
import { PredictiveArcCanvas } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';

type Field = { id: number; top: number; height: number; visible: boolean; gallery: boolean };
type Backdrop = { top: number; height: number; fields: Field[] };

export default function SiteAtmosphere({ locale }: { locale: 'en' | 'id' }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [backdrop, setBackdrop] = useState<Backdrop | null>(null);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(media.matches); setActive(!document.hidden); };
    update();
    const pointer = (event: PointerEvent) => {
      if (!event.isTrusted || event.pointerType === 'touch') return;
      root.current?.querySelector('.ribbon-field')?.dispatchEvent(new PointerEvent('pointermove', {
        clientX: event.clientX, clientY: event.clientY, pointerType: event.pointerType,
      }));
    };
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('pointermove', pointer, { passive: true });
    return () => {
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('pointermove', pointer);
    };
  }, []);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>('#main-content');
    if (!main) return;
    const targets = Array.from(main.querySelectorAll<HTMLElement>('.light-field, .portfolio-section, .roadmap'));
    let frame = 0;
    const measure = () => {
      frame = 0;
      const mainBounds = main.getBoundingClientRect();
      const bleed = Math.min(300, Math.max(160, innerWidth * 0.2));
      const fields = targets.map((target, id) => {
        const bounds = target.getBoundingClientRect();
        const gallery = target.classList.contains('portfolio-section');
        const spread = gallery ? 0 : bleed;
        const intro = target.querySelector<HTMLElement>('.quiz-intro');
        return { id, gallery, top: bounds.top - mainBounds.top - spread,
          height: bounds.height + spread * 2,
          visible: bounds.height > 0 && !target.hidden && (!intro || !intro.hidden) };
      });
      const next = { top: mainBounds.top + scrollY, height: mainBounds.height, fields };
      setBackdrop(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const resize = new ResizeObserver(schedule);
    resize.observe(main);
    targets.forEach(target => resize.observe(target));
    const mutations = new MutationObserver(schedule);
    mutations.observe(main, { subtree: true, attributes: true, attributeFilter: ['hidden', 'data-quiz-state'] });
    window.addEventListener('resize', schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); mutations.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const ready = backdrop !== null;
  useEffect(() => {
    if (ready) document.documentElement.classList.add('atmosphere-ready');
    return () => document.documentElement.classList.remove('atmosphere-ready');
  }, [ready]);

  const moving = ready && active && !reduced && !paused;
  return <>
    <div className="site-colors" aria-hidden="true" style={{ top: backdrop?.top ?? 0, height: backdrop?.height ?? 0 }}>
      {backdrop?.fields.map(field => <div key={field.id}
        className={`site-color-field${field.gallery ? ' site-color-field--gallery' : ''}`}
        style={{ top: field.top, height: field.height, opacity: field.visible ? 1 : 0 }} />)}
    </div>
    <div ref={root} className="site-atmosphere" aria-hidden="true" data-atmosphere-active={moving}>
      {moving && <div className="shader-frame">
        <PredictiveArcCanvas variant="ribbon-field" speed={1.00} pointerAmount={1.00}
          smoothing={0.035} hue={0} saturation={1.00} brightness={1.00} opacity={1.00} />
      </div>}
    </div>
    {!reduced && <button className="atmosphere-toggle" type="button" aria-pressed={paused}
      onClick={() => setPaused(!paused)}>
      <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
      <span>{locale === 'id' ? 'Jeda animasi latar' : 'Pause background motion'}</span>
    </button>}
  </>;
}
''')
write('src/styles/atmosphere.css','''/* Three paint planes: colors (0), fixed original ThreeUI (1), content (2). */
body { position:relative; isolation:isolate; }
#main-content { position:relative; z-index:2; }
.site-colors { position:absolute; left:0; width:100%; z-index:0; pointer-events:none; overflow:hidden; display:none;
  background:radial-gradient(ellipse 82% 15% at 8% 24%,rgba(70,134,183,.2),transparent 74%),
    radial-gradient(ellipse 70% 16% at 92% 49%,rgba(103,217,255,.11),transparent 76%),
    radial-gradient(ellipse 86% 15% at 16% 75%,rgba(70,134,183,.17),transparent 76%),
    linear-gradient(180deg,#070b12 0%,#08121e 18%,#0a1c2c 36%,#0b2031 55%,#12344b 73%,#0b2132 88%,#070b12 100%);
}
.atmosphere-ready .site-colors { display:block; }
.atmosphere-ready #main-content,
.atmosphere-ready #main-content > :is(.home-flow,.page-flow) { background:transparent; }
.site-atmosphere { position:fixed; inset:0; z-index:1; pointer-events:none; mix-blend-mode:screen; opacity:.16; contain:strict; }
.site-atmosphere .shader-frame { width:100%; height:100%; }

:root {
  --field-spread:clamp(160px,20vw,300px);
  --field-color:radial-gradient(ellipse 80% 64% at 26% 43%,#b1c2cc,rgba(147,174,193,.72) 52%,transparent 100%),
    radial-gradient(ellipse 76% 70% at 88% 62%,rgba(90,132,164,.75),transparent 100%),
    linear-gradient(110deg,#8da8ba,#7898b1);
  --field-mask:linear-gradient(180deg,transparent 0%,rgba(0,0,0,.04) 7%,rgba(0,0,0,.22) 17%,rgba(0,0,0,.65) 28%,#000 40%,#000 63%,rgba(0,0,0,.7) 74%,rgba(0,0,0,.24) 85%,rgba(0,0,0,.04) 94%,transparent 100%);
}
.site-color-field { position:absolute; left:0; width:100%; background:var(--field-color); mask-image:var(--field-mask); transition:opacity 650ms ease; }
.site-color-field--gallery { background:radial-gradient(ellipse 100% 40% at 30% 52%,#91acbe,rgba(91,133,163,.64) 58%,transparent 100%); }

/* CSS-only fallback also uses the long, muted transition. Once measured, these
   fields move behind the ribbon so neither canvas nor colors can cover content. */
.light-field { position:relative; isolation:isolate; }
#main-content .light-field::after { content:''; position:absolute; z-index:-1; inset:calc(-1 * var(--field-spread)) 0; height:auto; pointer-events:none;
  background:var(--field-color); mask-image:var(--field-mask); }
#main-content .roadmap::before { inset:calc(-1 * var(--field-spread)) 0; background:var(--field-color); mask-image:var(--field-mask); }
#main-content .portfolio-section::after { background:radial-gradient(ellipse 100% 40% at 30% 52%,#91acbe,rgba(91,133,163,.64) 58%,transparent 100%); }
.atmosphere-ready #main-content :is(.light-field,.portfolio-section)::after,
.atmosphere-ready #main-content .roadmap::before { display:none; }
#main-content .story-feature::after,
#main-content .case-method::after { left:calc((100% - 100vw)/2); right:calc((100% - 100vw)/2); }

/* Slate surfaces and restrained image contrast sit comfortably in the light. */
#main-content .light-field :is(.services-header p,.partnership-promises p,.partnership-statement,.principles-layout p,.learn-series-card p,.story-copy p) { color:#203d51; }
#main-content .light-field .service-panel { background:#304f64; }
#main-content .light-field .service-panel > img { opacity:.58; filter:brightness(1.08) contrast(.82) saturate(.82); }
#main-content .light-field .service-panel::before { background:linear-gradient(180deg,rgba(33,65,86,.04),rgba(36,67,88,.45) 40%,#2b4a60); }
#main-content .light-field .service-panel--support::before { background:linear-gradient(90deg,rgba(38,70,92,.96),rgba(42,73,93,.86) 55%,rgba(48,80,102,.32)); }
#main-content .light-field .service-number { color:#c3d4df; }
#main-content .light-field .service-copy p { color:#d2dfe7; }
#main-content .light-field :is(.learn-series-card figure,.story-card figure) { background:#425f72; }
#main-content .light-field :is(.learn-series-card figure img,.story-card img) { filter:brightness(1.04) contrast(.82) saturate(.84); }
#main-content .light-field .learn-series-card__placeholder { background:radial-gradient(circle at 72% 30%,rgba(165,202,224,.16),transparent 48%),linear-gradient(145deg,#426379,#29475d); }
#main-content .light-field .learn-series-card__link,
#main-content .light-field .learn-series-card > a:is(:hover,:focus-visible) .learn-series-card__link { color:#15374f; border-color:rgba(21,55,79,.55); }
#main-content .portfolio-media img { filter:brightness(1.02) contrast(.9) saturate(.88); }
#main-content .portfolio-item:is(:hover,:focus-visible) img { filter:brightness(1.05) contrast(.94) saturate(.98); }
.light-field a:focus-visible { outline:2px solid #0b5683; outline-offset:6px; }

.atmosphere-toggle { position:fixed; bottom:18px; left:18px; z-index:30; display:flex; align-items:center; justify-content:center; gap:8px; min-width:36px; min-height:36px; padding:6px 10px; color:#d6e8f5; background:rgba(7,17,29,.88); border:1px solid rgba(191,221,243,.24); border-radius:30px; font-size:11px; }
.atmosphere-toggle > span:last-child { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); white-space:nowrap; }
.atmosphere-toggle:is(:hover,:focus-visible) > span:last-child { position:static; width:auto; height:auto; clip-path:none; }
@media(prefers-reduced-motion:reduce) { .site-atmosphere,.atmosphere-toggle { display:none; } .site-color-field { transition:none; } }
''')
change('src/components/home/ServicesGrid.astro',"title: 'Found. Understood. Chosen.'","title: 'Deep Expertise in Digital Growth.'")
change('src/components/home/ServicesGrid.astro',"title: 'Ditemukan. Dipahami. Dipilih.'","title: 'Keahlian mendalam untuk pertumbuhan digital.'")
change('src/components/home/ServicesGrid.astro','.services-header h2 { max-width:14ch;','.services-header h2 { max-width:none;')
change('src/components/about/AboutIndexV3.astro',"title: 'A Digital Partner for Your Priorities'","title: 'Digital Partner for Your Priorities'")

p='src/components/work/PortfolioGallery.astro';t=(ROOT/p).read_text(encoding='utf-8')
t=t.replace('gap:clamp(32px,5vw,72px);','gap:0;').replace("  .portfolio-cluster[data-cluster='1'] { padding-top:clamp(36px,7vw,100px); }","  .portfolio-cluster { row-gap:0; }").replace("  .portfolio-cluster[data-cluster='2'] { padding-bottom:clamp(36px,7vw,100px); }",'')
write(p,t)
p='src/components/home/FinalCTA.astro';t=(ROOT/p).read_text(encoding='utf-8');a=t.index('  .final-cta--learn {');b=t.index('  .final-cta--founder-profile',a)
t=t[:a]+'''  .final-cta--learn {
    margin-top:-1px;
    min-height:560px;
    padding-top:clamp(130px,17vh,190px);
    background:radial-gradient(ellipse 64% 60% at 50% 62%,rgba(81,155,204,.06),transparent 85%),
      linear-gradient(180deg,transparent 0%,rgba(7,11,18,.06) 22%,rgba(7,11,18,.28) 52%,rgba(7,11,18,.7) 82%,#070b12 100%);
  }

'''+t[b:];write(p,t)

# Repair the documentation link interrupted by the previous quota boundary.
p='CHANGELOG.md';t=(ROOT/p).read_text(encoding='utf-8');write(p,t.replace('(EXPERIMENTS_2026-09-15.md)','(docs/EXPERIMENTS_2026-09-15.md)'))
print('Applied fixed background layering, softer long light fields, slate content surfaces, copy and spacing corrections.')
