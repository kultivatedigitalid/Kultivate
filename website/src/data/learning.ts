export type LearningCategory = 'seo' | 'web-services';
export type LearningLocale = 'id' | 'en';

export interface LearningLesson {
  id: string;
  category: LearningCategory;
  title: Record<LearningLocale, string>;
  summary: Record<LearningLocale, string>;
  outcome: Record<LearningLocale, string>;
  duration: string;
  videoId: string;
  poster?: string;
  featured?: boolean;
}

// Video IDs and durations stay empty until the corresponding assets are verified.
// The UI intentionally omits video controls and duration metadata in that state.
export const learningLessons: LearningLesson[] = [
  {
    id: 'high-intent-service-discovery',
    category: 'seo',
    title: {
      en: 'How buyers actually find high-intent services',
      id: 'Bagaimana calon pelanggan menemukan layanan dengan intent tinggi'
    },
    summary: {
      en: 'Map the questions, comparisons, and proof buyers use before they are ready to contact a provider.',
      id: 'Petakan pertanyaan, perbandingan, dan bukti yang digunakan calon pelanggan sebelum menghubungi penyedia jasa.'
    },
    outcome: {
      en: 'See which search moments deserve a page, an answer, or stronger evidence.',
      id: 'Tentukan momen pencarian mana yang membutuhkan halaman, jawaban, atau bukti yang lebih kuat.'
    },
    duration: '',
    videoId: '',
    featured: true
  },
  {
    id: 'technical-seo-owner-checklist',
    category: 'seo',
    title: {
      en: 'Technical SEO: what owners need to inspect first',
      id: 'Technical SEO: apa yang perlu diperiksa owner lebih dulu'
    },
    summary: {
      en: 'A practical order for reviewing crawl access, indexation, performance, templates, and measurement.',
      id: 'Urutan praktis untuk memeriksa crawl access, indexation, performa, template, dan measurement.'
    },
    outcome: {
      en: 'Separate urgent technical risk from work that can wait.',
      id: 'Bedakan risiko teknis yang mendesak dari pekerjaan yang masih bisa menunggu.'
    },
    duration: '',
    videoId: ''
  },
  {
    id: 'service-page-search-decision',
    category: 'seo',
    title: {
      en: 'How to structure a service page for search and decision-making',
      id: 'Cara menyusun halaman layanan untuk search dan pengambilan keputusan'
    },
    summary: {
      en: 'Connect search intent, a clear offer, useful evidence, and the next action in one page journey.',
      id: 'Hubungkan search intent, penawaran yang jelas, bukti yang berguna, dan next action dalam satu alur halaman.'
    },
    outcome: {
      en: 'Build a page outline that supports discovery and a confident next step.',
      id: 'Susun outline halaman yang mendukung proses ditemukan dan next step yang meyakinkan.'
    },
    duration: '',
    videoId: ''
  },
  {
    id: 'aeo-geo-expertise',
    category: 'seo',
    title: {
      en: 'AEO & GEO: making expertise easier to understand and reference',
      id: 'AEO & GEO: membuat expertise lebih mudah dipahami dan dirujuk'
    },
    summary: {
      en: 'Organize answers, entities, evidence, and source clarity for traditional and AI-assisted search experiences.',
      id: 'Susun jawaban, entity, evidence, dan kejelasan sumber untuk pengalaman search tradisional maupun berbasis AI.'
    },
    outcome: {
      en: 'Identify the content and evidence gaps that make expertise difficult to retrieve or cite.',
      id: 'Temukan gap konten dan bukti yang membuat expertise sulit diambil atau dikutip.'
    },
    duration: '',
    videoId: ''
  },
  {
    id: 'rebuild-or-targeted-fixes',
    category: 'web-services',
    title: {
      en: 'When a website needs a rebuild vs targeted fixes',
      id: 'Kapan website perlu dibangun ulang atau cukup diperbaiki secara terarah'
    },
    summary: {
      en: 'Compare structural constraints, maintenance risk, business change, and the cost of keeping the current foundation.',
      id: 'Bandingkan hambatan struktur, risiko maintenance, perubahan bisnis, dan biaya mempertahankan fondasi saat ini.'
    },
    outcome: {
      en: 'Choose the smallest intervention that can reliably support the business.',
      id: 'Pilih intervensi terkecil yang tetap dapat mendukung bisnis dengan andal.'
    },
    duration: '',
    videoId: '',
    featured: true
  },
  {
    id: 'reduce-inquiry-friction',
    category: 'web-services',
    title: {
      en: 'How to reduce friction before the inquiry',
      id: 'Cara mengurangi friction sebelum inquiry'
    },
    summary: {
      en: 'Review clarity, trust, navigation, forms, and response expectations across the decision journey.',
      id: 'Tinjau clarity, trust, navigasi, formulir, dan ekspektasi respons di sepanjang decision journey.'
    },
    outcome: {
      en: 'Find where attention is lost before a visitor takes the next step.',
      id: 'Temukan bagian yang menghilangkan perhatian sebelum pengunjung mengambil next step.'
    },
    duration: '',
    videoId: ''
  },
  {
    id: 'performance-accessibility-trust',
    category: 'web-services',
    title: {
      en: 'Performance, accessibility, and trust',
      id: 'Performance, accessibility, dan trust'
    },
    summary: {
      en: 'Understand how speed, resilient interfaces, and inclusive access affect confidence in a website.',
      id: 'Pahami bagaimana kecepatan, interface yang tangguh, dan akses inklusif memengaruhi kepercayaan pada website.'
    },
    outcome: {
      en: 'Prioritize experience improvements with both people and technical quality in view.',
      id: 'Prioritaskan perbaikan experience dengan mempertimbangkan pengguna dan kualitas teknis.'
    },
    duration: '',
    videoId: ''
  },
  {
    id: 'redesign-migration-search-visibility',
    category: 'web-services',
    title: {
      en: 'Planning a redesign or migration without losing search visibility',
      id: 'Merencanakan redesign atau migrasi tanpa kehilangan search visibility'
    },
    summary: {
      en: 'Coordinate URLs, redirects, templates, analytics, quality checks, and launch ownership before making the move.',
      id: 'Koordinasikan URL, redirect, template, analytics, quality checks, dan ownership launch sebelum melakukan perpindahan.'
    },
    outcome: {
      en: 'Create a migration checklist that protects existing value and makes responsibilities clear.',
      id: 'Buat checklist migrasi yang menjaga nilai yang sudah ada dan memperjelas tanggung jawab.'
    },
    duration: '',
    videoId: ''
  }
];

export const getLearningLessons = (category?: LearningCategory) =>
  category ? learningLessons.filter((lesson) => lesson.category === category) : learningLessons;
