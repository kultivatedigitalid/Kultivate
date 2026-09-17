import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

function tokenize(source) {
  const tokens = [];
  let index = 0;

  while (index < source.length) {
    const char = source[index];
    const next = source[index + 1];

    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    if (char === '/' && next === '/') {
      index += 2;
      while (index < source.length && source[index] !== '\n') index += 1;
      continue;
    }

    if (char === '/' && next === '*') {
      index += 2;
      while (index < source.length && !(source[index] === '*' && source[index + 1] === '/')) index += 1;
      index += 2;
      continue;
    }

    if (char === "'" || char === '"') {
      const quote = char;
      const start = index;
      index += 1;
      while (index < source.length) {
        if (source[index] === '\\') {
          index += 2;
          continue;
        }
        if (source[index] === quote) {
          index += 1;
          break;
        }
        index += 1;
      }
      const raw = source.slice(start, index);
      const value = vm.runInNewContext(raw, Object.create(null), { timeout: 50 });
      tokens.push({ type: 'string', value });
      continue;
    }

    if ('[],'.includes(char)) tokens.push({ type: char, value: char });
    index += 1;
  }

  return tokens;
}

function extractPairs(source) {
  const tokens = tokenize(source);
  const pairs = [];
  for (let index = 0; index < tokens.length - 4; index += 1) {
    if (
      tokens[index].type === '[' &&
      tokens[index + 1].type === 'string' &&
      tokens[index + 2].type === ',' &&
      tokens[index + 3].type === 'string' &&
      (tokens[index + 4].type === ']' || tokens[index + 4].type === ',')
    ) {
      pairs.push([tokens[index + 1].value, tokens[index + 3].value]);
    }
  }
  return pairs;
}

function nestedStrings(value) {
  return tokenize(value).filter((token) => token.type === 'string').map((token) => token.value);
}

const root = path.resolve('../..');
const scriptPaths = [
  path.join(root, 'tmp/apply_copy_revisions_v1b.mjs'),
  path.join(root, 'tmp/apply_copy_revisions_services_v2.mjs'),
];

const replacementMap = new Map();
for (const scriptPath of scriptPaths) {
  const source = await fs.readFile(scriptPath, 'utf8');
  for (const [from, to] of extractPairs(source)) {
    if (from !== to) replacementMap.set(from, to);
    const fromNested = nestedStrings(from);
    const toNested = nestedStrings(to);
    if (fromNested.length > 0 && fromNested.length === toNested.length) {
      for (let index = 0; index < fromNested.length; index += 1) {
        if (fromNested[index] !== toNested[index]) replacementMap.set(fromNested[index], toNested[index]);
      }
    }
  }
}

const explicitMap = new Map([
  ['Get Started', 'Consult with us'],
  ['Mulai Sekarang', 'Konsultasi dengan kami'],
  ['Start a Project', 'Consult with us'],
  ['Mulai Proyek', 'Konsultasi dengan kami'],
  ['Website Development', 'Web Services'],
  ['Social Media Management', 'Content Management'],
]);
for (const [from, to] of explicitMap) replacementMap.set(from, to);

function revise(value) {
  if (typeof value !== 'string' || value.length === 0) return value;
  let next = value;
  const seen = new Set();
  while (replacementMap.has(next) && !seen.has(next)) {
    seen.add(next);
    next = replacementMap.get(next);
  }
  return next;
}

const workbookData = JSON.parse(await fs.readFile(path.resolve('copy-master-before.json'), 'utf8'));
const updates = [];
for (let index = 1; index < workbookData.copyMaster.length; index += 1) {
  const row = workbookData.copyMaster[index];
  const current = row[6] || row[5] || '';
  const revised = revise(current);
  if (revised !== row[6]) updates.push({ row: index + 1, from: row[6], to: revised, page: row[1], component: row[3] });
}

const badPattern = /(one system|one connected|one search strategy|satu sistem|satu strategi|social media management|website development|2 to 6 weeks|2 sampai 6 minggu|within 24 hours|H\+1|\bcould\b)/i;
const suspicious = workbookData.copyMaster.slice(1).map((row, index) => ({
  row: index + 2,
  page: row[1],
  component: row[3],
  current: revise(row[6] || row[5] || ''),
})).filter((item) => badPattern.test(item.current));

const report = {
  mappingCount: replacementMap.size,
  updateCount: updates.length,
  updates,
  suspicious,
};

await fs.writeFile(path.resolve('workbook-update-preview.json'), JSON.stringify(report, null, 2), 'utf8');
console.log(JSON.stringify({ mappingCount: report.mappingCount, updateCount: report.updateCount, suspiciousCount: report.suspicious.length }));
