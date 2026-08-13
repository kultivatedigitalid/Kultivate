export interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  problemsSolved: string[];
  whoItIsFor: string[];
  scope: string[];
  deliverables: string[];
  process: string[];
}

export const servicesData: Record<'id' | 'en', ServiceDetail[]> = {
  id: [
    {
      id: 'website-development',
      title: 'Website Development',
      slug: 'website-development',
      tagline: 'Buat nilai bisnis Anda langsung terasa.',
      description: 'Website yang cepat dan jelas—dibangun sebagai pusat pesan, kredibilitas, dan inquiry.',
      problemsSolved: [
        'Website cepat dan stabil saat calon pelanggan datang.',
        'Pengalaman yang tetap jelas di mobile, tablet, dan desktop.',
        'Struktur kode yang rapi untuk SEO dan pengembangan berikutnya.',
        'Analitik yang menunjukkan perjalanan pengunjung hingga inquiry.'
      ],
      whoItIsFor: [
        'Bisnis berkembang yang ingin meningkatkan kredibilitas profesional.',
        'Perusahaan yang membutuhkan landing page konversi tinggi untuk campaign.',
        'Tim internal yang membutuhkan CMS (Content Management System) yang mudah dikelola.'
      ],
      scope: [
        'Analisis kebutuhan dan arsitektur informasi.',
        'Desain antarmuka (UI/UX) khusus berstandar tinggi.',
        'Pengembangan frontend modern yang responsif.',
        'Integrasi CMS (Astro Content Collections, Markdown, atau headless CMS).',
        'Optimasi performa (Core Web Vitals) dan keamanan dasar.'
      ],
      deliverables: [
        'File source code website siap produksi.',
        'Dokumentasi teknis pengelolaan konten.',
        'Integrasi analitik dasar (Google Analytics/GTM).',
        'Halaman 404 custom dan privasi standar.'
      ],
      process: [
        'Penemuan (Discover): Analisis kebutuhan, benchmark kompetitor, dan penetapan KPI.',
        'Definisi (Define): Wireframe, sitemap, silsilah konten, dan persetujuan visual.',
        'Pembangunan (Build): Coding, integrasi modul, penulisan konten dwibahasa.',
        'Peningkatan (Improve): Testing performa, audit aksesibilitas, dan serah terima.'
      ]
    },
    {
      id: 'seo',
      title: 'Search Engine Optimization (SEO)',
      slug: 'seo',
      tagline: 'Hadir tepat saat kebutuhan dicari.',
      description: 'Struktur teknis dan konten mengikuti niat pencarian, lalu mengarahkannya ke nilai bisnis yang relevan.',
      problemsSolved: [
        'Halaman penting lebih mudah ditemukan untuk pencarian yang relevan.',
        'Trafik lebih selaras dengan layanan dan peluang inquiry.',
        'Struktur konten mudah dipahami pengguna dan mesin pencari.'
      ],
      whoItIsFor: [
        'Bisnis B2B atau jasa yang mengandalkan inquiry inbound.',
        'Brand yang ingin mengurangi ketergantungan pada iklan berbayar (paid ads).',
        'Website baru yang membutuhkan fondasi indeksasi awal yang benar.'
      ],
      scope: [
        'Audit SEO teknis menyeluruh (kecepatan, struktur data, indeksasi).',
        'Riset kata kunci berbasis maksud pencarian (Search Intent).',
        'Optimasi konten On-Page (meta tags, heading, gambar).',
        'Perbaikan arsitektur link internal.'
      ],
      deliverables: [
        'Laporan audit SEO teknis awal.',
        'Dokumen panduan riset kata kunci dan struktur halaman.',
        'Optimasi langsung pada sistem halaman.',
        'Setup Google Search Console dan dashboard pelaporan.'
      ],
      process: [
        'Penemuan (Discover): Audit menyeluruh performa search console dan histori trafik.',
        'Definisi (Define): Pemetaan kata kunci prioritas berdasarkan tingkat kesulitan dan relevansi bisnis.',
        'Pembangunan (Build): Optimasi teknis on-page, penataan ulang hierarki artikel.',
        'Peningkatan (Improve): Monitoring peringkat, evaluasi bounce rate, penyesuaian konten bulanan.'
      ]
    },
    {
      id: 'social-media-management',
      title: 'Social Media Management',
      slug: 'social-media-management',
      tagline: 'Tetap dekat setelah perhatian pertama.',
      description: 'Sistem konten yang menjaga pesan tetap konsisten, relevan, dan mudah diteruskan.',
      problemsSolved: [
        'Ritme publikasi yang aktif dan dapat dijalankan secara konsisten.',
        'Visual brand yang tetap dikenali di setiap format konten.',
        'Nilai utama produk atau layanan tersampaikan dengan jelas.'
      ],
      whoItIsFor: [
        'Pemilik brand yang sibuk dan tidak sempat memikirkan ide konten harian.',
        'Bisnis yang ingin membangun komunitas loyal di media sosial.',
        'Tim marketing yang memerlukan bantuan eksekusi desain konten berkualitas tinggi.'
      ],
      scope: [
        'Penyusunan kalender konten bulanan.',
        'Desain grafis dan penulisan caption (dwibahasa jika diperlukan).',
        'Penjadwalan posting otomatis dan manual.',
        'Laporan analisis performa konten bulanan.'
      ],
      deliverables: [
        'Kalender konten bulanan yang disetujui.',
        'File aset visual konten (Feed/Story/Reels).',
        'Laporan kinerja interaksi (Engagement) dan pertumbuhan organik.'
      ],
      process: [
        'Penemuan (Discover): Analisis audiens kompetitor, riset pilar konten brand.',
        'Definisi (Define): Penyusunan moodboard visual sosial media dan tone-of-voice caption.',
        'Pembangunan (Build): Proses desain, copywriting caption, revisi, dan finalisasi.',
        'Peningkatan (Improve): Evaluasi performa postingan, optimasi jam tayang konten.'
      ]
    }
  ],
  en: [
    {
      id: 'website-development',
      title: 'Website Development',
      slug: 'website-development',
      tagline: 'Make your value clear on arrival.',
      description: 'A fast, focused website built as the center of your message, credibility, and inquiries.',
      problemsSolved: [
        'A fast, stable website when prospects arrive.',
        'A clear experience across mobile, tablet, and desktop.',
        'A maintainable codebase ready for SEO and future improvements.',
        'Analytics that trace the visitor journey through to inquiry.'
      ],
      whoItIsFor: [
        'Growing businesses seeking to elevate professional credibility.',
        'Companies requiring high-conversion campaign landing pages.',
        'Internal teams needing a clean, manageable Content Management System (CMS).'
      ],
      scope: [
        'Requirement analysis and detailed information architecture.',
        'Tailored, high-standard UI/UX interface design.',
        'Modern, mobile-first responsive frontend engineering.',
        'Bilingual CMS integration (Astro Content Collections / Markdown).',
        'Core Web Vitals performance optimization and baseline security audits.'
      ],
      deliverables: [
        'Production-ready source files.',
        'Technical documentation for content editing.',
        'Google Analytics & Google Tag Manager configuration.',
        'Custom 404 pages and standard localized privacy policies.'
      ],
      process: [
        'Discover: Requirement analysis, competitor benchmarking, and KPI definition.',
        'Define: Wireframes, sitemaps, content structure, and visual style alignment.',
        'Build: Frontend engineering, CMS integration, and bilingual content population.',
        'Improve: Core Web Vitals optimization, accessibility audit, and handoff.'
      ]
    },
    {
      id: 'seo',
      title: 'Search Engine Optimization (SEO)',
      slug: 'seo',
      tagline: 'Show up when the need is real.',
      description: 'Technical structure and content follow search intent, then connect it to relevant business value.',
      problemsSolved: [
        'Priority pages become easier to find for relevant searches.',
        'Traffic aligns more closely with services and inquiry opportunities.',
        'Content structures that users and search engines can navigate clearly.'
      ],
      whoItIsFor: [
        'B2B firms and service providers relying on qualified inbound inquiries.',
        'Brands aiming to lower acquisition costs relative to paid marketing channels.',
        'New sites establishing correct indexing protocols from inception.'
      ],
      scope: [
        'Comprehensive technical SEO audits (speed, structured data, crawlability).',
        'Search intent-led keyword research.',
        'On-page content optimization (meta tags, headings, structure, alt text).',
        'Internal linking architecture updates.'
      ],
      deliverables: [
        'Technical SEO audit report.',
        'Keyword mapping and structure blueprints.',
        'On-page implementation directly on codebase templates.',
        'Google Search Console setup and reporting dashboard.'
      ],
      process: [
        'Discover: In-depth search console analysis, indexing reviews, and traffic baseline audits.',
        'Define: Priority keyword mapping based on keyword difficulty and commercial intent.',
        'Build: Technical remediation, heading structure re-alignment, and metadata optimization.',
        'Improve: Search ranking tracking, engagement metric optimization, and content iteration.'
      ]
    },
    {
      id: 'social-media-management',
      title: 'Social Media Management',
      slug: 'social-media-management',
      tagline: 'Stay close after the first impression.',
      description: 'A content system that keeps the message consistent, relevant, and easy to carry forward.',
      problemsSolved: [
        'An active publishing rhythm the team can sustain.',
        'A recognizable brand across every content format.',
        'Clear communication of the product or service value.'
      ],
      whoItIsFor: [
        'Brand owners needing structured content ideas without the day-to-day production overhead.',
        'Businesses wanting to cultivate a loyal organic community.',
        'Marketing teams requiring support for premium graphic design and copywriting assets.'
      ],
      scope: [
        'Monthly content calendar planning.',
        'Graphic design, asset optimization, and caption copywriting (bilingual).',
        'Automated and manual publishing schedules.',
        'Monthly analytics and performance reporting.'
      ],
      deliverables: [
        'Approved monthly content calendars.',
        'Visual assets ready for publishing (Feed/Stories/Reels).',
        'Performance reports covering engagement rate and audience growth metrics.'
      ],
      process: [
        'Discover: Competitive landscape audits, audience analysis, and content pillar formulation.',
        'Define: Content style guidelines, asset moodboards, and caption tone-of-voice alignment.',
        'Build: Visual production, design execution, copywriting, and approvals.',
        'Improve: Performance metric review, engagement analysis, and schedule optimization.'
      ]
    }
  ]
};
