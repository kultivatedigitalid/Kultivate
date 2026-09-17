from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]/'website'
def write(p,t): (ROOT/p).write_text(t,encoding='utf-8',newline='\n')
def change(p,a,b):
    t=(ROOT/p).read_text(encoding='utf-8');assert a in t,(p,a[:60]);write(p,t.replace(a,b))
def style(p,s): change(p,'</style>',s+'\n</style>')
change('src/components/about/AboutIndexV3.astro','class="about-partnership flow-section"','class="about-partnership flow-section light-field"')
style('src/components/about/AboutIndexV3.astro','''
  .about-partnership { padding-block:clamp(170px,19vw,270px); }
  .about-partnership :is(h2,h3) { color:#0b2033; }
  .about-partnership :is(p,.partnership-statement) { color:#28485f; }
  .about-partnership .partnership-promises { margin-top:64px; }
  @media(max-width:760px) {
    .about-partnership { padding-block:180px; }
    .about-partnership::after { background:linear-gradient(180deg,transparent,#bfd9e7 16%,#e4f1f7 35%,#b4d1e3 82%,transparent); }
  }
''')

# Let the middle portfolio rows breathe in a continuous field, behind the images.
style('src/components/work/PortfolioGallery.astro','''
  .portfolio-section::after { content:''; position:absolute; z-index:0; inset:0; pointer-events:none;
    background:radial-gradient(ellipse 86% 34% at 25% 50%,#e2f0f7,rgba(148,190,218,.8) 47%,transparent 100%),
      radial-gradient(ellipse 82% 38% at 84% 61%,rgba(108,170,218,.8),transparent 100%); }
  .portfolio-grid { position:relative; z-index:1; gap:clamp(32px,5vw,72px); }
  .portfolio-cluster[data-cluster='1'] { padding-top:clamp(36px,7vw,100px); }
  .portfolio-cluster[data-cluster='2'] { padding-bottom:clamp(36px,7vw,100px); }
''')

# Middle course band uses the same material, without adding cards inside cards.
p='src/components/learn/LearnIndex.astro'
change(p,'''      <div class="learn-series-grid">
        {series.map((item) => (
          <LearnSeriesCard locale={locale} series={item} />
        ))}
      </div>
    </div>''','''    </div>
    {[series.slice(0,2), series.slice(2,4), series.slice(4)].map((group,index) => (
      <div class:list={['learn-course-band', index === 1 && 'light-field']}>
        <div class="container learn-series-grid">
          {group.map(item => <LearnSeriesCard locale={locale} series={item} />)}
        </div>
      </div>
    ))}''')
style(p,'''
  .learn-course-band { padding-block:36px; }
  .learn-course-band.light-field { padding-block:180px; margin-block:30px; }
  .learn-course-band.light-field :global(.learn-series-card h3) { color:#0b2033; }
  .learn-course-band.light-field :global(.learn-series-card p),
  .learn-course-band.light-field :global(.learn-series-card__meta) { color:#294b63; }
  .learn-course-band.light-field :global(.learn-series-card__link) { color:#163e5a; border-color:rgba(18,56,85,.5); }
  .learn-course-band.light-field :global(.learn-series-card__link:hover) { color:#081e31; border-color:#081e31; }
  @media(max-width:780px) { .learn-course-band.light-field::after { background:linear-gradient(180deg,transparent,#bed9e8 12%,#e4f1f7 32%,#aacce3 85%,transparent); } }
''')
change('src/components/learn/LearnSeriesPage.astro','class="learn-related flow-section"','class="learn-related flow-section light-field"')
style('src/components/learn/LearnSeriesPage.astro','''
  .learn-related { padding-block:200px; }
  .learn-related :is(h2,p,.text-mono,.link-hover-arrow) { color:#12334d; }
''')

# A complete featured-story band: the light is behind the content, full bleed.
p='src/components/insights/EditorialIndexV3.astro'
change(p,'  <main\n','  <section\n'); change(p,'  </main>','  </section>')
change(p,"featured: 'Featured story',","featured: 'Artikel pilihan',")
# Restore the English key after replacing both occurrences.
t=(ROOT/p).read_text(encoding='utf-8'); idx=t.index('  : {');t=t[:idx]+t[idx:].replace("featured: 'Artikel pilihan'","featured: 'Featured story'");write(p,t)
change(p,'          {articles.map((article, index) => (\n            <a','          {articles.map((article, index) => (\n            <div class:list={[index === 0 ? \'story-feature light-field\' : \'story-item\']}>\n            <a')
change(p,'            </a>\n          ))}','            </a>\n            </div>\n          ))}')
change(p,'        buttons.forEach((button) => {',"        const feature = root.querySelector<HTMLElement>('.story-feature');\n        if (feature) feature.hidden = cards[0]?.hidden ?? true;\n\n        buttons.forEach((button) => {")
style(p,'''
  .story-item { display:contents; }
  .story-feature { grid-column:1/-1; padding-block:160px; margin-block:-24px 20px; }
  .story-feature::after { left:calc((min(100vw,1440px) - 100vw) / 2 - 10vw); right:calc((min(100vw,1440px) - 100vw) / 2 - 10vw); }
  .story-feature > .story-card { width:100%; }
  .story-feature :is(h3,.story-link) { color:#0c2940; }
  .story-feature :is(p,.story-rank,.story-meta) { color:#2a4c65; }
  .story-feature .story-link { border-color:rgba(16,57,87,.45); }
  .story-feature .story-card:is(:hover,:focus-visible) .story-link { color:#071c2d; border-color:#071c2d; }
  [data-filtered='true'] .story-feature .story-card { display:grid; grid-template-columns:1.18fr .82fr; }
  .story-feature[hidden] { display:none; }
  @media(max-width:1050px) {
    .story-feature { padding-block:160px; }
    .story-feature::after { background:linear-gradient(180deg,transparent,#bfd8e7 15%,#e5f1f7 39%,#b6d2e6 83%,transparent); }
    [data-filtered='true'] .story-feature .story-card { display:block; }
  }
''')

# Existing, inactive case-study templates receive a light approach/deliverables band.
for loc in ['en','id']:
    p=f'src/pages/{loc}/work/[slug].astro'; t=(ROOT/p).read_text(encoding='utf-8')
    # Locate the second and third editorial sections without changing draft routing.
    marker='<section class="case-section card">'; a=t.index(marker);a=t.index(marker,a+len(marker))
    b=t.index("          {project.data.proofStatus",a)
    t=t[:a]+'<div class="case-method light-field">\n          '+t[a:b]+'          </div>\n\n'+t[b:]
    write(p,t)
    style(p,'''
  .case-method { padding-block:160px; }
  .case-method::after { left:calc((100% - 100vw)/2); right:calc((100% - 100vw)/2); }
  .case-method .case-section { background:transparent; border:0; box-shadow:none; }
  .case-method :is(.case-section-title,p,.deliverable-item) { color:#12334d; }
''')

# Brighter source-inspired focus for the diagnostic introduction.
p='src/components/services/WebsiteGrowthRoadmap.astro'
t=(ROOT/p).read_text(encoding='utf-8');a=t.index('    background:\n',t.index('  .roadmap::before')); b=t.index('    transition: opacity',a)
t=t[:a]+'''    background:radial-gradient(ellipse 70% 35% at 35% 45%,#f0f7fa,#cfe5f1 48%,transparent 100%),
      linear-gradient(180deg,transparent,#9ebed5 22%,#e3f0f7 42%,#b8d4e7 72%,transparent);
    mask-image:linear-gradient(180deg,transparent,#000 15%,#000 82%,transparent);
'''+t[b:];write(p,t)
print('Applied smooth light fields across requested pages and existing detail templates.')
