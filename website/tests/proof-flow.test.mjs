import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Run after npm run build. These checks exercise the generated public artifact.
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const walk = directory => readdirSync(directory, { withFileTypes: true })
  .flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const page = route => readFileSync(path.join(dist, route, 'index.html'), 'utf8');

test('generated site has no broken internal links, anchors or local assets', () => {
  assert.ok(existsSync(dist), 'Run npm run build before this check.');
  const failures = [];
  for (const file of walk(dist).filter(file => file.endsWith('.html'))) {
    const from = '/' + path.relative(dist, file).replaceAll('\\', '/').replace(/index\.html$/, '');
    for (const match of readFileSync(file, 'utf8').matchAll(/(?:href|src)="([^"\s]+)"/g)) {
      const value = match[1].replaceAll('&amp;', '&');
      if (!value.startsWith('/') && !value.startsWith('#')) continue;
      const url = new URL(value, 'https://kultivate.id' + from);
      if (url.origin !== 'https://kultivate.id') continue;
      let target = path.join(dist, decodeURIComponent(url.pathname));
      if (existsSync(target) && statSync(target).isDirectory()) target = path.join(target, 'index.html');
      if (!existsSync(target)) failures.push(`${from} → ${value}`);
      else if (url.hash && target.endsWith('.html')) {
        const id = decodeURIComponent(url.hash.slice(1));
        if (!readFileSync(target, 'utf8').includes(`id="${id}"`)) failures.push(`${from} → ${value} (missing anchor)`);
      }
    }
  }
  assert.deepEqual(failures, []);
});

test('every original portfolio project has a linked case study in both locales', () => {
  const projects = ['naru', 'sora', 'lumen', 'karsa', 'nadi', 'aruna', 'tala', 'reka', 'aksa', 'veda', 'loka', 'svara', 'green-ecommerce-development'];
  for (const locale of ['en', 'id']) {
    const portfolio = page(`${locale}/work`);
    for (const slug of projects) {
      assert.ok(portfolio.includes(`href="/${locale}/work/${slug}/"`), `${locale}: missing ${slug} card link`);
      const study = page(`${locale}/work/${slug}`);
      assert.ok(study.includes(`hreflang="${locale === 'en' ? 'id-ID' : 'en'}"`));
      assert.ok(study.includes(`/${locale === 'en' ? 'id' : 'en'}/work/${slug}/`), `${slug}: missing translation route`);
      assert.doesNotMatch(study, /GreenCo|PLACEHOLDER - NOT PUBLIC PROOF|status:.*provisional/);
    }
  }
});
