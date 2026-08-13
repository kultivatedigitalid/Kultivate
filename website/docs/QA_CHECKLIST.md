# QA Checklist

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
