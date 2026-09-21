# Experiments revision report — 21 September 2026

## Changed

- Home: renamed the English heading to “Our works” and removed the summary paragraphs. All sections and case-study links remain. Services images appear on hover or keyboard focus, enter from the left and return to the left; interrupted transitions resume from the current position. Reduced motion changes visibility immediately.
- Portfolio: removed the featured segment while retaining all 13 projects. All 26 EN/ID case pages now start with a bounded, uncropped image, followed by the title and narrative.
- Services: opted the roadmap into a persistent light field across intro, questions and results. Dark text, answers and focus states maintain readability.
- Learn: locally removed the duplicate transition veil and faded the hero edge into the existing background.
- Contact: moved a compact, borderless six-step expectation flow above direct contact; centered the success dialog with native focus and Escape behavior retained.
- Privacy: added a shared reading layout with a light surface, contents navigation, section anchors and privacy contact. Existing legal paragraphs, effective date and deletion email template remain unchanged. No commercial closing CTA.

## Added and preserved

Added one shared PrivacyPolicy component. No routes, project narratives, assets or dependencies were added. The contact descriptions are marked internally as provisional; the 1–2 working day expectation was explicitly supplied by the user. Existing project provenance metadata is unchanged.

The latest request explicitly authorizes the scoped Services listing and Learn transition revisions. Course workspaces, About, Founder profile and Blog index remain unchanged. The homepage hero and its existing illumination are untouched. All 11 unrelated files already modified before this revision are preserved and excluded from the commit.

## References inspected

Opened the live [Koto work index](https://koto.com/work), [Koto Coda project](https://koto.com/projects/coda), and [Stripe Privacy Policy](https://stripe.com/privacy). Used the media/story hierarchy and legal reading structure; no assets or copy were taken.

## QA

| Check | Result | Method / scope |
| --- | --- | --- |
| Production build | PASS | `npm run build`; 78 generated pages |
| Existing tests | PASS | `node --test tests/*.test.mjs`; 9 tests including recommendation combinations and built route/asset contracts |
| 375px | PASS | Rendered Edge inspection and automated DOM/overflow checks |
| 768px | PASS | Rendered Edge inspection and automated DOM/overflow checks |
| 1024px | PASS | Rendered Edge inspection and automated DOM/overflow checks |
| 1440px | PASS | Rendered Edge inspection and automated DOM/overflow checks |
| Routes/images/overflow | PASS | 38 revised routes across four widths, 152 checks; no broken images, duplicate IDs, horizontal overflow or page errors |
| Frozen-page preservation | PASS | Text and rendered layout/style measurements for 18 remaining frozen EN/ID routes match the pre-revision baseline |
| Contact interaction | PASS | Eight intercepted successful submissions across EN/ID and four widths; centered dialog, Close focus, Escape dismissal |
| Roadmap background | PASS | Same field across intro/questions/results in EN/ID at all four widths |
| Roadmap result contrast | PASS | Raster background sampling against computed text colors; minimum 5.16:1 in both the working checkout and independent staged build |
| Keyboard/accessibility | PARTIALLY VERIFIED | Focus reveal, modal focus/dismissal, semantic links and privacy anchors verified; no exhaustive screen-reader/WCAG audit |
| Home service reveal | PASS | All four cards in EN/ID enter from the left, exit left and reverse interrupted exits; settled animations release resources |
| Reduced motion | PASS | Browser emulation; new service reveal settles without animation |
| Performance | PARTIALLY VERIFIED | No new dependencies, canvas or persistent animation; reveal animations cancel after settling. No controlled Lighthouse/Core Web Vitals benchmark |
| Live delivery | NOT VERIFIED | Form responses were intercepted locally; no real enquiry sent |
| Other browser engines | NOT VERIFIED | Rendered QA used installed Edge/Chromium |

## Git and remaining limits

Changes target `experiments` only; no merge or history rewrite. An independent export of the exact staged source passed the 78-page build and all 9 tests. Roadmap contrast/background, all eight service cards, modal submission/focus/dismissal, privacy anchors and the Learn seam were verified again against that export, without the pre-existing local modifications. Live form delivery, other browser engines, screen readers and field performance remain outside the verified scope above.
