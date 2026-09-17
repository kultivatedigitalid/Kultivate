import { readFile, writeFile } from 'node:fs/promises';

const edits = new Map([
  ['C:/Users/Joshua/OneDrive/Documents/Kultivate/website/src/components/work/PortfolioGallery.astro', [
    ["title: 'Karya pilihan kami.'", "title: 'Karya pilihan kami'"],
    ["title: 'Selected work.'", "title: 'Selected work'"]
  ]],
  ['C:/Users/Joshua/OneDrive/Documents/Kultivate/website/src/pages/en/contact.astro', [
    ['title="Tell us what needs attention."', 'title="Tell us what needs attention"']
  ]],
  ['C:/Users/Joshua/OneDrive/Documents/Kultivate/website/src/pages/id/contact.astro', [
    ['title="Ceritakan bagian yang membutuhkan perhatian."', 'title="Ceritakan bagian yang membutuhkan perhatian"']
  ]],
  ['C:/Users/Joshua/OneDrive/Documents/Kultivate/website/src/pages/en/privacy.astro', [
    ['title="Privacy without the puzzle."', 'title="Privacy without the puzzle"']
  ]],
  ['C:/Users/Joshua/OneDrive/Documents/Kultivate/website/src/pages/id/privacy.astro', [
    ['title="Privasi tanpa teka-teki."', 'title="Privasi tanpa teka-teki"']
  ]]
]);

for (const [file, replacements] of edits) {
  let source = await readFile(file, 'utf8');
  for (const [before, after] of replacements) {
    if (!source.includes(before)) throw new Error(`Missing text in ${file}: ${before}`);
    source = source.replace(before, after);
  }
  await writeFile(file, source, 'utf8');
}

console.log('Active interior headline periods removed');
