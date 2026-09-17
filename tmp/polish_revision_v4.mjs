import fs from 'node:fs';

function replace(target, search, replacement) {
  const current = fs.readFileSync(target, 'utf8');
  const next = current.replace(search, replacement);
  if (next === current) throw new Error(`No match in ${target}`);
  fs.writeFileSync(target, next, 'utf8');
}

const root = String.raw`C:\Users\Joshua\OneDrive\Documents\Kultivate\website\src\components`;

const blog = `${root}\\insights\\EditorialIndexV2.astro`;
replace(blog, "title: 'Catatan praktis tentang search, content, dan website'", "title: 'Catatan praktis tentang search'");
replace(blog, "title: 'Practical notes on search, content, and websites'", "title: 'Practical search notes'");

const why = `${root}\\home\\WhyKultivate.astro`;
replace(why, '.why-intro h2 { max-width:13ch;', '.why-intro h2 { max-width:16ch;');
replace(why, 'opacity:0; transform:translate3d(-4%,0,0) scale(1.07);', 'opacity:.48; transform:translate3d(-2%,0,0) scale(1.045);');
