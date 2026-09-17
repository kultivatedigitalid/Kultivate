# September experiments

## Scope and source

Branch: `experiments`, based on staging commit `4c8599a`. That prior commit was pushed before new implementation. The client document `Kultivate Services.docx` governs new service copy; its internal strategy notes were treated as source material, not operational instructions.

Four public services: SEO, Web Services, Visual Strategy, Social Media Management. SEO and Web start with business, buyer, demand, then architecture and conversion. Visual Strategy starts with meaning and communication clarity. Social Media Management turns real expertise into a consistent market presence. No invented performance claims, packages, prices, or guarantees were added.

## Design and implementation

- Home: heading left, supporting text right; joined SEO/Web panels on the left, Social/Visual stacked on the right. One desktop/laptop viewport, auto-height vertical mobile layout.
- Shared light field: muted blue-grey gradients with long transparent masked edges. Dark ink and slate surfaces are scoped to the light material. Existing navy remains underneath.
- Locations: home services; service hub diagnostic; service-detail principles; middle gallery; existing work-detail approach/deliverables; middle Learn directory and course related-service section; About partnership; Blog featured story.
- The existing gallery remains a gallery. Draft work entries stay excluded from production routes.
- Service data supplies all eight localized detail routes. Footer, form choices and contact prefill support all four services. The five-question browser-only diagnostic includes Visual and Social weights and copy.

## Motion source

Source bundle: https://threeui.com/source-code/ribbon-field.json. Registered files are vendored unchanged under `src/vendor/threeui/`, with manifest and license. The local facade supplies the requested `PredictiveArcCanvas` import, which is absent from the registered three-file bundle. It selects the original RibbonFieldBackground without modifying its implementation.

Props: `variant="ribbon-field"`, speed 1, pointerAmount 1, smoothing 0.035, hue 0, saturation 1, brightness 1, opacity 1. The site wrapper composites the document-anchored repeated field between the background color plane (z-index 0) and the content plane (z-index 2), at z-index 1. It forwards pointer coordinates, skips animation under reduced motion, provides pause/resume, and remounts on visibility restoration. Component shaders, smoothing, resize behavior, and asset paths are unchanged.

## Validation

Production build: 52 pages. Seven meaningful diagnostic tests pass, covering 1,024 combinations, four strong-service scenarios, invalid input, and complementary recommendations.

Production Edge/Playwright checks covered eight page types in ID/EN at 1440×900 and 390×844. Home viewport-fit checks additionally covered 1366×768, 1280×720 and 1024×768 in both locales. No horizontal overflow, broken images, local request failures, or page JavaScript errors were found. All service text stays inside its panels; the decorative images intentionally crop on hover.

Verified pointer uniform changes, pause/resume, reduced motion, new-service recommendations and contact prefill, Blog filters, FAQ and mobile menu/Escape. Forms were not submitted. Original source hashes were rechecked. Screenshots were visually inspected for contrast and feathered edges; local QA artifacts are in the workspace `tmp/experiments/` directory and are not site assets.

The host blocked in-app automation with an ACL failure. The supported Astro development background launcher subsequently timed out after adding React. Production preview works at http://127.0.0.1:4321/en/ using `astro preview --background`; this is the browser target used for validation.

## 16 September revision

The color plane positions muted light fields using section geometry, ResizeObserver, and targeted visibility mutations. It scrolls with the document. The latest client clarification anchors the authored ribbon to the document as well, repeating it down the full page with overlapping feathered edges. Nearby repeats alone mount, and inactive WebGL contexts are released by the wrapper. No scroll measurement loop is needed. CSS backgrounds remain available before hydration and without JavaScript. Pausing motion and reduced motion retain the color plane.

Light fields extend 160–300 px beyond their sections with long feathering. Slate surfaces and softer image contrast reduce the jump between components and the blue-grey background. Portfolio row gaps and inserted row padding are removed. The Learn closing invitation starts transparent and gradually darkens. Home reads “Deep Expertise in Digital Growth” (localized in ID); About reads “Digital Partner for Your Priorities”.

The 52-page production build passes. Targeted browser checks cover six interior views at desktop/mobile sizes, plus Home in both locales at 1440×900, 1280×720, and 390×844. Home services fit the desktop space below the 72 px header (828/648 px); mobile stacks without horizontal or text overflow. Portfolio row gaps measure exactly 0 px on desktop and mobile. Quiz field fade, Blog filters, motion controls, and reduced motion pass. Runtime errors and failed local requests are empty. Screenshots were visually inspected, including the Learn boundary. Comparing moving/paused foreground captures shows identical panel interior pixels; only the rounded outer edge exposes the background. All three registered source hashes still match.

## Latest spacing, banner, and contrast refinement

The client clarified that portfolio gaps should match staging rather than disappear. Both the inter-cluster gap and the internal responsive gap now use the original `clamp(12px, 1.5vw, 22px)`; large injected row padding remains absent. This supersedes the earlier zero-gap revision.

Service hero artwork is independent of service-card imagery. SEO and Web restore their original gradient banners. Social uses the existing single orb banner (`aeo-geo-gradient.webp`); Visual uses the existing folded visual surface (`insights-gradient.webp`). Each hero retains one image and the shared banner motion/layout in both languages.

The Blog hero now fades its entire surface into the shared canvas over a longer range. The redundant black veil on the following section and topic separator lines were removed, and topic controls have more breathing room. Light-field labels, controls, placeholder graphics, and case-study icons use surface-appropriate contrast.

Validation: production build passes with 52 pages; all eight localized service pages were checked at 1440 and 390 px with one loaded hero image and no horizontal overflow. Portfolio gaps measure 21.59375 px / 12 px, matching staging. Blog filter interaction passes and the handoff was visually inspected. The service-principles small label measures approximately 8.28:1 on desktop and 4.69:1 on mobile against the rendered background. No page errors or failed local requests were found.
