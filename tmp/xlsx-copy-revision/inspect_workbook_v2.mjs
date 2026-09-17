import fs from 'node:fs/promises';
import path from 'node:path';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const inputPath = path.resolve('../../outputs/01a00f82-kultivate-copy-staging/Kultivate_Copywriting_Master_2026-08-17.xlsx');
const previewDir = path.resolve('previews-before');

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const summary = await workbook.inspect({
  kind: 'workbook,sheet,table',
  maxChars: 12000,
  tableMaxRows: 8,
  tableMaxCols: 10,
  tableMaxCellChars: 140,
});
console.log(summary.ndjson);

await fs.mkdir(previewDir, { recursive: true });
const sheetNames = workbook.worksheets.items.map((sheet) => sheet.name);
console.log(`SHEETS\t${JSON.stringify(sheetNames)}`);

const previews = [
  { sheetName: 'Copy Master', range: 'A1:K40', suffix: 'top' },
  { sheetName: 'Copy Master', range: 'A280:K320', suffix: 'middle' },
  { sheetName: 'Copy Master', range: 'A558:K597', suffix: 'bottom' },
  { sheetName: 'Page Index', range: 'A1:C8', suffix: 'full' },
  { sheetName: 'Notes', range: 'A1:B10', suffix: 'full' },
];

for (const { sheetName, range, suffix } of previews) {
  const safeName = `${sheetName}-${suffix}`.replace(/[^a-z0-9_-]+/gi, '-');
  const preview = await workbook.render({
    sheetName,
    range,
    scale: 0.6,
    format: 'png',
  });
  await fs.writeFile(path.join(previewDir, `${safeName}.png`), new Uint8Array(await preview.arrayBuffer()));
}
