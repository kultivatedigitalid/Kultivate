export type LearningCategory = 'seo' | 'web-services' | 'social-media-management' | 'visual-strategy';
export type LearningLocale = 'id' | 'en';
type Localized = Record<LearningLocale, string>;
export type LearningStage = 'understand' | 'apply' | 'decide';
export type LearningSeriesId = 'seo-business-growth' | 'ai-search-aeo-geo-business' | 'website-business-sales-system' | 'website-technical-migration-readiness' | 'digital-project-scope-evaluation' | 'building-brand-trust-social-media' | 'building-brand-value-design';
interface LessonContent {
  id: string;
  title: Localized;
  summary: Localized;
  outcome: Localized;
  duration: string;
  videoId: string;
  poster: string;
  teachingThumbnail: string;
}
export interface LearningChapter {
  id: string;
  title: Localized;
  stage: LearningStage;
  lessons: LessonContent[];
}
interface CourseContent {
  id: LearningSeriesId;
  slug: string;
  category: LearningCategory;
  title: Localized;
  description: Localized;
  audience: Localized;
  coverLabel: string;
  teachingThumbnail: string;
  chapters: LearningChapter[];
}
export interface LearningSeries extends CourseContent {
  order: number;
  lessonIds: string[];
}
export interface LearningLesson extends LessonContent {
  category: LearningCategory;
  seriesId: LearningSeriesId;
  chapterId: string;
  order: number;
  featured?: boolean;
}
export const learningCategoryLabels: Record<LearningCategory, string> = {
  seo: 'SEO', 'web-services': 'Web Services',
  'social-media-management': 'Social Media Management', 'visual-strategy': 'Visual Strategy',
};
export const learningStageLabels: Record<LearningStage, Localized> = {
  understand: { en: 'Understand', id: 'Pahami' },
  apply: { en: 'Apply', id: 'Terapkan' },
  decide: { en: 'Decide / Measure', id: 'Putuskan / Ukur' },
};

// Source: the approved Kultivate curriculum and architecture documents (15 Sep 2026).
// Course > chapter > lesson is the single source of truth for order and counts.
// Only summaries and learning objectives are approved for this implementation.
// Video IDs, duration and media stay empty until the real lesson assets are supplied.
// Established course URLs are retained to preserve incoming links.
const curriculum: CourseContent[] = [
  {
    "id": "seo-business-growth",
    "slug": "seo-business-growth",
    "category": "seo",
    "title": {
      "en": "SEO for Business",
      "id": "SEO untuk Bisnis"
    },
    "description": {
      "en": "Understand how customers find your business through search, then choose what to improve and how to assess progress.",
      "id": "Pahami bagaimana pelanggan menemukan bisnis melalui pencarian, lalu tentukan prioritas perbaikan dan cara menilai hasilnya."
    },
    "audience": {
      "en": "Business owners, Marketing, IT Leads, and Procurement",
      "id": "Pemilik bisnis, Marketing, IT Lead, dan Procurement"
    },
    "coverLabel": "SEARCH",
    "teachingThumbnail": "",
    "chapters": [
      {
        "id": "search-fundamentals",
        "title": {
          "en": "Search Fundamentals",
          "id": "Dasar Pencarian"
        },
        "stage": "understand",
        "lessons": [
          {
            "id": "search-business-opportunities",
            "title": {
              "en": "Search & Business",
              "id": "Pencarian & Bisnis"
            },
            "summary": {
              "en": "Explore how search supports discovery, evaluation, and inquiries across the customer journey.",
              "id": "Kenali peran pencarian dalam proses menemukan bisnis, menilai penawaran, dan menghubungi penyedia layanan."
            },
            "outcome": {
              "en": "Explain where search can contribute to a business opportunity.",
              "id": "Jelaskan peran pencarian dalam menciptakan peluang bisnis."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "map-demand-before-keywords",
            "title": {
              "en": "Search Demand",
              "id": "Permintaan Pencarian"
            },
            "summary": {
              "en": "Connect your offer and customer problems with the questions people may search for.",
              "id": "Hubungkan penawaran bisnis dan masalah pelanggan dengan pertanyaan yang mungkin mereka cari."
            },
            "outcome": {
              "en": "Map a customer need to a relevant search opportunity.",
              "id": "Petakan kebutuhan pelanggan ke peluang pencarian yang relevan."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "search-strategy",
        "title": {
          "en": "Search Strategy",
          "id": "Strategi Pencarian"
        },
        "stage": "apply",
        "lessons": [
          {
            "id": "search-intent-buying-journey",
            "title": {
              "en": "Search Intent",
              "id": "Maksud Pencarian"
            },
            "summary": {
              "en": "Distinguish between searches to learn, compare, evaluate, and take action.",
              "id": "Bedakan pencarian untuk belajar, membandingkan, mengevaluasi, dan mengambil tindakan."
            },
            "outcome": {
              "en": "Identify what a searcher needs before deciding which answer to provide.",
              "id": "Tentukan kebutuhan pencari sebelum memilih jawaban yang sesuai."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "services-into-searchable-pages",
            "title": {
              "en": "Search Assets",
              "id": "Aset Pencarian"
            },
            "summary": {
              "en": "Translate search intent into useful service pages, explanations, and supporting content.",
              "id": "Terjemahkan maksud pencarian menjadi halaman layanan, penjelasan, dan konten pendukung yang berguna."
            },
            "outcome": {
              "en": "Identify the pages your business needs to answer priority customer questions.",
              "id": "Kenali halaman yang dibutuhkan untuk menjawab pertanyaan utama pelanggan."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "growth-decisions",
        "title": {
          "en": "Growth Decisions",
          "id": "Keputusan Pertumbuhan"
        },
        "stage": "decide",
        "lessons": [
          {
            "id": "seo-priorities",
            "title": {
              "en": "SEO Priorities",
              "id": "Prioritas SEO"
            },
            "summary": {
              "en": "Weigh customer relevance, existing gaps, dependencies, and effort before choosing the next SEO task.",
              "id": "Pertimbangkan relevansi pelanggan, kekurangan saat ini, ketergantungan, dan upaya sebelum memilih pekerjaan SEO berikutnya."
            },
            "outcome": {
              "en": "Choose a first SEO priority and explain why it comes before other work.",
              "id": "Pilih prioritas SEO pertama dan jelaskan alasan mendahulukannya."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "measure-seo-beyond-rankings",
            "title": {
              "en": "SEO Performance",
              "id": "Kinerja SEO"
            },
            "summary": {
              "en": "Relate visibility and website activity to inquiry signals while recognising limits in attribution.",
              "id": "Hubungkan visibilitas dan aktivitas website dengan sinyal inquiry sambil memahami keterbatasan atribusi."
            },
            "outcome": {
              "en": "Select useful indicators for evaluating progress beyond rankings.",
              "id": "Pilih indikator yang berguna untuk menilai kemajuan di luar peringkat."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      }
    ]
  },
  {
    "id": "ai-search-aeo-geo-business",
    "slug": "ai-search-aeo-geo-business",
    "category": "seo",
    "title": {
      "en": "AI Search & Business Discovery",
      "id": "Pencarian AI & Penemuan Bisnis"
    },
    "description": {
      "en": "Understand changes in AI-assisted discovery, review your brand evidence, and set realistic expectations for visibility.",
      "id": "Pahami perubahan penemuan bisnis melalui AI, tinjau bukti kredibilitas brand, dan tetapkan ekspektasi visibilitas yang realistis."
    },
    "audience": {
      "en": "Business owners and Marketing",
      "id": "Pemilik bisnis dan Marketing"
    },
    "coverLabel": "AI SEARCH",
    "teachingThumbnail": "",
    "chapters": [
      {
        "id": "ai-search-context",
        "title": {
          "en": "AI Search Context",
          "id": "Konteks Pencarian AI"
        },
        "stage": "understand",
        "lessons": [
          {
            "id": "ai-search-what-changes",
            "title": {
              "en": "AI Search Shift",
              "id": "Perubahan Pencarian AI"
            },
            "summary": {
              "en": "Separate changes in search interfaces from the search fundamentals that still need attention.",
              "id": "Bedakan perubahan antarmuka pencarian dari fondasi search yang tetap perlu diperhatikan."
            },
            "outcome": {
              "en": "Explain what your business should monitor without treating every new term as a separate strategy.",
              "id": "Jelaskan perubahan yang perlu dipantau tanpa menjadikan setiap istilah baru sebagai strategi tersendiri."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "business-discovery",
        "title": {
          "en": "Business Discovery",
          "id": "Penemuan Bisnis"
        },
        "stage": "apply",
        "lessons": [
          {
            "id": "ai-discovery",
            "title": {
              "en": "AI Discovery",
              "id": "Penemuan Melalui AI"
            },
            "summary": {
              "en": "Explore how clear business information and useful answers support discovery in AI-assisted search.",
              "id": "Pelajari bagaimana informasi bisnis yang jelas dan jawaban yang berguna mendukung penemuan melalui pencarian AI."
            },
            "outcome": {
              "en": "Identify gaps that make your business or content difficult to understand and discover.",
              "id": "Kenali kekurangan yang membuat bisnis atau konten sulit dipahami dan ditemukan."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "evidence-citation-readiness",
            "title": {
              "en": "Brand Evidence",
              "id": "Bukti Kredibilitas Brand"
            },
            "summary": {
              "en": "Review expertise, sources, and consistent business facts as evidence behind your claims.",
              "id": "Tinjau keahlian, sumber, dan konsistensi fakta bisnis sebagai bukti yang mendukung klaim Anda."
            },
            "outcome": {
              "en": "Choose which claims need clearer, verifiable supporting evidence.",
              "id": "Tentukan klaim yang membutuhkan bukti pendukung lebih jelas dan dapat diperiksa."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "ai-visibility",
        "title": {
          "en": "AI Visibility",
          "id": "Visibilitas AI"
        },
        "stage": "decide",
        "lessons": [
          {
            "id": "measure-ai-search-practically",
            "title": {
              "en": "AI Search Signals",
              "id": "Sinyal Pencarian AI"
            },
            "summary": {
              "en": "Consider mentions, citations, referrals, and inquiry signals alongside the limits of each observation.",
              "id": "Pertimbangkan penyebutan brand, kutipan, referral, dan sinyal inquiry beserta keterbatasan setiap pengamatan."
            },
            "outcome": {
              "en": "Define a practical monitoring approach without assuming complete attribution.",
              "id": "Tentukan cara pemantauan yang praktis tanpa menganggap atribusi sudah lengkap."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      }
    ]
  },
  {
    "id": "website-business-sales-system",
    "slug": "website-business-sales-system",
    "category": "web-services",
    "title": {
      "en": "Web Conversion for Business Growth",
      "id": "Konversi Website untuk Pertumbuhan Bisnis"
    },
    "description": {
      "en": "Clarify the job of your website, reduce visitor friction, and choose improvements that support a useful next action.",
      "id": "Perjelas peran website, kurangi hambatan pengunjung, dan pilih perbaikan yang mendukung tindakan berikutnya."
    },
    "audience": {
      "en": "Business owners and Marketing",
      "id": "Pemilik bisnis dan Marketing"
    },
    "coverLabel": "CONVERSION",
    "teachingThumbnail": "",
    "chapters": [
      {
        "id": "website-purpose",
        "title": {
          "en": "Website Purpose",
          "id": "Tujuan Website"
        },
        "stage": "understand",
        "lessons": [
          {
            "id": "define-website-business-job",
            "title": {
              "en": "Website Role",
              "id": "Peran Website"
            },
            "summary": {
              "en": "Define the business job of your website before discussing features, layouts, or a redesign.",
              "id": "Tentukan tugas website bagi bisnis sebelum membahas fitur, tampilan, atau desain ulang."
            },
            "outcome": {
              "en": "State the main customer action your website should support.",
              "id": "Nyatakan tindakan utama pelanggan yang perlu didukung website."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "map-visitor-decision-journey",
            "title": {
              "en": "Visitor Journey",
              "id": "Perjalanan Pengunjung"
            },
            "summary": {
              "en": "Map the questions visitors need answered before they feel ready to contact your business.",
              "id": "Petakan pertanyaan yang perlu dijawab sebelum pengunjung siap menghubungi bisnis Anda."
            },
            "outcome": {
              "en": "Outline a decision path from first visit to a useful next step.",
              "id": "Susun alur keputusan dari kunjungan pertama hingga langkah berikutnya."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "conversion-system",
        "title": {
          "en": "Conversion System",
          "id": "Sistem Konversi"
        },
        "stage": "apply",
        "lessons": [
          {
            "id": "find-conversion-friction",
            "title": {
              "en": "Conversion Friction",
              "id": "Hambatan Konversi"
            },
            "summary": {
              "en": "Recognise confusing messages, dead ends, competing choices, and unnecessary effort in a visitor journey.",
              "id": "Kenali pesan membingungkan, jalan buntu, pilihan yang bersaing, dan upaya berlebihan dalam perjalanan pengunjung."
            },
            "outcome": {
              "en": "Identify a specific obstacle that makes taking action harder.",
              "id": "Temukan hambatan spesifik yang mempersulit pengunjung mengambil tindakan."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "trust-proof-clarity-expectations",
            "title": {
              "en": "Trust & Action",
              "id": "Kepercayaan & Tindakan"
            },
            "summary": {
              "en": "Connect evidence, expectations, reassurance, and a clear next step with visitor confidence.",
              "id": "Hubungkan bukti, ekspektasi, kepastian, dan langkah berikutnya yang jelas dengan keyakinan pengunjung."
            },
            "outcome": {
              "en": "Match the evidence on a page to the uncertainty visitors face.",
              "id": "Sesuaikan bukti di halaman dengan keraguan yang dihadapi pengunjung."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "conversion-decisions",
        "title": {
          "en": "Growth Decisions",
          "id": "Keputusan Pertumbuhan"
        },
        "stage": "decide",
        "lessons": [
          {
            "id": "rebuild-redesign-or-fix",
            "title": {
              "en": "Conversion Priorities",
              "id": "Prioritas Konversi"
            },
            "summary": {
              "en": "Bring journey, friction, and trust observations together before choosing a focused fix or a broader redesign.",
              "id": "Gabungkan temuan tentang perjalanan, hambatan, dan kepercayaan sebelum memilih perbaikan terarah atau desain ulang."
            },
            "outcome": {
              "en": "Prioritise one improvement using its customer impact and implementation effort.",
              "id": "Prioritaskan satu perbaikan berdasarkan dampaknya bagi pelanggan dan upaya penerapan."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      }
    ]
  },
  {
    "id": "website-technical-migration-readiness",
    "slug": "website-technical-migration-readiness",
    "category": "web-services",
    "title": {
      "en": "Web Architecture for Business Continuity",
      "id": "Arsitektur Website untuk Keberlanjutan Bisnis"
    },
    "description": {
      "en": "Review website foundations, technical risks, and change controls so the business can maintain and improve its digital asset.",
      "id": "Tinjau fondasi website, risiko teknis, dan kontrol perubahan agar bisnis dapat merawat serta mengembangkan aset digitalnya."
    },
    "audience": {
      "en": "IT Leads and Procurement; also business owners",
      "id": "IT Lead dan Procurement; juga pemilik bisnis"
    },
    "coverLabel": "ARCHITECTURE",
    "teachingThumbnail": "",
    "chapters": [
      {
        "id": "architecture-foundations",
        "title": {
          "en": "Architecture Foundations",
          "id": "Fondasi Arsitektur"
        },
        "stage": "understand",
        "lessons": [
          {
            "id": "web-architecture",
            "title": {
              "en": "Web Architecture",
              "id": "Arsitektur Website"
            },
            "summary": {
              "en": "Understand the relationship between content structure, platforms, integrations, ownership, and maintenance.",
              "id": "Pahami hubungan struktur konten, platform, integrasi, kepemilikan, dan pemeliharaan website."
            },
            "outcome": {
              "en": "Map the main parts of a website and who is responsible for them.",
              "id": "Petakan bagian utama website dan penanggung jawabnya."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "technical-quality",
            "title": {
              "en": "Technical Quality",
              "id": "Kualitas Teknis"
            },
            "summary": {
              "en": "Treat performance, accessibility, and reliability as requirements that can be discussed and checked.",
              "id": "Perlakukan performa, aksesibilitas, dan keandalan sebagai kebutuhan yang dapat dibahas serta diperiksa."
            },
            "outcome": {
              "en": "Define observable quality requirements for a website project.",
              "id": "Tentukan kebutuhan kualitas yang dapat diamati dalam proyek website."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "change-continuity",
        "title": {
          "en": "Change & Continuity",
          "id": "Perubahan & Keberlanjutan"
        },
        "stage": "apply",
        "lessons": [
          {
            "id": "technical-debt-cost",
            "title": {
              "en": "Technical Debt",
              "id": "Utang Teknis"
            },
            "summary": {
              "en": "Recognise when the existing foundation makes routine changes slower, riskier, or more expensive.",
              "id": "Kenali kondisi saat fondasi saat ini membuat perubahan rutin lebih lambat, berisiko, atau mahal."
            },
            "outcome": {
              "en": "Separate a surface-level issue from a recurring foundation problem.",
              "id": "Bedakan masalah tampilan dari masalah fondasi yang terus berulang."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "migration-url-search-equity",
            "title": {
              "en": "Migration Planning",
              "id": "Perencanaan Migrasi"
            },
            "summary": {
              "en": "Consider continuity risks when URLs, content, platforms, or infrastructure change.",
              "id": "Pertimbangkan risiko keberlanjutan ketika URL, konten, platform, atau infrastruktur berubah."
            },
            "outcome": {
              "en": "Identify the controls and owners needed before a migration.",
              "id": "Kenali kontrol dan penanggung jawab yang dibutuhkan sebelum migrasi."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "launch-control",
        "title": {
          "en": "Launch Control",
          "id": "Kontrol Peluncuran"
        },
        "stage": "decide",
        "lessons": [
          {
            "id": "launch-readiness-post-launch-qa",
            "title": {
              "en": "Launch Readiness",
              "id": "Kesiapan Peluncuran"
            },
            "summary": {
              "en": "Bring QA, redirects, measurement, monitoring, rollback, and ownership into a launch decision.",
              "id": "Gabungkan QA, redirect, pengukuran, pemantauan, rollback, dan kepemilikan dalam keputusan peluncuran."
            },
            "outcome": {
              "en": "Make a reasoned go/no-go decision with clear follow-up responsibilities.",
              "id": "Ambil keputusan lanjut atau tunda dengan alasan dan tanggung jawab tindak lanjut yang jelas."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      }
    ]
  },
  {
    "id": "digital-project-scope-evaluation",
    "slug": "digital-project-scope-evaluation",
    "category": "web-services",
    "title": {
      "en": "Controlling Digital Project Costs",
      "id": "Mengendalikan Biaya Proyek Digital"
    },
    "description": {
      "en": "Clarify outcomes and scope, compare proposals, and review delivery risks before committing a project budget.",
      "id": "Perjelas hasil dan lingkup kerja, bandingkan proposal, serta tinjau risiko sebelum menetapkan anggaran proyek."
    },
    "audience": {
      "en": "Procurement, business owners, and IT Leads",
      "id": "Procurement, pemilik bisnis, dan IT Lead"
    },
    "coverLabel": "PROJECT COST",
    "teachingThumbnail": "",
    "chapters": [
      {
        "id": "project-definition",
        "title": {
          "en": "Project Definition",
          "id": "Definisi Proyek"
        },
        "stage": "understand",
        "lessons": [
          {
            "id": "business-problem-before-deliverables",
            "title": {
              "en": "Project Goals",
              "id": "Tujuan Proyek"
            },
            "summary": {
              "en": "Start with the business problem and intended outcome before listing project deliverables.",
              "id": "Mulai dari masalah bisnis dan hasil yang dituju sebelum menyusun daftar hasil kerja proyek."
            },
            "outcome": {
              "en": "Write a project goal that connects the work to a business need.",
              "id": "Tulis tujuan proyek yang menghubungkan pekerjaan dengan kebutuhan bisnis."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "cost-scope",
        "title": {
          "en": "Cost & Scope",
          "id": "Biaya & Lingkup Kerja"
        },
        "stage": "apply",
        "lessons": [
          {
            "id": "cost-drivers",
            "title": {
              "en": "Cost Drivers",
              "id": "Faktor Biaya"
            },
            "summary": {
              "en": "Explore how content, integrations, approvals, quality checks, ownership, and uncertainty shape cost.",
              "id": "Pelajari bagaimana konten, integrasi, persetujuan, pemeriksaan kualitas, kepemilikan, dan ketidakpastian membentuk biaya."
            },
            "outcome": {
              "en": "Identify the assumptions most likely to change the budget.",
              "id": "Kenali asumsi yang paling mungkin mengubah anggaran."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "compare-digital-proposals",
            "title": {
              "en": "Proposal Comparison",
              "id": "Perbandingan Proposal"
            },
            "summary": {
              "en": "Compare scope completeness, assumptions, evidence, ownership, and risks alongside price.",
              "id": "Bandingkan kelengkapan lingkup kerja, asumsi, bukti, kepemilikan, dan risiko bersama harga."
            },
            "outcome": {
              "en": "Compare proposals on an equivalent basis and flag unanswered questions.",
              "id": "Bandingkan proposal dengan dasar setara dan tandai pertanyaan yang belum terjawab."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "project-control",
        "title": {
          "en": "Project Control",
          "id": "Kontrol Proyek"
        },
        "stage": "decide",
        "lessons": [
          {
            "id": "risk-sign-off",
            "title": {
              "en": "Risk & Sign-off",
              "id": "Risiko & Persetujuan"
            },
            "summary": {
              "en": "Review dependencies, acceptance criteria, maintenance, and vendor lock-in before approving the work.",
              "id": "Tinjau ketergantungan, kriteria penerimaan, pemeliharaan, dan ketergantungan pada vendor sebelum menyetujui pekerjaan."
            },
            "outcome": {
              "en": "Decide which conditions must be resolved before project approval.",
              "id": "Tentukan kondisi yang harus diselesaikan sebelum proyek disetujui."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      }
    ]
  },
  {
    "id": "building-brand-trust-social-media",
    "slug": "building-brand-trust-social-media",
    "category": "social-media-management",
    "title": {
      "en": "Building Brand Trust on Social Media",
      "id": "Membangun Kepercayaan Brand di Media Sosial"
    },
    "description": {
      "en": "Choose the role of social media, build credible content and relationships, and evaluate its value for your business.",
      "id": "Tentukan peran media sosial, bangun konten serta hubungan yang kredibel, dan nilai manfaatnya bagi bisnis."
    },
    "audience": {
      "en": "Marketing and business owners",
      "id": "Marketing dan pemilik bisnis"
    },
    "coverLabel": "SOCIAL",
    "teachingThumbnail": "",
    "chapters": [
      {
        "id": "social-purpose",
        "title": {
          "en": "Social Purpose",
          "id": "Tujuan Media Sosial"
        },
        "stage": "understand",
        "lessons": [
          {
            "id": "social-media-role",
            "title": {
              "en": "Social Media Role",
              "id": "Peran Media Sosial"
            },
            "summary": {
              "en": "Decide whether social media should support discovery, trust, community, customer support, or demand.",
              "id": "Tentukan apakah media sosial perlu mendukung penemuan brand, kepercayaan, komunitas, layanan pelanggan, atau permintaan."
            },
            "outcome": {
              "en": "Define the business role that should guide your social activity.",
              "id": "Tentukan peran bisnis yang menjadi arah aktivitas media sosial."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "audience-channels",
            "title": {
              "en": "Audience & Channels",
              "id": "Audiens & Kanal"
            },
            "summary": {
              "en": "Connect audience behaviour and expectations with the channels you choose to maintain.",
              "id": "Hubungkan perilaku dan ekspektasi audiens dengan kanal yang dipilih untuk dikelola."
            },
            "outcome": {
              "en": "Explain why a channel is relevant to your audience and business role.",
              "id": "Jelaskan alasan suatu kanal relevan dengan audiens dan perannya bagi bisnis."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "trust-building",
        "title": {
          "en": "Trust Building",
          "id": "Membangun Kepercayaan"
        },
        "stage": "apply",
        "lessons": [
          {
            "id": "content-credibility",
            "title": {
              "en": "Content & Credibility",
              "id": "Konten & Kredibilitas"
            },
            "summary": {
              "en": "Examine how expertise, transparency, and consistent messages can make your content more credible.",
              "id": "Tinjau bagaimana keahlian, transparansi, dan pesan yang konsisten dapat memperkuat kredibilitas konten."
            },
            "outcome": {
              "en": "Identify which content needs clearer evidence or a more consistent point of view.",
              "id": "Kenali konten yang membutuhkan bukti lebih jelas atau sudut pandang lebih konsisten."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "community-trust",
            "title": {
              "en": "Community Trust",
              "id": "Kepercayaan Komunitas"
            },
            "summary": {
              "en": "Review how responses, conversations, and complaint handling shape the experience of your brand.",
              "id": "Tinjau bagaimana respons, percakapan, dan penanganan keluhan membentuk pengalaman terhadap brand."
            },
            "outcome": {
              "en": "Choose a response practice that better supports customer trust.",
              "id": "Pilih praktik merespons yang lebih mendukung kepercayaan pelanggan."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "social-performance",
        "title": {
          "en": "Social Performance",
          "id": "Kinerja Media Sosial"
        },
        "stage": "decide",
        "lessons": [
          {
            "id": "social-value",
            "title": {
              "en": "Social Value",
              "id": "Nilai Media Sosial"
            },
            "summary": {
              "en": "Evaluate social activity against its intended role, then decide what to continue, change, or stop.",
              "id": "Nilai aktivitas media sosial sesuai peran yang dituju, lalu tentukan apa yang diteruskan, diubah, atau dihentikan."
            },
            "outcome": {
              "en": "Choose indicators that help judge value beyond posting volume.",
              "id": "Pilih indikator yang membantu menilai manfaat di luar jumlah unggahan."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      }
    ]
  },
  {
    "id": "building-brand-value-design",
    "slug": "building-brand-value-design",
    "category": "visual-strategy",
    "title": {
      "en": "Building Brand Value Through Design",
      "id": "Membangun Nilai Brand Melalui Desain"
    },
    "description": {
      "en": "Connect visual choices to brand recognition, credibility, and consistency across the places customers meet your business.",
      "id": "Hubungkan pilihan visual dengan pengenalan, kredibilitas, dan konsistensi brand di berbagai titik interaksi pelanggan."
    },
    "audience": {
      "en": "Business owners and Marketing",
      "id": "Pemilik bisnis dan Marketing"
    },
    "coverLabel": "DESIGN",
    "teachingThumbnail": "",
    "chapters": [
      {
        "id": "visual-strategy",
        "title": {
          "en": "Visual Strategy",
          "id": "Strategi Visual"
        },
        "stage": "understand",
        "lessons": [
          {
            "id": "visual-business-value",
            "title": {
              "en": "Visual Business Value",
              "id": "Nilai Visual bagi Bisnis"
            },
            "summary": {
              "en": "Explore how visual choices communicate perceived quality, distinction, recognition, and credibility.",
              "id": "Pelajari bagaimana pilihan visual menyampaikan persepsi kualitas, pembeda, pengenalan, dan kredibilitas."
            },
            "outcome": {
              "en": "Explain the business purpose behind a visual decision.",
              "id": "Jelaskan tujuan bisnis di balik sebuah keputusan visual."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "brand-direction",
        "title": {
          "en": "Brand Direction",
          "id": "Arah Brand"
        },
        "stage": "apply",
        "lessons": [
          {
            "id": "visual-direction",
            "title": {
              "en": "Visual Direction",
              "id": "Arah Visual"
            },
            "summary": {
              "en": "Translate your positioning into a coherent visual direction and criteria for choosing it.",
              "id": "Terjemahkan positioning bisnis menjadi arah visual yang selaras dan kriteria untuk memilihnya."
            },
            "outcome": {
              "en": "Define criteria for a visual direction that supports your positioning.",
              "id": "Tentukan kriteria arah visual yang mendukung positioning bisnis."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          },
          {
            "id": "brand-consistency",
            "title": {
              "en": "Brand Consistency",
              "id": "Konsistensi Brand"
            },
            "summary": {
              "en": "Review how repeatable visual rules work across websites, social media, presentations, and other touchpoints.",
              "id": "Tinjau penerapan aturan visual yang berulang pada website, media sosial, presentasi, dan titik interaksi lainnya."
            },
            "outcome": {
              "en": "Identify where inconsistent visual choices weaken brand recognition.",
              "id": "Kenali pilihan visual yang tidak konsisten dan melemahkan pengenalan brand."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      },
      {
        "id": "design-decisions",
        "title": {
          "en": "Design Decisions",
          "id": "Keputusan Desain"
        },
        "stage": "decide",
        "lessons": [
          {
            "id": "visual-quality",
            "title": {
              "en": "Visual Quality",
              "id": "Kualitas Visual"
            },
            "summary": {
              "en": "Evaluate whether design supports positioning, clarity, and trust using criteria beyond personal preference.",
              "id": "Nilai dukungan desain terhadap positioning, kejelasan, dan kepercayaan dengan kriteria di luar selera pribadi."
            },
            "outcome": {
              "en": "Give design feedback that is tied to a clear business objective.",
              "id": "Berikan masukan desain yang terhubung dengan tujuan bisnis yang jelas."
            },
            "duration": "",
            "videoId": "",
            "poster": "",
            "teachingThumbnail": ""
          }
        ]
      }
    ]
  }
];

export const learningSeries: LearningSeries[] = curriculum.map((course, index) => ({
  ...course, order: index + 1,
  lessonIds: course.chapters.flatMap(chapter => chapter.lessons.map(lesson => lesson.id)),
}));
export const learningLessons: LearningLesson[] = learningSeries.flatMap(course => {
  let order = 0;
  return course.chapters.flatMap(chapter => chapter.lessons.map(lesson => ({
    ...lesson, category: course.category, seriesId: course.id, chapterId: chapter.id,
    order: ++order, featured: order === 1,
  })));
});
export const getLearningSeries = () => learningSeries.slice();
export const getLearningSeriesBySlug = (slug: string) => learningSeries.find(course => course.slug === slug);
export const getLearningLessons = (category?: LearningCategory) => learningLessons.filter(lesson => !category || lesson.category === category);
export const getLearningLessonsForSeries = (seriesId: LearningSeriesId) => learningLessons.filter(lesson => lesson.seriesId === seriesId);
