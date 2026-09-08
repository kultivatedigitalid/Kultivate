export type LearningCategory = 'seo' | 'web-services';
export type LearningLocale = 'id' | 'en';
export type LearningSeriesId =
  | 'search-demand-discovery'
  | 'technical-ai-search'
  | 'website-decisions-conversion'
  | 'website-quality-migration';

export interface LearningSeries {
  id: LearningSeriesId;
  slug: string;
  category: LearningCategory;
  order: number;
  title: Record<LearningLocale, string>;
  description: Record<LearningLocale, string>;
  lessonIds: string[];
  teachingThumbnail: string;
}

export interface LearningLesson {
  id: string;
  category: LearningCategory;
  seriesId: LearningSeriesId;
  order: number;
  title: Record<LearningLocale, string>;
  summary: Record<LearningLocale, string>;
  outcome: Record<LearningLocale, string>;
  duration: string;
  videoId: string;
  poster: string;
  teachingThumbnail: string;
  featured?: boolean;
}

// Video IDs and durations stay empty until the corresponding assets are verified.
// The UI intentionally omits video controls and duration metadata in that state.
// Teaching thumbnails and posters remain empty until real founder assets are approved.
export const learningSeries: LearningSeries[] = [
  {
    id: 'search-demand-discovery',
    slug: 'search-demand-discovery',
    category: 'seo',
    order: 1,
    title: {
      en: 'Search Demand & Discovery',
      id: 'Demand Search & Discovery',
    },
    description: {
      en: 'Understand how high-intent buyers search and how service pages can support discovery and decisions.',
      id: 'Pahami cara calon pelanggan dengan intent tinggi mencari dan bagaimana halaman layanan mendukung proses ditemukan serta pengambilan keputusan.',
    },
    lessonIds: ['high-intent-service-discovery', 'service-page-search-decision'],
    teachingThumbnail: '',
  },
  {
    id: 'technical-ai-search',
    slug: 'technical-ai-search',
    category: 'seo',
    order: 2,
    title: {
      en: 'Technical & AI Search',
      id: 'Technical & AI Search',
    },
    description: {
      en: 'Review the technical foundations and information signals that support traditional and AI-assisted search.',
      id: 'Tinjau fondasi teknis dan sinyal informasi yang mendukung search tradisional maupun berbasis AI.',
    },
    lessonIds: ['technical-seo-owner-checklist', 'aeo-geo-expertise'],
    teachingThumbnail: '',
  },
  {
    id: 'website-decisions-conversion',
    slug: 'website-decisions-conversion',
    category: 'web-services',
    order: 3,
    title: {
      en: 'Website Decisions & Conversion',
      id: 'Keputusan Website & Conversion',
    },
    description: {
      en: 'Decide whether to rebuild or improve, then find the friction that stops attention becoming action.',
      id: 'Tentukan kapan website perlu dibangun ulang atau diperbaiki, lalu temukan friction yang menghambat perhatian menjadi tindakan.',
    },
    lessonIds: ['rebuild-or-targeted-fixes', 'reduce-inquiry-friction'],
    teachingThumbnail: '',
  },
  {
    id: 'website-quality-migration',
    slug: 'website-quality-migration',
    category: 'web-services',
    order: 4,
    title: {
      en: 'Website Quality & Migration',
      id: 'Kualitas Website & Migrasi',
    },
    description: {
      en: 'Connect performance, accessibility, trust, and migration planning without losing the value already built.',
      id: 'Hubungkan performa, accessibility, trust, dan perencanaan migrasi tanpa kehilangan nilai yang sudah dibangun.',
    },
    lessonIds: ['performance-accessibility-trust', 'redesign-migration-search-visibility'],
    teachingThumbnail: '',
  },
];

export const learningLessons: LearningLesson[] = [
  {
    id: 'high-intent-service-discovery',
    category: 'seo',
    seriesId: 'search-demand-discovery',
    order: 1,
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
    poster: '',
    teachingThumbnail: '',
    featured: true
  },
  {
    id: 'technical-seo-owner-checklist',
    category: 'seo',
    seriesId: 'technical-ai-search',
    order: 1,
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
    videoId: '',
    poster: '',
    teachingThumbnail: ''
  },
  {
    id: 'service-page-search-decision',
    category: 'seo',
    seriesId: 'search-demand-discovery',
    order: 2,
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
    videoId: '',
    poster: '',
    teachingThumbnail: ''
  },
  {
    id: 'aeo-geo-expertise',
    category: 'seo',
    seriesId: 'technical-ai-search',
    order: 2,
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
    videoId: '',
    poster: '',
    teachingThumbnail: ''
  },
  {
    id: 'rebuild-or-targeted-fixes',
    category: 'web-services',
    seriesId: 'website-decisions-conversion',
    order: 1,
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
    poster: '',
    teachingThumbnail: '',
    featured: true
  },
  {
    id: 'reduce-inquiry-friction',
    category: 'web-services',
    seriesId: 'website-decisions-conversion',
    order: 2,
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
    videoId: '',
    poster: '',
    teachingThumbnail: ''
  },
  {
    id: 'performance-accessibility-trust',
    category: 'web-services',
    seriesId: 'website-quality-migration',
    order: 1,
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
    videoId: '',
    poster: '',
    teachingThumbnail: ''
  },
  {
    id: 'redesign-migration-search-visibility',
    category: 'web-services',
    seriesId: 'website-quality-migration',
    order: 2,
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
    videoId: '',
    poster: '',
    teachingThumbnail: ''
  }
];

export const getLearningLessons = (category?: LearningCategory) =>
  (category ? learningLessons.filter((lesson) => lesson.category === category) : learningLessons)
    .slice()
    .sort((a, b) => {
      const seriesA = learningSeries.find((series) => series.id === a.seriesId)?.order ?? 0;
      const seriesB = learningSeries.find((series) => series.id === b.seriesId)?.order ?? 0;
      return seriesA - seriesB || a.order - b.order;
    });

export const getLearningSeries = () =>
  learningSeries.slice().sort((a, b) => a.order - b.order);

export const getLearningSeriesBySlug = (slug: string) =>
  learningSeries.find((series) => series.slug === slug);

export const getLearningLessonsForSeries = (seriesId: LearningSeriesId) => {
  const series = learningSeries.find((item) => item.id === seriesId);
  if (!series) return [];

  return series.lessonIds
    .map((lessonId) => learningLessons.find((lesson) => lesson.id === lessonId))
    .filter((lesson): lesson is LearningLesson => Boolean(lesson))
    .sort((a, b) => a.order - b.order);
};
