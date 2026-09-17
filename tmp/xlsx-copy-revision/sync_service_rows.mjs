import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { servicesData } = require('./services-data.cjs');
const payloadPath = path.resolve('workbook-final-values.json');
const payload = JSON.parse(await fs.readFile(payloadPath, 'utf8'));

const pageToSlug = new Map([
  ['SERVICE DETAIL — Web Services', 'web-services'],
  ['SERVICE DETAIL — SEO + AEO & GEO', 'seo'],
  ['SERVICE DETAIL — Content Management', 'content-management'],
]);

const localized = {
  id: {
    pageTitleSuffix: 'Layanan Kultivate',
    systemRole: 'LAYANAN KULTIVATE',
    primaryCta: 'Konsultasi dengan kami',
    secondaryCta: 'Lihat portofolio',
    problemsKicker: 'Kapan dibutuhkan',
    problemsHeading: 'Bagian yang dapat dibantu',
    scopeKicker: 'Cakupan',
    scopeHeading: 'Bagian yang dapat kami tangani',
    scopeTitles: ['Pilihan cakupan', 'Hasil kerja yang umum', 'Cocok untuk'],
    processKicker: 'Proses',
    processHeading: 'Cara kami mengerjakannya',
    faqHeading: 'Pertanyaan umum',
    faq(serviceTitle) {
      return [
        [`Bagaimana kami menentukan cakupan proyek ${serviceTitle}?`, 'Kami mulai dari posisi, prioritas, dan kapasitas internal Anda saat ini. Cakupan hanya berisi pekerjaan yang membutuhkan perhatian.'],
        [`Apakah layanan ${serviceTitle} dapat digunakan sendiri?`, 'Bisa. Setiap layanan dapat berjalan sendiri atau digabungkan ketika pekerjaannya saling berkaitan. Kami merekomendasikan cakupan terkecil yang tetap berguna untuk prioritas Anda.'],
        ['Bagaimana komunikasi selama proyek berlangsung?', 'Sebelum pekerjaan dimulai, kami menyepakati ritme update yang praktis dan menjelaskan keputusan, dependensi, serta hasil kerja dengan bahasa yang jelas.'],
      ];
    },
    finalTitle: 'Mulai dari prioritas Anda saat ini.',
    finalBody: 'Ceritakan bagian yang membutuhkan perhatian. Kami akan memahami konteksnya sebelum merekomendasikan pekerjaan.',
  },
  en: {
    pageTitleSuffix: 'Kultivate Services',
    systemRole: 'KULTIVATE SERVICE',
    primaryCta: 'Consult with us',
    secondaryCta: 'View portfolio',
    problemsKicker: 'When it helps',
    problemsHeading: 'Where this service helps',
    scopeKicker: 'Coverage',
    scopeHeading: 'What we can take care of',
    scopeTitles: ['Scope options', 'Typical deliverables', 'Useful for'],
    processKicker: 'Process',
    processHeading: 'How we approach the work',
    faqHeading: 'What teams usually want to know',
    faq(serviceTitle) {
      return [
        [`How do you decide the scope of a ${serviceTitle} project?`, 'We begin with your current position, priorities, and internal capacity. The scope covers the work that needs attention and leaves out work that does not.'],
        [`Can ${serviceTitle} be used on its own?`, 'Yes. Each service can stand on its own or be combined with others when the work overlaps. We recommend the smallest useful scope for your priorities.'],
        ['How will we communicate during the project?', 'We agree on a practical update rhythm before work begins and explain decisions, dependencies, and deliverables in plain language.'],
      ];
    },
    finalTitle: 'Start with your current priorities.',
    finalBody: 'Tell us what needs attention. We will review the context before recommending any work.',
  },
};

function processParts(value) {
  const separator = value.indexOf(': ');
  if (separator < 0) return [value, value];
  return [value.slice(0, separator), value.slice(separator + 2)];
}

for (const [pageName, slug] of pageToSlug) {
  for (const language of ['id', 'en']) {
    const service = servicesData[language].find((item) => item.slug === slug);
    const copy = localized[language];
    const rows = payload.copyMaster.filter((row) => row[0] === language.toUpperCase() && row[1] === pageName);
    const problems = [...service.problemsSolved];
    const scopeGroups = [[...service.scope], [...service.deliverables], [...service.whoItIsFor]];
    const process = service.process.map(processParts);
    const faqs = copy.faq(service.title).flat();
    let problemIndex = 0;
    let scopeGroupIndex = -1;
    let scopeItemIndex = 0;
    let processTitleIndex = 0;
    let processBodyIndex = 0;
    let faqIndex = 0;

    for (const row of rows) {
      const section = row[2];
      const component = row[3];
      const type = row[4];

      if (component === '[slug].astro' && type === 'Page title') row[6] = `${service.title} - ${copy.pageTitleSuffix} | Kultivate`;
      if (component === '[slug].astro' && type === 'Meta description') row[6] = service.description;

      if (component === 'ServiceHero') {
        if (type === 'System role') row[6] = copy.systemRole;
        if (type === 'Service title') row[6] = service.title;
        if (type === 'Tagline') row[6] = service.tagline;
        if (type === 'Body') row[6] = service.description;
        if (type === 'Primary CTA') row[6] = copy.primaryCta;
        if (type === 'Secondary CTA') row[6] = copy.secondaryCta;
        if (type === 'Image alt') row[6] = `${service.title} service visual`;
      }

      if (component === 'ServiceProblems') {
        if (type === 'Section kicker') row[6] = copy.problemsKicker;
        if (type === 'Headline') row[6] = copy.problemsHeading;
        if (type === 'Outcome item') row[6] = problems[problemIndex++] ?? '';
      }

      if (component === 'ServiceScope') {
        if (type === 'Section kicker') row[6] = copy.scopeKicker;
        if (type === 'Headline') row[6] = copy.scopeHeading;
        if (type === 'Subsection title') {
          scopeGroupIndex += 1;
          scopeItemIndex = 0;
          row[6] = copy.scopeTitles[scopeGroupIndex] ?? '';
        }
        if (type === 'List item') row[6] = scopeGroups[scopeGroupIndex]?.[scopeItemIndex++] ?? '';
      }

      if (component === 'ServiceProcess') {
        if (type === 'Section kicker') row[6] = copy.processKicker;
        if (type === 'Headline') row[6] = copy.processHeading;
        if (type === 'Step title') row[6] = process[processTitleIndex++]?.[0] ?? '';
        if (type === 'Step body') row[6] = process[processBodyIndex++]?.[1] ?? '';
      }

      if (component === 'ServiceFAQ') {
        if (type === 'Section kicker') row[6] = 'FAQ';
        if (type === 'Headline') row[6] = copy.faqHeading;
        if (type === 'Question' || type === 'Answer') row[6] = faqs[faqIndex++] ?? '';
      }

      if (component === 'FinalCTA' && section === 'Final CTA') {
        if (type === 'Headline') row[6] = copy.finalTitle;
        if (type === 'Body') row[6] = copy.finalBody;
        if (type === 'CTA') row[6] = copy.primaryCta;
      }
    }
  }
}

payload.notes[5][1] = 'Revised copy aligned with the staging website. Existing rows and segments are preserved; no new section or segment was added. Extra legacy item slots without a corresponding live item are intentionally blank.';

const forbidden = /(one system|one connected|one search strategy|working system|satu sistem|satu strategi|sistem yang berjalan|social media management|website development|2 to 6 weeks|2 sampai 6 minggu|within 24 hours|H\+1|\bcould\b|moving in one direction|bergerak searah)/i;
payload.audit.suspicious = payload.copyMaster.slice(1).map((row, index) => ({ row: index + 2, page: row[1], component: row[3], copy: row[6] }))
  .filter((item) => forbidden.test(item.copy));
payload.audit.blankNewCopyRows = payload.copyMaster.slice(1).map((row, index) => ({ row: index + 2, page: row[1], component: row[3], type: row[4], copy: row[6] }))
  .filter((item) => typeof item.copy !== 'string' || item.copy.trim().length === 0);

await fs.writeFile(payloadPath, JSON.stringify(payload, null, 2), 'utf8');
console.log(JSON.stringify({ suspicious: payload.audit.suspicious.length, blankNewCopyRows: payload.audit.blankNewCopyRows.length, blanks: payload.audit.blankNewCopyRows }));
