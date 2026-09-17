import fs from 'node:fs';
import path from 'node:path';

const root = String.raw`C:\Users\Joshua\OneDrive\Documents\Kultivate\website`;
const file = (relativePath) => path.join(root, relativePath);

function read(relativePath) { return fs.readFileSync(file(relativePath), 'utf8'); }
function write(relativePath, contents) { fs.writeFileSync(file(relativePath), contents, 'utf8'); process.stdout.write(`updated ${relativePath}\n`); }
function replaceOnce(relativePath, search, replacement) {
  const current = read(relativePath);
  const next = current.replace(search, replacement);
  if (next === current) throw new Error(`No match in ${relativePath}: ${String(search).slice(0, 120)}`);
  write(relativePath, next);
}

// Finish the English service-card image mapping.
const servicesGrid = 'src/components/home/ServicesGrid.astro';
replaceOnce(servicesGrid, "image: '/assets/services/seo-discovery-v2.webp'", "image: '/assets/services/seo-focus-v3.webp'");
replaceOnce(servicesGrid, "image: '/assets/services/seo-discovery-v2.webp'", "image: '/assets/services/aeo-geo-answer-v3.webp'");
replaceOnce(servicesGrid, "image: '/assets/services/website-system-v2.webp'", "image: '/assets/services/web-foundation-v3.webp'");
replaceOnce(servicesGrid, "image: '/assets/services/social-distribution-v2.webp'", "image: '/assets/services/content-rhythm-v3.webp'");

// Keep the Services headline concise while showing all four service names immediately below it.
const servicesV2 = 'src/components/services/ServicesIndexV2.astro';
replaceOnce(servicesV2, "title: 'SEO, AEO & GEO, Web Services, Content Management'", "title: 'Layanan SEO untuk prioritas search Anda'");
replaceOnce(servicesV2, "description: 'Pilih dukungan yang sesuai dengan prioritas Anda saat ini. Kami menjelaskan peran setiap layanan dan pekerjaan yang terlibat'", "description: 'SEO, AEO & GEO, Web Services, dan Content Management—pilih dukungan yang sesuai dengan prioritas Anda saat ini'");
replaceOnce(servicesV2, "title: 'SEO, AEO & GEO, Web Services, Content Management'", "title: 'SEO services for your search priorities'");
replaceOnce(servicesV2, "description: 'Choose the support that fits your current priority. We explain where each service helps and what the work involves'", "description: 'SEO, AEO & GEO, Web Services, and Content Management—choose the support that fits your current priority'");

// Service detail hero visual per category.
replaceOnce('src/components/services/ServiceHero.astro', /const image = title\.includes\('Web'\)[\s\S]*?: '\/assets\/services\/seo-discovery-v2\.webp';/, `const image = title.includes('AEO')
  ? '/assets/services/aeo-geo-answer-v3.webp'
  : title.includes('Web')
    ? '/assets/services/web-foundation-v3.webp'
    : title.includes('Content')
      ? '/assets/services/content-rhythm-v3.webp'
      : '/assets/services/seo-focus-v3.webp';`);

// Article template with clear metadata, contents navigation, reading column, and related posts.
for (const locale of ['en', 'id']) {
  const page = `src/pages/${locale}/insights/[slug].astro`;
  replaceOnce(page, "import InsightHeader from '../../../components/content/InsightHeader.astro';", "import InsightArticleV2 from '../../../components/insights/InsightArticleV2.astro';");
  replaceOnce(page, 'const { Content } = await render(article);', 'const { Content, headings } = await render(article);');
  replaceOnce(page, /\s*<article class="insight-detail-page section">[\s\S]*?<\/article>\s*\r?\n\s*<FinalCTA/, `
  <InsightArticleV2 article={article} Content={Content} headings={headings} locale={locale} />

  <FinalCTA`);
  replaceOnce(page, /\r?\n<style>[\s\S]*?<\/style>\s*$/, '\n');
}

// Footer credit and progressive lazy-image reveal.
const layout = 'src/layouts/BaseLayout.astro';
replaceOnce(layout, '<span class="footer-credit">by PT Karya Lintas Generasi, Joshua Wijaya.</span>', '<span class="footer-credit">by Kultivate, Joshua Wijaya</span>');
replaceOnce(layout, `    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
        if (menuButton instanceof HTMLButtonElement) menuButton.focus();
      }
    });`, `    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
        if (menuButton instanceof HTMLButtonElement) menuButton.focus();
      }
    });

    const revealLazyImage = (image) => {
      image.dataset.lazyState = 'loaded';
    };

    document.querySelectorAll('img[loading="lazy"]').forEach((image) => {
      image.dataset.lazyState = 'pending';
      if (image.complete) {
        requestAnimationFrame(() => revealLazyImage(image));
      } else {
        image.addEventListener('load', () => revealLazyImage(image), { once: true });
        image.addEventListener('error', () => revealLazyImage(image), { once: true });
      }
    });`);
replaceOnce(layout, '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />', '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <script is:inline>document.documentElement.classList.add(\'js\');</script>');

const globalCss = 'src/styles/global.css';
replaceOnce(globalCss, `.home-flow.home-flow > :is(
  .services-section,
  .connected-system,
  .why-kultivate,
  .insights-section,
  .final-cta
)`, `.home-flow.home-flow > :is(
  .connected-system,
  .insights-section,
  .final-cta
)`);
replaceOnce(globalCss, '/* Seamless section flow */', `/* Progressive lazy-image reveal: images remain visible when JavaScript is unavailable. */
.js img[loading='lazy'][data-lazy-state='pending'] { opacity: 0; }
.js img[loading='lazy'][data-lazy-state='loaded'] { animation: lazy-image-reveal 680ms var(--ease-out); }
@keyframes lazy-image-reveal {
  from { opacity: 0; clip-path: inset(0 0 7% 0); }
}

/* Seamless section flow */`);

// Remove only final periods from blog titles, leaving the wording unchanged.
{
  const relativePath = 'src/data/editorial.ts';
  const current = read(relativePath);
  const next = current.replace(/title: '([^']+)\.'/g, "title: '$1'");
  if (next === current) throw new Error('No editorial headline periods found');
  write(relativePath, next);
}

for (const locale of ['en', 'id']) {
  const directory = path.join(root, 'src', 'content', 'insights', locale);
  for (const name of fs.readdirSync(directory).filter((entry) => entry.endsWith('.md'))) {
    const fullPath = path.join(directory, name);
    const current = fs.readFileSync(fullPath, 'utf8');
    const next = current.replace(/^title: "([^"]+)\."/m, 'title: "$1"');
    if (next !== current) fs.writeFileSync(fullPath, next, 'utf8');
  }
}

process.stdout.write('staging revision v4 continuation applied\n');
