import fs from 'node:fs';

const target = String.raw`C:\Users\Joshua\OneDrive\Documents\Kultivate\website\src\components\home\FinalCTA.astro`;
const current = fs.readFileSync(target, 'utf8');
const next = current
  .replace('Mulai dari prioritas Anda saat ini.', 'Mulai dari prioritas Anda saat ini')
  .replace('Start with your current priorities.', 'Start with your current priorities');
if (next === current) throw new Error('Final CTA headlines were not found');
fs.writeFileSync(target, next, 'utf8');
