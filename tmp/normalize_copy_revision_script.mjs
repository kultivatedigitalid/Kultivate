import fs from 'node:fs/promises';

const input = 'tmp/apply_copy_revisions_v1.mjs';
const output = 'tmp/apply_copy_revisions_v1b.mjs';
const source = await fs.readFile(input, 'utf8');
const oldBlock = "  for (const [from, to, expected = 1] of replacements) {\n    const count = text.split(from).length - 1;";
const newBlock = "  text = text.replace(/\\r\\n/g, '\\n');\n  for (const [rawFrom, rawTo, expected = 1] of replacements) {\n    const from = rawFrom.replace(/\\r\\n/g, '\\n');\n    const to = rawTo.replace(/\\r\\n/g, '\\n');\n    const count = text.split(from).length - 1;";
if (!source.includes(oldBlock)) throw new Error('Expected helper block was not found.');
await fs.writeFile(output, source.replace(oldBlock, newBlock), 'utf8');
console.log(output);
