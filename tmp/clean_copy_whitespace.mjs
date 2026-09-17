import fs from 'node:fs/promises';
import path from 'node:path';

const files = [
  'website/src/content/insights/en/content-starts-with-a-system.md',
  'website/src/content/insights/en/direction-before-channels.md',
  'website/src/content/insights/en/seo-before-keywords.md',
  'website/src/content/insights/en/speed-and-positioning.md',
  'website/src/content/insights/en/website-as-the-system-center.md',
  'website/src/content/insights/en/what-happens-after-discovery.md',
  'website/src/content/insights/id/arah-sebelum-channel.md',
  'website/src/content/insights/id/kecepatan-dan-positioning.md',
  'website/src/content/insights/id/konten-dimulai-dari-sistem.md',
  'website/src/content/insights/id/seo-sebelum-keyword.md',
  'website/src/content/insights/id/setelah-ditemukan.md',
  'website/src/content/insights/id/website-sebagai-pusat-sistem.md',
  'website/src/pages/en/contact.astro',
  'website/src/pages/id/contact.astro'
];

for (const file of files) {
  const absolutePath = path.resolve(file);
  const text = await fs.readFile(absolutePath, 'utf8');
  const clean = text.replace(/\r+\n/g, '\n').replace(/[ \t\r]+$/gm, '');
  await fs.writeFile(absolutePath, clean, 'utf8');
}
console.log(`Cleaned ${files.length} files.`);
