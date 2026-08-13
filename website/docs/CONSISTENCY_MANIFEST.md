# Kultivate Consistency Manifest

**Alignment version:** 2.0  
**Date:** 10 August 2026  
**Governing visual source:** Kultivate Brand Guideline Book v2.0

## Updated Deliverables

| Deliverable | Version | Role |
|---|---:|---|
| `Kultivate_Brand_Guideline_Book_v2.0_2026-08-06.pdf` | 2.0 | Governing visual brand source. |
| `Kultivate_Brand_Guideline_v2.0_Implementation_2026-08-06.md` | 2.0 | Searchable implementation companion. |
| `Kultivate_Website_Blueprint_Book_v2.0_2026-08-06.pdf` | 2.0 | Visual website architecture and handoff book. |
| `Kultivate_Website_Blueprint_AI_v2.0_2026-08-06.md` | 2.0 | Complete AI-readable implementation blueprint. |
| `Kultivate_AI_Context_MD_Pack_v2.0_2026-08-06.zip` | 2.0 | Synchronized repository context pack. |

## Synchronized Decisions

- Brand Guideline Book v2.0 is the governing visual source.
- Concept 01 remains the selected homepage structure.
- Dark editorial, black-dominant, calm, and spacious presentation.
- Official palette: Void Black, Deep Navy, Electric Blue, Cyan Glow, Cloud White, Mist, Steel, Slate, Signal Ice, and functional states.
- Sounds Right as a selective display accent, Instrument Sans as primary typography, and Space Mono as supporting typography. The exact Sounds Right webfont remains blocked on an approved licensed file.
- Grid: 12 columns desktop, 8 tablet, 4 mobile.
- Maximum content width: 1280-1440 px.
- Section spacing: 96-160 px.
- Radius: 12-24 px; subtle 1 px border.
- Static-first motion: 150-250 ms micro, 300-600 ms image/card, 500-800 ms limited section transition.
- Homepage service media may reveal left-to-right on hover or focus; all service text remains available without motion.
- Insights displays three cards without overflow on desktop and becomes a user-controlled horizontal scroll-snap carousel below 900 px; autoplay is prohibited.
- Homepage display headings, section labels, service roles, and strategic titles follow the active locale; technical channel keywords may remain English where clearer.
- Every homepage interactive element has explicit pointer hover and active feedback; keyboard focus is immediate and does not replay hover animation.
- Connected System uses Discover/Search, Understand/Website, Remember/Social, Act/Inquiry, then Continuous Feedback.
- Homepage section backgrounds transition through one continuous blue-navy gradient field without visible seams.
- Final CTA uses centered alignment and may use one restrained luminous-horizon animation with reduced-motion support.
- Production placeholder Work and Insights entries remain draft and are excluded from generated detail routes.
- Astro static output without a custom backend.
- Full Bahasa Indonesia and English production system.
- Hero/LCP prioritized; below-fold media lazy-loaded.
- AI documentation continuity remains a blocking Definition of Done requirement.

## Conflicts Removed

- Active references to Brand Guideline v1.1 as the governing source.
- Unofficial `Ink Black #020407` token from the older implementation draft.
- Older 76-82% black proportion rule.
- Older 1360-1440 px content-width rule.
- Older 120-176 px section-spacing rule.
- Older motion duration values that did not match Brand Guideline Book v2.0.
- Incorrect selected-concept asset path in the Asset Register.

## Required Future Update Rule

Any approved change to brand, content, route, component, asset, motion, bilingual behavior, performance, or technical architecture must update the affected Markdown files, Decision Log, Asset Register, QA Checklist, and Changelog in the same task or commit.
