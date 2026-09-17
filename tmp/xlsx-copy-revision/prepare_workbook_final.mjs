import fs from 'node:fs/promises';
import path from 'node:path';

const workbookData = JSON.parse(await fs.readFile(path.resolve('copy-master-before.json'), 'utf8'));
const preview = JSON.parse(await fs.readFile(path.resolve('workbook-update-preview.json'), 'utf8'));

for (const update of preview.updates) {
  workbookData.copyMaster[update.row - 1][6] = update.to;
}

const pageRenames = new Map([
  ['SERVICE DETAIL — Website Development', 'SERVICE DETAIL — Web Services'],
  ['SERVICE DETAIL — Search Engine Optimization (SEO)', 'SERVICE DETAIL — SEO + AEO & GEO'],
  ['SERVICE DETAIL — Social Media Management', 'SERVICE DETAIL — Content Management'],
]);

const copyReplacements = [
  ['Lapisan search yang terhubung menjadi satu sistem', 'Bidang search yang disusun berdasarkan kebutuhan bisnis'],
  ['Connected search layers forming one system', 'Search layers arranged around business needs'],
  ['Website Development', 'Web Services'],
  ['Search Engine Optimization (SEO)', 'SEO'],
  ['Social Media Management', 'Content Management'],
  ['Dari keputusan awal menjadi sistem yang berjalan', 'Cara kami mengerjakannya'],
  ['From first decision to a working system', 'How we approach the work'],
  ['Sebagian besar proyek berjalan 2 sampai 6 minggu. Scope dan kesiapan aset menentukan ritmenya; milestone disepakati sebelum pekerjaan dimulai.', 'Kami mulai dari posisi, prioritas, dan kapasitas internal Anda saat ini. Cakupan hanya berisi pekerjaan yang membutuhkan perhatian.'],
  ['Bisa. Website, SEO, dan social dapat dirancang sebagai satu sistem, atau dimulai dari kebutuhan yang paling mendesak.', 'Bisa. Setiap layanan dapat berjalan sendiri atau digabungkan ketika pekerjaannya saling berkaitan. Kami merekomendasikan cakupan terkecil yang tetap berguna untuk prioritas Anda.'],
  ['Most projects run for 2 to 6 weeks. Scope and asset readiness set the pace; milestones are agreed before work begins.', 'We begin with your current position, priorities, and internal capacity. The scope covers the work that needs attention and leaves out work that does not.'],
  ['Yes. Website, SEO, and social can be designed as one system, or started from the most urgent need.', 'Yes. Each service can stand on its own or be combined with others when the work overlaps. We recommend the smallest useful scope for your priorities.'],
];

function replaceAll(value, from, to) {
  return typeof value === 'string' ? value.split(from).join(to) : value;
}

for (let index = 1; index < workbookData.copyMaster.length; index += 1) {
  const row = workbookData.copyMaster[index];
  const originalPage = row[1];
  if (pageRenames.has(originalPage)) row[1] = pageRenames.get(originalPage);

  if (originalPage.startsWith('SERVICE DETAIL')) {
    for (const [from, to] of copyReplacements) row[6] = replaceAll(row[6], from, to);

    row[6] = replaceAll(row[6], 'Berapa lama estimasi pengerjaan proyek ', 'Bagaimana kami menentukan cakupan proyek ');
    row[6] = replaceAll(row[6], 'Apakah layanan ', 'Apakah layanan ');
    row[6] = replaceAll(row[6], ' dapat digabungkan dengan jasa lainnya?', ' dapat digunakan sendiri?');
    row[6] = replaceAll(row[6], 'What is the typical timeframe for a ', 'How do you decide the scope of a ');
    row[6] = replaceAll(row[6], 'Can ', 'Can ');
    row[6] = replaceAll(row[6], ' be combined with other Kultivate services?', ' be used on its own?');
  } else {
    for (const [from, to] of copyReplacements.slice(0, 2)) row[6] = replaceAll(row[6], from, to);
  }
}

workbookData.pageIndex[4] = ['SERVICE DETAIL — Web Services', 'Web Services detail page', 'ID + EN'];
workbookData.pageIndex[5] = ['SERVICE DETAIL — SEO + AEO & GEO', 'SEO detail page in the existing grouped segment; no new segment added', 'ID + EN'];
workbookData.pageIndex[6] = ['SERVICE DETAIL — Content Management', 'Content Management detail page', 'ID + EN'];

workbookData.notes[2][1] = 'staging';
workbookData.notes[3][1] = 'Global shared copy + Home + Services overview + the existing Web Services, SEO + AEO & GEO, and Content Management service-detail segments, in Indonesian and English.';
workbookData.notes[5][1] = 'Revised copy aligned with the staging website. Existing rows and segments are preserved; no new section or segment was added.';
workbookData.notes[7][1] = 'The current Home page renders Hero → Portfolio → Services → Service Options → Why Kultivate → Blog Preview → Final CTA.';

const forbidden = /(one system|one connected|one search strategy|working system|satu sistem|satu strategi|sistem yang berjalan|social media management|website development|2 to 6 weeks|2 sampai 6 minggu|within 24 hours|H\+1|\bcould\b|moving in one direction|bergerak searah)/i;
const suspicious = workbookData.copyMaster.slice(1).map((row, index) => ({
  row: index + 2,
  page: row[1],
  component: row[3],
  copy: row[6],
})).filter((item) => forbidden.test(item.copy));

const missing = workbookData.copyMaster.slice(1).map((row, index) => ({ row: index + 2, page: row[1], current: row[5], revised: row[6] }))
  .filter((item) => typeof item.revised !== 'string' || item.revised.trim().length === 0);

const finalPayload = {
  copyMaster: workbookData.copyMaster,
  pageIndex: workbookData.pageIndex,
  notes: workbookData.notes,
  audit: {
    rowCount: workbookData.copyMaster.length,
    suspicious,
    blankNewCopyRows: missing,
  },
};

await fs.writeFile(path.resolve('workbook-final-values.json'), JSON.stringify(finalPayload, null, 2), 'utf8');
console.log(JSON.stringify({ rows: finalPayload.audit.rowCount, suspicious: suspicious.length, blankNewCopyRows: missing.length }));
