import fs from 'node:fs/promises';

const input = 'tmp/apply_copy_revisions_services.mjs';
const output = 'tmp/apply_copy_revisions_services_v2.mjs';
const source = await fs.readFile(input, 'utf8');
const oldLine = "  ['AEO & GEO opportunity map.', 'AEO & GEO opportunity map yang diprioritaskan.'],";
const newLine = "  [\"      'AEO & GEO opportunity map.',\", \"      'AEO & GEO opportunity map yang diprioritaskan.',\"],";
if (!source.includes(oldLine)) throw new Error('Expected AEO mapping was not found.');
await fs.writeFile(output, source.replace(oldLine, newLine), 'utf8');
console.log(output);
