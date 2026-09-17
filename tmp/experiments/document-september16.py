from pathlib import Path

root = Path('website')
def update(path, old, new):
    p = root / path
    text = p.read_text(encoding='utf-8')
    assert old in text, str(p)
    p.write_text(text.replace(old, new, 1), encoding='utf-8', newline='\n')

update('CHANGELOG.md', '# Changelog\n', '''# Changelog

## 2026-09-16 · experiments refinement

- Moved the fixed ThreeUI canvas between a shared background color plane and the content plane. Original source and configured props remain unchanged.
- Muted the light fields to blue-grey, extended their feathered transitions, and harmonized nearby surfaces and imagery.
- Updated Home to “Deep Expertise in Digital Growth” and About to “Digital Partner for Your Priorities”.
- Removed vertical gaps between portfolio rows and added a continuous gradient into Learn's closing invitation.
- Production build and targeted desktop/mobile browser checks pass. Foreground panel interior pixels are unchanged when the canvas is paused; no runtime or local asset errors were found.
''')
update('docs/EXPERIMENTS_2026-09-15.md', '- Shared light field: broad ice-white and blue gradients with transparent masked edges. Dark ink is scoped to the light material. Existing navy background remains underneath.', '- Shared light field: muted blue-grey gradients with long transparent masked edges. Dark ink and slate surfaces are scoped to the light material. Existing navy remains underneath.')
update('docs/EXPERIMENTS_2026-09-15.md', 'The site wrapper composites the field gently over existing backgrounds.', 'The site wrapper composites the fixed field between the background color plane (z-index 0) and the content plane (z-index 2), at z-index 1.')
p = root / 'docs/EXPERIMENTS_2026-09-15.md'
with p.open('a', encoding='utf-8', newline='\n') as f:
    f.write('''
## 16 September revision

The color plane positions muted light fields using section geometry, ResizeObserver, and targeted visibility mutations. It scrolls with the document; the authored ribbon stays fixed to the viewport. No scroll measurement loop is needed. CSS backgrounds remain available before hydration and without JavaScript. Pausing motion and reduced motion retain the color plane.

Light fields extend 160–300 px beyond their sections with long feathering. Slate surfaces and softer image contrast reduce the jump between components and the blue-grey background. Portfolio row gaps and inserted row padding are removed. The Learn closing invitation starts transparent and gradually darkens. Home reads “Deep Expertise in Digital Growth” (localized in ID); About reads “Digital Partner for Your Priorities”.

The 52-page production build passes. Targeted browser checks cover six interior views at desktop/mobile sizes, plus Home in both locales at 1440×900, 1280×720, and 390×844. Home services fit the desktop space below the 72 px header (828/648 px); mobile stacks without horizontal or text overflow. Portfolio row gaps measure exactly 0 px on desktop and mobile. Quiz field fade, Blog filters, motion controls, and reduced motion pass. Runtime errors and failed local requests are empty. Screenshots were visually inspected, including the Learn boundary. Comparing moving/paused foreground captures shows identical panel interior pixels; only the rounded outer edge exposes the background. All three registered source hashes still match.
''')
update('docs/BRAND_IMPLEMENTATION.md', '## Current direction · 15 September 2026', '## Current direction · 16 September 2026')
update('docs/BRAND_IMPLEMENTATION.md', 'Use icy white/blue gradients that fade into the surrounding navy, plus the exact ThreeUI Ribbon Field as an additional motion layer.', 'Use toned-down blue-grey gradients with long fades into the surrounding navy, plus the exact ThreeUI Ribbon Field fixed between background colors and foreground content. Harmonize light-section components with slate surfaces and restrained image contrast.')
update('docs/QA_CHECKLIST.md', '# QA Checklist\n', '''# QA Checklist

## Revision validation · 16 September 2026

- [x] Production build remains 52 pages; targeted desktop/mobile checks have no JavaScript errors or failed local requests.
- [x] Color/ribbon/content planes are 0/1/2; ribbon is fixed and foreground panel interiors remain unaffected.
- [x] Muted gradients, softer surfaces, and the long Learn transition visually inspected.
- [x] Home services fit 1440×900 and 1280×720 in both locales; 390×844 stacks without overflow.
- [x] Portfolio vertical row gaps measure 0 px on desktop and mobile.
- [x] Requested Home/About headings, quiz fade, Blog filters, pause/resume, and reduced motion verified.
- [x] All registered ThreeUI hashes unchanged.
''')
p = root / 'docs/DECISION_LOG.md'
with p.open('a', encoding='utf-8', newline='\n') as f:
    f.write('| 2026-09-16 | D-032 | Place fixed ThreeUI between background colors and content; mute and extend light fields, harmonize foreground surfaces, remove portfolio row gaps, smooth Learn handoff, and update Home/About headings | Latest client visual revision | Client request and browser validation | SiteAtmosphere, atmosphere.css, ServicesGrid, PortfolioGallery, FinalCTA, localized copy | IMPLEMENTED |\n')
update('src/vendor/threeui/README.md', 'The site wrapper owns compositing strength, reduced motion, pause control, pointer forwarding, and remounting after tab visibility changes.', 'The site wrapper owns compositing strength, reduced motion, pause control, pointer forwarding, and remounting after tab visibility changes. The ribbon is fixed above the shared background color plane and below all main content.')
print('September 16 implementation and QA documentation updated.')
