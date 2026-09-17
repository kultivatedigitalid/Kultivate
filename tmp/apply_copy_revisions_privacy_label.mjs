import fs from 'node:fs/promises';
import path from 'node:path';

const changes = [
  ['website/src/pages/en/privacy.astro', 'through the Start a Project form', 'through the contact form'],
  ['website/src/pages/id/privacy.astro', 'melalui formulir Mulai Proyek', 'melalui formulir kontak']
];

for (const [file, from, to] of changes) {
  const absolutePath = path.resolve(file);
  let text = await fs.readFile(absolutePath, 'utf8');
  const count = text.split(from).length - 1;
  if (count !== 1) throw new Error(`${file}: expected 1, found ${count}`);
  await fs.writeFile(absolutePath, text.replace(from, to), 'utf8');
}
console.log(`Updated ${changes.length} privacy labels.`);
