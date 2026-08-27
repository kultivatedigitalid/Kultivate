# KULTIVATE WEBSITE BLUEPRINT

**Version:** 2.0  
**Date:** 10 August 2026  
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

Kultivate is a digital agency offering four services that may work independently or together:

- Search Engine Optimization (SEO)
- Answer Engine Optimization and Generative Engine Optimization (AEO & GEO)
- Web Services
- Content Management

The website must begin with business context before presenting expertise and must not present unverified guarantees. Its three primary jobs are:

1. Generate qualified inquiry.
2. Build credibility using transparent process, working artifacts, educational content, and verified proof.
3. Help visitors choose a practical starting point across SEO, AEO & GEO, Web Services, and Content Management.

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
/id/services/seo/
/en/services/seo/
/id/services/aeo-geo/
/en/services/aeo-geo/
/id/services/web-services/
/en/services/web-services/
/id/services/content-management/
/en/services/content-management/
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

Approved English headline:

> Build one system. Grow with direction.

Approved Indonesian headline:

> Bangun satu sistem. Tumbuh lebih terarah.

Supporting copy limit:
- Maximum 24-32 words per language.
- Maximum two lines on desktop where practical.
- Explain how four service options respond to different business priorities.

Primary CTA:
- Start a Project / Mulai Proyek

Secondary CTA:
- View Our Work / Lihat Karya

Visual:
- Image-led abstract black-and-blue light composition.
- A restrained cyan-blue arc and layered color field make the upper fold feel more alive.
- Content begins near the top third and the desktop heading remains two lines.

#### 3. Selected Work

Purpose:
- Establish credibility before explaining every service detail.

Structure:
- One featured project with a large visual.
- Two supporting projects.
- Each item shows a title, short direction, and a visible evidence status.

Rules:
- Use real project visuals only after approval.
- Avoid fake performance metrics.
- Exploratory entries may be public only when explicitly labeled Concept Study and accompanied by a disclosure that no client relationship or performance result is claimed.

#### 4. Four Service Options

Use four restrained service entries:

1. SEO - traditional search visibility.
2. AEO & GEO - AI search understanding and retrievability.
3. Web Services - technical implementation and experience support.
4. Content Management - useful publishing and refresh rhythm.

Copy limit:
- Title.
- One short sentence, 18-30 words.
- One text link.

Interaction and layout:
- All four services remain visible as one responsive set without autoplay.
- Hover and keyboard focus may reveal supporting imagery or emphasis within 300-600 ms.
- A dark directional scrim keeps every label and description legible.
- Touch devices show the information without requiring hover.

Avoid:
- Tool lists before the business problem is understood.
- Claiming every visitor needs every service.
- Separate glowing background for every entry.

#### 5. Connected System

Purpose:
- Help a visitor start from the current business need rather than from an agency skill list.
- Explain when SEO, AEO & GEO, Web Services, or Content Management becomes useful.
- Make position, goal, capacity, and unnecessary work part of the recommendation logic.

Presentation:
- Four responsive stages with localized need states and service roles; technical channel keywords may remain English where clearer.
- A visible priority line explains that the starting point and combination depend on client context.
- Desktop uses four columns, tablet two, and mobile one; no text or arrow may overlap.

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

- Present exactly three approved entries in one complete desktop view without horizontal overflow.
- Below 900 px, convert the same track to a user-controlled left-to-right scroll-snap carousel that reveals the next card edge.
- Display category, title, date, and reading time only if accurate.
- Use concise titles and no long excerpt.
- Never autoplay or fabricate article metadata.
- On the Insights index, organize the existing articles into guided learning paths by visitor situation; do not create a gated course, account, or certificate.

#### 9. Final CTA

Section kicker:
- Mulai proyek / Start a Project.

Headline:
- Ada yang ingin dibangun? / Have something to build?

CTA:
- Start a Project.

Visual:
- Luminous navy horizon with a controlled cyan-blue rim, inspired by the approved reference without copying its layout.
- Center the section label, headline, supporting copy, and CTA as one closing composition.
- Slow transform-only ambient drift is allowed and must stop for reduced motion.

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

**Primary job:** explain the four service options and help visitors choose a starting point from their current context.

Sections:
- Short proposition.
- Four service summaries.
- Rule-based Website Growth Roadmap with five questions.
- Immediate result with a relevant service route.
- Clear statement that diagnostic answers remain in the browser.
- CTA.

### Individual Service Page

Required anatomy:
1. Service proposition.
2. Problems solved with cause, business impact, and inspection focus.
3. Who it is for.
4. Scope.
5. Deliverables.
6. Process and dependencies.
7. Working artifacts such as context brief, priority map, acceptance criteria, and review record.
8. Verified outcomes or an explicit non-metric or concept-study status.
9. Qualification and objection FAQ.
10. CTA.

Do not publish exact price, timeline, or guarantee unless approved.

### About

**Primary job:** explain the brand, working principles, and people behind the work.

Sections:
- Short brand story.
- Connected Digital Growth philosophy.
- Principles.
- Process overview.
- Role-level firm bios may explain delivery ownership; individual names, biographies, and portraits require approved assets and roles.
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

- Sounds Right: selective display accent for hero and a limited number of editorial headings; licensed webfont file pending.
- Instrument Sans: primary heading, body, navigation, button, caption, UI label, and Sounds Right fallback.
- Space Mono: short metadata, index, date, status, and technical annotation only.
- Homepage headings, section labels, stage names, service roles, and strategic card titles follow the active locale; technical channel terms may remain English when clearer.
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
- Immediate visible focus indication; keyboard focus must not wait for or replay hover motion.
- Menu open/close.
- Language switch state.
- Left-to-right service image reveal on pointer hover; keyboard focus reveals the final state immediately.
- User-controlled Insights carousel movement with disabled edge controls below 900 px.
- Slow transform-only ambient drift inside Insights visuals, provided reduced motion removes it.
- Slow transform-only ambient drift in Insights and the Final CTA, plus one linear feedback pulse in Connected System.

Recommended timing from Brand Guideline Book v2.0:
- Micro interaction: 150-250 ms.
- Image/card: 300-600 ms.
- Section transition: 500-800 ms with limited directional stagger.
- Easing: ease-out or a restrained custom curve.

Not allowed for MVP:
- Scroll reveal for every section.
- Autoplay content movement; only the approved low-motion decorative loops in Insights, the Final CTA, and the Connected System feedback line are allowed.
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
---

## 21. Phase 2 Features and Expertise Positioning

Phase 2 extends existing pages and does not replace the Phase 1 visual direction.

- Services detail pages expose business impact, inspection focus, working artifacts, and expanded qualification FAQs.
- The Services hub hosts a local rule-based diagnostic; it is educational and never represented as AI advice.
- Insights uses three guided learning paths built from the six existing articles.
- Work uses explicit evidence states. Verified Case, Non-metric Outcome, and Concept Study must never share ambiguous presentation.
- About uses role-level delivery ownership until verified individual team data is approved.
- Homepage context markers must never be interpreted or labeled as client logos.
- Course platforms, accounts, payments, memberships, client portals, AI advisors, and gamification remain out of scope.
- Industry-context modules and downloadable toolkits remain conditional on approved examples and content.
