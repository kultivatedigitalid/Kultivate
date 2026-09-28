# Pending Inputs

## Resolved scope · 15 September 2026

- Newest service source received: `Kultivate Services.docx`.
- “One segment, one screen” confirmed for desktop/laptop; mobile may stack.
- Light direction confirmed: icy Pinterest white/blue mixed with ROOTS blue glow.
- Portfolio scope confirmed: current gallery and existing inactive detail template.
- Exact Ribbon Field source retrieved; all three registered SHA-256 values verified. No source-retrieval blocker remains.
- New work stays on `experiments`. Previous work was committed as `4c8599a` and pushed to `origin/staging` before continuing. Existing proof, business contact, and content approvals below are unaffected.



**Brand baseline:** Kultivate Brand Guideline Book v2.0
**Last updated:** 2026-09-25

| ID | Input | Blocks | Owner | Status |
|---|---|---|---|---|
| P-001 | Approved logo master and variants | Header, footer, favicon | Kultivate | PARTIAL: provisional wordmark active |
| P-002 | Domain and hosting | Deployment, canonical URLs | Kultivate | PENDING |
| P-003 | Public business email and WhatsApp | Contact and CTA | Kultivate | PARTIAL: halo@kultivate.id confirmed for business/privacy; WhatsApp verification remains pending |
| P-004 | Static form processor/data flow | Contact form, privacy | Kultivate | CONFIRMED: third-party form processor → email + Google Sheets; verify Formspree account plan and actual submission archive retention |
| P-005 | Analytics and consent choice | Events, privacy | Kultivate | DECIDED: GA4/GTM intended, consent required; IDs empty and tags inactive. Consent mechanism is a prerequisite before activation |
| P-006 | Publishable portfolio list | Work pages | Kultivate | PARTIAL: 12 entries active only as explicitly labeled concept studies |
| P-007 | Client/logo/testimonial permissions | Public proof | Kultivate | PENDING |
| P-008 | Verified project outcomes | Case studies | Kultivate | PENDING |
| P-009 | Team names, roles, photos | Individual About profiles | Kultivate | PENDING: role-level delivery bios active without identities |
| P-010 | Legal/public address details | Footer, privacy | Kultivate | PARTIAL: PT Karya Lintas Generasi confirmed as Kultivate operator/controller; no street address in Privacy Policy. Other address verification remains separate |
| P-011 | Final Indonesian copy | All pages | Joshua/Approver | REVIEW |
| P-012 | Reviewed English copy | All pages | Translator/Approver | REVIEW |
| P-013 | Licensed Sounds Right webfont file and public web usage permission | Display typography | Kultivate | PENDING |
| P-014 | Approved founding year and public founding story | About | Kultivate | PENDING |
| P-015 | Approved industry contexts, examples, and permission | Industry-context modules | Kultivate | PENDING |

Never invent a pending value to make a page look complete.

## Privacy decisions and operational follow-up · 25 September 2026

- Approved by the supplied privacy brief: controller PT Karya Lintas Generasi / Kultivate; privacy email halo@kultivate.id. Public street address is not required in the policy.
- Inquiry flow: third-party form processor → Kultivate email + Google Sheets. The email/Sheets flow is owner-confirmed; the repository only exposes the form endpoint, not provider account settings.
- Kultivate-controlled inquiry and communication records: up to 12 months after last communication, earlier when no longer needed or a valid deletion request is fulfilled, with narrow lawful exceptions.
- Operational prerequisite: assign responsibility for reviewing last-communication dates and deleting expired email and Google Sheets inquiry records. A policy alone does not enforce deletion. No deletion automation was built.
- Still unresolved: verify Formspree account plan and actual submission archive retention; do not apply the 12-month claim to its unverified archive.
- Required privacy acknowledgement and optional marketing_consent are separate. Promotional follow-up requires the applicable user choice; no newsletter exists. Record consent with the inquiry and honor withdrawals.
- GA4/GTM intended; gaId and gtmId remain empty. analyticsConsentRequired is true. Implement and verify the consent mechanism before enabling any Google tags. No CMP or cookie banner is introduced by this task.
- No Meta Pixel, Hotjar, Microsoft Clarity or equivalent behavior tracker is used.
- YouTube privacy-enhanced player loads on visitor choice. Learn completion uses localStorage; language-position restoration uses temporary sessionStorage.
- English Privacy Policy is authoritative subject to applicable law. Indonesian policy remains required and substantively equivalent.
