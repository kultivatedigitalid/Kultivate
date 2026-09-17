import fs from 'node:fs';
import path from 'node:path';

const root = String.raw`C:\Users\Joshua\OneDrive\Documents\Kultivate\website`;
const resolve = (relativePath) => path.join(root, relativePath);

function update(relativePath, transform) {
  const fullPath = resolve(relativePath);
  const current = fs.readFileSync(fullPath, 'utf8');
  const next = transform(current);
  if (next === current) throw new Error(`No change for ${relativePath}`);
  fs.writeFileSync(fullPath, next, 'utf8');
  process.stdout.write(`updated ${relativePath}\n`);
}

update('src/styles/global.css', (current) => current
  .replace(/\.home-flow\.home-flow > :is\(\s*\.services-section,\s*\.connected-system,\s*\.why-kultivate,\s*\.insights-section,\s*\.final-cta\s*\)/, `.home-flow.home-flow > :is(
  .connected-system,
  .insights-section,
  .final-cta
)`)
  .replace('/* Seamless section flow */', `/* Progressive lazy-image reveal: images remain visible when JavaScript is unavailable. */
.js img[loading='lazy'][data-lazy-state='pending'] { opacity: 0; }
.js img[loading='lazy'][data-lazy-state='loaded'] { animation: lazy-image-reveal 680ms var(--ease-out); }
@keyframes lazy-image-reveal {
  from { opacity: 0; clip-path: inset(0 0 7% 0); }
}

/* Seamless section flow */`));

update('src/data/editorial.ts', (current) => current.replace(/title: '([^']+)\.'/g, "title: '$1'"));

let changedMarkdown = 0;
for (const locale of ['en', 'id']) {
  const directory = resolve(path.join('src', 'content', 'insights', locale));
  for (const name of fs.readdirSync(directory).filter((entry) => entry.endsWith('.md'))) {
    const fullPath = path.join(directory, name);
    const current = fs.readFileSync(fullPath, 'utf8');
    const next = current.replace(/^title: "([^"]+)\."/m, 'title: "$1"');
    if (next !== current) {
      fs.writeFileSync(fullPath, next, 'utf8');
      changedMarkdown += 1;
    }
  }
}

process.stdout.write(`updated ${changedMarkdown} insight headlines\n`);
