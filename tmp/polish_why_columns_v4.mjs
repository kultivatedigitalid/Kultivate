import fs from 'node:fs';

const target = String.raw`C:\Users\Joshua\OneDrive\Documents\Kultivate\website\src\components\home\WhyKultivate.astro`;
const current = fs.readFileSync(target, 'utf8');
const next = current.replace(
  '.why-layout { display:grid; grid-template-columns:minmax(280px,.72fr) minmax(520px,1.28fr); gap:clamp(56px,8vw,116px); align-items:start; }',
  '.why-layout { display:grid; grid-template-columns:minmax(320px,.9fr) minmax(500px,1.1fr); gap:clamp(48px,6vw,88px); align-items:start; }'
);
if (next === current) throw new Error('Why layout rule was not found');
fs.writeFileSync(target, next, 'utf8');
