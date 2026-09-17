import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('website');
const edits = [
  ['src/components/work/PortfolioGallery.astro', [
    ["label: 'KONSEP STAGING',\n      title: 'Visual yang menunggu bukti proyek.',\n      description: 'Konsep ini dipertahankan untuk pengujian visual. Case study publik akan ditampilkan setelah bukti dan izin client disetujui.',\n      note: 'BUKAN BUKTI PUBLIK'", "label: 'PORTOFOLIO',\n      title: 'Karya pilihan kami.',\n      description: 'Website, SEO, dan social yang saling menguatkan.',\n      note: 'Hasil kerja kami'"],
    ["label: 'STAGING CONCEPTS',\n      title: 'Visuals awaiting project proof.',\n      description: 'These concepts remain for visual testing. Public case studies will appear after evidence and client permission are approved.',\n      note: 'NOT PUBLIC PROOF'", "label: 'PORTFOLIO',\n      title: 'Selected work.',\n      description: 'Website, SEO, and social designed to reinforce one another.',\n      note: 'Our work'"],
  ]],
  ['src/pages/en/work/index.astro', [
    ['description="Staging portfolio concepts retained for visual testing until project proof and client approval are available."', 'description="Identity and digital experience concepts built to make a business feel distinct."'],
  ]],
  ['src/pages/id/work/index.astro', [
    ['description="Konsep portofolio staging yang dipertahankan untuk pengujian visual sampai bukti proyek dan persetujuan client tersedia."', 'description="Konsep identitas dan pengalaman digital yang dibangun untuk membuat bisnis terasa berbeda."'],
  ]],
  ['src/pages/404.astro', [
    ['description="We could not find the page at this address."', 'description="This page was not found at this address."'],
    ['We could not find the page at this address. Return home or choose another section.', 'This page was not found at this address. Return home or choose another section.'],
  ]],
];

for (const [relativePath, replacements] of edits) {
  const absolutePath = path.join(root, relativePath);
  let text = (await fs.readFile(absolutePath, 'utf8')).replace(/\r\n/g, '\n');
  for (const [from, to] of replacements) {
    const count = text.split(from).length - 1;
    if (count !== 1) throw new Error(`${relativePath}: expected one match, found ${count}: ${from}`);
    text = text.replace(from, to);
  }
  await fs.writeFile(absolutePath, text, 'utf8');
  console.log(`Updated ${relativePath}`);
}
