export interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  problemsSolved: string[];
  problemCauses: string[];
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
      tagline: 'Bantu pelanggan yang tepat menemukan dan memahami apa yang bisnis Anda tawarkan.',
      description: 'Kami memperkuat fondasi teknis, halaman prioritas, konten, entity, dan authority signals agar bisnis Anda dapat ditemukan melalui search tradisional maupun pengalaman pencarian berbasis AI.',
      problemCauses: [
        'Halaman prioritas belum dipetakan ke istilah, pertanyaan, dan intent yang digunakan pelanggan.',
        'Crawlability, indexing, kecepatan, internal linking, atau struktur halaman menghambat discovery.',
        'Jawaban penting, entity, schema, dan evidence belum tersusun agar mudah dipahami atau dirujuk oleh search dan answer engines.'
      ],
      problemsSolved: [
        'Halaman prioritas Anda belum muncul untuk pencarian yang terhubung dengan produk atau layanan Anda.',
        'Masalah teknis membuat halaman lebih sulit dirayapi, diindeks, dipahami, atau digunakan.',
        'Expertise bisnis belum terlihat jelas dalam hasil search, AI answers, atau sumber yang memengaruhi keputusan pelanggan.'
      ],
      whoItIsFor: [
        'Bisnis yang mengandalkan pelanggan untuk menemukan produk atau layanan melalui search.',
        'Tim marketing yang membutuhkan prioritas SEO yang jelas dan dukungan implementasi.',
        'Brand yang ingin menyiapkan expertise untuk Google AI Overviews dan pengalaman generative search.',
        'Website baru, existing, atau yang sedang migrasi dan membutuhkan fondasi search lebih kuat.'
      ],
      scope: [
        'SEO strategy, audit, keyword research, search intent, dan page mapping.',
        'Technical SEO untuk crawlability, indexation, performance, schema, dan internal linking.',
        'On-page SEO, content strategy, content structure, dan optimasi halaman prioritas.',
        'AEO & GEO untuk answer-ready content, entity signals, retrievability, dan citation readiness.',
        'Authority signals, AI search visibility monitoring, analytics, dan prioritas optimasi.'
      ],
      deliverables: [
        'Audit dan roadmap SEO yang diprioritaskan berdasarkan kebutuhan bisnis.',
        'Keyword, question, prompt, dan page mapping berdasarkan search intent.',
        'Rekomendasi on-page, technical SEO, schema, entity, dan answer-ready content.',
        'Dukungan implementasi sesuai cakupan yang disepakati.',
        'Reporting untuk visibility, AI search presence, inquiry, dan sinyal bisnis yang relevan.'
      ],
      process: [
        'Selaraskan bersama: Kami mempelajari penawaran, pelanggan, pertanyaan, search intent, dan baseline visibility bisnis Anda.',
        'Pilih bersama: Kami menentukan peluang SEO, AEO & GEO, content, dan masalah teknis yang paling layak ditangani lebih dahulu.',
        'Perbaiki bersama: Kami memperkuat fondasi teknis, halaman prioritas, struktur jawaban, entity, internal linking, dan authority signals sesuai scope.',
        'Tinjau bersama: Kami membahas hasil search dan AI visibility, mengukur perubahan yang relevan, lalu menentukan prioritas berikutnya.'
      ]
    },
    {
      id: 'web-services',
      title: 'Web Services',
      slug: 'web-services',
      tagline: 'Berikan dukungan website yang dibutuhkan pekerjaan search dan bisnis Anda.',
      description: 'Kami merancang, membangun, merawat, dan memperbaiki website ketika performa, usability, atau implementasi teknis membatasi pertumbuhan.',
      problemCauses: [
        'Technical debt, template lambat, atau arsitektur yang tidak jelas melemahkan akses dan usability.',
        'Pekerjaan SEO berada di luar backlog development tanpa ownership implementasi yang jelas.',
        'Redirect, template, performa, dan tracking belum divalidasi saat perubahan dilakukan.'
      ],
      problemsSolved: [
        'Masalah website membuat halaman penting lebih sulit dirayapi, diindeks, atau digunakan.',
        'Rekomendasi SEO dan kebutuhan bisnis menunggu dukungan development.',
        'Migrasi, redesign, atau maintenance rutin menempatkan performa search dalam risiko.'
      ],
      whoItIsFor: [
        'Bisnis yang membutuhkan website baru dengan fondasi search yang jelas.',
        'Tim yang membutuhkan dukungan UX, design, development, atau technical SEO.',
        'Website yang sedang migrasi, redesign, atau membutuhkan maintenance berkelanjutan.'
      ],
      scope: [
        'UX dan website strategy, information architecture, serta user flow.',
        'Web design, development, dan implementasi landing page.',
        'Perbaikan teknis, performance, schema, dan accessibility.',
        'Dukungan migrasi SEO, redirects, analytics, dan quality assurance.',
        'Website maintenance dan optimasi berkelanjutan.'
      ],
      deliverables: [
        'Website atau update implementasi yang siap produksi.',
        'Arsitektur, interface, dan komponen sesuai scope yang disepakati.',
        'Perbaikan teknis, performance, accessibility, dan catatan QA.',
        'Rencana migrasi, redirect, atau analytics bila diperlukan.',
        'Dokumentasi maintenance dan pengelolaan website.'
      ],
      process: [
        'Selaraskan bersama: Kami memahami kebutuhan bisnis, user journey, dan dependensi search Anda sebelum menentukan solusi.',
        'Definisikan bersama: Kami menyepakati arsitektur, scope, interface direction, dan acceptance criteria dengan tim Anda.',
        'Bangun bersama: Kami mengimplementasikan pengalaman dan perbaikan teknis sambil menjaga komunikasi tetap terbuka.',
        'Uji bersama: Kami memvalidasi performance, accessibility, tracking, dan search readiness sebelum pekerjaan ditutup.'
      ]
    }
  ],
  en: [
    {
      id: 'seo',
      title: 'SEO',
      slug: 'seo',
      tagline: 'Help the right customers find and understand what your business offers.',
      description: 'We strengthen technical foundations, priority pages, content, entities, and authority signals so your business can be discovered across traditional search and AI-powered search experiences.',
      problemCauses: [
        'Priority pages are not mapped to the terms, questions, and intent customers use.',
        'Crawlability, indexing, speed, internal linking, or page structure is blocking discovery.',
        'Key answers, entities, schema, and evidence are not structured for search and answer engines to understand or reference.'
      ],
      problemsSolved: [
        'Your priority pages are not appearing for searches connected to your products or services.',
        'Technical issues are making pages harder to crawl, index, understand, or use.',
        'Your expertise is not clearly represented across search results, AI answers, or the sources that shape customer decisions.'
      ],
      whoItIsFor: [
        'Businesses that depend on customers finding their products or services through search.',
        'Marketing teams that need clear SEO priorities and implementation support.',
        'Brands preparing their expertise for Google AI Overviews and generative search experiences.',
        'New, established, or migrating websites that need stronger search foundations.'
      ],
      scope: [
        'SEO strategy, audits, keyword research, search intent, and page mapping.',
        'Technical SEO for crawlability, indexation, performance, schema, and internal linking.',
        'On-page SEO, content strategy, content structure, and priority-page optimization.',
        'AEO & GEO for answer-ready content, entity signals, retrievability, and citation readiness.',
        'Authority signals, AI search visibility monitoring, analytics, and optimization priorities.'
      ],
      deliverables: [
        'A prioritized SEO audit and roadmap tied to business needs.',
        'Keyword, question, prompt, and page mapping based on search intent.',
        'On-page, technical SEO, schema, entity, and answer-ready content recommendations.',
        'Implementation support within the agreed scope.',
        'Reporting for visibility, AI search presence, inquiries, and relevant business signals.'
      ],
      process: [
        'Align together: We learn your offer, customers, questions, search intent, and current visibility baseline.',
        'Choose together: We prioritize the SEO, AEO & GEO, content, and technical opportunities that deserve attention first.',
        'Improve together: We strengthen technical foundations, priority pages, answer structure, entities, internal links, and authority signals within scope.',
        'Review together: We review search and AI visibility, measure the changes that matter, and agree on the next priorities.'
      ]
    },
    {
      id: 'web-services',
      title: 'Web Services',
      slug: 'web-services',
      tagline: 'Give your search work and business the website support they need.',
      description: 'We design, build, maintain, and improve websites where performance, usability, or technical implementation limits growth.',
      problemCauses: [
        'Technical debt, slow templates, or unclear architecture weakens access and usability.',
        'SEO work sits outside the development backlog without clear implementation ownership.',
        'Redirects, templates, performance, and tracking are not validated around changes.'
      ],
      problemsSolved: [
        'Website problems make important pages harder to crawl, index, or use.',
        'SEO recommendations and business needs are waiting for development support.',
        'Migration, redesign, or routine maintenance is putting search performance at risk.'
      ],
      whoItIsFor: [
        'Businesses that need a new website with a clear search foundation.',
        'Teams that need UX, design, development, or technical SEO support.',
        'Websites preparing for migration, redesign, or ongoing maintenance.'
      ],
      scope: [
        'UX and website strategy, information architecture, and user flows.',
        'Web design, development, and landing-page implementation.',
        'Technical improvements, performance, schema, and accessibility.',
        'SEO migration support, redirects, analytics, and quality assurance.',
        'Website maintenance and ongoing optimization.'
      ],
      deliverables: [
        'A production-ready website or implementation update.',
        'Architecture, interfaces, and components within the agreed scope.',
        'Technical, performance, and accessibility improvements with a QA record.',
        'A migration, redirect, or analytics plan where required.',
        'Website maintenance and management documentation.'
      ],
      process: [
        'Align together: We learn your business need, user journey, and search dependencies before defining the solution.',
        'Define together: We agree on architecture, scope, interface direction, and acceptance criteria with your team.',
        'Build together: We implement the experience and technical improvements while keeping communication open.',
        'Test together: We validate performance, accessibility, tracking, and search readiness before closing the work.'
      ]
    }
  ]
};
