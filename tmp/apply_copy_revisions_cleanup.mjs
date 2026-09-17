import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('website');
const changes = [
  ['src/components/home/WhyKultivate.astro', [
    ['Lapisan search yang terhubung menjadi satu sistem', 'Bidang search yang disusun berdasarkan kebutuhan bisnis'],
    ['Connected search layers forming one system', 'Search layers arranged around business needs']
  ]],
  ['src/pages/404.astro', [
    ['description="The page may have moved or the address may be incorrect."', 'description="We could not find the page at this address."'],
    ['The page may have moved or the address may be incorrect. Return home or choose another section.', 'We could not find the page at this address. Return home or choose another section.'],
    ['Halaman mungkin telah dipindahkan atau alamatnya kurang tepat. Kembali ke Home atau pilih bagian lain.', 'Kami tidak menemukan halaman pada alamat ini. Kembali ke Home atau pilih bagian lain.']
  ]]
];

for (const [relativePath, replacements] of changes) {
  const absolutePath = path.join(root, relativePath);
  let text = (await fs.readFile(absolutePath, 'utf8')).replace(/\r\n/g, '\n');
  for (const [from, to] of replacements) {
    const count = text.split(from).length - 1;
    if (count !== 1) throw new Error(`${relativePath}: expected 1, found ${count}: ${from}`);
    text = text.replace(from, to);
  }
  await fs.writeFile(absolutePath, text, 'utf8');
}

console.log(`Updated ${changes.length} files.`);
