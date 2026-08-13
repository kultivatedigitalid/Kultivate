# Kultivate Website Repository Context

**Context pack version:** 2.0  
**Aligned source:** Kultivate Brand Guideline Book v2.0  
**Framework:** Astro static output  
**Languages:** Bahasa Indonesia and English

This directory is the operational memory of the Kultivate website project. An AI, developer, designer, writer, or reviewer must be able to understand the project from these files without relying on chat history.

## Required reading order

1. `README.md`
2. `PROJECT_CONTEXT.md`
3. `WEBSITE_BLUEPRINT.md`
4. `BRAND_IMPLEMENTATION.md`
5. `CONTENT_MATRIX.md`
6. `PENDING_INPUTS.md`
7. `DECISION_LOG.md`
8. `ASSET_REGISTER.md`
9. `QA_CHECKLIST.md`
10. `CHANGELOG.md`

## Blocking documentation rule

Before implementation:

- read every required Markdown file;
- create any required file that does not exist;
- identify stale or conflicting information before changing code.

After implementation:

- update every affected Markdown file in the same task or commit;
- record material decisions in `DECISION_LOG.md`;
- record asset changes and permissions in `ASSET_REGISTER.md`;
- update content, pending-input, QA, and changelog status where relevant.

**Definition of Done:** code, content, assets, QA, and Markdown context must all be current.

## Governing source priority

1. Latest explicit client approval or revision.
2. `Kultivate_Brand_Guideline_Book_v2.0_2026-08-06.pdf`.
3. `BRAND_IMPLEMENTATION.md`.
4. `WEBSITE_BLUEPRINT.md`.
5. Client Discovery Strategic Draft V1.
6. Approved content, proof, and asset registers.
7. Older mockups and exploratory references.

## Core constraints

- Astro static output only.
- Bahasa Indonesia and English.
- Brand Guideline Book v2.0 dark editorial system.
- Concept 01: static-first, black-dominant, restrained blue-cyan light.
- Sounds Right for selective display accents; Instrument Sans remains primary; Space Mono stays supporting. The production Sounds Right webfont requires an approved local asset and license.
- Spacious layout; avoid condensed or dashboard-like composition.
- No custom backend, WebGL, heavy parallax, or scroll hijacking.
- Lazy-load below-the-fold media; prioritize the hero/LCP asset.
- Never publish unverified claims, assets, metrics, or project proof.
