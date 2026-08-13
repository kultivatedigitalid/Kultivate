# KULTIVATE WEBSITE BLUEPRINT

**Version:** 2.0  
**Date:** 6 August 2026  
**Status:** Brand Guideline Book v2.0 aligned planning baseline / pending production inputs  
**Framework:** Astro - static output  
**Languages:** Bahasa Indonesia and English  
**Selected visual concept:** Brand Guideline Book v2.0 / Concept 01 - Mostly Static  
**Governing visual source:** `Kultivate_Brand_Guideline_Book_v2.0_2026-08-06.pdf`  
**Implementation companion:** `Kultivate_Brand_Guideline_v2.0_Implementation_2026-08-06.md`

---

## 0. AI CONTEXT CONTINUITY RULE - BLOCKING REQUIREMENT

This rule is mandatory for every AI, developer, designer, or reviewer working on this repository.

1. Before making any change, read the following files in order:
   - `README.md`
   - `docs/PROJECT_CONTEXT.md`
   - `docs/WEBSITE_BLUEPRINT.md`
   - `docs/BRAND_IMPLEMENTATION.md`
   - `docs/CONTENT_MATRIX.md`
   - `docs/PENDING_INPUTS.md`
   - `docs/DECISION_LOG.md`
   - `docs/ASSET_REGISTER.md`
   - `docs/QA_CHECKLIST.md`
   - `CHANGELOG.md`
2. If any required Markdown file does not exist, create it before implementation using the templates in this blueprint.
3. After every approved change to scope, route, component, copy, brand rule, asset, content status, or technical decision, update the related Markdown files in the same task or commit.
4. A task is not complete when code works but documentation is stale.
5. Never replace a confirmed fact with an assumption. Use these status labels:
   - `CONFIRMED`
   - `STRATEGIC DECISION`
   - `PENDING`
   - `PLACEHOLDER - NOT PUBLIC PROOF`
6. Keep Bahasa Indonesia and English content status synchronized. Do not silently publish one language with missing or machine-translated content.
7. Record the reason, date, and affected files for material decisions in `docs/DECISION_LOG.md`.
8. Record all added, replaced, licensed, or removed assets in `docs/ASSET_REGISTER.md`.
9. Update `CHANGELOG.md` for every release or handoff.

**Definition of Done:** implementation, content, QA, and Markdown context must all be current.

---

## 1. Project Summary

Kultivate is a digital agency offering three connected services:

- Website Development
- Search Engine Optimization (SEO)
- Social Media Management

The website must explain these services as a connected digital growth system without presenting unverified guarantees. Its three primary jobs are:

1. Generate qualified inquiry.
2. Build credibility using real work, process, deliverables, and verified proof.
3. Explain the relationship between Website Development, SEO, and Social Media Management while supporting organic discovery.

### Selected direction

The selected direction is **Brand Guideline Book v2.0 / Concept 01 - Mostly Static**. The interface uses a near-black background, minimal blue-cyan illumination, editorial spacing, strong typography, and static abstract visuals. Motion is limited to CTA states and genuinely interactive elements.

### Core feeling

- Cool and calm, not loud.
- Premium through restraint, not excessive effects.
- Minimal but not empty.
- Spacious, not condensed.
- Technical enough to feel capable, but not a sci-fi dashboard.

---

## 2. Source Priority

When information conflicts, use this order:

1. The latest approved website and explicit client revisions.
2. This Website Blueprint.
3. Brand Guideline Book v2.0 and its implementation companion.
4. Client Discovery Strategic Draft V1.
5. Approved content, project proof, and asset registers.
6. Older mockups, benchmarks, or exploratory references.

Visual references are direction material only. Do not copy their logo, copy, exact gradient, composition, artwork, or project presentation.

---

## 3. Non-Negotiable Requirements

### Technical

- Astro framework.
- Static output only.
- No custom backend, database, login, dashboard, or server-rendered application.
- Pages are prerendered during build.
- Use local Markdown/MDX or typed content collections for Work and Insights.
- JavaScript is optional and must be limited to components that truly need it.
- No WebGL, continuous canvas animation, scroll hijacking, heavy parallax, or cursor-following effects in the selected concept.

### Visual

- Primary background must read as black, not bright blue.
- Blue and cyan are accents, not dominant page fills.
- Use one dominant light source per composition.
- Keep sections wide and breathable.
- Avoid dense bento grids, excessive cards, and small technical labels everywhere.
- Home copy must be concise. Detail belongs on service, work, and insight pages.

### Experience

- Full bilingual support: Bahasa Indonesia and English.
- Clear keyboard focus and complete semantic structure.
- Respect `prefers-reduced-motion`.
- Responsive design must be redesigned for mobile priority, not merely stacked.
- Lazy-load below-the-fold media; do not lazy-load the primary hero/LCP visual.

### Content integrity

- No guarantee of ranking, virality, engagement, traffic, or sales.
- No public project, client logo, testimonial, dashboard, metric, or award without verification and usage permission.
- Placeholder cases must be marked internally and cannot be presented as real proof.

---

## 4. Recommended Information Architecture

### Primary navigation

- Work
- Services
- About
- Insights
- Contact
- Start a Project
- Language switch: `ID | EN`

### Route system

Use consistent locale-prefixed URLs:

```text
/
/id/
/en/
/id/work/
/en/work/
/id/work/[slug]/
/en/work/[slug]/
/id/services/
/en/services/
/id/services/website-development/
/en/services/website-development/
/id/services/seo/
/en/services/seo/
/id/services/social-media-management/
/en/services/social-media-management/
/id/about/
/en/about/
/id/insights/
/en/insights/
/id/insights/[slug]/
/en/insights/[slug]/
/id/contact/
/en/contact/
/id/privacy/
/en/privacy/
/404.html
```

The root `/` should use a host-level static redirect to `/id/`. If the selected host cannot provide a clean redirect, serve a minimal language gateway with proper canonical rules.

### Navigation behavior

- Header remains minimal and transparent/dark.
- Sticky behavior is optional; if used, it must become a subtle solid-black surface after scrolling.
- Language switching must preserve the equivalent page and slug when the translation exists.
- Do not use country flags. Use `ID` and `EN`.
- Mobile navigation must show primary routes, language choice, and Start a Project without burying the CTA.

---

## 5. Homepage Blueprint

### Page job

Help a first-time visitor understand what Kultivate does, see credible work quickly, and choose the next relevant action.

### Recommended section order

#### 1. Header

Content:
- Kultivate logo/wordmark.
- Primary navigation.
- Language switch.
- Start a Project CTA.

Rules:
- One-line header.
- No oversized dropdown mega-menu for MVP.
- Service subpages may be exposed in a small Services dropdown only if usable on keyboard and mobile.

#### 2. Hero

Recommended English headline:

> Build a digital system that grows together.

Recommended Indonesian intent:

> Bangun sistem digital yang tumbuh bersama bisnis Anda.

Supporting copy limit:
- Maximum 24-32 words per language.
- Maximum two lines on desktop where practical.
- Explain the three services as one connected system.

Primary CTA:
- Start a Project / Mulai Proyek

Secondary CTA:
- View Our Work / Lihat Karya

Visual:
- Static abstract black-and-blue light composition.
- Low-luminance blue field with large black negative shapes.
- No autoplay animation.

#### 3. Selected Work

Purpose:
- Establish credibility before explaining every service detail.

Structure:
- One featured project with a large visual.
- Two supporting projects.
- Each item shows project name, category/service, short context, and View Case Study.

Rules:
- Use real project visuals only after approval.
- Avoid fake performance metrics.
- Placeholder project cards must be visibly marked in development and excluded from production.

#### 4. Three Services

Use three wide cards or columns:

1. Website Development - Foundation
2. SEO - Discoverability
3. Social Media Management - Distribution

Copy limit:
- Title.
- One short sentence, 18-24 words.
- One text link.

Avoid:
- Long lists of tools.
- More than three cards.
- Separate glowing background for every card.

#### 5. Connected System

Purpose:
- Explain that services can be purchased separately but are designed to support each other.

Minimal flow:

```text
Website -> Discoverability -> Distribution -> Inquiry -> Optimization
```

Presentation:
- One horizontal or responsive stepped diagram.
- Short labels only.
- Static lines with optional hover emphasis.

#### 6. Why Kultivate

Three reasons only:
- Connected thinking.
- Transparent scope.
- Craft with purpose.

Each reason:
- 1 short title.
- 1 sentence.
- Optional proof link if proof exists.

#### 7. Process

Four stages:
- Discover
- Define
- Build
- Improve

Keep the homepage version short. Detailed dependencies, approval, and deliverables belong on service pages or About.

#### 8. Insights Preview

- Maximum three articles.
- Display category, title, date, and reading time only if accurate.
- No long excerpt.

#### 9. Final CTA

Headline:
- One clear next step.

CTA:
- Start a Project.

Secondary contact:
- WhatsApp or email only after public contact details are approved.

---

## 6. Page Specifications

### Work Index

**Primary job:** help prospects scan relevant capability and choose a case study.

Sections:
- Intro: one sentence.
- Featured projects.
- Project grid.
- Optional service filter only in a later phase when enough projects exist.
- Final CTA.

No filter should be added for fewer than six meaningful cases.

### Case Study

**Primary job:** prove thinking, scope, craft, and outcomes without overclaiming.

Required anatomy:
1. Project title and client context.
2. Services and period.
3. Challenge.
4. Approach.
5. Selected decisions.
6. Deliverables.
7. Visual outcome.
8. Verified result or a transparent non-metric outcome.
9. Related service.
10. Next project / Start a Project.

Every metric must include baseline, period, method, and source.

### Services Hub

**Primary job:** explain the three-service architecture and route visitors to the right service.

Sections:
- Short proposition.
- Three service summaries.
- Connected-system diagram.
- How to choose a starting point.
- Related work.
- CTA.

### Individual Service Page

Required anatomy:
1. Service proposition.
2. Problems solved.
3. Who it is for.
4. Scope.
5. Deliverables.
6. Process and dependencies.
7. Related work.
8. Verified outcomes or process proof.
9. FAQ.
10. CTA.

Do not publish exact price, timeline, or guarantee unless approved.

### About

**Primary job:** explain the brand, working principles, and people behind the work.

Sections:
- Short brand story.
- Connected Digital Growth philosophy.
- Principles.
- Process overview.
- Team only when approved assets and roles exist.
- Location/contact only when public details are confirmed.
- CTA.

### Insights Index and Detail

**Primary job:** support discovery and demonstrate useful expertise.

Content types:
- Article.
- Guide.
- Checklist.
- Case note.

Every article requires:
- Locale.
- Author or owner.
- Published date.
- Updated date when changed materially.
- Category.
- SEO title and description.
- Hero image and alt text.
- Sources for factual claims.

### Contact / Start a Project

**Primary job:** collect enough context for an initial review.

Fields:
- Name.
- Company/brand.
- Email.
- WhatsApp.
- Service interest.
- Current website/social account, optional.
- Project summary.
- Objective or current problem.
- Target launch.
- Indicative budget, optional.
- Attachment, optional only if the external form provider supports it safely.
- Consent checkbox and privacy link.

Because the website is static, form submission must use one of these approved approaches:

1. Configurable third-party form endpoint.
2. Embedded external form.
3. Direct WhatsApp/email CTA if no processor is approved.

Do not create a custom API route or database.

### Privacy and 404

- Privacy text must match the actual analytics and form processor.
- 404 provides routes back to Work, Services, and Home.
- Both pages need bilingual copy.

---

## 7. Content Model

### Work collection

Recommended frontmatter:

```yaml
title: ""
slug: ""
locale: "id"
translationKey: "project-key"
client: ""
clientDisplayAllowed: false
summary: ""
services: []
industry: ""
period: ""
featured: false
coverImage: ""
coverAlt: ""
challenge: ""
approach: ""
deliverables: []
outcomes: []
proofStatus: "pending"
seoTitle: ""
seoDescription: ""
draft: true
```

### Insights collection

```yaml
title: ""
slug: ""
locale: "id"
translationKey: "article-key"
summary: ""
category: ""
author: ""
publishedAt: ""
updatedAt: ""
heroImage: ""
heroAlt: ""
seoTitle: ""
seoDescription: ""
sources: []
draft: true
```

### Data integrity rules

- `translationKey` connects ID and EN content.
- `draft: true` content is excluded from production.
- No public metric unless `proofStatus: verified`.
- No project logo/image unless usage permission is recorded in the asset register.
- A missing translation blocks the equivalent language release unless explicitly approved.

---

## 8. Bilingual System

### Language strategy

- Bahasa Indonesia and English are both production languages for the MVP.
- Indonesian is the writing baseline, but English must be professionally adapted, not raw machine translation.
- Keep message intent equivalent; sentence structure may differ.
- Technical terms may remain in English when clearer.

### URL and SEO requirements

- Locale-specific URLs.
- Self-referencing canonical URL per locale.
- `hreflang="id-ID"`, `hreflang="en"`, and `x-default` as appropriate.
- Locale-specific title, description, Open Graph copy, and alt text.
- Language switch links to the equivalent localized route.

### Translation workflow

1. Finalize source copy and status.
2. Translate/adapt.
3. Review terminology.
4. Compare intent and CTA.
5. Update Content Matrix.
6. Approve both versions before publication.

### Prohibited behavior

- Do not mix languages inside one body paragraph without a reason.
- Do not use automatic browser translation as the production English version.
- Do not show an English switch that routes to incomplete content.

---

## 9. Visual Implementation Rules

The governing visual source is **Kultivate Brand Guideline Book v2.0**. The website must match its dark editorial system, not older token experiments.

### Color direction v2.0

- Void Black `#070B12` - primary dark background.
- Deep Navy `#0B1322` - raised background and limited depth.
- Electric Blue `#176BFF` - primary CTA and active state.
- Cyan Glow `#67D9FF` - illumination, line, or small accent.
- Cloud White `#F4F7FB` - primary light text.
- Mist `#C9D3DF` - secondary text.
- Steel `#7A8798` - metadata and muted labels.
- Slate `#273244` - border and subtle surface.
- Signal Ice `#CFF7FF` - rare soft highlight.

Recommended system proportion:
- Void Black / Deep Navy: 60%.
- Cloud White / Mist: 20%.
- Electric Blue: 12%.
- Cyan Glow / Signal Ice: 6%.
- Functional accents: 2%.

The final composition must still read as black-dominant. Blue is an action and illumination color, not a default page fill.

### Typography

- Instrument Sans: display, heading, body, navigation, button, caption, and UI label.
- Space Mono: short metadata, index, date, status, and technical annotation only.
- Do not use a condensed primary typeface.
- Avoid forcing uppercase on long headings.
- Keep body line length around 55-75 characters.
- Use responsive type with CSS `clamp()`.

### Layout

- Desktop grid: 12 columns.
- Tablet: 8 columns.
- Mobile: 4 columns.
- Maximum content width: 1280-1440 px.
- Base spacing unit: 8 px.
- Section spacing: 96-160 px depending on importance.
- Radius: 12-24 px.
- Border: 1 px, subtle.

Rules:
- Do not compress multiple sections into a dashboard-like viewport.
- Use no more than three equal cards in a row.
- Give one dominant visual or statement to each major section.
- Asymmetry is allowed only inside a clear alignment system.
- Mobile hierarchy must be redesigned, not simply stacked.

### Copy density

- Hero support: 24-32 words.
- Section intro: 20-40 words.
- Service card: 18-24 words.
- CTA support: one sentence.
- Homepage paragraph: generally no more than three lines on desktop.
- Use dedicated pages for detail.

### Graphic system

Preferred:
- black negative shapes;
- one dominant light field;
- organic abstract curve;
- sparse technical line;
- expanding grid used structurally;
- modular blocks only when content needs grouping;
- wide editorial crop.

Avoid:
- literal leaves or plants;
- bright blue full-page backgrounds;
- neon rainbow;
- dense nodes and charts;
- decorative 3D objects;
- glows on every card;
- sci-fi dashboard styling;
- exact copying of reference compositions.

---

## 10. Motion and Interaction

Selected motion tier: **Static-first**.

Allowed:
- Button color/glow change.
- Underline or arrow movement.
- Card border emphasis.
- 2-4 px hover lift where appropriate.
- Focus transition.
- Menu open/close.
- Language switch state.

Recommended timing from Brand Guideline Book v2.0:
- Micro interaction: 150-250 ms.
- Image/card: 300-600 ms.
- Section transition: 500-800 ms with limited directional stagger.
- Easing: ease-out or a restrained custom curve.

Not allowed for MVP:
- Scroll reveal for every section.
- Autoplay background loops.
- WebGL or Three.js.
- Mouse-following light.
- Heavy parallax.
- Scroll hijacking.
- Animation required to understand content.

`prefers-reduced-motion` must disable non-essential movement.

---

## 11. Astro Static Architecture

### Output

- Use Astro's static build behavior.
- Every public route must be generated at build time.
- Work and Insights detail pages are generated from local content collections.
- No server endpoints or runtime database.

### Recommended project structure

```text
/
├─ README.md
├─ CHANGELOG.md
├─ astro.config.mjs
├─ package.json
├─ public/
│  ├─ favicon/
│  ├─ social/
│  └─ static/
├─ docs/
│  ├─ PROJECT_CONTEXT.md
│  ├─ WEBSITE_BLUEPRINT.md
│  ├─ BRAND_IMPLEMENTATION.md
│  ├─ CONTENT_MATRIX.md
│  ├─ PENDING_INPUTS.md
│  ├─ DECISION_LOG.md
│  ├─ ASSET_REGISTER.md
│  └─ QA_CHECKLIST.md
└─ src/
   ├─ assets/
   ├─ components/
   │  ├─ global/
   │  ├─ home/
   │  ├─ work/
   │  ├─ services/
   │  └─ content/
   ├─ content/
   │  ├─ work/
   │  │  ├─ id/
   │  │  └─ en/
   │  └─ insights/
   │     ├─ id/
   │     └─ en/
   ├─ data/
   │  ├─ navigation.ts
   │  ├─ services.ts
   │  └─ site.ts
   ├─ i18n/
   │  ├─ id.ts
   │  ├─ en.ts
   │  └─ routes.ts
   ├─ layouts/
   ├─ pages/
   │  ├─ id/
   │  ├─ en/
   │  └─ 404.astro
   ├─ styles/
   │  ├─ tokens.css
   │  ├─ global.css
   │  └─ utilities.css
   └─ content.config.ts
```

### Component rules

- Components receive content through props; do not bury page copy inside reusable visual components.
- Global components must not assume one language.
- Interactive islands are allowed only where native HTML/CSS is insufficient.
- Use semantic HTML before JavaScript.
- Keep design tokens in CSS custom properties.

---

## 12. Lazy Loading and Performance

### Image policy

- Use optimized responsive images and modern formats.
- Hero/LCP image: eager load and prioritize.
- Below-the-fold images: lazy load.
- Provide intrinsic width and height to prevent layout shift.
- Use sizes/srcset appropriate to actual display width.
- Avoid loading desktop-size images on mobile.
- Prefer a static poster over autoplay video.

### Script policy

- No global animation library for Concept 01.
- Avoid hydrating components that can work with HTML and CSS.
- Defer non-critical scripts.
- Load analytics only after the approved consent strategy when required.

### Font policy

- Self-host approved font files from official sources where licensing permits.
- Use variable/subset files if practical.
- Preload only the critical font asset.
- Use a stable fallback stack.

### Performance budget for planning

These are review targets, not public promises:
- Minimal client-side JavaScript on standard content pages.
- No WebGL payload.
- No autoplay video on the homepage.
- Initial viewport should not depend on below-the-fold assets.
- Performance must be measured on the production build before sign-off.

---

## 13. SEO and Metadata

Every page requires:
- Unique title.
- Unique meta description.
- Canonical URL.
- Localized alternate links.
- One clear H1.
- Logical heading structure.
- Open Graph metadata.
- Descriptive image alt text.
- Structured internal links.

Recommended structured data after validation:
- Organization.
- WebSite.
- BreadcrumbList.
- Article for Insights.

Do not add Review, AggregateRating, or performance claims without valid public evidence.

---

## 14. Accessibility

Required:
- WCAG-oriented color contrast.
- Keyboard-accessible navigation and dropdowns.
- Visible focus state.
- Skip-to-content link.
- Semantic landmarks.
- Correct heading sequence.
- Alt text for meaningful images; empty alt for decorative images.
- Form labels, descriptions, errors, and success states.
- No color-only status communication.
- Language attribute set per localized page.
- Motion reduction support.

---

## 15. Analytics and Inquiry Measurement

Pending provider approval, plan events for:
- Primary CTA click.
- WhatsApp click.
- Email click.
- Form start.
- Form submit/success.
- Service page view.
- Case-study view.
- Language switch.
- Download click if files are added.

Do not place analytics identifiers, phone numbers, emails, or form endpoints in scattered components. Store them in a single site configuration file.

---

## 16. Build Phases

### Phase 0 - Context and assets

- Create/update all required Markdown context files.
- Confirm logo master.
- Confirm public contact details.
- Confirm domain and hosting.
- Confirm which work is publishable.
- Confirm external form approach.
- Confirm analytics and consent.

### Phase 1 - Foundation

- Astro static setup.
- Tokens, typography, grid, global layout.
- Locale routing.
- Navigation/footer.
- Content schemas.
- Base SEO component.

### Phase 2 - Core pages

- Home.
- Services hub.
- Three service pages.
- About.
- Contact.
- Privacy and 404.

### Phase 3 - Proof and content

- Work index.
- Case-study template.
- Insights index/detail.
- Approved content and assets.
- Bilingual review.

### Phase 4 - QA and launch

- Responsive QA.
- Accessibility QA.
- Broken link and route QA.
- Production performance audit.
- Metadata/hreflang/canonical audit.
- Form and analytics test.
- Markdown context update.
- Final approval and release notes.

---

## 17. QA Acceptance Checklist

### Content

- No unverified claim or metric.
- No placeholder presented as real work.
- Both languages complete and approved.
- CTA labels consistent.
- Legal/contact details confirmed.

### Visual

- Background reads as near-black.
- Blue/cyan remains an accent.
- Layout does not feel condensed.
- Mobile hierarchy is intentionally redesigned.
- No section becomes a dense dashboard.

### Technical

- Static build passes.
- No backend or hidden server dependency.
- All routes generated.
- No broken links.
- Lazy-loading policy correct.
- Hero image is not accidentally lazy-loaded.
- Images have dimensions and alt rules.
- No unnecessary hydrated JavaScript.

### Bilingual

- Switch maps equivalent routes.
- Canonical and hreflang are correct.
- Metadata localized.
- No raw machine translation.
- Missing translations do not silently publish.

### Accessibility

- Keyboard navigation works.
- Focus is visible.
- Heading structure is valid.
- Forms have labels and errors.
- Reduced-motion behavior works.

### Documentation

- All required Markdown files exist.
- Decisions and pending inputs are current.
- Asset register is current.
- Content matrix is current.
- Changelog matches the release.

---

## 18. Pending Inputs / Launch Blockers

The following remain pending until explicitly approved:

- Final logo master and variants.
- Domain and hosting platform.
- Public business email and WhatsApp.
- Form processor and data flow.
- Analytics provider and consent requirements.
- Publishable portfolio list and project assets.
- Client/logo/testimonial permissions.
- Verified project outcomes.
- Final team names, roles, and photography.
- Public legal details and address classification.
- Final Indonesian copy.
- Reviewed English adaptation.
- Privacy policy matching actual integrations.

No AI or developer may invent these values to finish a page.

---

## 19. Final Implementation Notice for AI

> Treat the repository Markdown documents as the operational memory of the project. Read them before working, create any missing required files, and update them immediately whenever the website changes. Do not rely on chat history, memory, or assumptions as the only source of context. Code, content, assets, and documentation must remain synchronized.


---

## 20. Brand Guideline v2.0 Consistency Notice

This blueprint is synchronized with Kultivate Brand Guideline Book v2.0. Any future change to color, typography, layout, imagery, motion, website direction, bilingual behavior, or documentation governance must update the governing Brand Guideline source, this blueprint, `docs/BRAND_IMPLEMENTATION.md`, the decision log, QA checklist, and changelog in the same task.
