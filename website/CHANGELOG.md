# Changelog

## [0.5.2] - 2026-08-25

### Added

- Added 12 generated, optimized WebP working-process images to the About culture section.
- Added two continuously rotating photo rows with opposite directions, pause-on-hover/focus, and directional image enlargement.
- Added one contextual image to each expanded About principle slice.

### Refined

- Reduced the principles pie idle size while preserving its previous desktop active size.
- Synchronized slice imagery and copy to one hover, focus, or touch state and kept the revealed copy inside the slice at desktop and mobile sizes.
- Returned the principles section to the continuous page background and removed the isolated full-section image field.
- Restyled â€œA clear path, built with youâ€ as readable regular text and replaced the progress width animation with a transform.

### Verified

- Production build passes with 36 generated static pages.
- Desktop and 390 px mobile QA confirm fitted slice copy, no horizontal overflow, paused marquee interaction, and reduced-motion coverage.

## [0.5.1] - 2026-08-24

### Added

- Added a generated image field with a directional gradient scrim behind the About principles interaction.
- Added bilingual, explicit company-purpose copy for Our Story while keeping the unverified founding year unpublished.

### Refined

- Rebuilt the About principles visual as a centered four-part diagram that expands and contracts smoothly from each inner corner.
- Added resilient hover, focus, touch, Escape, and reduced-motion behavior without introducing WebGL or a continuous render loop.

### Verified

- Production build passes with 36 generated static pages.
- Desktop interaction QA confirms the active quadrant expands to 2.42x and its detail content becomes readable without layout shift.

## [0.5.0] - 2026-08-13

### Added

- Added six portfolio entries for a 12-work editorial gallery with three asymmetric items per desktop row.
- Added six concise bilingual articles and 12 generated article detail routes.
- Added four page-specific hero banners for Portfolio, Services, Blog, and Start a Project.
- Added a provisional Kultivate wordmark asset and Kultivate favicon to replace the Astro preview mark.

### Refined

- Reduced homepage and interior hero heading scale while preserving centered homepage alignment.
- Darkened portfolio imagery and retained restrained ambient motion with reduced-motion fallbacks.
- Removed arrows from button CTAs and standardized text-link arrows to a horizontal right arrow.
- Made all service index images a consistent 4:3 size while preserving the left-right-left sequence.
- Smoothed hero-to-content transitions and optimized the hero and About assets from PNG to WebP.
- Corrected English portfolio alt text and adapted all new Indonesian article copy into natural English.

### Verified

- Production build passes with 34 static pages.
- Desktop visual QA at 1280 x 800 and mobile QA at 390 x 844 report zero horizontal overflow.
- Portfolio QA confirms four rows of three items at desktop.
- Service image QA confirms three equal 544 x 408 px visuals at the audited viewport.
- All six article links resolve in both locales; rendered English pages contain no audited Indonesian carryover.

## [0.4.4] - 2026-08-10

### Refined

- Replaced per-section homepage backgrounds with one continuous full-page blue-navy atmospheric field.
- Made Services, Connected System, Why Kultivate, Insights, and Final CTA transparent to the shared canvas.
- Faded hero media, scrim, and color layers into the shared background to remove the first section boundary.

### Verified

- Computed backgrounds are transparent for every homepage section.
- Maximum sampled RGB change across all section boundaries is 4.
- Desktop document width matches the 1440 px viewport and browser QA reports zero errors.
## [0.4.3] - 2026-08-10

### Refined

- Made the homepage Insights area a three-up desktop composition that fits without horizontal overflow and a user-controlled mobile carousel.
- Added slow, transform-only ambient motion and clear hover, focus, active, and disabled states to the Insights cards and controls.
- Moved the desktop navigation cluster right and separated the language switcher from the primary menu.
- Centered the Final CTA composition and unified homepage sections with a continuous blue-navy gradient field.
- Replaced the Connected System introduction with concise journey-focused copy.

### Verified

- Production build: 22 static pages.
- Browser QA: 1440 x 900 desktop and 390 x 844 mobile.
- Zero page or console errors; zero horizontal document overflow.
- Desktop Insights: three cards, no track overflow; mobile carousel controls and scroll movement verified.
## [0.4.2] - 2026-08-10

### Refined

- Returned homepage headings, section labels, service roles, and strategic card titles to the active locale.
- Lifted hero content into the upper third and reduced the desktop heading to two lines.
- Added a livelier but restrained blue-cyan atmosphere across the hero and supporting sections.
- Rebuilt the Final CTA visual as a luminous navy horizon while preserving the earlier left-copy/right-action structure.
- Kept ambient motion transform-only with reduced-motion fallbacks.

### Verified

- Production build: 22 static pages.
- Visual QA: 1440 x 900 desktop and 390 x 844 mobile.
- Hero copy, responsive wrapping, localized headings, system flow, and CTA structure.

## [0.4.1] - 2026-08-10

### Refined

- Reduced hero heading scale and verified the complete 390 px composition without horizontal overflow.
- Standardized homepage display headings, section kickers, service roles, and strategic titles in English for both locale modes.
- Reframed Connected System as a four-stage attention-to-action journey with explicit user questions and a continuous feedback loop.
- Added small English section labels to every homepage section and corrected the Why Kultivate heading collision.
- Added explicit hover, active, disabled, and arrow feedback across homepage buttons, cards, navigation, and carousel controls.
- Added a restrained animated gradient sphere and light beam to the Final CTA with reduced-motion support.
- Kept keyboard focus immediate instead of replaying pointer-hover animation.
## [0.4.0] - 2026-08-10

### Added

- Added project-generated dark blue abstract WebP visuals for the hero and three homepage services.
- Added Sounds Right as a selective local display-font role with Instrument Sans fallback; licensed production webfont remains pending.
- Added a visual connected-system flow and a user-controlled horizontal Insights carousel.

### Redesigned

- Rebuilt the bilingual homepage hero around concise copy, cinematic black-blue depth, and calmer translucent CTAs.
- Changed Services to show all three offerings together on desktop with service-specific left-to-right image reveals on hover or focus.
- Reduced card chrome, borders, copy length, and decorative UI while preserving clear hierarchy.

### Fixed

- Prevented placeholder Work and Insights entries from generating public detail routes.
- Corrected mobile hero title overflow and verified the 390 px layout has no horizontal overflow.
- Corrected locale links on the shared 404 route.
- Verified 22 static pages, zero missing internal link targets, and no temporary QA artifacts in production.
## [0.3.0] - 2026-08-07

### Added

- Completed all remaining bilingual page routes (`/id/` and `/en/`) for Work, Work Detail, Service Detail, About, Insights, Insights Detail, Contact, Privacy, and 404.
- Created reusable components for Work (`ProjectCard`, `CaseStudyHeader`, `NextProject`), Services (`ServiceHero`, `ServiceProblems`, `ServiceScope`, `ServiceProcess`, `ServiceFAQ`), and Content (`InsightCard`, `InsightHeader`).
- Integrated dynamic Astro content collection loaders for `work` and `insights` with locale-isolated ID generation (`generateId`).
- Configured static contact form with fallback CTAs (WhatsApp & Email) and progressive accessibility enhancement.
- Added localized 404 landing page (`404.astro`).

### Refined

- Enhanced language switcher in `BaseLayout.astro` to prevent active-state hash jumps and preserve dynamic locale routes.
- Updated `docs/CONTENT_MATRIX.md` to reflect full route coverage across ID and EN locales.
- Validated complete static site compilation (`26 page(s) built in static mode with zero errors`).

## [0.2.0] - 2026-08-06

### Aligned

- Adopted Kultivate Brand Guideline Book v2.0 as the governing visual source.
- Updated Brand Implementation to version 2.0.
- Updated Website Blueprint to version 2.0.
- Standardized official v2.0 color tokens and proportions.
- Standardized layout values: 12/8/4 columns, 1280-1440 px max width, 96-160 px section spacing, 12-24 px radii.
- Standardized motion values: 150-250 ms micro, 300-600 ms image/card, 500-800 ms limited section transition.
- Reinforced Instrument Sans and Space Mono roles.
- Synchronized AI documentation governance across the pack.
- Corrected the selected concept reference asset path.

### Preserved

- Astro static output.
- Full ID/EN requirement.
- Lazy-loading policy.
- Evidence and permission controls.
- Concept 01 static-first direction.

## [0.1.0] - 2026-08-06

### Added

- Initial AI context pack.
- Website Blueprint v1.0.
- Brand implementation baseline.
- Bilingual route and content requirements.
- Static-first motion policy.
- Lazy-loading policy.
