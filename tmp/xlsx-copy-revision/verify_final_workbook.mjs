import path from 'node:path';
import fs from 'node:fs/promises';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const outputPath = path.resolve('../../outputs/01a00f82-kultivate-copy-staging-v2/Kultivate_Copywriting_Master_2026-08-17.xlsx');
const expected = JSON.parse(await fs.readFile(path.resolve('workbook-final-values.json'), 'utf8'));
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const copyMaster = workbook.worksheets.getItem('Copy Master');
const pageIndex = workbook.worksheets.getItem('Page Index');
const notes = workbook.worksheets.getItem('Notes');

const values = copyMaster.getRange('A1:K597').values;
const actualPages = values.slice(1).map((row) => row[1]);
const actualNewCopy = values.slice(1).map((row) => row[6]);
const expectedPages = expected.copyMaster.slice(1).map((row) => row[1]);
const expectedNewCopy = expected.copyMaster.slice(1).map((row) => row[6]);

const forbidden = /(one system|one connected|one search strategy|working system|satu sistem|satu strategi|sistem yang berjalan|social media management|2 to 6 weeks|2 sampai 6 minggu|within 24 hours|H\+1|\bcould\b|moving in one direction|bergerak searah)/i;
const formulaErrors = ['#REF!', '#DIV/0!', '#VALUE!', '#NAME?', '#N/A'];
const badCopyRows = actualNewCopy.map((copy, index) => ({ row: index + 2, copy })).filter((item) => forbidden.test(String(item.copy ?? '')));
const errorCells = values.flatMap((row, rowIndex) => row.map((value, colIndex) => ({ row: rowIndex + 1, col: colIndex + 1, value })))
  .filter((cell) => formulaErrors.includes(cell.value));
const blanks = actualNewCopy.map((copy, index) => ({ row: index + 2, copy })).filter((item) => String(item.copy ?? '').trim().length === 0).map((item) => item.row);

const checks = {
  sheets: workbook.worksheets.items.map((sheet) => sheet.name),
  rowCount: values.length,
  pagesMatch: JSON.stringify(actualPages) === JSON.stringify(expectedPages),
  newCopyMatches: JSON.stringify(actualNewCopy) === JSON.stringify(expectedNewCopy),
  pageIndexMatches: JSON.stringify(pageIndex.getRange('A1:C8').values) === JSON.stringify(expected.pageIndex),
  notesMatch: JSON.stringify(notes.getRange('A1:B10').values) === JSON.stringify(expected.notes),
  lockedHeroEn: ['Your Solution for Digital Growth', 'Built to help your business get found', 'Consult with us', 'View portfolio'].every((copy) => actualNewCopy.includes(copy)),
  lockedHeroId: ['Solusi Anda untuk Pertumbuhan Digital', 'Dibangun untuk membantu bisnis Anda ditemukan', 'Konsultasi dengan kami', 'Lihat portofolio'].every((copy) => actualNewCopy.includes(copy)),
  badCopyRows,
  errorCells,
  blanks,
};

const passed = checks.sheets.join('|') === 'Copy Master|Page Index|Notes'
  && checks.rowCount === 597
  && checks.pagesMatch
  && checks.newCopyMatches
  && checks.pageIndexMatches
  && checks.notesMatch
  && checks.lockedHeroEn
  && checks.lockedHeroId
  && checks.badCopyRows.length === 0
  && checks.errorCells.length === 0
  && JSON.stringify(checks.blanks) === JSON.stringify([300, 308, 454, 462]);

console.log(JSON.stringify({ passed, ...checks }, null, 2));
if (!passed) process.exitCode = 1;
