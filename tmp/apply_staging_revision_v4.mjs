import fs from 'node:fs';
import path from 'node:path';

const root = String.raw`C:\Users\Joshua\OneDrive\Documents\Kultivate\website`;

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function write(relativePath, contents) {
  fs.writeFileSync(path.join(root, relativePath), contents, 'utf8');
  process.stdout.write(`updated ${relativePath}\n`);
}

function replaceOnce(relativePath, search, replacement) {
  const current = read(relativePath);
  const next = current.replace(search, replacement);
  if (next === current) throw new Error(`No match in ${relativePath}: ${String(search).slice(0, 100)}`);
  write(relativePath, next);
}

function replaceAllInFile(relativePath, search, replacement) {
  const current = read(relativePath);
  const next = current.replaceAll(search, replacement);
  if (next === current) throw new Error(`No matches in ${relativePath}: ${search}`);
  write(relativePath, next);
}

// Homepage section order and targeted copy
for (const locale of ['en', 'id']) {
  const page = `src/pages/${locale}/index.astro`;
  replaceOnce(page, "import SelectedWork from '../../components/home/SelectedWork.astro';", "import SelectedWork from '../../components/home/SelectedWork.astro';\nimport ClientLogoBand from '../../components/home/ClientLogoBand.astro';");
  replaceOnce(page, `    <SelectedWork locale="${locale}" />`, `    <SelectedWork locale="${locale}" />\n    <ClientLogoBand locale="${locale}" />`);
}

replaceOnce('src/components/home/SelectedWork.astro', "? { title: 'Pilihan karya.', all: 'Lihat semua proyek' }", "? { title: 'Karya kami', all: 'Lihat semua proyek' }");
replaceOnce('src/components/home/SelectedWork.astro', ": { title: 'Selected work.', all: 'View all projects' };", ": { title: 'Our work', all: 'View all projects' };");

const servicesGrid = 'src/components/home/ServicesGrid.astro';
replaceOnce(servicesGrid, "image: '/assets/services/seo-discovery-v2.webp'", "image: '/assets/services/seo-focus-v3.webp'");
replaceOnce(servicesGrid, "image: '/assets/services/seo-discovery-v2.webp'", "image: '/assets/services/aeo-geo-answer-v3.webp'");
replaceOnce(servicesGrid, "image: '/assets/services/website-system-v2.webp'", "image: '/assets/services/web-foundation-v3.webp'");
replaceOnce(servicesGrid, "image: '/assets/services/social-distribution-v2.webp'", "image: '/assets/services/content-rhythm-v3.webp'");
replaceOnce(servicesGrid, "? 'Dukungan yang disesuaikan dengan kebutuhan bisnis Anda.' : 'Support shaped around what your business needs.'", "? 'Dukungan untuk kebutuhan bisnis Anda' : 'Supports for your business needs'");
replaceOnce(servicesGrid, /  \.services-section \{[\s\S]*?\n  \}/, `  .services-section {
    position: relative;
    margin-top: -1px;
    overflow: hidden;
    background:
      radial-gradient(ellipse 76% 44% at 54% 30%, rgba(255, 255, 255, 0.78), rgba(139, 193, 237, 0.5) 46%, transparent 76%),
      linear-gradient(180deg, #07101a 0%, #4686b7 16%, #8bc1ed 48%, #4686b7 78%, #07101a 100%);
  }
  .services-section::before { content: ''; position: absolute; inset: 12% 4% auto; height: 42%; border-radius: 50%; background: rgba(255,255,255,.2); filter: blur(70px); pointer-events: none; }`);
replaceOnce(servicesGrid, '  .services-header { max-width: 820px; margin-bottom: clamp(36px, 5vw, 56px); }', '  .services-header { position: relative; z-index: 1; max-width: 820px; margin-bottom: clamp(36px, 5vw, 56px); }');
replaceOnce(servicesGrid, '  .services-header h2 { margin-bottom: 16px; }', '  .services-header .section-kicker { color: rgba(7, 16, 26, 0.68); }\n  .services-header h2 { margin-bottom: 16px; color: #07101a; }');
replaceOnce(servicesGrid, '  .services-header p { max-width: 62ch; color: var(--steel); font-size: 0.96rem; }', '  .services-header p { max-width: 62ch; color: rgba(7, 16, 26, 0.8); font-size: 0.96rem; }');
replaceOnce(servicesGrid, '  .services-grid { display: grid;', '  .services-grid { position: relative; z-index: 1; display: grid;');

const connected = 'src/components/home/ConnectedSystem.astro';
replaceOnce(connected, "title: 'Mulai dari pekerjaan yang dibutuhkan bisnis Anda.'", "title: 'Mulai dari kebutuhan Anda saat ini'");
replaceOnce(connected, "description: 'Setiap layanan memiliki peran yang jelas. Kami menentukan titik awal berdasarkan posisi saat ini, prioritas, dan kapasitas tim Anda.'", "description: 'Pilih kebutuhan yang paling penting sekarang. Kami menggunakan posisi, tujuan, dan kapasitas internal Anda untuk merekomendasikan titik awal yang praktis.'");
replaceOnce(connected, "loop: 'Prioritas Anda menentukan titik awal, layanan yang perlu digabungkan, dan pekerjaan yang tidak perlu dilakukan.'", "loop: 'Kebutuhan Anda memandu titik awal, layanan yang perlu berjalan bersama, dan pekerjaan yang tidak perlu dilakukan.'");
replaceOnce(connected, "['01', 'Perkuat visibility', 'SEO', 'Bangun fondasi search berdasarkan layanan, halaman, dan demand pelanggan Anda.']", "['01', 'Visibility tradisional', 'SEO', 'Untuk saat halaman prioritas membutuhkan fondasi search yang lebih kuat di sekitar penawaran dan demand pelanggan.']");
replaceOnce(connected, "['02', 'Siapkan AI search', 'AEO & GEO', 'Susun konten, entity, dan schema agar answer engines dapat memahami expertise Anda.']", "['02', 'Pemahaman AI search', 'AEO & GEO', 'Untuk saat expertise Anda perlu dipahami dan diambil dengan jelas oleh AI search.']");
replaceOnce(connected, "['03', 'Perbaiki website', 'Web Services', 'Tingkatkan performa, usability, dan implementasi teknis pada bagian yang membutuhkan dukungan.']", "['03', 'Dukungan teknis', 'Web Services', 'Untuk saat performa, usability, atau implementasi website membatasi pekerjaan search.']");
replaceOnce(connected, "['04', 'Kelola konten', 'Content Management', 'Rencanakan, buat, terbitkan, dan perbarui konten berdasarkan pertanyaan pelanggan.']", "['04', 'Ritme content', 'Content Management', 'Untuk saat content membutuhkan ritme publikasi dan pembaruan yang jelas.']");
replaceOnce(connected, "title: 'Start with the work your business needs now.'", "title: 'Start with what you need now'");
replaceOnce(connected, "description: 'Each service has a clear role. We recommend the right starting point based on your current position, priorities, and internal capacity.'", "description: 'Choose the need that matters now. We use your current position, goals, and internal capacity to recommend a practical starting point.'");
replaceOnce(connected, "loop: 'Your priorities guide where we start, which services we combine, and which work we leave out.'", "loop: 'What you need guides where we start, which services work together, and what we leave out.'");
replaceOnce(connected, "['01', 'Improve visibility', 'SEO', 'Build the search foundation around your services, priority pages, and customer demand.']", "['01', 'Traditional visibility', 'SEO', 'For when priority pages need stronger search foundations around your offers and customer demand.']");
replaceOnce(connected, "['02', 'Prepare for AI search', 'AEO & GEO', 'Organize content, entities, and schema so answer engines can interpret your expertise.']", "['02', 'AI search understanding', 'AEO & GEO', 'For when your expertise needs to be understood and retrieved clearly by AI search.']");
replaceOnce(connected, "['03', 'Improve the website', 'Web Services', 'Improve performance, usability, and technical implementation where the website needs support.']", "['03', 'Technical support', 'Web Services', 'For when performance, usability, or implementation limits the search work.']");
replaceOnce(connected, "['04', 'Manage useful content', 'Content Management', 'Plan, create, publish, and refresh content around customer questions.']", "['04', 'Content rhythm', 'Content Management', 'For when useful content needs a clear publishing and refresh rhythm.']");
replaceOnce(connected, '  .system-header h2 { max-width:12ch; }', '  .system-header h2 { max-width:14ch; }');

const why = 'src/components/home/WhyKultivate.astro';
replaceOnce(why, "title: 'Dukungan SEO profesional, tanpa kerumitan yang tidak perlu.'", "title: 'Agency pendukung SEO profesional'");
replaceOnce(why, "intro: 'Kami menjelaskan setiap rekomendasi dengan bahasa yang jelas dan menghubungkannya dengan alasan bisnis yang konkret.'", "intro: 'Kami menghubungkan hasil yang Anda inginkan dengan dukungan yang dibutuhkan bisnis Anda, lalu memberikan pertimbangan terbaik pada setiap rekomendasi.'");
replaceOnce(why, "title: 'Professional SEO support, without unnecessary complexity.'", "title: 'Professional SEO Support Agency'");
replaceOnce(why, "intro: 'We explain each recommendation in plain language and connect it to a clear business reason.'", "intro: 'We connect the outcomes you want with the support your business needs, then bring our best thinking to every recommendation.'");
replaceOnce(why, '  .why-kultivate { position:relative; background:radial-gradient(ellipse 48% 36% at 8% 38%,rgba(23,107,255,.075),transparent 76%),linear-gradient(180deg,#07101a,#060a11 52%,#070b12); }', '  .why-kultivate { position:relative; margin-top:-1px; background:radial-gradient(ellipse 72% 86% at 94% 46%,rgba(139,193,237,.54),rgba(70,134,183,.22) 48%,transparent 76%),linear-gradient(180deg,#07101a,#06101a 52%,#070b12); }');
replaceOnce(why, '  .why-intro h2 { max-width:9ch;', '  .why-intro h2 { max-width:13ch;');
replaceOnce(why, '  .reason-item { position:relative; min-height:174px;', '  .reason-item { position:relative; min-height:clamp(360px,42vw,510px);');
replaceOnce(why, /  @media \(hover:hover\) and \(pointer:fine\) \{[^\n]+\}/, '  @media (hover:hover) and (pointer:fine) { .reasons-list:hover .reason-item:not(:hover){opacity:.74;transform:scale(.992)} .reason-item:hover,.reason-item:focus-visible{transform:translateX(-8px)} .reason-item:hover img,.reason-item:focus-visible img{opacity:.94;transform:scale(1.02)} .reason-item:hover .reason-veil,.reason-item:focus-visible .reason-veil{opacity:1} }');

const insightsPreview = 'src/components/home/InsightsPreview.astro';
replaceOnce(insightsPreview, /const copy = locale === 'id'[\s\S]*?;\r?\n---/, `const copy = locale === 'id'
  ? { label: 'Blog Pilihan', all: 'Lihat semua', read: 'Baca artikel' }
  : { label: 'Featured Blog', all: 'View all', read: 'Read article' };
---`);
replaceOnce(insightsPreview, '      <div><span class="section-kicker">Blog</span><h2 id="insights-title">{copy.title}</h2></div>', '      <h2 id="insights-title" class="featured-label">{copy.label}</h2>');
replaceOnce(insightsPreview, '  .insights-header h2 { font-size: clamp(2rem, 3.7vw, 4rem); }', '  .featured-label { color: var(--mist); font-family: var(--font-mono); font-size: 0.72rem; font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; }');

// New page variants, preserving the previous components untouched for review
for (const locale of ['en', 'id']) {
  replaceOnce(`src/pages/${locale}/about.astro`, "../../components/about/AboutIndex.astro", "../../components/about/AboutIndexV2.astro");
  replaceOnce(`src/pages/${locale}/services/index.astro`, "../../../components/services/ServicesIndex.astro", "../../../components/services/ServicesIndexV2.astro");
  replaceOnce(`src/pages/${locale}/insights/index.astro`, "../../../components/insights/EditorialIndex.astro", "../../../components/insights/EditorialIndexV2.astro");
}

const servicesV2 = 'src/components/services/ServicesIndexV2.astro';
replaceOnce(servicesV2, "title: 'SEO, AEO & GEO, Web Services, Content Management',\n+        description: 'Pilih dukungan yang sesuai dengan prioritas Anda saat ini. Kami menjelaskan peran setiap layanan dan pekerjaan yang terlibat'", "title: 'Layanan SEO untuk prioritas search Anda',\n+        description: 'SEO, AEO & GEO, Web Services, dan Content Management—pilih dukungan yang sesuai dengan prioritas Anda saat ini'");
replaceOnce(servicesV2, "title: 'SEO, AEO & GEO, Web Services, Content Management',\n+        description: 'Choose the support that fits your current priority. We explain where each service helps and what the work involves'", "title: 'SEO services for your search priorities',\n+        description: 'SEO, AEO & GEO, Web Services, and Content Management—choose the support that fits your current priority'");

// Service detail visuals now match their categories
replaceOnce('src/components/services/ServiceHero.astro', /const image = title\.includes\('Web'\)[\s\S]*?: '\/assets\/services\/seo-discovery-v2\.webp';/, `const image = title.includes('AEO')
  ? '/assets/services/aeo-geo-answer-v3.webp'
  : title.includes('Web')
    ? '/assets/services/web-foundation-v3.webp'
    : title.includes('Content')
      ? '/assets/services/content-rhythm-v3.webp'
      : '/assets/services/seo-focus-v3.webp';`);

// Article layout inspired by a clear editorial reading flow
for (const locale of ['en', 'id']) {
  const page = `src/pages/${locale}/insights/[slug].astro`;
  replaceOnce(page, "import InsightHeader from '../../../components/content/InsightHeader.astro';", "import InsightArticleV2 from '../../../components/insights/InsightArticleV2.astro';");
  replaceOnce(page, 'const { Content } = await render(article);', 'const { Content, headings } = await render(article);');
  replaceOnce(page, /\s*<article class="insight-detail-page section">[\s\S]*?<\/article>\s*\r?\n\s*<FinalCTA/, `
  <InsightArticleV2 article={article} Content={Content} headings={headings} locale={locale} />

  <FinalCTA`);
  replaceOnce(page, /\r?\n<style>[\s\S]*?<\/style>\s*$/, '\n');
}

// Footer credit and progressive lazy-image reveal
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

// Apply the no-trailing-period rule to blog headlines only, without rewriting wording.
const editorialData = 'src/data/editorial.ts';
{
  const current = read(editorialData);
  const next = current.replace(/title: '([^']+)\.'/g, "title: '$1'");
  if (next === current) throw new Error('No editorial headline periods found');
  write(editorialData, next);
}

for (const locale of ['en', 'id']) {
  const directory = path.join(root, 'src', 'content', 'insights', locale);
  for (const name of fs.readdirSync(directory).filter((file) => file.endsWith('.md'))) {
    const fullPath = path.join(directory, name);
    const current = fs.readFileSync(fullPath, 'utf8');
    const next = current.replace(/^title: "([^"]+)\."/m, 'title: "$1"');
    if (next !== current) fs.writeFileSync(fullPath, next, 'utf8');
  }
}

process.stdout.write('staging revision v4 applied\n');
