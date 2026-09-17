from pathlib import Path
import json,hashlib
ROOT=Path(__file__).resolve().parents[2]/'website'
def write(p,t): (ROOT/p).write_text(t,encoding='utf-8',newline='\n')
def note(p,text):
    t=(ROOT/p).read_text(encoding='utf-8');a=t.index('\n');write(p,t[:a+1]+'\n'+text+'\n'+t[a+1:])
manifest=json.loads((ROOT/'src/vendor/threeui/source-manifest.json').read_text())
for f in manifest['files']: assert hashlib.sha256((ROOT/'src/vendor/threeui'/f['path']).read_bytes()).hexdigest()==f['sha256']
qa=json.loads((ROOT.parent/'tmp/experiments/qa-report.json').read_text()); assert qa.get('passed'),qa.get('failure')
summary='''## Current direction · 15 September 2026

The latest client request takes precedence over the earlier baseline below. Public services are **SEO, Web Services, Visual Strategy, and Social Media Management**, with `Kultivate Services.docx` as the newest content source. Both locales have four service details and a four-service diagnostic.

Use icy white/blue gradients that fade into the surrounding navy, plus the exact ThreeUI Ribbon Field as an additional motion layer. This supersedes earlier dark-only and no-WebGL restrictions for this specific integration. Home services use the supplied sketch and fit a desktop/laptop viewport; mobile stacks vertically. Existing portfolio detail templates remain inactive.

Implementation, source provenance, and validation: [September experiments](EXPERIMENTS_2026-09-15.md).
'''
for p in ['docs/PROJECT_CONTEXT.md','docs/WEBSITE_BLUEPRINT.md','docs/BRAND_IMPLEMENTATION.md']:
    note(p,summary)
    t=(ROOT/p).read_text(encoding='utf-8');t=t.replace('SEO, AEO & GEO, Web Services, and Content Management','SEO, Web Services, Visual Strategy, and Social Media Management');write(p,t)
note('README.md',summary.replace('(EXPERIMENTS_2026-09-15.md)','(docs/EXPERIMENTS_2026-09-15.md)'))
note('docs/CONTENT_MATRIX.md','''## Service content update · 15 September 2026

Source: client-supplied `Kultivate Services.docx`. Public adaptation is centralized in `src/data/services.ts` for ID/EN: summaries, business problems, impacts, inspections, audiences, scope, deliverables, six-phase processes, principles, and specific FAQs.

| Public service | EN and ID route suffix |
|---|---|
| SEO | `/services/seo/` |
| Web Services | `/services/web-services/` |
| Visual Strategy | `/services/visual-strategy/` |
| Social Media Management | `/services/social-media-management/` |

Home, directory, details, footer, consultation options, recommendation weights, recommendation copy, contact prefill, and metadata use the current four-service model. The earlier standalone AEO & GEO / Content Management service model below is historical. Existing Learn content and portfolio proof restrictions remain in place.
''')
note('docs/PENDING_INPUTS.md','''## Resolved scope · 15 September 2026

- Newest service source received: `Kultivate Services.docx`.
- “One segment, one screen” confirmed for desktop/laptop; mobile may stack.
- Light direction confirmed: icy Pinterest white/blue mixed with ROOTS blue glow.
- Portfolio scope confirmed: current gallery and existing inactive detail template.
- Exact Ribbon Field source retrieved; all three registered SHA-256 values verified. No source-retrieval blocker remains.
- New work stays on `experiments`. Previous work was committed as `4c8599a` and pushed to `origin/staging` before continuing. Existing proof, business contact, and content approvals below are unaffected.
''')
with (ROOT/'docs/DECISION_LOG.md').open('a',encoding='utf-8') as f:f.write('''
| 2026-09-15 | D-028 | Adopt the four-service model and copy from Kultivate Services.docx | Latest client content source | Client document and explicit brief | Service data, routes, home, footer, quiz, contact, metadata | IMPLEMENTED |
| 2026-09-15 | D-029 | Use feathered icy light fields within the existing navy journey | Client requests breathing room and ROOTS / Pinterest contrast without hard blocks | Client references and clarified preference | Home, Services, Work, Learn, About, Blog | IMPLEMENTED |
| 2026-09-15 | D-030 | Integrate the exact registered ThreeUI Ribbon Field with unchanged component props | Client explicitly requests this source and movement layer | Source revision fa86582fc870 and verified file hashes | React island, vendored source, Astro aliases | IMPLEMENTED |
| 2026-09-15 | D-031 | Fit the sketch composition in one desktop/laptop screen, stack on mobile; retain inactive work detail routes | Client clarifications | Task replies | ServicesGrid, gallery, detail template | IMPLEMENTED |
''')
note('docs/ASSET_REGISTER.md','''## Added dependencies and assets · 15 September 2026

- ThreeUI Ribbon Field source: `https://threeui.com/source-code/ribbon-field.json`, revision `fa86582fc870`. Three registered files are unmodified; hashes, provenance and MIT license are under `src/vendor/threeui/`.
- Shared CSS includes a Fragment Mono font path although the source bundle lists no assets. Added the official Google Fonts Latin WOFF2 at that same path, with OFL license; see the vendor README for exact URL.
- Existing SEO, Web, social-distribution, and purposeful-craft imagery is reused. Client sketch / WhatsApp references and the raw service document are not copied into public assets.
- React 19 and `@astrojs/react` provide the island runtime. The registered ribbon component itself uses raw WebGL and does not import Three.js.
''')
note('docs/QA_CHECKLIST.md','''## Experiments validation · 15 September 2026

- [x] Production build: 52 static pages, including four service routes per locale.
- [x] Seven diagnostic tests pass, including all 1,024 combinations and both new services.
- [x] Desktop ID/EN pages: Home, About, Services, Learn, Blog, Work, Visual Strategy, Social Media Management; no horizontal overflow, broken images, or JavaScript errors.
- [x] Services fit the available viewport at 1440×900, 1366×768, 1280×720, and 1024×768 in ID/EN; text stays inside all panels.
- [x] Mobile 390×844 checks on the same eight pages in both locales.
- [x] Pointer response, motion pause/resume, reduced-motion behavior, Blog filters, service FAQ, mobile menu and Escape.
- [x] Visual/Social diagnostic → service detail links → contact prefill; no form submission sent.
- [x] Original component, shader and CSS checksums match the requested source.
- [x] Gallery and inactive work template updated; no new case studies published.

Browser checks ran on the production preview using local Edge/Playwright. In-app automation was unavailable due to the host ACL issue; `astro dev --background` also timed out after the runtime change, so the working preview uses `astro preview --background`. Build and production-browser checks passed. Existing unrelated launch checks remain below.
''')
note('docs/CHANGELOG.md','''## 2026-09-15 · experiments

- Saved previous work on staging: `4c8599a`, pushed to `origin/staging`.
- Added Visual Strategy and Social Media Management, updated source-driven bilingual copy across the acquisition journey, and expanded the local diagnostic.
- Rebuilt home services from the client sketch with a desktop viewport fit and vertical mobile layout.
- Added seamless pale-blue light fields in the requested page sections and existing case-study templates.
- Integrated the hash-verified ThreeUI Ribbon Field with the supplied props, pointer response, reduced motion, and a pause control.
- Verified production build, diagnostic tests, responsive pages, links and interactions. See [implementation notes](EXPERIMENTS_2026-09-15.md).
''')
write('docs/EXPERIMENTS_2026-09-15.md','''# September experiments

## Scope and source

Branch: `experiments`, based on staging commit `4c8599a`. That prior commit was pushed before new implementation. The client document `Kultivate Services.docx` governs new service copy; its internal strategy notes were treated as source material, not operational instructions.

Four public services: SEO, Web Services, Visual Strategy, Social Media Management. SEO and Web start with business, buyer, demand, then architecture and conversion. Visual Strategy starts with meaning and communication clarity. Social Media Management turns real expertise into a consistent market presence. No invented performance claims, packages, prices, or guarantees were added.

## Design and implementation

- Home: heading left, supporting text right; joined SEO/Web panels on the left, Social/Visual stacked on the right. One desktop/laptop viewport, auto-height vertical mobile layout.
- Shared light field: broad ice-white and blue gradients with transparent masked edges. Dark ink is scoped to the light material. Existing navy background remains underneath.
- Locations: home services; service hub diagnostic; service-detail principles; middle gallery; existing work-detail approach/deliverables; middle Learn directory and course related-service section; About partnership; Blog featured story.
- The existing gallery remains a gallery. Draft work entries stay excluded from production routes.
- Service data supplies all eight localized detail routes. Footer, form choices and contact prefill support all four services. The five-question browser-only diagnostic includes Visual and Social weights and copy.

## Motion source

Source bundle: https://threeui.com/source-code/ribbon-field.json. Registered files are vendored unchanged under `src/vendor/threeui/`, with manifest and license. The local facade supplies the requested `PredictiveArcCanvas` import, which is absent from the registered three-file bundle. It selects the original RibbonFieldBackground without modifying its implementation.

Props: `variant="ribbon-field"`, speed 1, pointerAmount 1, smoothing 0.035, hue 0, saturation 1, brightness 1, opacity 1. The site wrapper composites the field gently over existing backgrounds. It forwards pointer coordinates, skips animation under reduced motion, provides pause/resume, and remounts on visibility restoration. Component shaders, smoothing, resize behavior, and asset paths are unchanged.

## Validation

Production build: 52 pages. Seven meaningful diagnostic tests pass, covering 1,024 combinations, four strong-service scenarios, invalid input, and complementary recommendations.

Production Edge/Playwright checks covered eight page types in ID/EN at 1440×900 and 390×844. Home viewport-fit checks additionally covered 1366×768, 1280×720 and 1024×768 in both locales. No horizontal overflow, broken images, local request failures, or page JavaScript errors were found. All service text stays inside its panels; the decorative images intentionally crop on hover.

Verified pointer uniform changes, pause/resume, reduced motion, new-service recommendations and contact prefill, Blog filters, FAQ and mobile menu/Escape. Forms were not submitted. Original source hashes were rechecked. Screenshots were visually inspected for contrast and feathered edges; local QA artifacts are in the workspace `tmp/experiments/` directory and are not site assets.

The host blocked in-app automation with an ACL failure. The supported Astro development background launcher subsequently timed out after adding React. Production preview works at http://127.0.0.1:4321/en/ using `astro preview --background`; this is the browser target used for validation.
''')
print('Updated repository context, source register, decisions and QA evidence.')
