import fs from 'node:fs/promises';
import path from 'node:path';

const edits = [
  ['website/src/i18n/en.ts', "'nav.start_project': 'Get Started'", "'nav.start_project': 'Consult with us'"],
  ['website/src/i18n/id.ts', "'nav.start_project': 'Mulai Sekarang'", "'nav.start_project': 'Konsultasi dengan kami'"],
];

for (const [filePath, from, to] of edits) {
  const absolutePath = path.resolve(filePath);
  let text = (await fs.readFile(absolutePath, 'utf8')).replace(/\r\n/g, '\n');
  const count = text.split(from).length - 1;
  if (count !== 1) throw new Error(`${filePath}: expected one match, found ${count}`);
  text = text.replace(from, to);
  await fs.writeFile(absolutePath, text, 'utf8');
  console.log(`Updated ${filePath}`);
}
