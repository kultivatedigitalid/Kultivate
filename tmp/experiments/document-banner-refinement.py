from pathlib import Path
import json
root=Path('website')
assert json.loads(Path('tmp/experiments/qa-service-banners-gaps.json').read_text())['passed']
def append(file,content):
 p=root/file;p.write_text(p.read_text(encoding='utf-8')+'\n'+content,encoding='utf-8',newline='\n')
append('docs/EXPERIMENTS_2026-09-15.md','''## Latest spacing, banner, and contrast refinement

The client clarified that portfolio gaps should match staging rather than disappear. Both the inter-cluster gap and the internal responsive gap now use the original `clamp(12px, 1.5vw, 22px)`; large injected row padding remains absent. This supersedes the earlier zero-gap revision.

Service hero artwork is independent of service-card imagery. SEO and Web restore their original gradient banners. Social uses the existing single orb banner (`aeo-geo-gradient.webp`); Visual uses the existing folded visual surface (`insights-gradient.webp`). Each hero retains one image and the shared banner motion/layout in both languages.

The Blog hero now fades its entire surface into the shared canvas over a longer range. The redundant black veil on the following section and topic separator lines were removed, and topic controls have more breathing room. Light-field labels, controls, placeholder graphics, and case-study icons use surface-appropriate contrast.

Validation: production build passes with 52 pages; all eight localized service pages were checked at 1440 and 390 px with one loaded hero image and no horizontal overflow. Portfolio gaps measure 21.59375 px / 12 px, matching staging. Blog filter interaction passes and the handoff was visually inspected. The service-principles small label measures approximately 8.28:1 on desktop and 4.69:1 on mobile against the rendered background. No page errors or failed local requests were found.
''')
p=root/'docs/QA_CHECKLIST.md';t=p.read_text(encoding='utf-8')
t=t.replace('- [x] Portfolio vertical row gaps measure 0 px on desktop and mobile.','- [x] Latest client revision restores staging portfolio gaps: 21.59375 px at 1440 wide, 12 px at 390 wide, including mobile gaps within clusters.')
t=t.replace('# QA Checklist\n','# QA Checklist\n\n- [x] Latest banner/contrast revision: eight localized service routes at desktop/mobile use one loaded banner image; Blog handoff and filter verified; small light-field label contrast measures 8.28:1 / 4.69:1; 52-page build passes with no browser errors or failed local assets.\n',1)
p.write_text(t,encoding='utf-8',newline='\n')
p=root/'CHANGELOG.md';t=p.read_text(encoding='utf-8').replace('# Changelog\n','''# Changelog

## 2026-09-16 · spacing and banner refinement

- Restored compact portfolio gaps to staging values (12–22 px).
- Separated service hero artwork from service-card imagery; each service uses one abstract banner object in both languages.
- Extended the Blog hero fade and removed the duplicate black veil and topic separator lines.
- Strengthened contrasting labels, controls, and graphics on light surfaces. Production build and targeted desktop/mobile checks pass.
''',1);p.write_text(t,encoding='utf-8',newline='\n')
append('docs/DECISION_LOG.md','| 2026-09-16 | D-034 | Restore staging portfolio spacing, separate single-object service banners from card imagery, smooth Blog handoff, and strengthen light-field contrast | Latest client clarification supersedes zero-gap revision | Client request and visual/browser QA | PortfolioGallery, ServiceHero, localized service routes, HeroShell, EditorialIndexV3, atmosphere.css | IMPLEMENTED |\n')
append('docs/ASSET_REGISTER.md','''## 16 September service banner reuse

No new raster assets were generated. Detail heroes use existing banner artwork independently of card/process imagery: SEO → `seo-gradient.webp`; Web Services → `web-services-gradient.webp`; Social Media Management → `aeo-geo-gradient.webp` (orb); Visual Strategy → `insights-gradient.webp` (folded surface). All paths are under `/assets/banners/` and both locales share the mapping.
''')
print('Latest spacing, banner, transition, and contrast decisions documented.')
