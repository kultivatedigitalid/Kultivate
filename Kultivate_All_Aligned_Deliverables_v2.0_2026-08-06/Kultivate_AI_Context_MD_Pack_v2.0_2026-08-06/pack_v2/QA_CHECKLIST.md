# QA Checklist

## Documentation and version consistency

- [ ] Brand Guideline Book v2.0 is referenced as the governing visual source.
- [ ] `BRAND_IMPLEMENTATION.md` and `WEBSITE_BLUEPRINT.md` are version 2.0 aligned.
- [ ] No active rule references obsolete v1.1 tokens or dimensions.
- [ ] Decision Log, Asset Register, Content Matrix, Pending Inputs, and Changelog are current.

## Build

- [ ] Static production build passes.
- [ ] All ID and EN routes are generated.
- [ ] No custom API route, database, or backend dependency.
- [ ] No broken internal links.

## Brand and visual

- [ ] Background reads as Void Black / Deep Navy, not bright blue.
- [ ] Electric Blue and Cyan Glow are restrained and purposeful.
- [ ] Official v2.0 color tokens are used.
- [ ] Instrument Sans is primary; Space Mono remains supporting.
- [ ] Layout is spacious, aligned, and not condensed.
- [ ] Maximum width and spacing follow the v2.0 layout system.
- [ ] No dense dashboard/bento overload.
- [ ] No literal plant imagery or generic growth icon.
- [ ] No copied benchmark composition or artwork.

## Motion and interaction

- [ ] Static-first behavior is preserved.
- [ ] Micro interactions remain within 150-250 ms.
- [ ] Image/card motion remains within 300-600 ms.
- [ ] Section transitions, when used, remain limited and within 500-800 ms.
- [ ] No heavy WebGL, autoplay background, scroll hijacking, or cursor-following effect.
- [ ] `prefers-reduced-motion` is supported.

## Media and performance

- [ ] Hero/LCP asset is prioritized and not lazy-loaded.
- [ ] Below-the-fold images are lazy-loaded.
- [ ] Images have width, height, responsive sources, and correct formats.
- [ ] Unnecessary client-side JavaScript is removed.
- [ ] Fonts are loaded from approved official sources and optimized.

## Bilingual

- [ ] ID and EN content are complete and approved.
- [ ] Language switch preserves the equivalent route.
- [ ] Canonical and hreflang are correct.
- [ ] Metadata and alt text are localized.
- [ ] No raw machine translation is published.
- [ ] No country flag is used for language switching.

## Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus is visible.
- [ ] Heading order is valid.
- [ ] Skip-to-content is available.
- [ ] Forms have labels, descriptions, errors, and success states.
- [ ] No status depends on color alone.
- [ ] Page language attributes are correct.

## Proof and content integrity

- [ ] No placeholder is public.
- [ ] Client/project assets have permission.
- [ ] Metrics include baseline, period, method, and source.
- [ ] Claims avoid guarantees of ranking, virality, engagement, traffic, or sales.
