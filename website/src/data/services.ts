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
        'Selaraskan bersama: Kami mempelajari apa yang bisnis Anda tawarkan, siapa yang perlu Anda jangkau, dan apa yang baseline search saat ini tunjukkan kepada kita.',
        'Pilih bersama: Kami menyepakati bersama Anda peluang dan masalah teknis yang paling layak ditangani lebih dahulu.',
        'Perbaiki bersama: Kami memperbaiki fondasi teknis, halaman prioritas, internal linking, dan authority signals sesuai cakupan yang kita sepakati.',
        'Tinjau bersama: Kami membahas hasilnya bersama Anda, mengukur perubahan yang relevan, dan menentukan prioritas berikutnya.'
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
        'Selaraskan bersama: Kami memetakan pertanyaan pelanggan, entity, dan sumber yang memengaruhi keputusan mereka bersama tim Anda.',
        'Strukturkan bersama: Kami menyusun konten, halaman, dan schema agar expertise Anda lebih mudah dipahami dan diambil.',
        'Perkuat bersama: Kami membantu Anda menambahkan evidence dan menjaga consistency pada informasi yang paling penting.',
        'Tinjau bersama: Kami meninjau visibility bersama Anda dan memperbarui prioritas berdasarkan data yang tersedia.'
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
        'Selaraskan bersama: Kami memahami kebutuhan bisnis, user journey, dan dependensi search Anda sebelum menentukan solusi.',
        'Definisikan bersama: Kami menyepakati arsitektur, cakupan, dan acceptance criteria dengan tim Anda.',
        'Bangun bersama: Kami mengimplementasikan pengalaman dan perbaikan teknis sambil menjaga komunikasi tetap terbuka.',
        'Uji bersama: Kami memvalidasi performa, accessibility, tracking, dan search readiness bersama Anda sebelum pekerjaan ditutup.'
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
        'Selaraskan bersama: Kami memetakan pelanggan, pertanyaan, search demand, dan konten yang sudah dimiliki tim Anda.',
        'Rencanakan bersama: Kami memilih topik dan format yang paling berguna bagi pelanggan serta halaman layanan Anda.',
        'Buat bersama: Kami memproduksi, mengedit, mengoptimalkan, dan menerbitkan konten dengan checkpoint yang jelas untuk Anda.',
        'Tinjau bersama: Kami mengevaluasi performanya bersama Anda dan memperbarui konten ketika kebutuhan bisnis berubah.'
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
        'Align together: We learn what your business offers, who you need to reach, and what your current search baseline tells us.',
        'Choose together: We agree with you on the opportunities and technical issues that deserve attention first.',
        'Improve together: We strengthen technical foundations, priority pages, internal links, and authority signals within the scope we agree on.',
        'Review together: We walk through the result with you, measure the changes that matter, and agree on the next priorities.'
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
        'Align together: We map customer questions, entities, and the sources that shape their decisions with your team.',
        'Structure together: We organize content, pages, and schema so your expertise is easier to understand and retrieve.',
        'Strengthen together: We help you add evidence and improve consistency around the information that matters most.',
        'Review together: We review relevant visibility with you and update priorities from the data available.'
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
        'Align together: We learn your business need, user journey, and search dependencies before we define the solution.',
        'Define together: We agree on the architecture, scope, and acceptance criteria with your team.',
        'Build together: We implement the experience and technical improvements while keeping communication open with you.',
        'Test together: We validate performance, accessibility, tracking, and search readiness with you before we close the work.'
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
        'Align together: We map your customers, their questions, search demand, and the content your team already has.',
        'Plan together: We choose the topics and formats that will be most useful for customers and your service pages.',
        'Create together: We produce, edit, optimize, and publish content with clear checkpoints for you.',
        'Review together: We evaluate performance with you and refresh content as your business needs change.'
      ]
    }
  ]
};
