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

for (const sheetName of sheetNames) {
  const safeName = sheetName.replace(/[^a-z0-9_-]+/gi, '-');
  const preview = await workbook.render({
    sheetName,
    autoCrop: 'all',
    scale: 1,
    format: 'png',
  });
  await fs.writeFile(path.join(previewDir, `${safeName}.png`), new Uint8Array(await preview.arrayBuffer()));
}
