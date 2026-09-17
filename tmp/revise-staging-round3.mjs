import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = 'C:/Users/Joshua/OneDrive/Documents/Kultivate/website';

async function rewrite(relativePath, transform) {
  const target = path.join(root, relativePath);
  const source = await readFile(target, 'utf8');
  const next = transform(source);
  if (next === source) throw new Error(`No changes applied to ${relativePath}`);
  await writeFile(target, next, 'utf8');
}

function replaceExact(source, before, after, label) {
  if (!source.includes(before)) throw new Error(`Missing expected block: ${label}`);
  return source.replace(before, after);
}

await rewrite('src/components/home/WhyKultivate.astro', (source) => {
  let next = replaceExact(
    source,
    '  .why-layout { display:grid; grid-template-columns:minmax(320px,.9fr) minmax(500px,1.1fr); gap:clamp(48px,6vw,88px); align-items:start; }',
    '  .why-layout { display:grid; grid-template-columns:minmax(300px,.78fr) minmax(520px,1.22fr); gap:clamp(52px,7vw,104px); align-items:start; }',
    'why layout'
  );
  next = replaceExact(
    next,
    '  .why-intro h2 { max-width:16ch; margin-bottom:24px; font-size:clamp(3rem,2rem + 3.5vw,5.4rem); font-weight:520; letter-spacing:-.04em; line-height:.96; }',
    '  .why-intro h2 { max-width:13ch; margin-bottom:24px; font-size:clamp(2.8rem,1.9rem + 3vw,4.9rem); font-weight:520; letter-spacing:-.04em; line-height:.97; }',
    'why heading'
  );
  next = replaceExact(
    next,
    '  .reason-item { position:relative; min-height:clamp(360px,42vw,510px); display:flex; align-items:flex-end; overflow:hidden; border-radius:8px; outline:none; background:rgba(11,19,34,.72); transition:min-height 560ms var(--ease-out),opacity 340ms var(--ease-out),transform 560ms var(--ease-out); }',
    '  .reason-item { position:relative; min-height:220px; display:flex; align-items:flex-end; overflow:hidden; border-radius:8px; outline:none; background:rgba(11,19,34,.72); transition:min-height 520ms var(--ease-out),opacity 340ms var(--ease-out),transform 520ms var(--ease-out); }',
    'why card size'
  );
  next = replaceExact(
    next,
    '  .reason-item img { width:100%; height:100%; object-fit:cover; opacity:.48; transform:translate3d(-2%,0,0) scale(1.045); transition:opacity 460ms var(--ease-out),transform 720ms var(--ease-out); }\n  .reason-veil { background:linear-gradient(90deg,rgba(6,10,17,.98),rgba(6,10,17,.84) 45%,rgba(6,10,17,.22)),linear-gradient(180deg,transparent 30%,rgba(6,10,17,.88)); opacity:.72; transition:opacity 420ms var(--ease-out); }',
    '  .reason-item img { width:100%; height:100%; object-fit:cover; opacity:.18; transform:translate3d(-2%,0,0) scale(1.045); transition:opacity 460ms var(--ease-out),transform 720ms var(--ease-out); }\n  .reason-veil { background:linear-gradient(90deg,rgba(6,10,17,.98),rgba(6,10,17,.82) 48%,rgba(6,10,17,.28)),linear-gradient(180deg,transparent 26%,rgba(6,10,17,.9)); opacity:.88; transition:opacity 420ms var(--ease-out); }',
    'why image treatment'
  );
  return replaceExact(
    next,
    '  @media (hover:hover) and (pointer:fine) { .reasons-list:hover .reason-item:not(:hover){opacity:.74;transform:scale(.992)} .reason-item:hover,.reason-item:focus-visible{transform:translateX(-8px)} .reason-item:hover img,.reason-item:focus-visible img{opacity:.94;transform:scale(1.02)} .reason-item:hover .reason-veil,.reason-item:focus-visible .reason-veil{opacity:1} }',
    '  @media (hover:hover) and (pointer:fine) { .reasons-list:hover .reason-item:not(:hover){min-height:204px;opacity:.72;transform:scale(.994)} .reason-item:hover,.reason-item:focus-visible{min-height:276px;transform:translateX(-6px)} .reason-item:hover img,.reason-item:focus-visible img{opacity:.9;transform:scale(1.02)} .reason-item:hover .reason-veil,.reason-item:focus-visible .reason-veil{opacity:.96} }',
    'why hover'
  );
});

await rewrite('src/components/home/ServicesGrid.astro', (source) => {
  let next = replaceExact(
    source,
    `    background:
      radial-gradient(ellipse 76% 44% at 54% 30%, rgba(255, 255, 255, 0.78), rgba(139, 193, 237, 0.5) 46%, transparent 76%),
      linear-gradient(180deg, #07101a 0%, #4686b7 16%, #8bc1ed 48%, #4686b7 78%, #07101a 100%);`,
    `    background:
      radial-gradient(ellipse 62% 72% at 14% 30%, rgba(139, 193, 237, 0.16), transparent 74%),
      radial-gradient(ellipse 56% 72% at 88% 68%, rgba(70, 134, 183, 0.28), transparent 76%),
      linear-gradient(180deg, #07101a 0%, #0b1d2b 48%, #07101a 100%);`,
    'services background'
  );
  next = replaceExact(
    next,
    `  .services-section::before { content: ''; position: absolute; inset: 12% 4% auto; height: 42%; border-radius: 50%; background: rgba(255,255,255,.2); filter: blur(70px); pointer-events: none; }`,
    `  .services-section::before { content: ''; position: absolute; inset: 18% 36% auto 4%; height: 34%; border-radius: 50%; background: rgba(139,193,237,.07); filter: blur(82px); pointer-events: none; }`,
    'services glow'
  );
  return replaceExact(
    next,
    `  .services-header .section-kicker { color: rgba(7, 16, 26, 0.68); }
  .services-header h2 { margin-bottom: 16px; color: #07101a; }
  .services-header p { max-width: 62ch; color: rgba(7, 16, 26, 0.8); font-size: 0.96rem; }`,
    `  .services-header .section-kicker { color: rgba(201, 211, 223, 0.58); }
  .services-header h2 { margin-bottom: 16px; color: var(--cloud-white); }
  .services-header p { max-width: 62ch; color: rgba(201, 211, 223, 0.76); font-size: 0.96rem; }`,
    'services header colors'
  );
});

await writeFile(path.join(root, 'src/components/home/ClientLogoBand.astro'), String.raw`---
interface Props { locale: 'id' | 'en'; }
const { locale } = Astro.props;
const copy = locale === 'id'
  ? {
      label: 'BENTUK KOLABORASI',
      title: 'Dibangun untuk prioritas bisnis yang berbeda',
      note: 'Pendekatan kami menyesuaikan posisi, kapasitas internal, dan ritme setiap bisnis'
    }
  : {
      label: 'WAYS OF WORKING',
      title: 'Built around different business priorities',
      note: 'Our approach adapts to each business position, internal capacity, and pace'
    };

const brands = [
  { name: 'Avara', path: 'M5 35 18 7h6l13 28h-8l-2.8-7H15.8L13 35H5Zm13.3-14h5.4L21 14.3 18.3 21Z' },
  { name: 'Nolume', path: 'M6 35V7h7l16 17.2V7h7v28h-7L13 17.9V35H6Z' },
  { name: 'Tandemry', path: 'M4 7h34v7H24.5v21h-7V14H4V7Z' },
  { name: 'Kavelo', path: 'M7 7h7v10.6L27.5 7H37L21.2 20.3 38 35h-10L14 22.6V35H7V7Z' },
  { name: 'Orbyn', path: 'M21 4C11.6 4 4 11.6 4 21s7.6 17 17 17 17-7.6 17-17S30.4 4 21 4Zm0 7.2a9.8 9.8 0 1 1 0 19.6 9.8 9.8 0 0 1 0-19.6Zm12.2-5.7a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6Z' },
  { name: 'Serein', path: 'M34.5 10.2C31.8 6.8 27 5 21.6 5 13.4 5 7 9.4 7 15.3c0 6 5 8.1 13.7 9.8 5.2 1 7.2 1.8 7.2 3.7 0 1.9-2.5 3.1-6.2 3.1-4.4 0-8.2-1.5-11.2-4.4L5 32.7C8.8 36.3 14.4 38 21.3 38 30.2 38 36 33.7 36 27.6c0-6.1-5.1-8.2-13.8-9.8-5.1-.9-7.1-1.6-7.1-3.4 0-1.7 2.3-2.8 5.9-2.8 3.9 0 7 1.2 9.5 3.7l4-5.1Z' },
  { name: 'Marlowe', path: 'M4 35V7h7.4L21 24.1 30.6 7H38v28h-7V18.7l-7.6 13.1h-4.8L11 18.7V35H4Z' },
  { name: 'Ostra', path: 'M21 3 39 34H3L21 3Zm0 13.4L13.9 29h14.2L21 16.4Z' },
  { name: 'Velin', path: 'M3 7h8l10 19.6L31 7h8L24.7 35h-7.4L3 7Z' }
];
---

<section class="brand-band" aria-labelledby="brand-band-title">
  <div class="container brand-band__intro">
    <span class="text-mono">{copy.label}</span>
    <h2 id="brand-band-title">{copy.title}</h2>
    <p>{copy.note}</p>
  </div>

  <div class="brand-marquee" aria-label={locale === 'id' ? 'Rangkaian logo brand' : 'Brand logo showcase'}>
    <div class="brand-track">
      {[0, 1].map((group) => (
        <ul class="brand-group" aria-hidden={group === 1 ? 'true' : undefined}>
          {brands.map((brand) => (
            <li aria-label={brand.name}>
              <svg viewBox="0 0 42 42" aria-hidden="true"><path d={brand.path} /></svg>
              <span>{brand.name}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
</section>

<style>
  .brand-band { position:relative; margin-top:-1px; overflow:hidden; padding-block:clamp(70px,8vw,112px); background:radial-gradient(ellipse 48% 90% at 12% 50%,rgba(70,134,183,.2),transparent 72%),linear-gradient(180deg,#07101a 0%,#0b1d2b 55%,#07101a 100%); }
  .brand-band::after { content:''; position:absolute; inset:auto 0 0; height:90px; pointer-events:none; background:linear-gradient(180deg,transparent,#07101a); }
  .brand-band__intro { position:relative; z-index:1; display:grid; grid-template-columns:minmax(0,.7fr) minmax(280px,1.2fr) minmax(260px,.72fr); gap:clamp(24px,5vw,72px); align-items:start; }
  .brand-band__intro > span { color:rgba(201,211,223,.5); }
  .brand-band__intro h2 { max-width:14ch; font-size:clamp(2.05rem,3.7vw,4.2rem); font-weight:540; }
  .brand-band__intro p { max-width:42ch; padding-top:8px; color:rgba(201,211,223,.72); font-size:.9rem; }
  .brand-marquee { position:relative; z-index:1; width:100%; margin-top:clamp(54px,7vw,92px); overflow:hidden; -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); }
  .brand-track { width:max-content; display:flex; animation:brand-orbit 32s linear infinite; }
  .brand-group { display:flex; align-items:center; gap:clamp(42px,5vw,82px); flex:none; margin:0; padding:14px clamp(42px,5vw,82px) 14px 0; list-style:none; }
  .brand-group li { width:clamp(170px,15vw,230px); display:flex; align-items:center; justify-content:center; gap:13px; color:rgba(238,245,250,.58); white-space:nowrap; }
  .brand-group svg { width:clamp(27px,2.3vw,34px); height:auto; flex:none; fill:currentColor; }
  .brand-group span { font-size:clamp(1rem,1.4vw,1.28rem); font-weight:620; letter-spacing:-.035em; }
  .brand-group li:nth-child(3n+2) span { font-weight:470; letter-spacing:.055em; text-transform:uppercase; }
  .brand-group li:nth-child(3n) span { font-family:var(--font-display); font-weight:400; letter-spacing:-.01em; }
  @keyframes brand-orbit { to { transform:translate3d(-50%,0,0); } }
  @media (hover:hover) and (pointer:fine) { .brand-marquee:hover .brand-track { animation-play-state:paused; } .brand-group li { transition:color 180ms var(--ease-out); } .brand-group li:hover { color:var(--cloud-white); } }
  @media (max-width:880px) { .brand-band__intro { grid-template-columns:1fr 1.4fr; } .brand-band__intro p { grid-column:2; } .brand-track { animation-duration:26s; } }
  @media (max-width:620px) { .brand-band__intro { grid-template-columns:1fr; } .brand-band__intro p { grid-column:auto; } .brand-group { gap:44px; padding-right:44px; } .brand-group li { width:168px; } }
  @media (prefers-reduced-motion:reduce) { .brand-marquee { overflow-x:auto; mask-image:none; -webkit-mask-image:none; } .brand-track { animation:none; } .brand-group[aria-hidden='true'] { display:none; } }
</style>
`, 'utf8');

await writeFile(path.join(root, 'src/components/services/ServicesIndexV2.astro'), String.raw`---
import InteriorHero from '../shared/InteriorHero.astro';

interface Props { locale: 'id' | 'en'; }
const { locale } = Astro.props;
const copy = locale === 'id'
  ? {
      hero: {
        label: 'LAYANAN SEO',
        title: 'Layanan SEO untuk prioritas search Anda',
        description: 'Mulai dari SEO, AEO & GEO, Web Services, atau Content Management berdasarkan prioritas search yang perlu bisnis Anda tangani sekarang'
      },
      explore: 'Lihat layanan',
      services: [
        { title: 'SEO', result: 'Bangun visibility pada pencarian yang membawa pelanggan ke bisnis Anda', description: 'Kami meninjau cara website dirayapi, disusun, dan dipahami, lalu memperbaiki halaman prioritas dan authority signals berdasarkan produk atau layanan yang perlu ditemukan pelanggan.', image: '/assets/services/seo-focus-v3.webp', alt: 'Beberapa jalur search bergerak menuju satu titik prioritas', slug: 'seo' },
        { title: 'AEO & GEO', result: 'Bantu AI search memahami kapan expertise Anda relevan', description: 'Kami menyusun hubungan antar entity, konten yang siap menjawab, dan sinyal teknis agar informasi Anda lebih mudah dipahami, diambil, dan dirujuk pada pengalaman AI yang relevan.', image: '/assets/services/aeo-geo-answer-v3.webp', alt: 'Jaringan informasi terhubung menuju satu bidang jawaban', slug: 'aeo-geo' },
        { title: 'Web Services', result: 'Berikan fondasi teknis yang dibutuhkan pekerjaan search Anda', description: 'Kami memperbaiki website ketika performa, usability, migrasi, atau kekurangan implementasi menghambat halaman prioritas dan orang yang menggunakannya.', image: '/assets/services/web-foundation-v3.webp', alt: 'Lapisan website modular tersusun di atas fondasi teknis', slug: 'web-services' },
        { title: 'Content Management', result: 'Jaga konten tetap selaras dengan pertanyaan pelanggan', description: 'Kami merencanakan, membuat, menerbitkan, dan memperbarui konten berdasarkan pertanyaan nyata pelanggan, prioritas bisnis, dan halaman yang membutuhkan dukungan berkelanjutan.', image: '/assets/services/content-rhythm-v3.webp', alt: 'Modul content bergerak dalam alur publikasi dan pembaruan', slug: 'content-management' }
      ]
    }
  : {
      hero: {
        label: 'SEO SERVICES',
        title: 'SEO services for your search priorities',
        description: 'Start with SEO, AEO & GEO, Web Services, or Content Management based on the search priority your business needs to address now'
      },
      explore: 'View service',
      services: [
        { title: 'SEO', result: 'Build visibility around the searches that lead customers to your business', description: 'We review how your website is crawled, structured, and understood, then improve priority pages and authority signals around the products or services you need people to find.', image: '/assets/services/seo-focus-v3.webp', alt: 'Several search paths moving toward one priority destination', slug: 'seo' },
        { title: 'AEO & GEO', result: 'Help AI search understand where your expertise is useful', description: 'We organize entity relationships, answer-ready content, and technical signals so your information is easier to interpret, retrieve, and reference in relevant AI experiences.', image: '/assets/services/aeo-geo-answer-v3.webp', alt: 'A connected information network resolving into one answer surface', slug: 'aeo-geo' },
        { title: 'Web Services', result: 'Give search work the technical foundation it needs to perform', description: 'We improve the website where performance, usability, migrations, or implementation gaps hold back priority pages and the people using them.', image: '/assets/services/web-foundation-v3.webp', alt: 'Modular website layers arranged on a technical foundation', slug: 'web-services' },
        { title: 'Content Management', result: 'Keep useful content aligned with the questions customers continue to ask', description: 'We plan, create, publish, and refresh content around real customer questions, business priorities, and the pages that need ongoing support.', image: '/assets/services/content-rhythm-v3.webp', alt: 'Content modules moving through a publishing and refresh rhythm', slug: 'content-management' }
      ]
    };
---

<InteriorHero
  title={copy.hero.title}
  description={copy.hero.description}
  label={copy.hero.label}
  image="/assets/banners/services-v3.webp"
  imageAlt={locale === 'id' ? 'Empat jalur visual yang mewakili pilihan layanan search Kultivate' : 'Four visual paths representing Kultivate search service options'}
/>

<section class="services-index" aria-label={copy.hero.label}>
  <div class="container service-stream">
    {copy.services.map((service, index) => (
      <article class="service-row">
        <figure class="service-row__visual"><img src={service.image} alt={service.alt} width="1440" height="1080" loading="lazy" decoding="async" /></figure>
        <div class="service-row__copy">
          <div class="service-row__meta text-mono"><span>0{index + 1}</span></div>
          <h2>{service.title}</h2>
          <h3>{service.result}</h3>
          <p>{service.description}</p>
          <a href={'/' + locale + '/services/' + service.slug + '/'} class="link-hover-arrow"><span>{copy.explore}</span><span aria-hidden="true">&#8594;</span></a>
        </div>
      </article>
    ))}
  </div>
</section>

<style>
  .services-index { margin-top:-1px; padding:clamp(52px,7vw,96px) 0 clamp(88px,11vw,154px); background:radial-gradient(ellipse 54% 24% at 50% 10%,rgba(70,134,183,.11),transparent 80%),linear-gradient(180deg,#070b12 0%,#060a11 54%,#05080e 100%); }
  .service-stream { display:flex; flex-direction:column; gap:clamp(110px,14vw,196px); }
  .service-row { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(42px,7vw,108px); align-items:center; }
  .service-row:nth-child(even) .service-row__visual { order:2; }
  .service-row__visual { aspect-ratio:4 / 3; overflow:hidden; border-radius:8px; background:#07101a; }
  .service-row__visual img { width:100%; height:100%; object-fit:cover; animation:service-image-drift 18s var(--ease-in-out) infinite alternate; }
  .service-row:nth-child(even) img { animation-direction:alternate-reverse; }
  .service-row__copy { min-width:0; }
  .service-row__meta { display:flex; margin-bottom:22px; color:rgba(201,211,223,.52); }
  .service-row__copy h2 { max-width:12ch; margin-bottom:22px; font-size:clamp(2.8rem,5vw,5.5rem); font-weight:540; letter-spacing:-.045em; line-height:.94; }
  .service-row__copy h3 { max-width:29ch; margin-bottom:18px; color:rgba(238,245,250,.92); font-size:clamp(1.28rem,1.4rem + .45vw,2rem); font-weight:540; letter-spacing:-.025em; line-height:1.18; text-wrap:balance; }
  .service-row__copy > p { max-width:49ch; margin-bottom:22px; color:rgba(201,211,223,.76); font-size:.96rem; line-height:1.62; }
  @keyframes service-image-drift { from { transform:scale(1.02) translate3d(-.5%,0,0); } to { transform:scale(1.06) translate3d(.6%,-.4%,0); } }
  @media (max-width:840px) { .service-row { grid-template-columns:1fr; gap:30px; } .service-row:nth-child(even) .service-row__visual { order:initial; } .service-row__copy h3 { max-width:34ch; } }
  @media (prefers-reduced-motion:reduce) { .service-row__visual img { animation:none; transform:none; } }
</style>
`, 'utf8');

await writeFile(path.join(root, 'src/components/about/AboutIndexV3.astro'), String.raw`---
interface Props { locale: 'id' | 'en'; }
const { locale } = Astro.props;
const copy = locale === 'id'
  ? {
      label: 'TENTANG KAMI',
      title: 'SEO agency yang memulai dari bisnis Anda',
      description: 'Kami membangun arah search berdasarkan apa yang Anda tawarkan, pelanggan yang ingin dijangkau, dan cara mereka mencari',
      heroAlt: 'Lima jalur cahaya biru bergerak menuju arah yang sama',
      imageAlt: 'Lima profesional Indonesia meninjau riset bersama di ruang kerja',
      cultureTitle: 'Konteks bersama menghasilkan keputusan search yang lebih baik',
      cultureBody: 'Kami bekerja dekat dengan tim Anda untuk memahami penawaran, pelanggan, dan batasan yang perlu dipertimbangkan sebelum menentukan prioritas.',
      journeyTitle: 'Dari konteks menuju pelaksanaan',
      journeyBody: 'Arah yang jelas bukan hasil dari paket yang sama untuk semua bisnis. Arah tersebut tumbuh dari keputusan yang dapat dipahami dan pekerjaan yang dapat dijalankan.',
      sections: [
        ['Pahami cara bisnis Anda bekerja sebelum menentukan kebutuhan SEO', 'Kami mulai dari penawaran, pelanggan, dan target bisnis Anda agar riset search memiliki konteks yang tepat.'],
        ['Gunakan prioritas Anda untuk membentuk cakupan pekerjaan', 'Kami menghubungkan peluang search dengan kapasitas internal dan memilih pekerjaan yang paling relevan untuk dijalankan sekarang.'],
        ['Jaga arah tetap terhubung dengan orang yang mengerjakannya', 'Orang yang menyusun rekomendasi tetap terlibat saat halaman, konten, dan perbaikan teknis bergerak menuju pelaksanaan.']
      ],
      teamTitle: 'Lima orang di balik pekerjaan kami',
      teamNote: 'Tim inti'
    }
  : {
      label: 'ABOUT US',
      title: 'An SEO agency that starts with your business',
      description: 'We shape your search direction around what you offer, the customers you want to reach, and how they search',
      heroAlt: 'Five blue light paths moving toward a shared direction',
      imageAlt: 'Five Indonesian professionals reviewing research together in a workspace',
      cultureTitle: 'Shared context leads to better search decisions',
      cultureBody: 'We work closely with your team to understand the offer, customers, and constraints that need consideration before priorities are set.',
      journeyTitle: 'From context to delivery',
      journeyBody: 'Clear direction does not come from giving every business the same package. It develops through decisions people understand and work teams can carry forward.',
      sections: [
        ['Understand how your business works before defining what SEO needs', 'We begin with your offer, customers, and business targets so the search research has the right context.'],
        ['Let your priorities shape the scope of work', 'We connect search opportunities with internal capacity and choose the work that matters most right now.'],
        ['Keep direction connected to the people doing the work', 'The people shaping recommendations stay involved as pages, content, and technical improvements move into delivery.']
      ],
      teamTitle: 'Five people behind the work',
      teamNote: 'Core team'
    };

const team = locale === 'id'
  ? [
      ['Mira Santoso', 'Strategi & Riset SEO', '/assets/team/mira-santoso.webp'],
      ['Raka Pratama', 'Technical SEO', '/assets/team/raka-pratama.webp'],
      ['Ayu Mahendra', 'Content & On-Page', '/assets/team/ayu-mahendra.webp'],
      ['Dimas Wirawan', 'Authority & Outreach', '/assets/team/dimas-wirawan.webp'],
      ['Nadia Putri', 'Measurement & Growth', '/assets/team/nadia-putri.webp']
    ]
  : [
      ['Mira Santoso', 'SEO Strategy & Research', '/assets/team/mira-santoso.webp'],
      ['Raka Pratama', 'Technical SEO', '/assets/team/raka-pratama.webp'],
      ['Ayu Mahendra', 'Content & On-Page', '/assets/team/ayu-mahendra.webp'],
      ['Dimas Wirawan', 'Authority & Outreach', '/assets/team/dimas-wirawan.webp'],
      ['Nadia Putri', 'Measurement & Growth', '/assets/team/nadia-putri.webp']
    ];
---

<header class="about-hero">
  <img src="/assets/banners/about-v4.webp" alt={copy.heroAlt} width="1536" height="1024" decoding="async" fetchpriority="high" />
  <span class="about-hero__veil" aria-hidden="true"></span>
  <div class="container about-hero__copy">
    <span class="text-mono">{copy.label}</span>
    <h1>{copy.title}</h1>
    <p>{copy.description}</p>
  </div>
</header>

<section class="about-culture" aria-labelledby="culture-title">
  <div class="container culture-layout">
    <figure><img src="/assets/about/culture-v3.webp" alt={copy.imageAlt} width="1920" height="1080" loading="lazy" decoding="async" /></figure>
    <div class="culture-copy">
      <h2 id="culture-title">{copy.cultureTitle}</h2>
      <p>{copy.cultureBody}</p>
    </div>
  </div>
</section>

<section class="about-journey" aria-label={locale === 'id' ? 'Cara Kultivate membangun arah kerja' : 'How Kultivate builds direction'}>
  <div class="container journey-layout">
    <div class="journey-intro">
      <h2>{copy.journeyTitle}</h2>
      <p>{copy.journeyBody}</p>
    </div>
    <div class="journey-steps">
      {copy.sections.map(([title, description], index) => (
        <article>
          <span class="journey-index text-mono">0{index + 1}</span>
          <div><h3>{title}</h3><p>{description}</p></div>
        </article>
      ))}
    </div>
  </div>
</section>

<section class="team-section" aria-labelledby="team-title">
  <div class="container team-heading"><h2 id="team-title">{copy.teamTitle}</h2><span class="text-mono">{copy.teamNote}</span></div>
  <div class="container team-grid">
    {team.map(([name, role, image]) => (
      <article class="person">
        <figure><img src={image} alt={(locale === 'id' ? 'Foto profil — ' : 'Profile portrait — ') + name} width="1120" height="1400" loading="lazy" decoding="async" /></figure>
        <div><h3>{name}</h3><p>{role}</p></div>
      </article>
    ))}
  </div>
</section>

<style>
  .about-hero { position:relative; min-height:92svh; display:flex; align-items:flex-end; overflow:hidden; isolation:isolate; background:#07101a; }
  .about-hero > img,.about-hero__veil { position:absolute; inset:0; }
  .about-hero > img { z-index:-2; width:100%; height:100%; object-fit:cover; animation:about-hero-drift 24s cubic-bezier(.45,0,.2,1) infinite alternate; }
  .about-hero__veil { z-index:-1; background:linear-gradient(90deg,rgba(5,8,14,.95),rgba(5,8,14,.64) 52%,rgba(5,8,14,.12)),linear-gradient(180deg,rgba(5,8,14,.18),transparent 32%,rgba(6,10,17,.52) 65%,#060a11 100%); }
  .about-hero__copy { position:relative; z-index:1; display:grid; grid-template-columns:minmax(0,.34fr) minmax(420px,1.18fr) minmax(280px,.62fr); gap:clamp(28px,6vw,90px); align-items:end; padding-top:150px; padding-bottom:clamp(62px,8vw,104px); }
  .about-hero__copy > span { align-self:start; color:rgba(201,211,223,.62); }
  .about-hero h1 { max-width:12ch; font-size:clamp(3.1rem,2rem + 4vw,6.2rem); font-weight:540; letter-spacing:-.045em; line-height:.95; }
  .about-hero p { max-width:44ch; padding-bottom:8px; color:rgba(226,234,243,.78); font-size:clamp(1rem,1.25vw,1.18rem); }
  .about-culture { margin-top:-1px; padding:clamp(74px,9vw,128px) 0 clamp(96px,12vw,168px); background:linear-gradient(180deg,#060a11 0%,#07101a 54%,#060a11 100%); }
  .culture-layout { display:grid; grid-template-columns:minmax(0,1.45fr) minmax(300px,.55fr); gap:clamp(34px,7vw,108px); align-items:end; }
  .about-culture figure { aspect-ratio:16 / 10; overflow:hidden; border-radius:8px; background:#07101a; }
  .about-culture img { width:100%; height:100%; object-fit:cover; filter:saturate(.86) contrast(1.02); }
  .culture-copy { padding-bottom:clamp(8px,3vw,34px); }
  .culture-copy h2 { max-width:14ch; margin-bottom:20px; font-size:clamp(2.1rem,3.4vw,4.1rem); font-weight:540; line-height:1; }
  .culture-copy p { max-width:42ch; color:var(--steel); }
  .about-journey { padding-bottom:clamp(100px,13vw,180px); background:radial-gradient(ellipse 42% 34% at 8% 46%,rgba(70,134,183,.12),transparent 76%),#060a11; }
  .journey-layout { display:grid; grid-template-columns:minmax(280px,.72fr) minmax(520px,1.28fr); gap:clamp(52px,8vw,126px); align-items:start; }
  .journey-intro { position:sticky; top:126px; }
  .journey-intro h2 { max-width:11ch; margin-bottom:22px; font-size:clamp(2.5rem,4vw,4.8rem); font-weight:520; line-height:.98; }
  .journey-intro p { max-width:39ch; color:var(--steel); }
  .journey-steps { border-top:1px solid rgba(89,106,130,.34); }
  .journey-steps article { display:grid; grid-template-columns:48px minmax(0,1fr); gap:clamp(18px,3vw,38px); border-bottom:1px solid rgba(89,106,130,.3); padding-block:clamp(42px,6vw,72px); }
  .journey-index { padding-top:6px; color:rgba(201,211,223,.43); }
  .journey-steps h3 { max-width:23ch; margin-bottom:16px; font-size:clamp(1.65rem,2.6vw,3rem); font-weight:540; letter-spacing:-.035em; line-height:1.04; text-wrap:balance; }
  .journey-steps p { max-width:48ch; color:var(--steel); }
  .team-section { padding-block:clamp(92px,11vw,160px); background:radial-gradient(ellipse 56% 30% at 88% 4%,rgba(70,134,183,.16),transparent 78%),linear-gradient(180deg,#060a11,#05080e); }
  .team-heading { display:flex; align-items:flex-end; justify-content:space-between; gap:28px; margin-bottom:42px; }
  .team-heading h2 { max-width:12ch; font-size:clamp(2.5rem,4.5vw,5rem); font-weight:520; }
  .team-heading span { color:rgba(201,211,223,.46); }
  .team-grid { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:clamp(10px,1.5vw,22px); }
  .person figure { aspect-ratio:4 / 5; overflow:hidden; border-radius:8px; background:#07101a; }
  .person img { width:100%; height:100%; object-fit:cover; filter:saturate(.84); transition:transform 650ms var(--ease-out),filter 400ms var(--ease-out); }
  .person > div { padding-top:18px; }
  .person h3 { margin-bottom:4px; font-size:1.05rem; font-weight:560; }
  .person p { color:var(--steel); font-size:.8rem; }
  @keyframes about-hero-drift { from { transform:scale(1.015) translate3d(-.4%,0,0); } to { transform:scale(1.045) translate3d(.6%,-.4%,0); } }
  @media (hover:hover) and (pointer:fine) { .person:hover img { transform:scale(1.025); filter:saturate(1); } }
  @media (max-width:1000px) { .about-hero__copy { grid-template-columns:minmax(130px,.34fr) 1fr; } .about-hero p { grid-column:2; } .culture-layout,.journey-layout { grid-template-columns:1fr; } .journey-intro { position:static; } .team-grid { grid-template-columns:repeat(3,minmax(0,1fr)); } }
  @media (max-width:760px) { .about-hero { min-height:100svh; } .about-hero__copy { grid-template-columns:1fr; padding-top:124px; padding-bottom:60px; } .about-hero p { grid-column:auto; } .about-hero h1 { font-size:clamp(2.65rem,11vw,3.8rem); } .about-culture figure { aspect-ratio:4 / 5; } .about-culture img { object-position:52% center; } .journey-steps article { grid-template-columns:36px minmax(0,1fr); } .team-heading { align-items:flex-start; flex-direction:column; } .team-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
  @media (max-width:440px) { .team-grid { grid-template-columns:1fr; } }
  @media (prefers-reduced-motion:reduce) { .about-hero > img { animation:none; transform:none; } .person img { transition:none; } }
</style>
`, 'utf8');

await writeFile(path.join(root, 'src/components/insights/EditorialIndexV3.astro'), String.raw`---
import { editorialItems } from '../../data/editorial';

interface Props { locale: 'id' | 'en'; }
const { locale } = Astro.props;
const [featured, ...remaining] = editorialItems[locale];
const topStories = remaining.slice(0, 2);
const archive = remaining.slice(2);
const topics = [...new Set(editorialItems[locale].map((article) => article.category))];
const copy = locale === 'id'
  ? { label:'BLOG', title:'Catatan praktis tentang search', description:'Penjelasan yang membantu Anda memahami pilihan, pekerjaan, dan alasan di balik rekomendasi search', topics:'Topik', featured:'Featured story', top:'Top stories', all:'Semua artikel', read:'Baca artikel' }
  : { label:'BLOG', title:'Practical search notes', description:'Clear explanations to help you understand the choices, work, and reasoning behind search recommendations', topics:'Topics', featured:'Featured story', top:'Top stories', all:'All stories', read:'Read article' };
---

<header class="blog-hero">
  <img src="/assets/banners/blog.webp" alt={locale === 'id' ? 'Bidang informasi biru tersusun dalam kedalaman' : 'Blue information surfaces arranged with depth'} width="1536" height="1024" decoding="async" fetchpriority="high" />
  <span class="blog-hero__veil" aria-hidden="true"></span>
  <div class="container blog-hero__copy">
    <span class="text-mono">{copy.label}</span>
    <h1>{copy.title}</h1>
    <p>{copy.description}</p>
  </div>
</header>

<main class="editorial" id="all-stories">
  <div class="container">
    <nav class="topic-row" aria-label={copy.topics}>
      <span class="text-mono">{copy.topics}</span>
      <ul>{topics.map((topic) => <li>{topic}</li>)}</ul>
    </nav>

    <section class="featured-block" aria-labelledby="featured-title">
      <span class="section-label text-mono">{copy.featured}</span>
      <a href={'/' + locale + '/insights/' + featured.slug + '/'} class="featured-story">
        <figure><img src={featured.image} alt={featured.alt} width="1536" height="1024" decoding="async" /></figure>
        <div class="featured-copy">
          <div class="story-meta text-mono"><span>{featured.category}</span><time>{featured.date}</time></div>
          <h2 id="featured-title">{featured.title}</h2>
          <p>{featured.summary}</p>
          <span class="story-link"><span>{copy.read}</span><span aria-hidden="true">&#8594;</span></span>
        </div>
      </a>
    </section>

    <section class="top-stories" aria-labelledby="top-stories-title">
      <h2 id="top-stories-title">{copy.top}</h2>
      <div class="top-grid">
        {topStories.map((article) => (
          <a href={'/' + locale + '/insights/' + article.slug + '/'}>
            <figure><img src={article.image} alt={article.alt} width="1536" height="1024" loading="lazy" decoding="async" /></figure>
            <div class="top-copy">
              <div class="story-meta text-mono"><span>{article.category}</span><time>{article.date}</time></div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </div>
          </a>
        ))}
      </div>
    </section>

    {archive.length > 0 && (
      <section class="archive-block" aria-labelledby="archive-title">
        <h2 id="archive-title">{copy.all}</h2>
        <div class="archive-grid">
          {archive.map((article) => (
            <a href={'/' + locale + '/insights/' + article.slug + '/'} class="archive-card">
              <figure><img src={article.image} alt={article.alt} width="1536" height="1024" loading="lazy" decoding="async" /></figure>
              <div class="story-meta text-mono"><span>{article.category}</span><time>{article.date}</time></div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </a>
          ))}
        </div>
      </section>
    )}
  </div>
</main>

<style>
  .blog-hero { position:relative; min-height:88svh; display:flex; align-items:flex-end; overflow:hidden; isolation:isolate; background:#07101a; }
  .blog-hero > img,.blog-hero__veil { position:absolute; inset:0; }
  .blog-hero > img { z-index:-2; width:100%; height:100%; object-fit:cover; animation:blog-hero-drift 22s cubic-bezier(.45,0,.2,1) infinite alternate; }
  .blog-hero__veil { z-index:-1; background:linear-gradient(90deg,rgba(5,8,14,.96),rgba(5,8,14,.66) 48%,rgba(5,8,14,.18)),linear-gradient(180deg,rgba(5,8,14,.2),transparent 30%,rgba(7,11,18,.46) 62%,#070b12 100%); }
  .blog-hero__copy { position:relative; z-index:1; max-width:920px; padding-top:150px; padding-bottom:clamp(64px,8vw,106px); }
  .blog-hero__copy > span { display:block; margin-bottom:22px; color:rgba(201,211,223,.62); }
  .blog-hero h1 { max-width:12ch; margin-bottom:22px; font-size:clamp(3rem,2rem + 3.8vw,6rem); font-weight:540; letter-spacing:-.045em; line-height:.95; }
  .blog-hero p { max-width:48ch; color:rgba(226,234,243,.76); font-size:clamp(1rem,.94rem + .28vw,1.16rem); }
  .editorial { margin-top:-1px; padding:0 0 clamp(96px,12vw,164px); background:linear-gradient(180deg,#070b12 0%,#060a11 54%,#05080e 100%); }
  .topic-row { display:grid; grid-template-columns:minmax(130px,.34fr) 1.66fr; gap:clamp(28px,6vw,88px); align-items:center; border-block:1px solid rgba(89,106,130,.34); padding-block:22px; }
  .topic-row > span { color:rgba(201,211,223,.5); }
  .topic-row ul { display:flex; flex-wrap:wrap; gap:10px 26px; list-style:none; }
  .topic-row li { color:rgba(226,234,243,.82); font-size:.86rem; }
  .featured-block { padding-top:clamp(76px,10vw,136px); }
  .section-label { display:block; margin-bottom:26px; color:rgba(201,211,223,.52); }
  .featured-story { display:grid; grid-template-columns:minmax(0,1.45fr) minmax(320px,.55fr); gap:clamp(38px,7vw,108px); align-items:end; color:inherit; }
  .featured-story figure { aspect-ratio:16 / 10; overflow:hidden; border-radius:8px; background:#07101a; }
  .featured-story img,.top-grid img,.archive-card img { width:100%; height:100%; object-fit:cover; filter:brightness(.78) saturate(.84); transition:transform 620ms var(--ease-out),filter 400ms var(--ease-out); }
  .featured-copy { padding-bottom:clamp(4px,2vw,24px); }
  .story-meta { display:flex; justify-content:space-between; gap:16px; color:rgba(201,211,223,.55); }
  .featured-copy h2 { max-width:15ch; margin:18px 0 16px; font-size:clamp(2rem,3.5vw,4rem); font-weight:540; line-height:.99; }
  .featured-copy > p { max-width:48ch; color:var(--steel); }
  .story-link { display:inline-flex; min-height:44px; align-items:center; gap:10px; margin-top:18px; color:var(--mist); font-size:.82rem; }
  .top-stories { margin-top:clamp(104px,13vw,176px); padding-top:clamp(36px,5vw,62px); border-top:1px solid rgba(89,106,130,.34); }
  .top-stories > h2 { margin-bottom:30px; font-size:clamp(2rem,3vw,3.2rem); font-weight:540; }
  .top-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(22px,4vw,58px); }
  .top-grid > a { min-width:0; display:grid; grid-template-columns:minmax(180px,.78fr) minmax(0,1.22fr); gap:clamp(20px,3vw,38px); color:inherit; }
  .top-grid figure { aspect-ratio:4 / 3; overflow:hidden; border-radius:8px; background:#07101a; }
  .top-copy { align-self:center; }
  .top-copy h3 { margin:16px 0 10px; font-size:clamp(1.3rem,1.8vw,1.85rem); font-weight:540; line-height:1.08; }
  .top-copy p { color:var(--steel); font-size:.88rem; }
  .archive-block { margin-top:clamp(104px,14vw,188px); padding-top:clamp(36px,5vw,62px); border-top:1px solid rgba(89,106,130,.34); }
  .archive-block > h2 { margin-bottom:34px; font-size:clamp(2rem,3vw,3.2rem); font-weight:540; }
  .archive-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(58px,7vw,96px) clamp(18px,3vw,42px); }
  .archive-card figure { aspect-ratio:16 / 10; overflow:hidden; border-radius:8px; margin-bottom:20px; background:#07101a; }
  .archive-card h3 { margin:16px 0 10px; font-size:clamp(1.4rem,2vw,2rem); font-weight:540; line-height:1.08; }
  .archive-card p { color:var(--steel); font-size:.9rem; }
  @keyframes blog-hero-drift { from { transform:scale(1.015) translate3d(-.4%,0,0); } to { transform:scale(1.045) translate3d(.7%,-.5%,0); } }
  @media (hover:hover) and (pointer:fine) { .featured-story:hover img,.top-grid > a:hover img,.archive-card:hover img { transform:scale(1.03); filter:brightness(.92) saturate(.98); } .featured-story:hover .story-link { color:var(--cloud-white); } }
  @media (max-width:1050px) { .featured-story { grid-template-columns:1fr; } .featured-copy { max-width:720px; } .top-grid > a { grid-template-columns:1fr; } }
  @media (max-width:760px) { .blog-hero { min-height:100svh; } .blog-hero__copy { padding-top:124px; padding-bottom:60px; } .blog-hero h1 { font-size:clamp(2.7rem,11vw,3.8rem); } .topic-row,.top-grid,.archive-grid { grid-template-columns:1fr; } .top-grid { gap:58px; } .top-grid figure { aspect-ratio:16 / 10; } }
  @media (prefers-reduced-motion:reduce) { .blog-hero > img { animation:none; transform:none; } .featured-story img,.top-grid img,.archive-card img { transition:none; } }
</style>
`, 'utf8');

await rewrite('src/pages/en/about.astro', (source) => source.replace("AboutIndexV2.astro", "AboutIndexV3.astro"));
await rewrite('src/pages/id/about.astro', (source) => source.replace("AboutIndexV2.astro", "AboutIndexV3.astro"));
await rewrite('src/pages/en/insights/index.astro', (source) => source.replace("EditorialIndexV2.astro", "EditorialIndexV3.astro"));
await rewrite('src/pages/id/insights/index.astro', (source) => source.replace("EditorialIndexV2.astro", "EditorialIndexV3.astro"));

console.log('Staging revision round 3 applied');
