# Learn curriculum — 28 September 2026

## Scope and source

The user requested changes only to Learn and its course structure, using the approved 15 September curriculum and architecture DOCX files. Confirmed: English and Indonesian, chapter navigation beside the lesson with previous/next controls, summaries and learning objectives only; videos follow later. The current Learn hero and other page visuals remain unchanged.

Sources supplied by the user:
- Kultivate_Learn_Perencanaan_Kurikulum_7_Course_Disetujui_2026-09-15_ID (1).docx
- Kultivate_Learn_Riset_Arsitektur_7_Course_Disetujui_2026-09-15_ID (1).docx

## Implemented structure

| Course | Lessons by chapter | Total |
| --- | --- | --- |
| SEO for Business | 2 / 2 / 2 | 6 |
| AI Search & Business Discovery | 1 / 2 / 1 | 4 |
| Web Conversion for Business Growth | 2 / 2 / 1 | 5 |
| Web Architecture for Business Continuity | 2 / 2 / 1 | 5 |
| Controlling Digital Project Costs | 1 / 2 / 1 | 4 |
| Building Brand Trust on Social Media | 2 / 2 / 1 | 5 |
| Building Brand Value Through Design | 1 / 2 / 1 | 4 |

7 courses, 21 chapters, 33 lessons. Chapters group the Understand → Apply → Decide/Measure progression. The nested curriculum is the source of truth for course order, lesson order, counts, and chapter membership. English names match the planning document; Indonesian names, summaries and objectives are localized.

## Navigation and availability

- Desktop: sticky sidebar with its own scrolling; short chapter headings and a visible current lesson.
- Mobile: native collapsible outline; selecting a lesson closes the outline and moves focus to the lesson heading.
- Previous/next crosses chapter boundaries in curriculum order. Direct lesson hashes, reload and browser Back/Forward are supported.
- Without JavaScript, all summaries remain visible with regular anchor navigation.
- Each lesson has one future video slot. Until verified assets arrive, the UI explicitly says video is unavailable and does not expose a fake player or completion action.
- When a real video is configured later, the existing click-to-load youtube-nocookie player and local progress controls remain supported. Switching away stops the active player.
- No durations, downloadable resources, or full reading modules were invented.

## Compatibility and scope control

The five retained course URLs remain unchanged. The retired UX course redirects to Web Conversion in both locales. Shared Learn cards automatically display the updated course catalog on Home; the Home layout is untouched. Service preview titles follow the new titles; a guard keeps the two newly covered service categories from adding sections outside this Learn revision.

## Validation

- Production build: 82 pages including the two retired-course redirects.
- Eleven Node tests: approved curriculum counts/order, bilingual content, generated chapter links, pending video states, all site links/assets, portfolio routes, and existing quiz behavior.
- Edge: all 14 course pages; chapter selection, previous/next across chapters, keyboard navigation, deep-link reload, Back/Forward, mobile outline, reduced motion, no-JavaScript fallback, and the old UX route.
- Screenshots and browser report: external task artifacts, revision12-* (not added to the website codebase).
