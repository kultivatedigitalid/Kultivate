import { readFile, writeFile } from 'node:fs/promises';

const file = 'C:/Users/Joshua/OneDrive/Documents/Kultivate/website/src/components/home/ClientLogoBand.astro';
let source = await readFile(file, 'utf8');
const replacements = [
  ["note: 'Pendekatan kami menyesuaikan posisi, kapasitas internal, dan ritme setiap bisnis'", "note: 'Pendekatan kami menyesuaikan posisi setiap bisnis, kapasitas yang tersedia, dan ritme pekerjaan'"],
  ["note: 'Our approach adapts to each business position, internal capacity, and pace'", "note: 'Our approach adapts to where each business stands, the capacity available, and the pace of the work'"]
];
for (const [before, after] of replacements) {
  if (!source.includes(before)) throw new Error(`Missing brand band copy: ${before}`);
  source = source.replace(before, after);
}
await writeFile(file, source, 'utf8');
console.log('Brand band copy polished');
