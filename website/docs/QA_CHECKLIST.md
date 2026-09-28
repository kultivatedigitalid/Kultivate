# QA Checklist

## Banner scale and Home frame pacing · 25 September 2026

- [x] Services and Learn artwork at 76% scale; Services at 72% opacity; soft artboard edges. Desktop and mobile final screenshots reviewed.
- [x] Home live SVG filters replaced with cached Canvas 2D lighting, capped at 1280 × 720. The original upper-right-to-lower-left curve, four-second entrance, front-surface glow and static final image remain.
- [x] Same software-rendered Edge profile before/after: original median frame intervals 399.9/316.6ms, revised 16.7/16.7ms; p95 and cold-start limitations recorded in motion-system.md.
- [x] Home paused pixels remain unchanged; reveal alpha decreases; completion and no-replay behavior pass. Occluded ribbon canvases are absent during Home entrance and return below the hero. Reduced motion and 390px layout pass.
- [x] 78-page build, nine existing tests and diff whitespace checks pass. Browser validation has no runtime errors or failed responses. Artifacts: revision11-validation.json, revision11-perf-*.json and revision11-*.jpg.

## Symbols, heroes and dark privacy revision · 25 September 2026

- [x] 78-page production build and nine existing tests pass after cleanup; internal links, anchors and assets are intact.
- [x] All four SVG symbols have visible front/back depth. Social is frontal; SEO has no lettering; Web uses monitor and gear. Hover expansion and animation rate changes pass browser assertions.
- [x] New Services/Learn artwork loads, light reveals settle once at 6.133s, and reduced motion remains static. Services artwork and masks share a fixed rightward perspective.
- [x] Home has no horizontal overflow at 1366, 390 and 320px; desktop idle/hover and mobile screenshots reviewed.
- [x] Dark EN/ID privacy layouts tested at 1366 and 390px. Contents scroll independently, all anchors exist, and page position does not move when the contents list scrolls. This approved visual revision supersedes the earlier byte-for-byte style-freeze check below.
- [x] 42 images and 11 unreferenced components removed after source, dynamic-path and complete built-output checks. Recovery copies are outside the project. 67 tracked legacy QA files and browser profiles archived outside the codebase; `/tmp/` is now ignored.
- [x] Focused browser run: no runtime exceptions or failed responses. Evidence: revision10-validation.json, revision10-cleanup-proof.json, revision10-*.jpg.

## Privacy and motion revision · 25 September 2026

- [x] Production build: 78 pages. Existing quiz suite: 7 tests, including all 1,024 combinations. `git diff --check` passes.
- [x] All eight localized service-detail routes use the requested asset mapping. Four desktop/mobile hero compositions and reveal frames reviewed.
- [x] Ten banner timelines verified at 1.5×: Home 4s; Services/Learn 6.133s; other layered heroes 4.133s. Completed heroes settle to static posters.
- [x] Original ThreeUI file hashes unchanged. Document-anchored repeats verified on twelve page types/routes, including contact, privacy, article, case-study and Learn detail. At most three nearby canvases; shared pause/resume and reduced-motion checks pass. Privacy's opaque visual surface remains unchanged above the shared background.
- [x] Blog filter still works and stray “Filtered stories” text is absent. Related Insight fallback is absent from service details; actual Learn course links remain.
- [x] EN/ID Privacy Policy: 13 matching sections, equivalent substantive decisions, date 25 September 2026, controller/contact, no street address or public Formspree naming. All TOC anchors, footer links and actual locale-switch navigation pass.
- [x] Privacy layouts at 1440/390/320px show no horizontal overflow. Desktop/mobile screenshots reviewed. PrivacyPolicy.astro is byte-for-byte unchanged (SHA-256 1d1024f0cce1c9e44f4007c70a57a96dfaca89a751ccf9f42504cfe8cd6d8162).
- [x] Contact acknowledgement remains required and links to the locale policy; marketing consent remains optional and unchecked. Both languages submit `consent=acknowledged` and explicit `marketing_consent=yes/no`; checked and unchecked cases trigger the existing success state. Provider responses were intercepted locally, so no test inquiry was sent to external email/Sheets.
- [x] Input labels/required semantics and consent link targets checked. No GA/GTM, Meta, Hotjar or Clarity network requests observed; identifiers remain empty and analyticsConsentRequired is true. No Stripe code or visual assets introduced. Existing click-to-load YouTube and local Learn storage implementation preserved.
- [x] No JavaScript runtime exceptions in completed browser QA. Artifacts: revision9-validation.json and revision9-*.jpg in the task visualization folder.
- [ ] Operational verification: Formspree plan/submission archive retention and existing delivery/copying into email/Google Sheets. The email/Sheets flow is owner-confirmed, not verified through the provider account in this task.
- [ ] Assign and operate the email/Sheets retention review and deletion process. Implement a consent mechanism before any future GA4/GTM activation.


- [x] Latest banner/contrast revision: eight localized service routes at desktop/mobile use one loaded banner image; Blog handoff and filter verified; small light-field label contrast measures 8.28:1 / 4.69:1; 52-page build passes with no browser errors or failed local assets.

- [x] Latest scroll revision: Home and Learn at 1440/390 px retain absolute document coordinates from top to bottom, render at most three canvases, preserve pause/reduced motion, and report no runtime errors, failed local requests, or WebGL context warnings.

## Revision validation · 16 September 2026

- [x] Production build remains 52 pages; targeted desktop/mobile checks have no JavaScript errors or failed local requests.
- [x] Color/ribbon/content planes are 0/1/2; ribbon repeats at fixed document coordinates while foreground content stays above it.
- [x] Muted gradients, softer surfaces, and the long Learn transition visually inspected.
- [x] Home services fit 1440×900 and 1280×720 in both locales; 390×844 stacks without overflow.
- [x] Latest client revision restores staging portfolio gaps: 21.59375 px at 1440 wide, 12 px at 390 wide, including mobile gaps within clusters.
- [x] Requested Home/About headings, quiz fade, Blog filters, pause/resume, and reduced motion verified.
- [x] All registered ThreeUI hashes unchanged.

## Experiments validation · 15 September 2026

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


## Documentation and version consistency

- [x] Brand Guideline Book v2.0 is referenced as the governing visual source.
- [x] `BRAND_IMPLEMENTATION.md` and `WEBSITE_BLUEPRINT.md` are version 2.0 aligned.
- [x] No active rule references obsolete v1.1 tokens or dimensions.
- [x] Decision Log, Asset Register, Content Matrix, Pending Inputs, and Changelog are current.

## Build

- [x] Static production build passes.
- [x] All ID and EN routes are generated.
- [x] No custom API route, database, or backend dependency.
- [x] No broken internal links.

## Brand and visual

- [x] Background reads as Void Black / Deep Navy, not bright blue.
- [x] Electric Blue and Cyan Glow are restrained and purposeful.
- [x] Official v2.0 color tokens are used.
- [x] Instrument Sans is primary; Space Mono remains supporting.
- [x] Layout is spacious, aligned, and not condensed.
- [x] Maximum width and spacing follow the v2.0 layout system.
- [x] No dense dashboard/bento overload.
- [x] No literal plant imagery or generic growth icon.
- [x] No copied benchmark composition or artwork.

## Motion and interaction

- [x] Static-first behavior is preserved.
- [x] Micro interactions remain within 150-250 ms.
- [x] Image/card motion remains within 300-600 ms.
- [x] Section transitions, when used, remain limited and within 500-800 ms.
- [x] No heavy WebGL, autoplay background, scroll hijacking, or cursor-following effect.
- [x] `prefers-reduced-motion` is supported.

## Media and performance

- [x] Hero/LCP asset is prioritized and not lazy-loaded.
- [x] Below-the-fold images are lazy-loaded.
- [x] Images have width, height, responsive sources, and correct formats.
- [x] Unnecessary client-side JavaScript is removed.
- [ ] Fonts are loaded from approved official sources and optimized.

## Bilingual

- [ ] ID and EN content are complete and approved.
- [x] Language switch preserves the equivalent route.
- [x] Canonical and hreflang are correct.
- [x] Metadata and alt text are localized.
- [ ] No raw machine translation is published.
- [x] No country flag is used for language switching.

## Accessibility

- [ ] Keyboard navigation works.
- [x] Focus is visible.
- [ ] Heading order is valid.
- [x] Skip-to-content is available.
- [ ] Forms have labels, descriptions, errors, and success states.
- [ ] No status depends on color alone.
- [x] Page language attributes are correct.

## Proof and content integrity

- [x] No placeholder is public.
- [x] Client/project assets have permission.
- [ ] Metrics include baseline, period, method, and source.
- [x] Claims avoid guarantees of ranking, virality, engagement, traffic, or sales.

## Audit Run - 2026-08-10

- `npm run build`: passed, 22 static pages.
- Internal link scan: 22 HTML files, 0 missing internal targets.
- Visual QA: desktop 1440 x 1000 and mobile 390 x 844.
- Mobile DOM metrics: no horizontal overflow; header, hero copy, and CTA controls remain inside the viewport.
- Homepage source audit: no `transition: all`, gradient text, scroll listener, `100vh`, or `h-screen` pattern.
- Production Sounds Right webfont remains intentionally unchecked until P-013 is supplied.
## Revision Audit Run - 2026-08-10

- ID homepage rendered headings, section labels, service roles, and strategic card titles are Indonesian; technical channel keywords remain English where clearer.
- Desktop visual QA: hero, Connected System, Why Kultivate, and Final CTA at 1440 x 1000.
- Mobile visual QA and DOM metrics: 390 x 844, `documentScrollWidth` 375, every audited section width within 375, zero horizontal overflow.
- Every homepage pointer interaction has an explicit hover state; press feedback is 100-220 ms and keyboard focus is immediate.
- Connected System is responsive at four, two, and one column breakpoints.
- Final CTA ambient motion and Connected System pulse stop under reduced motion.

## Luminous Homepage Revision Audit - 2026-08-10

- Production build passes with 22 static pages.
- Desktop hero renders as a two-line Indonesian heading in the upper third at 1440 x 900.
- Mobile hero content begins below the navigation and remains fully inside the 390 x 844 viewport.
- Blue-cyan color remains atmospheric, keeps body copy legible, and does not become a full bright section fill.
- Final CTA preserves the left-copy/right-action desktop structure and uses a luminous horizon instead of the previous sphere.
- Localized ID headings and unchanged EN headings were verified in generated HTML.
## Responsive Insights and Seamless Flow Audit - 2026-08-10

- Production build passes with 22 static pages.
- Desktop browser QA at 1440 x 900: the 834.75 px Insights section fits within one viewport; three cards fit a 1248 px track with equal client and scroll widths; inactive carousel controls are hidden.
- Mobile browser QA at 390 x 844: Insights track scrolls from 0 to 282 px, previous control becomes enabled, and controls remain visible.
- Hover changes card transform and surface; slow ambient visual transform changes over time.
- Navbar-to-language gap is 82.7 px at desktop width.
- Final CTA content is center-aligned on desktop and mobile.
- Desktop and mobile document widths match their viewports; no horizontal overflow.
- Browser page and console error list is empty.
- Reduced-motion fallbacks remain implemented for ambient loops.
## Continuous Homepage Canvas Audit - 2026-08-10

- Every direct homepage section uses a transparent computed background over one shared blue-navy field.
- Hero media, scrim, and color layers fade into the shared field during the final 16% of hero height.
- Boundary samples were taken at left, center, and right positions for every section transition.
- Maximum summed RGB delta across the tested boundaries is 4; no hard seam was detected.
- Desktop viewport and document widths are both 1440 px.
- Browser page and console error list is empty.
## Full-Site Revision Audit - 2026-08-13

- npm run build: passed with 34 static pages.
- Desktop browser QA at 1280 x 800 and mobile QA at 390 x 844: zero horizontal overflow.
- Portfolio desktop layout: 12 items, four rows, three asymmetric items per row.
- Services desktop media: three equal 544 x 408 px visuals; left-right-left order preserved.
- Four unique interior hero images verified for Portfolio, Services, Blog, and Start a Project.
- Homepage and interior hero headings reduced; CTA buttons contain no arrow glyphs.
- Six article detail routes generated per locale and linked from Home and Blog.
- English render audit found no selected Indonesian carryover terms.
- Newly generated raster assets are WebP; largest remaining public asset is below 1.3 MB.
- Reduced-motion fallbacks remain present for hero, portfolio, service, and CTA ambient motion.
## About Principles Interaction Audit - 2026-08-24

- `npm run build`: passed with 36 static pages.
- The initial diagram is centered and retains the four-part circular silhouette from the approved sketch.
- Desktop focus QA verified the selected quadrant expands to 2.42x while the other three contract; explanatory content fades in without layout shift.
- Hover, keyboard focus, click/touch enhancement, Escape reset, and reduced-motion fallbacks are implemented.
- The interaction uses CSS transforms and semantic buttons instead of WebGL, preserving the static-first architecture and accessibility.
- The generated WebP background remains decorative behind a multi-layer blue-black readability scrim.
- Post-change Impeccable detector returned no findings for `AboutOrbit3D.astro`.
## About Collage and Principles Revision Audit - 2026-08-25

- `npm run build`: passed with 36 static pages.
- Impeccable post-change detector returned no findings for both About components.
- The desktop pie idle size is 260 px, reduced from the previous 380 px maximum, while the active slice remains approximately 442 px.
- Contextual imagery, slice expansion, and explanatory copy share the same hover/focus/touch state; desktop and mobile detail bounds remain inside the active slice.
- Mobile QA at 390 px confirms the active slice shifts into the viewport, its copy fits vertically, and document width remains 390 px with no horizontal overflow.
- The culture marquee contains two rows of six unique WebP images; the upper row moves right and the lower row moves left.
- Focus/hover QA confirms the active marquee row pauses, retains a 24.48 px image gap at 1440 px, and enlarges the image in the requested outward direction.
- Journey heading QA confirms a 24.48 px regular text treatment with no horizontal overflow.
- Reduced-motion fallbacks stop marquee motion and remove transform transitions.
## Phase 2 Features and Expertise Audit - 2026-08-26

- Production build passes with 36 generated static pages.
- Internal-link scan covers 36 HTML pages with zero missing local targets.
- CDP browser QA at 1440 x 900 and 390 x 844 covers Services, SEO detail, Insights, Work, About, and Contact.
- Every audited desktop and mobile page reports document scroll width equal to client width; the intentionally offscreen About marquee does not create document overflow.
- Website Growth Roadmap exposes five labeled questions and 15 choices, returns exactly one local result, and links to the selected service route without sending or storing answers.
- Service problem selection updates cause, business impact, and inspection focus; each page renders four working artifacts and six qualification FAQs.
- Guided learning paths expose three pathways plus All, filter six articles to two per path, combine correctly with topic filters, and keep Indonesian result labels localized.
- Work renders 12 visible Concept Study labels and one page-level disclosure; no client relationship or performance metric is claimed.
- About renders four role-level delivery bios, no public individual profile cards, no unverified founding year, and 12 editorial-illustration alt labels.
- Contact renders three explicit after-submit steps.
- Runtime exception list is empty during the interaction run.
- English built-output parity checks pass for every Phase 2 surface.
- Visual inspection passed for the desktop Roadmap result, desktop learning-path chooser, and 390 px mobile Roadmap form.
- The in-app browser connection was unavailable because the Windows sandbox helper could not apply OneDrive read ACLs; local Edge CDP was used for equivalent render and interaction QA.
