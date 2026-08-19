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
      id: 'seo',
      title: 'SEO',
      slug: 'seo',
      tagline: 'Bantu pelanggan yang tepat menemukan apa yang bisnis Anda tawarkan.',
      description: 'Kami memperbaiki fondasi teknis, halaman prioritas, dan sinyal authority yang terhubung dengan cara pelanggan Anda mencari.',
      problemsSolved: [
        'Halaman prioritas Anda belum muncul untuk pencarian yang terhubung dengan produk atau layanan Anda.',
        'Masalah teknis membuat halaman lebih sulit dirayapi, diindeks, atau digunakan.',
        'Traffic organik belum memiliki hubungan yang jelas dengan inquiry atau prioritas bisnis.'
      ],
      whoItIsFor: [
        'Bisnis yang mengandalkan pelanggan untuk menemukan produk atau layanan melalui search.',
        'Tim marketing yang membutuhkan prioritas SEO yang jelas dan dukungan implementasi.',
        'Website baru, website existing, atau website yang sedang migrasi dan membutuhkan fondasi search lebih kuat.'
      ],
      scope: [
        'SEO audit, technical SEO, dan evaluasi performa search.',
        'Keyword research yang terhubung dengan search intent dan prioritas bisnis.',
        'Perbaikan on-page, internal linking, dan optimasi halaman prioritas.',
        'Authority signals, measurement, dan rencana perbaikan yang diprioritaskan.'
      ],
      deliverables: [
        'Audit yang diprioritaskan dengan rekomendasi yang jelas.',
        'Keyword dan page mapping berdasarkan search intent.',
        'Rekomendasi dan dukungan implementasi sesuai cakupan yang disepakati.',
        'Reporting yang berfokus pada visibility, inquiry, dan sinyal bisnis yang relevan.'
      ],
      process: [
        'Pahami: Tinjau apa yang ditawarkan bisnis Anda, pelanggan yang ingin dijangkau, dan baseline search saat ini.',
        'Prioritaskan: Pilih peluang dan masalah teknis yang perlu ditangani lebih dahulu.',
        'Implementasikan: Perbaiki fondasi teknis, halaman prioritas, internal linking, dan authority signals sesuai cakupan.',
        'Tinjau: Ukur performa search yang relevan dan sepakati prioritas berikutnya.'
      ]
    },
    {
      id: 'aeo-geo',
      title: 'AEO & GEO',
      slug: 'aeo-geo',
      tagline: 'Siapkan expertise Anda untuk cara orang mencari dengan AI.',
      description: 'Kami menyusun konten, entity, dan sinyal teknis agar answer engines dapat memahami dan mengambil informasi berguna dari website Anda.',
      problemsSolved: [
        'Informasi penting di website Anda sulit dikenali dan diambil oleh answer engines.',
        'Entity, schema, dan hubungan antar topik belum cukup jelas.',
        'Tim Anda belum memiliki gambaran yang jelas tentang kemunculan brand di berbagai pengalaman AI search.'
      ],
      whoItIsFor: [
        'Brand yang sedang menyiapkan visibility di Google AI Overviews dan platform generative search.',
        'Bisnis dengan expertise kuat yang membutuhkan struktur jawaban dan entity signals lebih jelas.',
        'Tim SEO dan content yang memperluas pekerjaan search saat ini ke AI discovery.'
      ],
      scope: [
        'Riset pertanyaan dan prompt yang terhubung dengan pelanggan Anda.',
        'Evaluasi content structure, schema, entity, dan retrievability.',
        'Evaluasi kualitas sumber dan citation readiness.',
        'Monitoring visibility pada pengalaman search dan AI answer yang relevan.'
      ],
      deliverables: [
        'AEO & GEO opportunity map yang diprioritaskan.',
        'Rekomendasi untuk answer-ready content dan entity signals yang lebih jelas.',
        'Technical brief untuk schema dan implementasi pendukung.',
        'Baseline untuk monitoring visibility di AI search.'
      ],
      process: [
        'Pahami: Petakan pertanyaan pelanggan, entity, dan sumber yang berkaitan dengan keputusan mereka.',
        'Strukturkan: Susun konten, halaman, dan schema agar informasi mudah dipahami dan diambil.',
        'Perkuat: Tambahkan evidence dan perbaiki consistency pada informasi penting.',
        'Tinjau: Pantau visibility yang relevan dan perbarui prioritas berdasarkan data yang tersedia.'
      ]
    },
    {
      id: 'web-services',
      title: 'Web Services',
      slug: 'web-services',
      tagline: 'Berikan dukungan website yang dibutuhkan pekerjaan search Anda.',
      description: 'Kami membangun, merawat, dan memperbaiki website ketika performa, usability, atau implementasi teknis membatasi prioritas search Anda.',
      problemsSolved: [
        'Masalah website membuat halaman penting lebih sulit dirayapi, diindeks, atau digunakan.',
        'Rekomendasi SEO menunggu dukungan development.',
        'Migrasi, redesign, atau maintenance rutin menempatkan performa search dalam risiko.'
      ],
      whoItIsFor: [
        'Bisnis yang membutuhkan website baru dengan fondasi search yang jelas.',
        'Tim yang membutuhkan dukungan implementasi untuk technical SEO.',
        'Website yang sedang migrasi, redesign, atau membutuhkan maintenance berkelanjutan.'
      ],
      scope: [
        'Website development dan implementasi landing page.',
        'Perbaikan teknis, performa, schema, dan accessibility.',
        'Dukungan migrasi SEO, redirects, dan quality assurance.',
        'Website maintenance dan implementasi analytics.'
      ],
      deliverables: [
        'Website atau update implementasi yang siap produksi.',
        'Perbaikan teknis dan catatan QA.',
        'Rencana migrasi atau redirect bila diperlukan.',
        'Dokumentasi maintenance dan pengelolaan konten.'
      ],
      process: [
        'Pahami: Tinjau kebutuhan bisnis, user journey, dan dependensi search Anda.',
        'Definisikan: Tentukan arsitektur, cakupan, dan acceptance criteria.',
        'Bangun: Implementasikan pengalaman dan perbaikan teknis yang disepakati.',
        'Uji: Validasi performa, accessibility, tracking, dan search readiness.'
      ]
    },
    {
      id: 'content-management',
      title: 'Content Management',
      slug: 'content-management',
      tagline: 'Jaga konten yang berguna tetap akurat, relevan, dan aktual.',
      description: 'Kami merencanakan, membuat, menerbitkan, dan memperbarui konten berdasarkan pertanyaan pelanggan dan prioritas bisnis Anda.',
      problemsSolved: [
        'Konten diterbitkan tanpa hubungan yang jelas dengan search demand atau pertanyaan pelanggan.',
        'Halaman lama tidak lagi mencerminkan informasi atau prioritas search saat ini.',
        'Proses content belum konsisten atau kapasitas publishing masih terbatas.'
      ],
      whoItIsFor: [
        'Tim marketing yang membutuhkan dukungan strategi dan eksekusi konten.',
        'Brand dengan library konten yang perlu dievaluasi dan diperbarui.',
        'Bisnis yang ingin mengembangkan topical authority melalui konten yang terawat.'
      ],
      scope: [
        'Content audit, topic planning, dan editorial roadmap.',
        'Content briefs, writing, editing, dan on-page optimization.',
        'CMS publishing dan content quality assurance.',
        'Content refresh, consolidation, dan performance review.'
      ],
      deliverables: [
        'Content roadmap yang terhubung dengan pertanyaan pelanggan dan prioritas bisnis.',
        'Brief dan content asset sesuai cakupan yang disepakati.',
        'Catatan optimasi dan publishing.',
        'Backlog pembaruan dan evaluasi performa.'
      ],
      process: [
        'Pahami: Petakan pelanggan, pertanyaan, search demand, dan konten yang sudah tersedia.',
        'Rencanakan: Prioritaskan topik dan format yang mendukung kebutuhan pelanggan dan halaman layanan.',
        'Buat & terbitkan: Produksi, edit, optimalkan, dan periksa kualitas konten.',
        'Tinjau & perbarui: Evaluasi performa dan perbarui konten sesuai kebutuhan.'
      ]
    }
  ],
  en: [
    {
      id: 'seo',
      title: 'SEO',
      slug: 'seo',
      tagline: 'Help the right customers find what your business offers.',
      description: 'We improve technical foundations, priority pages, and authority signals connected to how your customers search.',
      problemsSolved: [
        'Your priority pages are not appearing for searches connected to your products or services.',
        'Technical issues are making pages harder to crawl, index, or use.',
        'Organic traffic is growing without a clear connection to inquiries or business priorities.'
      ],
      whoItIsFor: [
        'Businesses that depend on customers finding their products or services through search.',
        'Marketing teams that need clear SEO priorities and implementation support.',
        'New, established, or migrating websites that need stronger search foundations.'
      ],
      scope: [
        'SEO audits, technical SEO, and search performance reviews.',
        'Keyword research connected to customer intent and business priorities.',
        'On-page improvements, internal linking, and priority-page optimization.',
        'Authority signals, measurement, and a prioritized improvement plan.'
      ],
      deliverables: [
        'A prioritized audit with clear recommendations.',
        'Keyword and page mapping based on search intent.',
        'Agreed recommendations and implementation support.',
        'Reporting focused on visibility, inquiries, and relevant business signals.'
      ],
      process: [
        'Understand: Review what your business offers, who you want to reach, and the current search baseline.',
        'Prioritize: Select the opportunities and technical issues that need attention first.',
        'Implement: Improve technical foundations, priority pages, internal links, and authority signals within scope.',
        'Review: Measure relevant search performance and agree on the next priorities.'
      ]
    },
    {
      id: 'aeo-geo',
      title: 'AEO & GEO',
      slug: 'aeo-geo',
      tagline: 'Prepare your expertise for the way people search with AI.',
      description: 'We organize content, entities, and technical signals so answer engines can understand and retrieve useful information from your website.',
      problemsSolved: [
        'Useful information on your website is difficult for answer engines to identify and retrieve.',
        'Entities, schema, and relationships between topics are unclear.',
        'Your team lacks a clear view of how the brand appears across AI search experiences.'
      ],
      whoItIsFor: [
        'Brands preparing for visibility across Google AI Overviews and generative search platforms.',
        'Businesses with strong expertise that needs clearer answer structure and entity signals.',
        'SEO and content teams extending existing search work into AI discovery.'
      ],
      scope: [
        'Research into the questions and prompts connected to your customers.',
        'Reviews of content structure, schema, entities, and retrievability.',
        'Source quality and citation-readiness reviews.',
        'Visibility monitoring across relevant search and AI answer experiences.'
      ],
      deliverables: [
        'A prioritized AEO & GEO opportunity map.',
        'Recommendations for answer-ready content and clearer entity signals.',
        'A technical brief for schema and supporting implementation.',
        'A baseline for monitoring AI search visibility.'
      ],
      process: [
        'Understand: Map customer questions, entities, and sources connected to their decisions.',
        'Structure: Organize content, pages, and schema so information is easier to understand and retrieve.',
        'Strengthen: Add evidence and improve consistency around important information.',
        'Review: Monitor relevant visibility and update priorities from the available data.'
      ]
    },
    {
      id: 'web-services',
      title: 'Web Services',
      slug: 'web-services',
      tagline: 'Give your search work the website support it needs.',
      description: 'We build, maintain, and improve websites where performance, usability, or technical implementation limits your search priorities.',
      problemsSolved: [
        'Website problems make important pages harder to crawl, index, or use.',
        'SEO recommendations are waiting for development support.',
        'Migration, redesign, or routine maintenance is putting search performance at risk.'
      ],
      whoItIsFor: [
        'Businesses that need a new website with a clear search foundation.',
        'Teams that need implementation support for technical SEO.',
        'Websites preparing for migration, redesign, or ongoing maintenance.'
      ],
      scope: [
        'Website development and landing-page implementation.',
        'Technical fixes, performance, schema, and accessibility improvements.',
        'SEO migration support, redirects, and quality assurance.',
        'Website maintenance and analytics implementation.'
      ],
      deliverables: [
        'A production-ready website or implementation update.',
        'Technical improvements and a QA record.',
        'A migration or redirect plan where required.',
        'Maintenance and content-management documentation.'
      ],
      process: [
        'Understand: Review your business need, user journey, and search dependencies.',
        'Define: Set the architecture, scope, and acceptance criteria.',
        'Build: Implement the agreed experience and technical improvements.',
        'Test: Validate performance, accessibility, tracking, and search readiness.'
      ]
    },
    {
      id: 'content-management',
      title: 'Content Management',
      slug: 'content-management',
      tagline: 'Keep useful content accurate, relevant, and current.',
      description: 'We plan, create, publish, and refresh content around your customer questions and business priorities.',
      problemsSolved: [
        'Content is published without a clear link to search demand or customer questions.',
        'Older pages no longer reflect current information or search priorities.',
        'The content process is inconsistent or publishing capacity is limited.'
      ],
      whoItIsFor: [
        'Marketing teams that need content strategy and execution support.',
        'Brands with a content library that needs review and improvement.',
        'Businesses that want to develop topical authority through well-maintained content.'
      ],
      scope: [
        'Content audits, topic planning, and editorial roadmaps.',
        'Content briefs, writing, editing, and on-page optimization.',
        'CMS publishing and content quality assurance.',
        'Content refreshes, consolidation, and performance reviews.'
      ],
      deliverables: [
        'A content roadmap connected to customer questions and business priorities.',
        'Briefs and content assets within the agreed scope.',
        'Optimization and publishing records.',
        'A refresh backlog and performance review.'
      ],
      process: [
        'Understand: Map your customers, their questions, search demand, and existing content.',
        'Plan: Prioritize topics and formats that support customer needs and service pages.',
        'Create & publish: Produce, edit, optimize, and quality-check the content.',
        'Review & refresh: Evaluate performance and update content as needed.'
      ]
    }
  ]
};
