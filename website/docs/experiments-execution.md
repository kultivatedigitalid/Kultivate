# Experiments completion audit

Baseline: `bef45b3`, synchronized with `origin/experiments` on 2026-09-19.

## Freeze map

- Frozen in both locales: Services index, Learn index and six course workspaces, About, founder profile, Blog index.
- Shared defaults remain untouched: BaseLayout, navigation, global/tokens/motion/atmosphere/flow styles, HeroShell, HeroVisual, FinalCTA, founder and Learn components.
- Homepage lighting is scoped to the home component. Service learning changes are confined to the service-detail-only preview component.
- Pre-existing uncommitted work in 11 files was saved outside the repository before implementation. The article component receives only a separate next-step insertion; its pre-existing edits are excluded from this task's commit.

## Audit findings

- Homepage has ten existing sections; keep every section and move work and services before the team introduction.
- Twelve visible portfolio records have no case-study destinations; the existing work collection has one bilingual unpublished commerce project.
- The commerce client's `clientDisplayAllowed: false` must be honored in all public surfaces.
- Service details lack a consultation action and project proof; two services lack related learning.
- Contact already states that the first consultation is free, but does not mount its existing next-steps component.
- Privacy ends in a shared commercial CTA; remove the page-level invocation only.
- The homepage inherits drifting artwork and pointer depth. Disable only this homepage behavior and add a subtle CSS light pass.

## Reference inspection

Live pages opened in a browser and via web retrieval: [Metalab Work](https://www.metalab.com/work), [Basement](https://basement.studio), [Clay](https://clay.global), [Vercel Contact](https://vercel.com/contact/sales), [Resend](https://resend.com/design/brand/introduction), [Stripe Privacy](https://stripe.com/privacy). Some animated reference heroes rendered blank in reduced motion; no decisions depend on those empty surfaces.

Applied logic: show context and service alongside work; use direct case-study actions; explain consultation expectations; end privacy with privacy support. No reference assets, branding, copy, or animation compositions copied.

## Content provenance

All added project narratives, objectives, roles, service associations, deliverables and qualitative outcomes are internally marked `status: provisional`, with `proofStatus: pending`. Existing project names, descriptors and artwork are preserved. No measured KPI, award, endorsement or testimonial is introduced. The unpublished commerce project retains its original client internally, with an anonymous public identity.

## Implementation

- Homepage: all ten sections retained. Order is Hero, Client Logos, Selected Work, Services, Who We Are, CEO Note, Connected System, Why Kultivate, Insights, Final CTA. Selected Work now links directly to case studies and displays the service, context and action.
- Portfolio: retain the existing hero and gallery language; add a featured case study and descriptive links for all thirteen projects. Use the existing work collection as the single source for homepage, portfolio, service proof and case studies.
- Case studies: publish thirteen bilingual projects through the existing dynamic routes, adding 26 generated destinations. Each includes context, challenge, objective, role, approach, deliverables, execution, qualitative outcome, service links and next project.
- Service detail: add a consultation CTA that carries the service into the contact form; order problem, scope, process, relevant project proof, principles, existing Learn/Insight, FAQ and final CTA. The service listing remains unchanged.
- Articles: insert a contextual Website Growth Roadmap next step after body/sources and before author/related content. Existing article content and Blog index remain intact.
- Contact: mount the existing ContactNextSteps component once, explain the free first consultation and four-step expectation sequence, and add standard autocomplete attributes.
- Privacy: remove only its commercial FinalCTA invocation. Privacy support and the footer form the ending.
- Added: shared CaseStudy template, InsightNextStep component, collection helper, 24 new Markdown records, two completed legacy commerce records, and two generated-site regression tests. No new dependency, font or visual asset.

## Project inventory and provisional content

Both `/en/work/<slug>/` and `/id/work/<slug>/` exist for:

`naru`, `sora`, `lumen`, `karsa`, `nadi`, `aruna`, `tala`, `reka`, `aksa`, `veda`, `loka`, `svara`, `green-ecommerce-development`.

The twelve original gallery brands retain their original local artwork and identity. Their new narratives, service mappings and qualitative outcomes are working content marked `status: "provisional"` and `proofStatus: "pending"` in each locale's Markdown. The pre-existing commerce record remains in `placeholder-project.md` internally, but is published at its original meaningful slug with an anonymous public title. Its restricted client name is not exposed, and the unsupported sub-second performance claim has been removed. Existing project technology and period are retained.

Service-learning bridge text, the article bridge and contact expectations carry internal provenance comments. No articles were invented for related learning. Marketing/content review is still required before treating provisional narratives as verified client evidence.

## Hero illumination

The original banner asset, headline, focal point (`58% 50%`) and composition remain in place. A homepage-only CSS pseudo-element provides a broad masked gradient light pass over 24 seconds. Only the light's transform and opacity animate; the artwork's inherited drift and pointer depth are disabled on this page only. An IntersectionObserver and document visibility listener pause the effect offscreen or in a hidden tab. The existing background-motion button also pauses/resumes the light through a homepage-scoped CSS rule; no shared control is modified. Reduced motion produces stable static lighting. No canvas or WebGL is added; this is the sole new atmospheric motion family.

## QA

Executed 2026-09-19/20 on Windows with npm, Node 24.11.1 and installed Edge driven by bundled Playwright. App browser tools and Astro background dev startup failed in this environment; browser inspection therefore uses a local server serving the actual production build. No testing framework or QA package was installed.

| Check | Result | Method and evidence |
| --- | --- | --- |
| Build | PASS | Actual `npm run build`: 78 generated pages, compared with 52 before implementation. Also built an isolated export of the staged index using the existing dependencies. |
| Existing and new tests | PASS | `node --test tests/*.test.mjs`: 9 tests, including the existing 1,024 quiz combinations and generated-site link/project contracts. |
| Routes and local assets | PASS | Generated HTML audit across all 78 pages: no missing internal destination, anchor or local asset. All thirteen project links work in both locales. |
| Responsive 375px | PASS | Actual Edge render of all 54 editable routes, plus representative screenshots and touch navigation. |
| Responsive 768px | PASS | Actual Edge render of all 54 editable routes and representative screenshots. |
| Responsive 1024px | PASS | Actual Edge render of all 54 editable routes and representative screenshots. |
| Responsive 1440px | PASS | Actual Edge render of all 54 editable routes and representative screenshots. |
| Overflow | PASS | All 216 route/width checks have document width equal to viewport width. Existing intentional horizontal rails remain scrollable. No overflow suppression was added. |
| Render/runtime | PASS | No missing rendered images, duplicate IDs, empty interactive labels or page JavaScript errors in the 216 checks. Real scroll-triggered lazy loading of service proof was also checked without forcing eager images. Exactly one main H1 per checked page. |
| Frozen pages | PASS | Compared main text and measured heading/link/button geometry, type sizes and colors on 22 EN/ID frozen routes at 1440px against the pre-edit working baseline. All unchanged. Source defaults remain untouched. |
| Keyboard and touch | PASS | Case-study focus outline and Enter navigation, FAQ keyboard toggle, mobile menu keyboard opening, service-to-form preselection, article-to-roadmap navigation and real touch-context carousel navigation. |
| Targeted text contrast | PASS | Browser-computed foreground checks on modified proof, case, service and contact text are at least 4.5:1 against their reference dark surfaces. The article bridge's solid background is verified at all four widths in both locales: body/title 12.24:1, link 9.26:1. |
| Full accessibility conformance | PARTIALLY VERIFIED | Semantics, headings, labels, focus, selected keyboard/touch paths and targeted text contrast checked. No full screen-reader audit or pixel-by-pixel image-overlay contrast certification. |
| Hero static composition | PASS | Browser measured identical image bounds and transform before/after pointer movement and elapsed animation time; only the lighting transform changes. |
| Reduced motion / offscreen | PASS | Browser media emulation gives static lighting; scrolling the hero offscreen pauses the light. The existing motion button pauses and resumes it via keyboard. Document visibility handling is present; background-tab behavior was not separately simulated. |
| Contact success/error states | PASS | Intercepted HTTP 500 and 200 responses: failure preserves input, success opens the dialog, Escape closes it. No real inquiry sent. |
| Live contact delivery | NOT VERIFIED | Existing Formspree endpoint, email and WhatsApp configuration remain internally pending. No external submission or recipient ownership verification. |
| Performance | PARTIALLY VERIFIED | Existing generated JS asset inventory is unchanged at 249,252 bytes; the new small hero controller is inline. No new dependency, WebGL canvas, visual asset or font. No field Core Web Vitals or Lighthouse measurement. |
| Type check / lint | NOT VERIFIED | No dedicated type-check/lint scripts or Astro check package are configured; the actual Astro production build passed. |
| Staged build browser check | PASS | Independently rendered 14 representative EN/ID routes from the staged-only build at four widths (56 checks): no HTTP, runtime, heading or overflow failures. Hero motion and static artwork confirmed; final pause/resume and reduced-motion checks passed. |
| Staged diff | PASS | Only task files staged. In the already-dirty article component, only the import and next-step invocation are staged. Ten other pre-existing files are byte-identical to their saved hashes; article content matches after removing these two insertions. |

The responsive matrix checks all editable routes automatically and includes visual inspection of representative pages/sections at each required width. It is not a claim that every possible browser, device or assistive technology was tested. Browser records and screenshots were retained locally in the temporary `kultivate-execution-baseline` audit directory.

## Release limitations

- All added working project narratives need factual review before being treated as verified portfolio evidence.
- Confirm the existing production contact details and Formspree recipient configuration, then perform an authorized delivery check before a production launch.
- Full screen-reader, broader browser compatibility and field performance checks remain unverified.
- Eleven pre-existing local modifications are deliberately excluded from this commit and remain in the working tree. They were preserved, not discarded or silently included.

Work and push destination: `experiments` only. No merge, forced push, history rewrite or unrelated cleanup.
