# Kultivate motion system

Current implementation: 25 September 2026. The owner's latest visual references and confirmations supersede earlier sketch and timing variants.

## Hero artwork and timing

`HeroVisual.astro` selects `LayeredHero.astro` through the typed scene map in `src/data/hero-scenes.ts`. Raster artwork stays on its 1672 × 941 artboard. SVG masks separate the surface, ambient light and light path; the last portion settles to the exact, unpartitioned poster. Text remains readable while artwork starts dark. Every layered hero plays once per page load.

| Hero | Artwork / treatment | Total entrance |
| --- | --- | --- |
| Home | Original horizon; cumulative upper-right-to-lower-left canvas reveal with cached rim, bloom and foreground reflection | 4 seconds |
| About | Handshake artwork at 75%; backlight reveals first, then the full-size blue triangle screen-blends at 42% opacity | About 4.13 seconds |
| Services | New four-panel service illustration, centered. Artwork at 76% scale and 72% opacity, with a soft perimeter. A static 12-degree CSS Y perspective turns the complete SVG and aligned masks rightward together | About 6.13 seconds |
| Learn | New layered reading pages at 76% scale with a soft perimeter, with no extra SVG sheet/line illustration. Bright rims reveal progressively through the soft directional mask | About 6.13 seconds |
| Work | Mountain panel and diagonal blue beam | About 4.13 seconds |
| Blog | Angled glass plane and particle-wave artwork; left-to-right reveal | About 4.13 seconds |
| Service details | Magnifier for SEO, gallery for Visual Strategy, device panels for Web, people/orbits for Social | About 4.13 seconds |

`HERO_MOTION_SPEED = 1.5` divides base durations and delays; Services/Learn retain their softer 64-unit feather. Home now uses a bounded Canvas 2D overlay (maximum 1280 × 720 pixels). The soft curved rim is rendered once into a cached buffer. Each frame composites that rim through an elliptical light envelope and advances a soft darkness curtain along the same arc-length-sampled curve. This replaces per-frame SVG Gaussian filters and the 2400-unit dashed stroke. The original image stays beneath the temporary overlay; buffers are released after its four-second entrance. Layered entrances wait for image decoding, pause offscreen/when hidden/through the motion control, and resume from their elapsed phase. Completed entrances do not replay on scrolling. Reduced motion and no JavaScript show static artwork. Filters and masked motion layers stop after completion.

Ten optimized WebP assets remain in `public/assets/hero-scenes/`. The new Services and Learn assets are format-optimized copies of the supplied PNGs (50,602 and 50,086 bytes). No generated raster was used: the image-edit tool could not read the reference because of a Windows sandbox ACL error, so the Services viewing angle is implemented on the rendered SVG instead. About uses two assets; other heroes load their own single artwork.

## Shared service symbols

`ServiceObject.astro` renders the same native SVG objects on Home and Services. Pale monochrome outlines, navy front/back faces, connected extrusions and restrained reflections show thickness. A shared upright face basis (`matrix(.96 .22 0 1 ...)`) preserves width and height instead of compressing fronts into narrow planes. The user explicitly chose a frontal person for Social.

- SEO: three rounded rising bars on a thick platform, an upward arrow and a thick-rimmed magnifier with a down-right handle. No Google G or SEO lettering. Hover lifts/separates bars and brings the lens inward toward the chart.
- Web: a freestanding thick monitor and upper-right rotating gear replace all pillars. The screen retains its loading animation. Hover moves the monitor slightly left/down and the gear right/up; maximum part translation is 10 units horizontally.
- Social: a front-facing extruded person with a circular head, surrounded by three inclined orbital planes. A foreground arc helps the orbit read as wrapping the figure.
- Visual Strategy: three upright gallery panels with connected 10-unit backs, landscape thumbnails and palette swatches. Hover separates the rear/front panels by 17/19 units horizontally.

Shared hover/focus also lifts and scales assemblies by 1.07. Gear rotation takes 26 seconds, orbital nodes 34 seconds, and loading 4.2 seconds; hover boosts their playback rates without restarting. Continuous animations run only while visible, respect the shared pause control and page visibility, and cancel under reduced motion. Fine-pointer media queries prevent sticky touch hover. Native SVG adds no image requests or dependencies.

## Layout and backgrounds

Home retains its two foundation cards (12px gap) and two supporting cards with text immediately left of the symbols. SEO and Web stages retain the 12px downward offset and tested hover clearance. The section fits the reviewed laptop viewport. Services keeps the approved copy insets; numbered labels remain removed.

`SiteAtmosphere.tsx` restores document-anchored repeating ThreeUI Ribbon Field tiles in the shared layout. Tile height is clamped to 900–1440px with 20% overlap and up to three nearby canvases. On Home, ribbon canvases remain unmounted during the visible entrance and while the full-screen hero covers most of the viewport; they mount as the underlying page enters view. This avoids spending the entrance frame budget on an occluded WebGL background. Original registered shader source and configured props remain unchanged. Canvases unmount when paused, hidden or reduced motion is requested. The discarded section-specific `SectionMotion.tsx` implementation was unused and has been removed.

Privacy Policy now places a translucent dark navy reading surface above that shared background. The sticky contents navigation has a viewport-bounded independent scrollbar, visible focus and keyboard access; on mobile it becomes a bounded two-column contents list. This visual change was explicitly requested after the earlier policy content-only revision.

## Latest performance follow-up

Services and Learn artwork were reduced 24%; Services opacity was reduced to .72 to quiet its bright rims and particles. A radial perimeter mask blends their reduced artboards into the surrounding background.

Home profiling used the same local headless Edge instance with software rendering (`--disable-gpu`, SwiftShader), so these figures describe the stress-test environment, not a guaranteed frame rate on every device. Two old-renderer runs had median frame intervals of 399.9 / 316.6 ms. Disabling WebGL alone still left 250 / 216.6 ms medians, implicating the live SVG effects too. Two revised runs measured 16.7 / 16.7 ms medians, with 33.3 / 49.9 ms p95. Frames exceeding 33.5 ms fell from 12 of 13 in both original runs to 3 of 216 and 9 of 166. Initialization long tasks remain, but there are no Gaussian filter calculations in the animation loop.

Browser validation confirms paused frame pixels remain unchanged, reveal coverage is cumulative, the Home entrance finishes once, no occluded ribbon canvas runs behind Home, ribbons return below the hero, and reduced motion remains static. Four resized Services/Learn layouts were visually checked. Evidence: `revision11-perf-before.json`, `revision11-perf-before-no-webgl.json`, `revision11-perf-after.json`, `revision11-validation.json`, and `revision11-*.jpg` in the task visualization folder.

## Validation

- Production build: 78 pages. Nine existing tests pass, including all 1,024 quiz combinations and every generated internal link/anchor/local asset.
- Browser QA checks four real hover transforms, top/side clearance, gear/loading/orbit rate boosts, 390px and 320px home overflow, both new hero assets and 6.133s completion, static reduced-motion behavior, and independently scrolling EN/ID privacy navigation on desktop/mobile.
- No runtime exceptions or failed asset responses in the focused browser run. Desktop/mobile screenshots reviewed.
- Unused files were verified against every source entrypoint, all 78 compiled pages, 20 JS bundles and 15 CSS files. Dynamic collage and scene-map asset families were explicitly retained.
- QA artifacts: `revision10-validation.json`, `revision10-*.jpg`, and `revision10-cleanup-proof.json` in the task visualization directory. The local Edge CDP fallback was used because the in-app browser sandbox could not initialize.

## Sources

- [Astro components](https://docs.astro.build/en/basics/astro-components/), [styling](https://docs.astro.build/en/guides/styling/) and [framework integrations](https://docs.astro.build/en/guides/framework-components/).
- [ThreeUI Ribbon Field](https://threeui.com/source-code/ribbon-field.json): existing registered local source; provenance remains in `src/vendor/threeui/README.md`.
