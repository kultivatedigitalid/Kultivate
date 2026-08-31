# Kultivate implementation and growth roadmap

Status date: 27 August 2026  
Working branch: `staging`  
Protected branch: `main` (untouched)

## Implementation roadmap

| Feature / Revision | Masalah yang Diselesaikan | Alasan Penting | Referensi | Cara Adaptasi untuk Kultivate | Implementasi UX/UI | Testing / Validation | Priority |
|---|---|---|---|---|---|---|---|
| Git baseline | Branch feature dan staging belum terkonsolidasi | Menjaga satu source of truth | Local Git history | Merge `codex/staging-features` ke `staging` | Tidak mengubah UI | Conflict check dan production build | P0 — complete |
| Restore Portfolio + Blog | Redesign Phase 2 mengubah pengalaman yang ingin dibatalkan | Memulihkan hierarchy yang sudah disetujui tanpa rollback global | Parent commit `cad32d8` | Restore hanya tiga file yang berubah | Copy, structure, interaction kembali ke baseline | Exact source comparison dan route build | P0 — complete |
| Continuous page flow | Gradient per-section berisiko membentuk seam | Flow visual memengaruhi comprehension dan perceived quality | Existing Home wrapper | Wrapper menjadi pemilik gradient; child section transparan | Natural dark-to-lighter rhythm, shared transitions | Desktop/mobile edge inspection dan build | P0 — implemented |
| Get Started relief | Form panjang berada dalam visual field gelap yang seragam | Light work surface membantu fokus dan form completion | Contrast relief pattern | Header tetap gelap; form/content menjadi light contained surface | High-contrast fields, cards, and labels | Form states, contrast, overflow | P0 — implemented |
| Service recommendation quiz | Lima pertanyaan tampil sekaligus dan rekomendasi terlalu sederhana | Mengurangi cognitive load dan memberi starting point yang kredibel | Quizizz pacing; HMNS-style guided discovery | Lima pertanyaan dengan weighted service scoring | Intro → one question → 2-second calculation → result; progress, back, reset | 1.024 combinations plus representative service scenarios | P0 — implemented |
| Knowledge Ecosystem | Delivery roles menjelaskan organisasi, bukan hubungan disiplin | Menjelaskan cara Kultivate menyelesaikan business problem | Orbit, atom, knowledge network | Delapan disiplin mengitari satu central outcome | Hover/focus detail, gentle orbit, mobile semantic list | Keyboard, hover, touch fallback, reduced motion | P0 — implemented |
| Responsive/regression pass | Full-screen features dapat overflow atau merusak route lain | Menjaga usability lintas viewport | QA checklist | Validate desktop 1366×768, mobile, and all routes | Bounded viewport stages and compact breakpoints | Build, DOM/static checks, browser QA when available | P0 — in validation |
| Growth benchmark | Belum ada next-feature roadmap untuk trust, education, dan lead generation | Mengarahkan investasi berikutnya pada business value | Acquisition.com ecosystem | Adapt concepts, not interface or copy | Prioritized experiments below | Effort/impact metrics and opt-in quality | P1 — complete |

## Functional feature register

| Feature | Fungsi nyata | Keputusan |
|---|---|---|
| Home hero horizon | Communication: memperkenalkan positioning dan visual world | Keep; motion harus tetap restrained |
| Selected Work / Portfolio interaction | Trust + education: memperlihatkan breadth visual dan membuka konteks proyek | Restored; jangan menambah status atau disclosure baru tanpa kebutuhan bisnis |
| Client logo band | Trust | Keep only when logo/client permission is verified; otherwise replace with capability evidence |
| Services panels | Education + navigation | Keep; setiap panel mengarah ke service context |
| Connected System | Education: menjelaskan hubungan discovery, decision, delivery, learning | Keep; hindari decorative motion tambahan |
| Why Kultivate interaction | Trust + communication | Keep; hover/focus memperjelas alasan, bukan sekadar efek |
| Recommendation quiz | Problem-solving + education + conversion | Keep; never gate the result and keep logic testable |
| About collage | Trust + personal connection | Keep when imagery accurately represents Kultivate; pause on hover/focus |
| Existing principles orbit | Education + trust: menjelaskan operating principles | Keep; berbeda fungsi dari Knowledge Ecosystem yang menjelaskan disciplines |
| Knowledge Ecosystem | Communication + problem-solving | Keep; details respond only to intent and orbit motion stays subtle |
| Blog topic filter | Education + usability | Restored; one clear filtering model is enough |
| Get Started light work surface | Usability + conversion | Keep; contrast marks the transition from browsing to action |
| Final CTA | Conversion | Keep; one next action, no competing decorative controls |

## Benchmark: Alex Hormozi / Acquisition.com / Leila Hormozi ecosystem

The following recommendations adapt the underlying mechanism. They do not copy the UI, tone, claims, or offer structure.

| Concept | Alasan efektif | Masalah yang diselesaikan | Adaptasi untuk Kultivate | UX/UI implementation | Validation | Priority |
|---|---|---|---|---|---|---|
| Free advanced training library | Demonstrates expertise before asking for a sales commitment | Prospects cannot judge service quality or know where to start | **Kultivate Field Guides**: short guides for website clarity, SEO readiness, AI-search readiness, and content operations | One learning hub with role/problem filters; ungated summaries; optional editable workbook via email | Guide completion, qualified return visits, assisted inquiries | P1 |
| Constraint-first custom roadmap | Self-segmentation makes generic education feel immediately relevant | Visitors see many possible services but cannot prioritize | Extend the new quiz into a saved **Digital Growth Starting Brief** | Results remain ungated; optional “Email this brief” with explicit consent and editable priorities | Quiz completion, result-to-service click, optional-save rate, inquiry quality | P1 |
| Personal operator letter | First-person observations create continuity and human trust | Agency content can feel polished but impersonal | Monthly **Kultivate Field Note** signed by a named strategist: one observed pattern, one example, one action | Editorial letter page plus email/LinkedIn opt-in; no generic newsletter promise | Reply quality, direct traffic, returning readers, unsubscribe rate | P1 |
| Tactical download with immediate utility | A concrete artifact creates value now and demonstrates working style | Gated PDFs often collect low-intent emails without helping | Offer a **Website Decision Checklist** or **Search Readiness Worksheet** after relevant articles | Preview full outline before opt-in; email only for editable version; no forced account | Completion and use signals, not raw lead volume | P1 |
| Qualification-aware consultation | Clear fit criteria protect both buyer time and delivery capacity | Low-context calls create poor recommendations | Add a progressive pre-call brief after quiz/contact: problem, current evidence, ownership, timing | Show why each field is asked; do not demand sensitive revenue data unless necessary | Show rate, qualified-call rate, time-to-scope, abandonment | P1 |
| Small-group diagnostic clinic | Live, tactical access compresses trust and produces actionable next steps | Prospects need confidence that advice fits their situation | Quarterly **Kultivate Search & Website Clinic** for a narrow business stage or problem | Application page, limited seats, anonymized problem patterns, takeaway worksheet | Attendance, implementation follow-up, qualified opportunities | P2 |
| Evidence-led founder story | Founder/operator context turns claims into an understandable point of view | “About” pages often list values without earned credibility | Add a short **Why Kultivate exists** letter tied to specific working principles and verified evidence | Personal letter plus evidence links; avoid inflated metrics and generic biography | About-to-contact path, qualitative feedback, proof-link engagement | P1 |
| Client knowledge hub / office hours | Reusable playbooks plus expert access extend value beyond handover | Clients lose context and repeat decisions | Start with a lightweight private client library and monthly office hours before building a community | Searchable decision records, templates, recordings, clear ownership | Reuse rate, support reduction, retention, expansion quality | P3 |
| Progressive value ladder | A clear free → diagnostic → engagement path meets buyers at different readiness levels | One CTA cannot serve all intent levels | Field Guide → Quiz/Brief → Clinic/Consultation → scoped service engagement | Contextual CTA based on page intent; never show all offers at once | Movement between stages and quality per stage | P1 |

## Primary benchmark sources

- Acquisition.com Free Advanced Training: https://www.acquisition.com/training
- Acquisition.com home and founder/workshop model: https://www.acquisition.com/
- Mozi Money Minute first-person tactical letter: https://www.acquisition.com/mozi-money-minute/what-im-focused-on-right-now
- Acquisition.com workshop and pre-work model: https://www.acquisition.com/ttl1
- ACQ Vantage diagnosis, playbooks, community, and access model: https://vantage.acquisition.com/
- Acquisition.com mission and values: https://www.acquisition.com/cause

## Measurement guardrails

- Do not optimize for email volume alone. Track lead quality, return engagement, and the usefulness of the next conversation.
- Keep quiz results ungated. Optional saving or emailing must happen after value is delivered.
- Do not publish client names, logos, outcomes, or metrics without written approval and evidence.
- Every new interactive resource requires a documented problem, owner, maintenance rhythm, and success metric.
- Run one P1 experiment at a time so attribution remains readable.
