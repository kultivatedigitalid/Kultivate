from pathlib import Path
p=Path('website/src/styles/atmosphere.css');t=p.read_text(encoding='utf-8')
t=t.replace('#main-content .light-field .section-kicker { color:#203d51; }','#main-content .light-field .section-kicker { color:#0b2033; }')
t += '''
/* The Blog hero fades to the shared canvas; a second black veil would restart
   that transition at a hard edge beneath the banner. */
#main-content .insights-page > .hero-shell--insights + .editorial::before { display:none; }
'''
p.write_text(t,encoding='utf-8',newline='\n')
print('Removed duplicate Blog veil; strengthened small-label contrast.')
