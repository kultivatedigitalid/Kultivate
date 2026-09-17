from pathlib import Path
root=Path('website')
def edit(file,old,new):
 p=root/file;t=p.read_text(encoding='utf-8');assert old in t,file;p.write_text(t.replace(old,new,1),encoding='utf-8',newline='\n')
edit('src/components/work/PortfolioGallery.astro','  .portfolio-grid { position:relative; z-index:1; gap:0; }\n  .portfolio-cluster { row-gap:0; }','  .portfolio-grid { position:relative; z-index:1; }')
edit('src/components/services/ServiceHero.astro','  image?: string;','  serviceId: string;')
p=root/'src/components/services/ServiceHero.astro'
t=p.read_text(encoding='utf-8')
start=t.index('const { title, tagline, locale }')
end=t.index('const imageAlt',start)
t=t[:start]+'''const { title, tagline, locale, serviceId } = Astro.props;
// Hero artwork is separate from the process imagery used by service cards.
const banners: Record<string, string> = {
  'seo': '/assets/banners/seo-gradient.webp',
  'web-services': '/assets/banners/web-services-gradient.webp',
  'social-media-management': '/assets/banners/aeo-geo-gradient.webp',
  'visual-strategy': '/assets/banners/insights-gradient.webp',
};
const image = banners[serviceId] ?? banners.seo;
'''+t[end:]
p.write_text(t,encoding='utf-8',newline='\n')
for locale in ['en','id']:
 edit(f'src/pages/{locale}/services/[slug].astro','    image={service.image}','    serviceId={service.id}')
edit('src/components/insights/EditorialIndexV3.astro','    padding: 0 0 clamp(96px, 11vw, 148px);','    padding: clamp(48px, 6vw, 86px) 0 clamp(96px, 11vw, 148px);')
edit('src/components/insights/EditorialIndexV3.astro','    border-block: 1px solid rgba(89, 106, 130, 0.34);','    border: 0;')
edit('src/components/shared/HeroShell.astro', '''  .hero-shell--insights {
    min-height: max(760px, 100svh);
  }''','''  .hero-shell--insights {
    min-height: max(760px, 100svh);
    /* Fade the whole banner into the shared page atmosphere, including its fill. */
    mask-image: linear-gradient(180deg, #000 0%, #000 58%, rgba(0,0,0,.96) 70%, rgba(0,0,0,.65) 84%, rgba(0,0,0,.24) 94%, transparent 100%);
  }

  .hero-shell--insights .hero-shell__handoff {
    height: clamp(320px, 46vh, 480px);
  }''')
edit('src/styles/atmosphere.css','/* Slate surfaces and restrained image contrast sit comfortably in the light. */','''/* Contrast follows the surface: dark ink on light fields, pale ink on slate. */
#main-content .light-field .section-kicker { color:#203d51; }
#main-content .light-field .principles-layout .text-mono { color:#24465d; }
#main-content .light-field .btn-primary { background:#14364d; border-color:#14364d; color:#f0f6fa; box-shadow:none; }
#main-content .light-field .btn-primary:is(:hover,:focus-visible) { background:#0b273c; border-color:#0b273c; color:#fff; }
#main-content .light-field .learn-series-card__placeholder .series-word { color:rgba(223,237,246,.6); }
#main-content .light-field .learn-series-card__placeholder .series-signal i { background:linear-gradient(90deg,transparent,rgba(186,224,247,.85),transparent); }
#main-content .case-method .deliverable-item svg { color:#164f72; }
#main-content .insights-page :is(.stories-heading .section-label,.result-count,.topic-row > span) { color:#c7d8e5; }

/* Slate surfaces and restrained image contrast sit comfortably in the light. */''')
print('Staging gaps restored, single-object service banners mapped, Blog handoff and light-field contrast refined.')
