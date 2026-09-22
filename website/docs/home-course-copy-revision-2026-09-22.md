# Homepage course preview and copy revision — 22 September 2026

## Changed

- Replaced the homepage Our Process section with a compact Learn preview. Six existing courses retain their own destinations; three are visible initially at 1024/1440px, two at 768px, and one plus a preview of the next card at 375px. Native scrolling and previous/next buttons support navigation without autoplay.
- Added an opt-in compact variant to the existing course card. It reuses the current course titles, lesson counts, cover placeholders, and CTA; the Learn index keeps its original card layout and descriptions.
- Updated Home to Our Expertise, the supplied expertise introduction, concise service summaries, Our work, and Why Pick Kultivate? Removed the Why eyebrow, shortened the idle cards from 220px to 180px, and retained the 276px desktop hover height. Updated the third value and improved the introduction text contrast.
- Updated Learn's banner description and removed the 6 courses label; About's title is Your Digital Partner. Portfolio uses Our Works, following the user's final clarification.
- Updated the Services banner description, removed repeated service taglines from the listing, and used concise customer-focused descriptions in the listing and service-detail hero.
- Mirrored the revisions in Indonesian.

## Reference and scope

Inspected the live [Acquisition.com homepage](https://www.acquisition.com/) and its course preview in a rendered browser. Used its course/title/action hierarchy, not its assets or visual identity.

The user's latest request explicitly supersedes the previous homepage section-preservation restriction for Our Process and authorizes the listed Learn, Services, and About edits. Homepage artwork and illumination, portfolio projects, course content/workspaces, Founder profile, Blog, Contact, Privacy, and unrelated sections remain unchanged. No new routes, assets, dependencies, or fabricated evidence were added.

New preview wording and service summary/description refinements are marked as provisional in source comments. Existing placeholder visuals remain connected to the existing course data and do not imply verified video assets.

## QA

| Check | Result | Method |
| --- | --- | --- |
| Build | PASS | Actual npm run build; 78 generated pages |
| Existing tests | PASS | node --test tests/*.test.mjs; 9 tests, including all 1,024 recommendation combinations and built internal links/assets |
| Responsive 375px | PASS | Rendered Edge/Chromium inspection and DOM assertions in EN/ID |
| Responsive 768px | PASS | Rendered Edge/Chromium inspection and DOM assertions in EN/ID |
| Responsive 1024px | PASS | Rendered Edge/Chromium inspection and DOM assertions in EN/ID |
| Responsive 1440px | PASS | Rendered Edge/Chromium inspection and DOM assertions in EN/ID |
| Overflow / runtime errors | PASS | 72 route-language-width combinations; no horizontal document overflow or page errors |
| Course destinations | PASS | All six links in both locales return 200; generated-site link tests pass |
| Course controls and keyboard | PASS | Next/previous boundaries, scroll movement, keyboard focus and visible outlines verified at all four widths |
| Reduced motion | PASS | Browser emulation; controls use immediate scrolling rather than smooth scrolling |
| Why hover | PASS | Measured 180px idle and 276px hovered cards in EN/ID desktop |
| Full accessibility audit | PARTIALLY VERIFIED | Keyboard/focus and semantic controls checked; no exhaustive screen-reader audit |
| Performance | PARTIALLY VERIFIED | No new dependency, canvas, autoplay, or persistent animation; no controlled performance benchmark |

## Git

Work targets experiments only. No merge or history rewrite. Scope is limited to the files implementing the requested revision and this report.
