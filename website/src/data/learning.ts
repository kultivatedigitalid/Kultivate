export type LearningCategory = 'seo' | 'web-services';
export type LearningLocale = 'id' | 'en';
export type LearningSeriesId =
  | 'seo-business-growth'
  | 'website-business-sales-system'
  | 'digital-project-scope-evaluation'
  | 'ux-visitor-action'
  | 'website-technical-migration-readiness'
  | 'ai-search-aeo-geo-business';

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

// Video IDs, durations, posters, and teaching thumbnails stay empty until the
// corresponding assets are verified. The UI keeps the existing video placeholder
// visible so each lesson is ready for production assets without implying a live video.
export const learningSeries: LearningSeries[] = [
  {
    id: 'seo-business-growth',
    slug: 'seo-business-growth',
    category: 'seo',
    order: 1,
    title: {
      en: 'SEO for Business Growth: From Search to Sales',
      id: 'SEO untuk Pertumbuhan Bisnis: Dari Search ke Sales',
    },
    description: {
      en: 'Connect search demand, service discovery, buyer decisions, and measurement to business opportunities—not rankings alone.',
      id: 'Hubungkan search demand, proses menemukan layanan, keputusan pelanggan, dan measurement dengan peluang bisnis—bukan ranking semata.',
    },
    lessonIds: [
      'search-business-opportunities',
      'map-demand-before-keywords',
      'search-intent-buying-journey',
      'services-into-searchable-pages',
      'service-page-rank-and-decide',
      'measure-seo-beyond-rankings',
    ],
    teachingThumbnail: '',
  },
  {
    id: 'website-business-sales-system',
    slug: 'website-business-sales-system',
    category: 'web-services',
    order: 2,
    title: {
      en: 'Your Website as a Business & Sales System',
      id: 'Website sebagai Sistem Bisnis & Sales',
    },
    description: {
      en: 'Define the job of a website, reduce uncertainty, build trust, and move the right visitor toward a useful business action.',
      id: 'Tentukan peran website, kurangi ketidakpastian, bangun trust, dan arahkan pengunjung yang tepat menuju tindakan bisnis yang berguna.',
    },
    lessonIds: [
      'define-website-business-job',
      'map-visitor-decision-journey',
      'website-information-architecture',
      'trust-proof-clarity-expectations',
      'find-conversion-friction',
      'rebuild-redesign-or-fix',
    ],
    teachingThumbnail: '',
  },
  {
    id: 'digital-project-scope-evaluation',
    slug: 'digital-project-scope-evaluation',
    category: 'web-services',
    order: 3,
    title: {
      en: 'How to Scope & Evaluate a Digital Project',
      id: 'Cara Menyusun Scope & Mengevaluasi Proyek Digital',
    },
    description: {
      en: 'Create a clearer brief, compare proposals fairly, expose hidden dependencies, and reduce delivery risk before committing budget.',
      id: 'Susun brief yang lebih jelas, bandingkan proposal secara adil, temukan dependensi tersembunyi, dan kurangi risiko sebelum menetapkan anggaran.',
    },
    lessonIds: [
      'business-problem-before-deliverables',
      'good-website-seo-scope',
      'compare-digital-proposals',
      'project-timeline-dependencies',
      'define-acceptance-criteria',
      'vendor-project-risk-red-flags',
    ],
    teachingThumbnail: '',
  },
  {
    id: 'ux-visitor-action',
    slug: 'ux-visitor-action',
    category: 'web-services',
    order: 4,
    title: {
      en: 'UX That Moves Visitors Toward Action',
      id: 'UX yang Mengarahkan Pengunjung ke Tindakan',
    },
    description: {
      en: 'Use clarity, hierarchy, evidence, navigation, and interaction choices to reduce friction across the visitor decision journey.',
      id: 'Gunakan clarity, hierarchy, evidence, navigasi, dan interaction choice untuk mengurangi friction dalam perjalanan keputusan pengunjung.',
    },
    lessonIds: [
      'ux-as-decision-design',
      'clarity-before-creativity',
      'reduce-choice-navigation-friction',
      'trust-before-cta',
      'forms-inquiry-qualification',
      'review-page-like-ux-team',
    ],
    teachingThumbnail: '',
  },
  {
    id: 'website-technical-migration-readiness',
    slug: 'website-technical-migration-readiness',
    category: 'web-services',
    order: 5,
    title: {
      en: 'Website Technical & Migration Readiness',
      id: 'Kesiapan Teknis Website & Migrasi',
    },
    description: {
      en: 'Understand performance, accessibility, technical debt, migration, measurement continuity, and launch risks before changing the foundation.',
      id: 'Pahami performance, accessibility, technical debt, migrasi, kontinuitas measurement, dan risiko launch sebelum mengubah fondasi website.',
    },
    lessonIds: [
      'performance-business-experience',
      'accessibility-resilience-quality',
      'technical-debt-cost',
      'migration-url-search-equity',
      'analytics-consent-continuity',
      'launch-readiness-post-launch-qa',
    ],
    teachingThumbnail: '',
  },
  {
    id: 'ai-search-aeo-geo-business',
    slug: 'ai-search-aeo-geo-business',
    category: 'seo',
    order: 6,
    title: {
      en: 'AI Search, AEO & GEO for Business',
      id: 'AI Search, AEO & GEO untuk Bisnis',
    },
    description: {
      en: 'Make expertise easier to understand, retrieve, and reference while keeping durable SEO and technical foundations in view.',
      id: 'Buat expertise lebih mudah dipahami, diambil, dan dirujuk dengan tetap menjaga fondasi SEO serta teknis yang tahan lama.',
    },
    lessonIds: [
      'ai-search-what-changes',
      'make-expertise-understandable',
      'answer-ready-human-content',
      'evidence-citation-readiness',
      'ai-search-technical-foundations',
      'measure-ai-search-practically',
    ],
    teachingThumbnail: '',
  },
];

const createLesson = (
  id: string,
  category: LearningCategory,
  seriesId: LearningSeriesId,
  order: number,
  titleEn: string,
  titleId: string,
  summaryEn: string,
  summaryId: string,
  outcomeEn: string,
  outcomeId: string,
  featured = false,
): LearningLesson => ({
  id,
  category,
  seriesId,
  order,
  title: { en: titleEn, id: titleId },
  summary: { en: summaryEn, id: summaryId },
  outcome: { en: outcomeEn, id: outcomeId },
  duration: '',
  videoId: '',
  poster: '',
  teachingThumbnail: '',
  featured,
});

export const learningLessons: LearningLesson[] = [
  createLesson(
    'search-business-opportunities', 'seo', 'seo-business-growth', 1,
    'How Search Creates Business Opportunities',
    'Bagaimana Search Menciptakan Peluang Bisnis',
    'Follow how discovery, evaluation, and decision moments build qualified demand before an inquiry.',
    'Pahami bagaimana momen discovery, evaluasi, dan keputusan membentuk qualified demand sebelum inquiry.',
    'Connect search visibility to business opportunity without treating traffic as revenue.',
    'Hubungkan search visibility dengan peluang bisnis tanpa menganggap traffic sebagai revenue.',
    true,
  ),
  createLesson(
    'map-demand-before-keywords', 'seo', 'seo-business-growth', 2,
    'Map Customer Demand Before Choosing Keywords',
    'Petakan Demand Pelanggan Sebelum Memilih Keyword',
    'Translate offers, customer problems, buying questions, and comparison language into useful demand themes.',
    'Ubah penawaran, masalah pelanggan, buying question, dan bahasa perbandingan menjadi tema demand yang berguna.',
    'Build a demand map that starts from the business and customer rather than a keyword tool.',
    'Susun demand map yang dimulai dari bisnis dan pelanggan, bukan dari keyword tool.',
  ),
  createLesson(
    'search-intent-buying-journey', 'seo', 'seo-business-growth', 3,
    'Search Intent Across the Buying Journey',
    'Search Intent dalam Buying Journey',
    'Separate learning, comparison, evaluation, and action intent across the customer journey.',
    'Pisahkan intent belajar, membandingkan, mengevaluasi, dan bertindak dalam customer journey.',
    'Decide when a demand deserves content, a service page, or no new page.',
    'Tentukan kapan sebuah demand membutuhkan konten, halaman layanan, atau tidak memerlukan halaman baru.',
  ),
  createLesson(
    'services-into-searchable-pages', 'seo', 'seo-business-growth', 4,
    'Turn Business Services Into Searchable Pages',
    'Ubah Layanan Bisnis Menjadi Halaman yang Mudah Ditemukan',
    'Connect service architecture, information hierarchy, language, proof, and internal links.',
    'Hubungkan arsitektur layanan, information hierarchy, bahasa, proof, dan internal link.',
    'Outline service pages that people and search systems can understand confidently.',
    'Susun outline halaman layanan yang dapat dipahami dengan jelas oleh pengguna dan sistem search.',
  ),
  createLesson(
    'service-page-rank-and-decide', 'seo', 'seo-business-growth', 5,
    'What Makes a Service Page Rank and Help Someone Decide',
    'Apa yang Membuat Halaman Layanan Ditemukan dan Membantu Keputusan',
    'Balance discoverability with clarity, differentiation, proof, useful answers, and the next action.',
    'Seimbangkan discoverability dengan clarity, differentiation, proof, jawaban berguna, dan next action.',
    'Review a service page against both search relevance and decision support.',
    'Tinjau halaman layanan berdasarkan relevansi search dan kemampuannya mendukung keputusan.',
  ),
  createLesson(
    'measure-seo-beyond-rankings', 'seo', 'seo-business-growth', 6,
    'Measure SEO Beyond Rankings: Visibility to Inquiry to Pipeline',
    'Ukur SEO Melampaui Ranking: Dari Visibility ke Inquiry dan Pipeline',
    'Choose meaningful indicators across visibility, qualified visits, inquiries, and assisted pipeline.',
    'Pilih indikator yang bermakna dari visibility, qualified visit, inquiry, hingga assisted pipeline.',
    'Create a measurement hierarchy while recognizing attribution limits.',
    'Buat measurement hierarchy dengan tetap memahami keterbatasan attribution.',
  ),

  createLesson(
    'define-website-business-job', 'web-services', 'website-business-sales-system', 1,
    'What Job Should Your Website Perform?',
    'Peran Apa yang Harus Dijalankan Website Anda?',
    'Define whether the website should support discovery, education, qualification, transactions, service, or credibility.',
    'Tentukan apakah website harus mendukung discovery, education, qualification, transaction, service, atau credibility.',
    'Choose a primary business job that can guide website priorities and measurement.',
    'Pilih peran bisnis utama yang dapat memandu prioritas dan measurement website.',
    true,
  ),
  createLesson(
    'map-visitor-decision-journey', 'web-services', 'website-business-sales-system', 2,
    'Map the Visitor Decision Journey',
    'Petakan Perjalanan Keputusan Pengunjung',
    'Identify what visitors need to understand and where uncertainty builds before they act.',
    'Identifikasi apa yang perlu dipahami pengunjung dan di mana ketidakpastian muncul sebelum mereka bertindak.',
    'Map the information, evidence, and next steps needed across the journey.',
    'Petakan informasi, evidence, dan next step yang dibutuhkan di sepanjang journey.',
  ),
  createLesson(
    'website-information-architecture', 'web-services', 'website-business-sales-system', 3,
    'Information Architecture That Makes the Business Easier to Understand',
    'Information Architecture yang Membuat Bisnis Lebih Mudah Dipahami',
    'Organize offers, audiences, use cases, proof, and navigation into a coherent website structure.',
    'Susun penawaran, audience, use case, proof, dan navigasi menjadi struktur website yang utuh.',
    'Recognize when page hierarchy and navigation clarify—or obscure—the business.',
    'Kenali kapan page hierarchy dan navigasi memperjelas atau justru mengaburkan bisnis.',
  ),
  createLesson(
    'trust-proof-clarity-expectations', 'web-services', 'website-business-sales-system', 4,
    'Trust Is a System: Proof, Clarity, and Expectations',
    'Trust adalah Sistem: Proof, Clarity, dan Expectations',
    'Use evidence, authorship, process transparency, policies, and response expectations to reduce perceived risk.',
    'Gunakan evidence, authorship, transparansi proses, kebijakan, dan ekspektasi respons untuk mengurangi risiko yang dirasakan.',
    'Place the right trust signal at the point where uncertainty occurs.',
    'Tempatkan trust signal yang tepat pada titik ketika ketidakpastian muncul.',
  ),
  createLesson(
    'find-conversion-friction', 'web-services', 'website-business-sales-system', 5,
    'Find Conversion Friction Before Redesigning Everything',
    'Temukan Conversion Friction Sebelum Merombak Semuanya',
    'Inspect confusion, dead ends, over-choice, weak calls to action, form friction, and inconsistent expectations.',
    'Periksa confusion, dead end, terlalu banyak pilihan, CTA lemah, form friction, dan ekspektasi yang tidak konsisten.',
    'Separate targeted conversion improvements from problems that need structural change.',
    'Pisahkan perbaikan conversion yang terarah dari masalah yang membutuhkan perubahan struktural.',
  ),
  createLesson(
    'rebuild-redesign-or-fix', 'web-services', 'website-business-sales-system', 6,
    'Rebuild, Redesign, or Fix? Choose the Smallest Reliable Intervention',
    'Rebuild, Redesign, atau Perbaikan? Pilih Intervensi Terkecil yang Andal',
    'Compare business change, technical debt, content structure, maintainability, search risk, and cost of delay.',
    'Bandingkan perubahan bisnis, technical debt, struktur konten, maintainability, search risk, dan cost of delay.',
    'Choose whether a targeted fix, redesign, or rebuild is the most reliable next step.',
    'Tentukan apakah targeted fix, redesign, atau rebuild merupakan next step yang paling andal.',
  ),

  createLesson(
    'business-problem-before-deliverables', 'web-services', 'digital-project-scope-evaluation', 1,
    'Start With the Business Problem, Not the Deliverable List',
    'Mulai dari Masalah Bisnis, Bukan Daftar Deliverable',
    'Separate the desired business outcome from an assumed solution such as a redesign, SEO campaign, or landing page.',
    'Pisahkan business outcome yang diinginkan dari solusi yang langsung diasumsikan seperti redesign, SEO campaign, atau landing page.',
    'Write a problem statement that keeps the scope open to the right intervention.',
    'Susun problem statement yang menjaga scope tetap terbuka terhadap intervensi yang tepat.',
    true,
  ),
  createLesson(
    'good-website-seo-scope', 'web-services', 'digital-project-scope-evaluation', 2,
    'What a Good Website or SEO Scope Should Contain',
    'Apa yang Harus Ada dalam Scope Website atau SEO yang Baik',
    'Review goals, workstreams, responsibilities, content, technical needs, integrations, measurement, QA, and exclusions.',
    'Tinjau goal, workstream, responsibility, konten, kebutuhan teknis, integration, measurement, QA, dan exclusion.',
    'Recognize whether a proposed scope is complete enough to evaluate and deliver.',
    'Nilai apakah proposed scope sudah cukup lengkap untuk dievaluasi dan dikerjakan.',
  ),
  createLesson(
    'compare-digital-proposals', 'web-services', 'digital-project-scope-evaluation', 3,
    'How to Compare Agency Proposals Without Comparing Only Price',
    'Cara Membandingkan Proposal Agency Tanpa Hanya Membandingkan Harga',
    'Compare problem understanding, approach, evidence, scope completeness, risk handling, ownership, and measurement.',
    'Bandingkan pemahaman masalah, approach, evidence, kelengkapan scope, risk handling, ownership, dan measurement.',
    'Create a fair comparison that exposes differences in value and delivery risk.',
    'Buat perbandingan yang adil untuk melihat perbedaan value dan delivery risk.',
  ),
  createLesson(
    'project-timeline-dependencies', 'web-services', 'digital-project-scope-evaluation', 4,
    'Timeline, Dependencies, and the Hidden Work That Delays Projects',
    'Timeline, Dependensi, dan Pekerjaan Tersembunyi yang Menunda Proyek',
    'Understand how content, access, data, legal review, environments, integrations, QA, and stakeholder responses affect timing.',
    'Pahami bagaimana konten, akses, data, legal review, environment, integration, QA, dan respons stakeholder memengaruhi timeline.',
    'Identify dependencies and owners before treating a delivery date as reliable.',
    'Identifikasi dependensi dan owner sebelum menganggap delivery date dapat diandalkan.',
  ),
  createLesson(
    'define-acceptance-criteria', 'web-services', 'digital-project-scope-evaluation', 5,
    'Define Acceptance Criteria Before Development Starts',
    'Tentukan Acceptance Criteria Sebelum Development Dimulai',
    'Translate vague expectations into observable checks for behavior, content, responsive UI, analytics, accessibility, and search readiness.',
    'Ubah ekspektasi yang samar menjadi pengecekan terukur untuk behavior, konten, responsive UI, analytics, accessibility, dan search readiness.',
    'Prepare acceptance criteria that reduce subjective review and late rework.',
    'Siapkan acceptance criteria yang mengurangi review subjektif dan rework di akhir.',
  ),
  createLesson(
    'vendor-project-risk-red-flags', 'web-services', 'digital-project-scope-evaluation', 6,
    'Vendor and Project Risk: Red Flags Before You Sign',
    'Risiko Vendor dan Proyek: Red Flag Sebelum Menandatangani',
    'Identify unclear ownership, missing migration plans, absent measurement, lock-in, unsupported stacks, vague maintenance, and unrealistic guarantees.',
    'Identifikasi ownership yang tidak jelas, migration plan yang hilang, measurement yang absen, lock-in, stack tanpa dukungan, maintenance samar, dan guarantee yang tidak realistis.',
    'Ask the questions that expose material delivery risk before commitment.',
    'Ajukan pertanyaan yang mengungkap delivery risk penting sebelum membuat komitmen.',
  ),

  createLesson(
    'ux-as-decision-design', 'web-services', 'ux-visitor-action', 1,
    'UX Is Decision Design, Not Decoration',
    'UX adalah Decision Design, Bukan Dekorasi',
    'Understand how interface choices reduce effort, uncertainty, and errors across a business journey.',
    'Pahami bagaimana pilihan interface mengurangi effort, uncertainty, dan error dalam business journey.',
    'Evaluate UX by the decisions and tasks it supports rather than visual novelty.',
    'Evaluasi UX berdasarkan keputusan dan task yang didukung, bukan visual novelty.',
    true,
  ),
  createLesson(
    'clarity-before-creativity', 'web-services', 'ux-visitor-action', 2,
    'Clarity Before Creativity: Make the Offer Understandable',
    'Clarity Sebelum Creativity: Buat Penawaran Mudah Dipahami',
    'Use hierarchy, messaging order, information scent, and progressive detail so visitors know what matters.',
    'Gunakan hierarchy, urutan pesan, information scent, dan progressive detail agar pengunjung memahami apa yang penting.',
    'Find where creative treatment supports—or competes with—comprehension.',
    'Temukan kapan creative treatment mendukung atau justru bersaing dengan comprehension.',
  ),
  createLesson(
    'reduce-choice-navigation-friction', 'web-services', 'ux-visitor-action', 3,
    'Reduce Choice and Navigation Friction',
    'Kurangi Choice dan Navigation Friction',
    'Recognize overloaded menus, competing calls to action, duplicated routes, and ambiguous labels.',
    'Kenali menu yang berlebihan, CTA yang saling bersaing, route duplikat, dan label yang ambigu.',
    'Simplify navigation around the visitor’s priority without removing necessary paths.',
    'Sederhanakan navigasi berdasarkan prioritas pengunjung tanpa menghilangkan path yang dibutuhkan.',
  ),
  createLesson(
    'trust-before-cta', 'web-services', 'ux-visitor-action', 4,
    'Trust and Risk Reduction Before the CTA',
    'Trust dan Pengurangan Risiko Sebelum CTA',
    'Place proof, process, pricing expectations, evidence, reassurance, and next-step clarity where uncertainty appears.',
    'Tempatkan proof, proses, ekspektasi harga, evidence, reassurance, dan kejelasan next step ketika uncertainty muncul.',
    'Match trust content to the risk a visitor feels before acting.',
    'Sesuaikan trust content dengan risiko yang dirasakan pengunjung sebelum bertindak.',
  ),
  createLesson(
    'forms-inquiry-qualification', 'web-services', 'ux-visitor-action', 5,
    'Forms and Inquiry Flows That Qualify Without Blocking',
    'Form dan Inquiry Flow yang Menyaring Tanpa Menghambat',
    'Balance business qualification with user effort and decide which information is needed now or later.',
    'Seimbangkan business qualification dengan user effort dan tentukan informasi yang dibutuhkan sekarang atau nanti.',
    'Design an inquiry sequence that gathers useful context without creating unnecessary abandonment.',
    'Susun inquiry sequence yang mengumpulkan konteks berguna tanpa menciptakan abandonment yang tidak perlu.',
  ),
  createLesson(
    'review-page-like-ux-team', 'web-services', 'ux-visitor-action', 6,
    'How to Review a Page Like a UX Team',
    'Cara Meninjau Halaman seperti Tim UX',
    'Use a structured review across goal, audience, hierarchy, comprehension, evidence, interaction, accessibility, and next action.',
    'Gunakan review terstruktur untuk goal, audience, hierarchy, comprehension, evidence, interaction, accessibility, dan next action.',
    'Produce a focused UX observation list instead of subjective design opinions.',
    'Hasilkan daftar observasi UX yang fokus, bukan opini desain yang subjektif.',
  ),

  createLesson(
    'performance-business-experience', 'web-services', 'website-technical-migration-readiness', 1,
    'Performance Is a Business and Experience Constraint',
    'Performance adalah Batasan Bisnis dan Experience',
    'Understand Core Web Vitals, real-user performance, page weight, rendering, and their relationship to user and business context.',
    'Pahami Core Web Vitals, real-user performance, page weight, rendering, serta hubungannya dengan konteks pengguna dan bisnis.',
    'Separate useful performance priorities from isolated lab scores.',
    'Pisahkan prioritas performance yang berguna dari lab score yang berdiri sendiri.',
    true,
  ),
  createLesson(
    'accessibility-resilience-quality', 'web-services', 'website-technical-migration-readiness', 2,
    'Accessibility and Resilience Are Quality Requirements',
    'Accessibility dan Resilience adalah Standar Kualitas',
    'Review semantic structure, keyboard use, contrast, labels, error handling, and inclusive access as parts of robust delivery.',
    'Tinjau semantic structure, keyboard use, contrast, label, error handling, dan inclusive access sebagai bagian dari delivery yang tangguh.',
    'Recognize accessibility gaps as product quality risks rather than optional polish.',
    'Kenali accessibility gap sebagai risiko kualitas produk, bukan optional polish.',
  ),
  createLesson(
    'technical-debt-cost', 'web-services', 'website-technical-migration-readiness', 3,
    'Technical Debt: When the Current Foundation Becomes Expensive',
    'Technical Debt: Ketika Fondasi Saat Ini Menjadi Mahal',
    'Recognize fragile templates, duplicated logic, abandoned dependencies, manual deployment, weak content models, and unclear ownership.',
    'Kenali template rapuh, logic duplikat, dependency terbengkalai, deployment manual, content model lemah, dan ownership yang tidak jelas.',
    'Assess when maintenance cost and delivery risk justify a foundational change.',
    'Nilai kapan maintenance cost dan delivery risk membenarkan perubahan fondasi.',
  ),
  createLesson(
    'migration-url-search-equity', 'web-services', 'website-technical-migration-readiness', 4,
    'Migration Planning: URLs, Redirects, Content, and Search Equity',
    'Perencanaan Migrasi: URL, Redirect, Konten, dan Search Equity',
    'Understand how URL mapping, redirects, canonicals, metadata, internal links, sitemaps, and validation protect existing value.',
    'Pahami bagaimana URL mapping, redirect, canonical, metadata, internal link, sitemap, dan validation menjaga nilai yang sudah ada.',
    'Identify the migration controls that must exist before launch.',
    'Identifikasi kontrol migrasi yang harus tersedia sebelum launch.',
  ),
  createLesson(
    'analytics-consent-continuity', 'web-services', 'website-technical-migration-readiness', 5,
    'Analytics, Consent, and Measurement Must Survive the Change',
    'Analytics, Consent, dan Measurement Harus Bertahan setelah Perubahan',
    'Plan analytics, consent behavior, events, baselines, and reporting continuity before redesign or migration.',
    'Rencanakan analytics, consent behavior, event, baseline, dan reporting continuity sebelum redesign atau migrasi.',
    'Prevent a launch from breaking the evidence needed to evaluate its impact.',
    'Cegah launch merusak evidence yang dibutuhkan untuk mengevaluasi dampaknya.',
  ),
  createLesson(
    'launch-readiness-post-launch-qa', 'web-services', 'website-technical-migration-readiness', 6,
    'Launch Readiness and Post-Launch QA',
    'Kesiapan Launch dan Post-Launch QA',
    'Coordinate functional QA, responsive behavior, accessibility, performance, analytics, indexability, redirects, monitoring, rollback, and ownership.',
    'Koordinasikan functional QA, responsive behavior, accessibility, performance, analytics, indexability, redirect, monitoring, rollback, dan ownership.',
    'Build a launch checklist that covers both release day and the monitoring period after it.',
    'Susun launch checklist yang mencakup hari rilis dan periode monitoring setelahnya.',
  ),

  createLesson(
    'ai-search-what-changes', 'seo', 'ai-search-aeo-geo-business', 1,
    'What Changes—and What Does Not—in AI-Assisted Search',
    'Apa yang Berubah dan Tetap Sama dalam AI-Assisted Search',
    'Separate durable search foundations from changing answer interfaces, overviews, and AI search modes.',
    'Pisahkan fondasi search yang tahan lama dari perubahan answer interface, overview, dan AI search mode.',
    'Focus investment on durable principles while monitoring emerging behavior.',
    'Fokuskan investasi pada prinsip yang tahan lama sambil memantau behavior baru.',
    true,
  ),
  createLesson(
    'make-expertise-understandable', 'seo', 'ai-search-aeo-geo-business', 2,
    'Make Expertise Easy to Understand',
    'Buat Expertise Mudah Dipahami',
    'Clarify entities, service and topic relationships, authorship, organization context, definitions, and information architecture.',
    'Perjelas entity, hubungan layanan dan topik, authorship, konteks organisasi, definisi, dan information architecture.',
    'Find the structural gaps that make expertise difficult to interpret or retrieve.',
    'Temukan structural gap yang membuat expertise sulit dipahami atau diambil.',
  ),
  createLesson(
    'answer-ready-human-content', 'seo', 'ai-search-aeo-geo-business', 3,
    'Answer-Ready Content Without Writing for Robots',
    'Konten Answer-Ready Tanpa Menulis untuk Robot',
    'Combine direct answers, supporting explanation, evidence, examples, and source context while keeping the content useful for people.',
    'Gabungkan jawaban langsung, penjelasan pendukung, evidence, contoh, dan source context dengan tetap berguna bagi pengguna.',
    'Structure useful answers without turning every page into repetitive FAQ content.',
    'Susun jawaban berguna tanpa mengubah setiap halaman menjadi FAQ yang repetitif.',
  ),
  createLesson(
    'evidence-citation-readiness', 'seo', 'ai-search-aeo-geo-business', 4,
    'Evidence, Sources, and Citation Readiness',
    'Evidence, Sources, dan Citation Readiness',
    'Understand how first-hand evidence, named expertise, references, original data, and consistent business facts improve trust.',
    'Pahami bagaimana first-hand evidence, named expertise, reference, original data, dan fakta bisnis yang konsisten meningkatkan trust.',
    'Prioritize evidence improvements that make important claims easier to verify and reference.',
    'Prioritaskan perbaikan evidence agar klaim penting lebih mudah diverifikasi dan dirujuk.',
  ),
  createLesson(
    'ai-search-technical-foundations', 'seo', 'ai-search-aeo-geo-business', 5,
    'Technical Foundations Still Matter',
    'Fondasi Teknis Tetap Penting',
    'Connect crawlability, indexability, rendering, internal links, canonicals, structured data, and performance to content retrieval.',
    'Hubungkan crawlability, indexability, rendering, internal link, canonical, structured data, dan performance dengan content retrieval.',
    'Identify technical blockers before treating an AI search problem as a copywriting problem.',
    'Identifikasi technical blocker sebelum menganggap masalah AI search sebagai masalah copywriting.',
  ),
  createLesson(
    'measure-ai-search-practically', 'seo', 'ai-search-aeo-geo-business', 6,
    'Measure AI Search Without Pretending Attribution Is Perfect',
    'Ukur AI Search Tanpa Menganggap Attribution Sempurna',
    'Monitor query sets, citations and mentions, landing-page behavior, branded demand, and assisted inquiry signals.',
    'Monitor query set, citation dan mention, landing-page behavior, branded demand, dan assisted inquiry signal.',
    'Create a practical monitoring approach with explicit attribution limits.',
    'Buat pendekatan monitoring yang praktis dengan batasan attribution yang jelas.',
  ),
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
    .filter((lesson): lesson is LearningLesson => Boolean(lesson));
};
