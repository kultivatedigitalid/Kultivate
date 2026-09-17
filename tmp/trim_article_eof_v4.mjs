import fs from 'node:fs';

for (const target of [
  String.raw`C:\Users\Joshua\OneDrive\Documents\Kultivate\website\src\pages\en\insights\[slug].astro`,
  String.raw`C:\Users\Joshua\OneDrive\Documents\Kultivate\website\src\pages\id\insights\[slug].astro`,
]) {
  const current = fs.readFileSync(target, 'utf8');
  fs.writeFileSync(target, current.trimEnd() + '\n', 'utf8');
}
