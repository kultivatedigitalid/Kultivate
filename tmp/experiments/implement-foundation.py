from pathlib import Path
import json, hashlib, tarfile
ROOT=Path(__file__).resolve().parents[2]
WEB=ROOT/'website'
def write(path, text):
    p=WEB/path; p.parent.mkdir(parents=True, exist_ok=True); p.write_text(text,encoding='utf-8',newline='\n')
def change(path, old, new):
    p=WEB/path; t=p.read_text(encoding='utf-8'); assert old in t, (path,old[:60]); p.write_text(t.replace(old,new),encoding='utf-8',newline='\n')

bundle=json.loads((ROOT/'tmp/experiments/ribbon-field.json').read_text(encoding='utf-8'))
for f in bundle['files']:
    b=f['code'].encode('utf-8'); assert hashlib.sha256(b).hexdigest()==f['sha256']
    p=WEB/'src/vendor/threeui'/f['path']; p.parent.mkdir(parents=True,exist_ok=True); p.write_bytes(b)
with tarfile.open(ROOT/'tmp/experiments/designcodeio-threeui-1.2.0.tgz') as t:
    write('src/vendor/threeui/LICENSE',t.extractfile('package/LICENSE').read().decode())
write('src/vendor/threeui/index.tsx','''import { RibbonFieldBackground, type RibbonFieldBackgroundProps } from './src/shaders/ribbon-field/RibbonFieldBackground';

// The registered bundle supplies the ribbon component without its collection facade.
export function PredictiveArcCanvas({ variant, ...props }: RibbonFieldBackgroundProps & { variant: 'ribbon-field' }) {
  return variant === 'ribbon-field' ? <RibbonFieldBackground {...props} /> : null;
}
''')
write('src/vendor/threeui/README.md','''# ThreeUI · Ribbon Field

Registered source: https://threeui.com/source-code/ribbon-field.json

Requested revision: `fa86582fc870`. The three registered files under `src/shaders/` are preserved byte for byte, including the complete shared CSS and asset URLs. See `source-manifest.json` for SHA-256 values. MIT license from the official `@designcodeio/threeui@1.2.0` distribution is included.

This registered variant uses React and raw WebGL. It does not import Three.js or remote assets; the broader collection's Canvas 2D / Three.js r128 runtimes are not dependencies of this variant.

`index.tsx` is a narrow integration facade because the registered bundle does not include `PredictiveArcCanvas`. Astro aliases the requested package and stylesheet imports to this directory. The ribbon implementation is the original source, not a recreation from the preview. React is installed in the destination application.

The site wrapper owns compositing strength, reduced motion, pause control, pointer forwarding, and remounting after tab visibility changes. The configured component props remain unchanged. Keep registered source untouched; add integration behavior outside it.
''')
write('src/vendor/threeui/source-manifest.json',json.dumps({'source':'https://threeui.com/source-code/ribbon-field.json','revision':'fa86582fc870','files':[{k:f[k] for k in ['path','sha256','bytes']} for f in bundle['files']]},indent=2)+'\n')
change('astro.config.mjs',"import sitemap from '@astrojs/sitemap';","import sitemap from '@astrojs/sitemap';\nimport react from '@astrojs/react';\nimport { fileURLToPath } from 'node:url';")
change('astro.config.mjs',"  integrations: [","  vite: { resolve: { alias: [\n    { find: '@designcodeio/threeui/style.css', replacement: fileURLToPath(new URL('./src/vendor/threeui/src/shaders/threeui.css', import.meta.url)) },\n    { find: '@designcodeio/threeui', replacement: fileURLToPath(new URL('./src/vendor/threeui/index.tsx', import.meta.url)) },\n  ] } },\n  integrations: [\n    react(),")
p=WEB/'tsconfig.json'; config=json.loads(p.read_text()); config.setdefault('compilerOptions',{}).update({'jsx':'react-jsx','jsxImportSource':'react','baseUrl':'.','paths':{'@designcodeio/threeui':['src/vendor/threeui/index.tsx']}}); write('tsconfig.json',json.dumps(config,indent=2)+'\n')
write('src/components/shared/SiteAtmosphere.tsx','''import { useEffect, useRef, useState } from 'react';
import { PredictiveArcCanvas } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';

export default function SiteAtmosphere({ locale }: { locale: 'en' | 'id' }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(media.matches); setActive(!document.hidden); };
    update();
    const pointer = (event: PointerEvent) => {
      // Preserve the authored pointer handling without intercepting page controls.
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
  const moving = active && !reduced && !paused;
  return <>
    <div ref={root} className="site-atmosphere" aria-hidden="true" data-atmosphere-active={moving}>
      {moving && <div className="shader-frame">
        <PredictiveArcCanvas variant="ribbon-field" speed={1.00} pointerAmount={1.00}
          smoothing={0.035} hue={0} saturation={1.00} brightness={1.00} opacity={1.00} />
      </div>}
    </div>
    {!reduced && <button className="atmosphere-toggle" type="button" aria-pressed={paused}
      onClick={() => setPaused(!paused)} title={locale === 'id' ? 'Jeda animasi latar' : 'Pause background motion'}>
      <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
      <span>{locale === 'id' ? 'Animasi latar' : 'Background motion'}</span>
    </button>}
  </>;
}
''')
change('src/layouts/BaseLayout.astro',"import '../styles/flow-polish.css';","import '../styles/flow-polish.css';\nimport '../styles/atmosphere.css';\nimport SiteAtmosphere from '../components/shared/SiteAtmosphere';\nimport { servicesData } from '../data/services';")
change('src/layouts/BaseLayout.astro','<body>','<body>\n  <SiteAtmosphere client:idle locale={locale} />')
change('src/layouts/BaseLayout.astro',"            <li><a href={'/' + locale + '/services/seo/'}>SEO</a></li>\n            <li><a href={'/' + locale + '/services/web-services/'}>Web Services</a></li>","            {servicesData[locale].map(service => <li><a href={`/${locale}/services/${service.slug}/`}>{service.title}</a></li>)}")
write('src/styles/atmosphere.css','''/* The exact ThreeUI field adds movement to the existing color journey. */
.site-atmosphere { position:fixed; inset:0; z-index:8; pointer-events:none; mix-blend-mode:screen; opacity:.16; contain:strict; }
.site-atmosphere .shader-frame { width:100%; height:100%; }
.atmosphere-toggle { position:fixed; bottom:18px; left:18px; z-index:30; display:flex; align-items:center; justify-content:center; gap:8px; min-width:36px; min-height:36px; padding:6px 10px; color:#d6e8f5; background:rgba(7,17,29,.88); border:1px solid rgba(191,221,243,.24); border-radius:30px; font-size:11px; }
.atmosphere-toggle > span:last-child { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); white-space:nowrap; }
.atmosphere-toggle:is(:hover,:focus-visible) > span:last-child { position:static; width:auto; height:auto; clip-path:none; }
/* Every light field fades to transparent at both boundaries. */
.light-field { position:relative; isolation:isolate; }
.light-field::after { content:''; position:absolute; z-index:-1; inset:0; pointer-events:none;
  background:radial-gradient(ellipse 72% 36% at 28% 44%,#f1f8fa 0%,#d4e7f1 46%,transparent 100%),
    radial-gradient(ellipse 68% 38% at 83% 65%,#8bb4d2 0%,rgba(85,150,204,.65) 54%,transparent 100%),
    linear-gradient(180deg,transparent 0%,rgba(137,177,206,.22) 10%,#b5d1e2 26%,#d5e9f2 43%,#a5c7df 68%,rgba(58,112,156,.25) 88%,transparent 100%);
}
.light-field :is(h2,h3) { color:#0b2033; }
.light-field :is(p,.section-kicker,.text-mono) { color:#28485f; }
.light-field a:focus-visible { outline:2px solid #0b5683; outline-offset:6px; }
@media (prefers-reduced-motion:reduce) { .site-atmosphere,.atmosphere-toggle { display:none; } }
''')
print('Installed and hash-verified the original ThreeUI source and integration.')
