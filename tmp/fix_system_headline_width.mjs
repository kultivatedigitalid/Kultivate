import fs from 'node:fs';

const target = String.raw`C:\Users\Joshua\OneDrive\Documents\Kultivate\website\src\components\home\ConnectedSystem.astro`;
const current = fs.readFileSync(target, 'utf8');
const next = current.replace('.system-header h2 { max-width:14ch; }', '.system-header h2 { max-width:18ch; }');
if (next === current) throw new Error('ConnectedSystem headline width rule was not found');
fs.writeFileSync(target, next, 'utf8');
