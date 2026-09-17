import fs from 'node:fs/promises';
import path from 'node:path';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const inputPath = path.resolve('../../outputs/01a00f82-kultivate-copy-staging/Kultivate_Copywriting_Master_2026-08-17.xlsx');
const outputPath = path.resolve('copy-master-before.json');

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sheet = workbook.worksheets.getItem('Copy Master');
const pageIndex = workbook.worksheets.getItem('Page Index');
const notes = workbook.worksheets.getItem('Notes');

const payload = {
  copyMaster: sheet.getRange('A1:K597').values,
  pageIndex: pageIndex.getRange('A1:C8').values,
  notes: notes.getRange('A1:B10').values,
};

await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), 'utf8');
console.log(`WROTE\t${outputPath}`);
