import fs from 'node:fs/promises';
import path from 'node:path';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const inputPath = path.resolve('../../outputs/01a00f82-kultivate-copy-staging/Kultivate_Copywriting_Master_2026-08-17.xlsx');
const outputDir = path.resolve('../../outputs/01a00f82-kultivate-copy-staging-v2');
const outputPath = path.join(outputDir, 'Kultivate_Copywriting_Master_2026-08-17.xlsx');
const previewDir = path.resolve('previews-after');
const payload = JSON.parse(await fs.readFile(path.resolve('workbook-final-values.json'), 'utf8'));

if (payload.audit.blankNewCopyRows.some((item) => ![300, 308, 454, 462].includes(item.row))) {
  throw new Error('Unexpected blank New Copy row found.');
}

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const copyMaster = workbook.worksheets.getItem('Copy Master');
const pageIndex = workbook.worksheets.getItem('Page Index');
const notes = workbook.worksheets.getItem('Notes');

const bodyRows = payload.copyMaster.slice(1);
copyMaster.getRange('B2:B597').values = bodyRows.map((row) => [row[1]]);
copyMaster.getRange('G2:G597').values = bodyRows.map((row) => [row[6]]);
pageIndex.getRange('A1:C8').values = payload.pageIndex;
notes.getRange('A1:B10').values = payload.notes;

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const previews = [
  { sheetName: 'Copy Master', range: 'A1:K45', suffix: 'top' },
  { sheetName: 'Copy Master', range: 'A285:K340', suffix: 'services-id' },
  { sheetName: 'Copy Master', range: 'A440:K495', suffix: 'services-en' },
  { sheetName: 'Copy Master', range: 'A558:K597', suffix: 'bottom' },
  { sheetName: 'Page Index', range: 'A1:C8', suffix: 'full' },
  { sheetName: 'Notes', range: 'A1:B10', suffix: 'full' },
];

for (const { sheetName, range, suffix } of previews) {
  const preview = await workbook.render({ sheetName, range, scale: 0.65, format: 'png' });
  const safeName = `${sheetName}-${suffix}`.replace(/[^a-z0-9_-]+/gi, '-');
  await fs.writeFile(path.join(previewDir, `${safeName}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

const summary = await workbook.inspect({
  kind: 'workbook,sheet,table',
  maxChars: 10000,
  tableMaxRows: 6,
  tableMaxCols: 11,
  tableMaxCellChars: 120,
});
await fs.writeFile(path.resolve('workbook-final-inspection.ndjson'), summary.ndjson, 'utf8');

console.log(JSON.stringify({ outputPath, previews: previews.length, rows: payload.copyMaster.length, sheets: workbook.worksheets.items.map((sheet) => sheet.name) }));
