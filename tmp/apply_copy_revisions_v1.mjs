import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('website');
const edits = [];

async function patchFile(relativePath, replacements) {
  const absolutePath = path.join(root, relativePath);
  let text = await fs.readFile(absolutePath, 'utf8');
  for (const [from, to, expected = 1] of replacements) {
    const count = text.split(from).length - 1;
    if (count !== expected) {
      throw new Error(`${relativePath}: expected ${expected} occurrence(s), found ${count}: ${from}`);
    }
    text = text.split(from).join(to);
  }
  edits.push([absolutePath, text]);
}

await patchFile('src/components/home/ServicesGrid.astro', [
  ['Selaraskan technical foundation, intent, halaman, dan authority dengan peluang bisnis.', 'Kami membantu halaman prioritas Anda ditemukan untuk pencarian yang terhubung dengan produk, layanan, dan pelanggan Anda.'],
  ['Buat expertise Anda lebih mudah dipahami, diambil, dan dikutip oleh answer engines.', 'Kami menyiapkan konten dan sinyal teknis Anda agar mudah dipahami dan diambil oleh AI search.'],
  ['Bangun dan rawat website yang cepat, mudah dirayapi, dan siap mendukung conversion.', 'Kami membangun dan merawat website yang mendukung performa search, usability, dan pengelolaan konten sehari-hari.'],
  ['Rencanakan, terbitkan, optimalkan, dan perbarui konten berdasarkan kebutuhan customer.', 'Kami merencanakan, membuat, menerbitkan, dan memperbarui konten berdasarkan pertanyaan pelanggan Anda.'],
  ['Align technical foundations, intent, pages, and authority with business opportunities.', 'We help your priority pages appear for searches connected to your products, services, and customers.'],
  ['Make your expertise easier for answer engines to understand, retrieve, and cite.', 'We prepare your content and technical signals for the way AI search understands and retrieves information.'],
  ['Build and maintain a fast, crawlable website ready to support conversion.', 'We build and maintain websites that support search performance, usability, and day-to-day content work.'],
  ['Plan, publish, optimize, and refresh content around what customers need.', 'We plan, create, publish, and refresh content around the questions your customers are asking.'],
  ['Empat layanan. Satu strategi search yang terhubung.', 'Dukungan yang disesuaikan dengan kebutuhan bisnis Anda.'],
  ['Four services. One connected search strategy.', 'Support shaped around what your business needs.'],
  ['Mulai dari layanan yang dibutuhkan bisnis Anda sekarang. Semuanya mendukung tujuan yang sama: visibility yang lebih kuat di search dan AI.', 'Sesuai prioritas Anda, kami dapat membantu melalui SEO, AEO & GEO, Web Services, Content Management, atau kombinasi yang memang dibutuhkan.'],
  ['Start with the service your business needs now. Each one supports the same goal: stronger visibility across search and AI.', 'Depending on your priorities, we can support you with SEO, AEO & GEO, Web Services, Content Management, or a combination of them.']
]);

await patchFile('src/components/home/ConnectedSystem.astro', [
  ["kicker: 'Satu strategi terhubung'", "kicker: 'Pilihan layanan'"],
  ["title: 'Empat layanan, menuju hasil yang sama.'", "title: 'Mulai dari pekerjaan yang dibutuhkan bisnis Anda.'"],
  ["description: 'SEO menentukan peluang. AEO & GEO memperluas discovery. Web Services memperkuat fondasi. Content Management menjaga relevance.'", "description: 'Setiap layanan memiliki peran yang jelas. Kami menentukan titik awal berdasarkan posisi saat ini, prioritas, dan kapasitas tim Anda.'"],
  ["aria: 'Empat layanan Kultivate dalam satu strategi search'", "aria: 'Empat layanan Kultivate untuk prioritas yang berbeda'"],
  ["signal: 'Arah bersama'", "signal: 'Prioritas Anda'"],
  ["loop: 'Performance data menjaga keempat layanan tetap selaras dengan prioritas bisnis.'", "loop: 'Prioritas Anda menentukan titik awal, layanan yang perlu digabungkan, dan pekerjaan yang tidak perlu dilakukan.'"],
  ["['01', 'Targetkan', 'SEO', 'Hubungkan demand, intent, technical foundation, dan tujuan bisnis.']", "['01', 'Perkuat visibility', 'SEO', 'Bangun fondasi search berdasarkan layanan, halaman, dan demand pelanggan Anda.']"],
  ["['02', 'Perluas', 'AEO & GEO', 'Strukturkan jawaban, entity, schema, dan citation readiness.']", "['02', 'Siapkan AI search', 'AEO & GEO', 'Susun konten, entity, dan schema agar answer engines dapat memahami expertise Anda.']"],
  ["['03', 'Perkuat', 'Web Services', 'Tingkatkan crawlability, speed, UX, dan implementation quality.']", "['03', 'Perbaiki website', 'Web Services', 'Tingkatkan performa, usability, dan implementasi teknis pada bagian yang membutuhkan dukungan.']"],
  ["['04', 'Jaga relevansi', 'Content', 'Buat, terbitkan, optimalkan, dan perbarui konten.']", "['04', 'Kelola konten', 'Content Management', 'Rencanakan, buat, terbitkan, dan perbarui konten berdasarkan pertanyaan pelanggan.']"],
  ["kicker: 'One connected strategy'", "kicker: 'Service options'"],
  ["title: 'Four services, working toward the same outcome.'", "title: 'Start with the work your business needs now.'"],
  ["description: 'SEO identifies opportunity. AEO & GEO extends discovery. Web Services strengthens the foundation. Content Management keeps relevance current.'", "description: 'Each service has a clear role. We recommend the right starting point based on your current position, priorities, and internal capacity.'"],
  ["aria: 'Four Kultivate services within one search strategy'", "aria: 'Four Kultivate services for different business priorities'"],
  ["signal: 'Shared direction'", "signal: 'Your priorities'"],
  ["loop: 'Performance data keeps all four services aligned with business priorities.'", "loop: 'Your priorities guide where we start, which services we combine, and which work we leave out.'"],
  ["['01', 'Target', 'SEO', 'Connect demand, intent, technical foundations, and business goals.']", "['01', 'Improve visibility', 'SEO', 'Build the search foundation around your services, priority pages, and customer demand.']"],
  ["['02', 'Extend', 'AEO & GEO', 'Structure answers, entities, schema, and citation readiness.']", "['02', 'Prepare for AI search', 'AEO & GEO', 'Organize content, entities, and schema so answer engines can interpret your expertise.']"],
  ["['03', 'Strengthen', 'Web Services', 'Improve crawlability, speed, UX, and implementation quality.']", "['03', 'Improve the website', 'Web Services', 'Improve performance, usability, and technical implementation where the website needs support.']"],
  ["['04', 'Stay relevant', 'Content', 'Create, publish, optimize, and refresh useful content.']", "['04', 'Manage useful content', 'Content Management', 'Plan, create, publish, and refresh content around customer questions.']"],
  ['<ol class="system-flow" aria-label={copy.aria}>', '<ul class="system-flow" aria-label={copy.aria}>'],
  ['{copy.stages.map(([index, stage, channel, question], position) => (', '{copy.stages.map(([index, stage, channel, question]) => ('],
  ['            {position < copy.stages.length - 1 && <span class="step-arrow" aria-hidden="true">&#8594;</span>}\r\n', ''],
  ['</ol>', '</ul>']
]);

await patchFile('src/components/home/SelectedWork.astro', [
  ["{ title: 'Karya dalam satu sistem.', all: 'Lihat semua proyek' }", "{ title: 'Pilihan karya.', all: 'Lihat semua proyek' }"],
  ["{ title: 'Work across one system.', all: 'View all projects' }", "{ title: 'Selected work.', all: 'View all projects' }"]
]);

await patchFile('src/components/home/WhyKultivate.astro', [
  ["title: 'Clarity sebelum kompleksitas.'", "title: 'Dukungan SEO profesional, tanpa kerumitan yang tidak perlu.'"],
  ["intro: 'Tim SEO yang menghubungkan strategi dan implementasi, supaya Anda selalu tahu apa yang dikerjakan, mengapa, dan apa dampaknya.'", "intro: 'Kami menjelaskan setiap rekomendasi dengan bahasa yang jelas dan menghubungkannya dengan alasan bisnis yang konkret.'"],
  ["['01', 'Arah search-first', 'SEO, AEO & GEO, Web Services, dan Content Management bergerak menuju satu tujuan visibility.'", "['01', 'Dimulai dari bisnis Anda', 'Kami mulai dari apa yang Anda tawarkan, pelanggan yang ingin dijangkau, dan cara mereka mencari.'"],
  ["['02', 'Keputusan yang terlihat', 'Prioritas, trade-off, asumsi, dan hasil dibahas dengan bahasa yang dapat dipahami tim bisnis.'", "['02', 'Rekomendasi yang jelas', 'Kami menjelaskan apa yang direkomendasikan, alasan di baliknya, dan pekerjaan yang terlibat.'"],
  ["['03', 'Strategi dekat dengan implementasi', 'Orang yang menyusun arah tetap terlibat ketika fondasi, halaman, konten, dan pengukuran dikerjakan.'", "['03', 'Strategi tetap dekat dengan pekerjaan', 'Orang yang menyusun arah tetap terlibat saat halaman, konten, dan perbaikan teknis dikerjakan.'"],
  ["title: 'Clarity before complexity.'", "title: 'Professional SEO support, without unnecessary complexity.'"],
  ["intro: 'An SEO team that keeps strategy close to implementation, so you know what is being done, why it matters, and what it changes.'", "intro: 'We explain each recommendation in plain language and connect it to a clear business reason.'"],
  ["['01', 'Search-first direction', 'SEO, AEO & GEO, Web Services, and Content Management move toward one visibility goal.'", "['01', 'Built around your business', 'We begin with what you offer, the customers you want to reach, and how they search.'"],
  ["['02', 'Decisions you can see', 'Priorities, trade-offs, assumptions, and results are discussed in language business teams can use.'", "['02', 'Clear recommendations', 'We explain what we recommend, the reason behind it, and the work involved.'"],
  ["['03', 'Strategy stays close', 'The people shaping the direction stay involved as foundations, pages, content, and measurement are implemented.'", "['03', 'Strategy stays close to the work', 'The people shaping the direction stay involved as pages, content, and technical improvements are carried out.'"]
]);

await patchFile('src/components/home/FinalCTA.astro', [
  ["{locale === 'id' ? 'Mulai dari kebutuhan.' : 'Start with the need.'}", "{locale === 'id' ? 'Mulai dari prioritas Anda saat ini.' : 'Start with your current priorities.'}"],
  ["? 'Ceritakan konteksnya. Kami bantu menentukan langkah pertama.'", "? 'Ceritakan bagian yang membutuhkan perhatian. Kami akan memahami konteksnya sebelum merekomendasikan pekerjaan.'"],
  [": 'Share the context. We will help define the first step.'", ": 'Tell us what needs attention. We will review the context before recommending any work.'"]
]);

await patchFile('src/components/home/InsightsPreview.astro', [
  ["{ title: 'Catatan untuk keputusan digital.', all: 'Lihat semua', read: 'Baca artikel' }", "{ title: 'Catatan untuk keputusan search yang lebih jelas.', all: 'Lihat semua', read: 'Baca artikel' }"],
  ["{ title: 'Notes for digital decisions.', all: 'View all', read: 'Read article' }", "{ title: 'Notes for clearer search decisions.', all: 'View all', read: 'Read article' }"]
]);

await patchFile('src/pages/en/index.astro', [
  ['description="Your partner for digital foundation, discovery, and distribution"', 'description="Kultivate supports your search priorities through SEO, AEO & GEO, Web Services, and Content Management."']
]);

await patchFile('src/pages/id/index.astro', [
  ['description="Partner Anda untuk fondasi, penemuan, dan distribusi digital"', 'description="Kultivate mendukung prioritas search Anda melalui SEO, AEO & GEO, Web Services, dan Content Management."']
]);

await patchFile('src/components/about/AboutIndex.astro', [
  ["title: 'SEO agency yang membuat search lebih mudah dipahami.'", "title: 'SEO agency yang memulai dari bisnis Anda.'"],
  ["description: 'Kultivate membantu bisnis membangun search visibility lewat satu sistem SEO yang terstruktur, kolaboratif, dan terhubung dengan peluang bisnis.'", "description: 'Kami membangun strategi search Anda berdasarkan apa yang ditawarkan bisnis Anda, pelanggan yang ingin dijangkau, dan cara mereka mencari.'"],
  ["beliefTitle: 'Kultivate itu siapa sih?'", "beliefTitle: 'Dukungan SEO yang disesuaikan dengan prioritas Anda.'"],
  ["belief: 'Kami adalah tim SEO yang menyatukan technical foundation, search strategy, content, authority, dan measurement. Tujuannya sederhana: membantu bisnis yang tepat menemukan Anda, memahami nilai Anda, lalu mengambil langkah berikutnya.'", "belief: 'Pekerjaan kami mencakup SEO, AEO & GEO, Web Services, dan Content Management. Kami merekomendasikan layanan yang sesuai dengan posisi dan tujuan Anda saat ini, tanpa menambahkan pekerjaan yang tidak dibutuhkan.'"],
  ["['Konteks sebelum taktik', 'Kami mulai dari bisnis, customer, dan search demand sebelum menyusun pekerjaan.']", "['Konteks sebelum rekomendasi', 'Kami mulai dari bisnis Anda, pelanggan yang ingin dijangkau, dan pertanyaan search yang terhubung dengan apa yang Anda tawarkan.']"],
  ["['Satu roadmap bersama', 'Semua lapisan SEO bergerak dengan prioritas dan arah ukur yang sama.']", "['Cakupan yang tepat', 'Setiap layanan dapat berjalan sendiri atau digabungkan, sesuai bagian yang membutuhkan perhatian.']"],
  ["['Bukti sebelum asumsi', 'Keputusan diuji dengan data, kualitas implementasi, dan hasil yang dapat ditinjau.']", "['Bukti sebelum klaim', 'Kami mendasarkan rekomendasi pada data yang tersedia dan tidak memasukkan asumsi yang belum terverifikasi ke dalam rencana.']"],
  ["teamTitle: 'Lima perspektif. Satu tim SEO.'", "teamTitle: 'Kenali lima orang di balik pekerjaan kami.'"],
  ["title: 'An SEO agency that makes search easier to understand.'", "title: 'An SEO agency that starts with your business.'"],
  ["description: 'Kultivate helps businesses build search visibility through one structured, collaborative SEO system connected to business opportunities.'", "description: 'We build your search strategy around what your business offers, the customers you want to reach, and how they search.'"],
  ["beliefTitle: 'So, who is Kultivate?'", "beliefTitle: 'SEO support shaped around your priorities.'"],
  ["belief: 'We are an SEO team that brings technical foundations, search strategy, content, authority, and measurement into one system. The goal is simple: help the right businesses find you, understand your value, and take the next step.'", "belief: 'Our work covers SEO, AEO & GEO, Web Services, and Content Management. We recommend the services that fit your current position and goals, without adding work you do not need.'"],
  ["['Context before tactics', 'We begin with the business, customer, and search demand before defining the work.']", "['Context before recommendations', 'We begin with your business, the customers you want to reach, and the search questions connected to what you offer.']"],
  ["['One shared roadmap', 'Every SEO layer moves toward the same priorities and measures of progress.']", "['The right scope', 'Each service can work independently or alongside others, depending on what needs attention.']"],
  ["['Evidence before assumptions', 'Decisions are tested against data, implementation quality, and reviewable outcomes.']", "['Evidence before claims', 'We base recommendations on available data and keep unverified assumptions out of the plan.']"],
  ["teamTitle: 'Five perspectives. One SEO team.'", "teamTitle: 'Meet the five people behind the work.'"]
]);

await patchFile('src/pages/en/about.astro', [
  ['description="Meet the search-first team connecting technical SEO, content, authority, and measurement in one structured system."', 'description="Meet the Kultivate team and learn how we shape SEO support around your business, customers, and search priorities."']
]);

await patchFile('src/pages/id/about.astro', [
  ['description="Kenali tim search-first yang menghubungkan technical SEO, content, authority, dan measurement dalam satu sistem terstruktur."', 'description="Kenali tim Kultivate dan cara kami menyesuaikan dukungan SEO dengan bisnis, pelanggan, dan prioritas search Anda."']
]);

await patchFile('src/components/services/ServicesIndex.astro', [
  ["title: 'Empat layanan. Satu strategi search.'", "title: 'Layanan untuk kebutuhan search bisnis Anda.'"],
  ["description: 'SEO, AEO & GEO, Web Services, dan Content Management bekerja dalam satu arah.'", "description: 'Sesuai prioritas Anda, kami dapat membantu melalui SEO, AEO & GEO, Web Services, Content Management, atau kombinasi yang memang dibutuhkan.'"],
  ["explore: 'Lihat layanan'", "explore: 'Lihat layanan'"],
  ["result: 'Ditemukan saat dibutuhkan.'", "result: 'Bantu pelanggan yang tepat menemukan apa yang Anda tawarkan.'"],
  ["description: 'Bangun visibility melalui technical foundation, search intent, halaman, dan authority yang tepat.'", "description: 'Kami memperbaiki fondasi teknis, halaman prioritas, dan authority untuk pencarian yang terhubung dengan bisnis Anda.'"],
  ["result: 'Hadir di jawaban yang membentuk keputusan.'", "result: 'Siapkan expertise Anda untuk AI search.'"],
  ["description: 'Buat expertise Anda lebih mudah dipahami, diambil, dan dikutip oleh answer engines.'", "description: 'Kami menyusun konten dan sinyal teknis agar answer engines dapat memahami dan mengambil informasi penting dari website Anda.'"],
  ["result: 'Fondasi yang siap mendukung search.'", "result: 'Dukung search dengan website yang lebih kuat.'"],
  ["description: 'Website development, technical implementation, migration, dan maintenance yang search-ready.'", "description: 'Kami membangun, merawat, dan memperbaiki website ketika masalah teknis membatasi performa search atau usability.'"],
  ["result: 'Konten yang tetap relevan.'", "result: 'Jaga konten yang berguna tetap aktual.'"],
  ["description: 'Rencanakan, buat, terbitkan, optimalkan, dan perbarui konten berdasarkan kebutuhan customer.'", "description: 'Kami merencanakan, membuat, menerbitkan, dan memperbarui konten berdasarkan pertanyaan pelanggan serta prioritas bisnis Anda.'"],
  ["title: 'Four services. One search strategy.'", "title: 'Services for the search work your business needs.'"],
  ["description: 'SEO, AEO & GEO, Web Services, and Content Management working in one direction.'", "description: 'Depending on your priorities, we can support you with SEO, AEO & GEO, Web Services, Content Management, or a combination of them.'"],
  ["explore: 'Explore service'", "explore: 'View service'"],
  ["result: 'Found when it matters.'", "result: 'Help the right customers find what you offer.'"],
  ["description: 'Build visibility through technical foundations, search intent, priority pages, and authority.'", "description: 'We improve technical foundations, priority pages, and authority around searches connected to your business.'"],
  ["result: 'Present in the answers shaping decisions.'", "result: 'Prepare your expertise for AI search.'"],
  ["description: 'Make your expertise easier for answer engines to understand, retrieve, and cite.'", "description: 'We organize content and technical signals so answer engines can understand and retrieve useful information from your website.'"],
  ["result: 'A foundation ready for search.'", "result: 'Support search with a stronger website.'"],
  ["description: 'Search-ready website development, technical implementation, migration, and maintenance.'", "description: 'We build, maintain, and improve websites where technical issues limit search performance or usability.'"],
  ["result: 'Content that stays relevant.'", "result: 'Keep useful content current.'"],
  ["description: 'Plan, create, publish, optimize, and refresh content around customer needs.'", "description: 'We plan, create, publish, and refresh content around your customer questions and business priorities.'"],
  ["imageAlt={locale === 'id' ? 'Empat jalur cahaya yang menyatu dalam satu strategi search' : 'Four paths of light merging into one search strategy'}", "imageAlt={locale === 'id' ? 'Empat jalur cahaya yang mewakili pilihan layanan Kultivate' : 'Four paths of light representing Kultivate service options'}"]
]);

await patchFile('src/components/services/ServiceHero.astro', [
  ["{locale === 'id' ? 'Mulai Proyek' : 'Start a Project'}", "{locale === 'id' ? 'Konsultasi dengan kami' : 'Consult with us'}"],
  ["{locale === 'id' ? 'Lihat Portofolio' : 'View Portfolio'}", "{locale === 'id' ? 'Lihat portofolio' : 'View portfolio'}"]
]);

await patchFile('src/components/services/ServiceProblems.astro', [
  ["interface Props { heading: string; problems: ProblemItem[]; }", "interface Props { heading: string; problems: ProblemItem[]; locale: 'id' | 'en'; }"],
  ["const { heading, problems } = Astro.props;", "const { heading, problems, locale } = Astro.props;"],
  ['<div class="problems-intro"><span class="section-kicker">Outcome</span><h2 id="problems-title">{heading}</h2></div>', '<div class="problems-intro"><span class="section-kicker">{locale === \'id\' ? \'Kapan dibutuhkan\' : \'When it helps\'}</span><h2 id="problems-title">{heading}</h2></div>'],
  ['<ol class="problems-list">', '<ul class="problems-list">'],
  ['</ol>', '</ul>']
]);

await patchFile('src/components/services/ServiceProcess.astro', [
  ["interface Props { heading: string; steps: ProcessStep[]; }", "interface Props { heading: string; steps: ProcessStep[]; locale: 'id' | 'en'; }"],
  ["const { heading, steps } = Astro.props;", "const { heading, steps, locale } = Astro.props;"],
  ['<span class="section-kicker">Process</span>', '<span class="section-kicker">{locale === \'id\' ? \'Proses\' : \'Process\'}</span>']
]);

await patchFile('src/pages/en/services/[slug].astro', [
  ["title: 'Scope of work'", "title: 'Scope options'"],
  ["title: 'Deliverables'", "title: 'Typical deliverables'"],
  ["title: 'Designed For'", "title: 'Useful for'"],
  ["question: `What is the typical timeframe for a ${service.title} project?`,", "question: `How do you decide the scope of a ${service.title} project?`,"],
  ["answer: `Most projects run for 2 to 6 weeks. Scope and asset readiness set the pace; milestones are agreed before work begins.`", "answer: `We begin with your current position, priorities, and internal capacity. The scope covers the work that needs attention and leaves out work that does not.`"],
  ["question: `Can ${service.title} be combined with other Kultivate services?`,", "question: `Can ${service.title} be used on its own?`,"],
  ["answer: `Yes. Website, SEO, and social can be designed as one system, or started from the most urgent need.`", "answer: `Yes. Each service can stand on its own or be combined with others when the work overlaps. We recommend the smallest useful scope for your priorities.`"],
  ["question: `How do project reporting and transparency work?`,", "question: `How will we communicate during the project?`,"],
  ["answer: `Progress, decisions, dependencies, and deliverables stay visible through an update rhythm agreed at the start.`", "answer: `We agree on a practical update rhythm before work begins and explain decisions, dependencies, and deliverables in plain language.`"],
  ['heading="What changes"', 'heading="Where this service helps"'],
  ['problems={problemItems}\r\n  />', 'problems={problemItems}\r\n    locale={locale}\r\n  />'],
  ['heading="What we take care of"', 'heading="What we can take care of"'],
  ['heading="From first decision to a working system"', 'heading="How we approach the work"'],
  ['steps={processSteps}\r\n  />', 'steps={processSteps}\r\n    locale={locale}\r\n  />']
]);

await patchFile('src/pages/id/services/[slug].astro', [
  ["title: 'Cakupan kerja'", "title: 'Pilihan cakupan'"],
  ["title: 'Hasil yang diterima'", "title: 'Hasil kerja yang umum'"],
  ["title: 'Dirancang untuk'", "title: 'Cocok untuk'"],
  ["question: `Berapa lama estimasi pengerjaan proyek ${service.title}?`,", "question: `Bagaimana kami menentukan cakupan proyek ${service.title}?`,"],
  ["answer: `Sebagian besar proyek berjalan 2 sampai 6 minggu. Scope dan kesiapan aset menentukan ritmenya; milestone disepakati sebelum pekerjaan dimulai.`", "answer: `Kami mulai dari posisi, prioritas, dan kapasitas internal Anda saat ini. Cakupan hanya berisi pekerjaan yang membutuhkan perhatian.`"],
  ["question: `Apakah layanan ${service.title} dapat digabungkan dengan jasa lainnya?`,", "question: `Apakah layanan ${service.title} dapat digunakan sendiri?`,"],
  ["answer: `Bisa. Website, SEO, dan social dapat dirancang sebagai satu sistem, atau dimulai dari kebutuhan yang paling mendesak.`", "answer: `Bisa. Setiap layanan dapat berjalan sendiri atau digabungkan ketika pekerjaannya saling berkaitan. Kami merekomendasikan cakupan terkecil yang tetap berguna untuk prioritas Anda.`"],
  ["question: `Bagaimana sistem pelaporan dan transparansi proyek?`,", "question: `Bagaimana komunikasi selama proyek berlangsung?`,"],
  ["answer: `Progres, keputusan, dependensi, dan hasil kerja dibuka sepanjang proyek melalui ritme update yang disepakati.`", "answer: `Sebelum pekerjaan dimulai, kami menyepakati ritme update yang praktis dan menjelaskan keputusan, dependensi, serta hasil kerja dengan bahasa yang jelas.`"],
  ['heading="Hasil yang terasa"', 'heading="Bagian yang dapat dibantu"'],
  ['problems={problemItems}\r\n  />', 'problems={problemItems}\r\n    locale={locale}\r\n  />'],
  ['heading="Lingkup kerja"', 'heading="Bagian yang dapat kami tangani"'],
  ['heading="Cara kami bekerja"', 'heading="Cara kami mengerjakannya"'],
  ['steps={processSteps}\r\n  />', 'steps={processSteps}\r\n    locale={locale}\r\n  />']
]);

await patchFile('src/pages/en/services/index.astro', [
  ['description="Explore four connected services built to strengthen visibility across search and AI."', 'description="Choose SEO, AEO & GEO, Web Services, Content Management, or the combination that fits your current priorities."']
]);

await patchFile('src/pages/id/services/index.astro', [
  ['description="Empat layanan terhubung untuk memperkuat visibility di search dan AI."', 'description="Pilih SEO, AEO & GEO, Web Services, Content Management, atau kombinasi yang sesuai dengan prioritas Anda saat ini."']
]);

await patchFile('src/i18n/en.ts', [
  ["'footer.tagline': 'Website, search, and social moving in one direction.'", "'footer.tagline': 'SEO support shaped around what your business needs.'"],
  ["'contact.summary': 'What are you looking to build?'", "'contact.summary': 'What would you like help with?'"],
  ["'contact.timeline': 'Target Launch'", "'contact.timeline': 'Preferred Start'"],
  ["'contact.submit': 'Start the Conversation'", "'contact.submit': 'Send Inquiry'"],
  ["'contact.success': 'Thank you! Your message has been received. We will get back to you within 24 hours.'", "'contact.success': 'We received your inquiry. Our team will review the details and contact you using the information provided.'"],
  ["'contact.placeholder_summary': 'A goal, a challenge, or an early idea. Brief is perfectly fine.'", "'contact.placeholder_summary': 'Tell us what needs attention, what you have tried, or where you need support.'"],
  ["'contact.placeholder_timeline': 'Select target launch date...'", "'contact.placeholder_timeline': 'Select a preferred start time...'"],
  ["'contact.placeholder_budget': 'Select estimated budget...'", "'contact.placeholder_budget': 'Select an estimated budget...'"]
]);

await patchFile('src/i18n/id.ts', [
  ["'footer.tagline': 'Website, search, dan social yang bergerak searah.'", "'footer.tagline': 'Dukungan SEO yang disesuaikan dengan kebutuhan bisnis Anda.'"],
  ["'contact.summary': 'Apa yang ingin Anda bangun?'", "'contact.summary': 'Bagian apa yang membutuhkan bantuan?'"],
  ["'contact.timeline': 'Target Peluncuran'", "'contact.timeline': 'Waktu Mulai yang Diinginkan'"],
  ["'contact.submit': 'Mulai Percakapan'", "'contact.submit': 'Kirim Inquiry'"],
  ["'contact.success': 'Terima kasih! Pesan Anda telah diterima. Kami akan menghubungi Anda dalam waktu 24 jam.'", "'contact.success': 'Inquiry Anda sudah kami terima. Tim kami akan meninjau detailnya dan menghubungi Anda melalui informasi yang diberikan.'"],
  ["'contact.placeholder_summary': 'Tujuan, tantangan, atau ide awal. Singkat saja tidak apa-apa.'", "'contact.placeholder_summary': 'Ceritakan bagian yang membutuhkan perhatian, upaya yang sudah dilakukan, atau dukungan yang dibutuhkan.'"],
  ["'contact.placeholder_timeline': 'Pilih target waktu peluncuran...'", "'contact.placeholder_timeline': 'Pilih waktu mulai yang diinginkan...'"],
  ["'contact.placeholder_budget': 'Pilih perkiraan budget...'", "'contact.placeholder_budget': 'Pilih estimasi budget...'"]
]);

await patchFile('src/data/site.ts', [
  ["tagline: 'Connected Digital Growth'", "tagline: 'SEO Agency for Search and AI Visibility'"]
]);

await patchFile('src/pages/en/contact.astro', [
  ['title="Start a Project"', 'title="Consult with Kultivate"'],
  ['description="Tell us what you\'re building. Start a project with Kultivate."', 'description="Tell us what needs attention. We will review the context before recommending any work."'],
  ['label="START A PROJECT"', 'label="CONTACT"'],
  ['title="Tell us what matters."', 'title="Tell us what needs attention."'],
  ['description="What you are building, what is in the way, and where you need help."', 'description="Share your current position, priorities, and the support you are considering. We will review the context before recommending any work."'],
  ['<option value="asap">ASAP (&lt; 2 weeks)</option>', '<option value="asap">As soon as possible</option>'],
  ['<option value="1-2months">1 - 2 Months</option>', '<option value="1-2months">Within 1–2 months</option>'],
  ['<option value="flexible">Flexible / Planning phase</option>', '<option value="flexible">Still planning</option>'],
  ['<h2 class="info-title">Prefer to talk directly?</h2>', '<h2 class="info-title">Prefer a direct message?</h2>'],
  ['WhatsApp or email. Use whatever feels easiest.', 'Contact us by WhatsApp or email.'],
  ['<span class="link-label text-mono">Email Inquiry</span>', '<span class="link-label text-mono">Email</span>']
]);

await patchFile('src/pages/id/contact.astro', [
  ['title="Mulai Proyek"', 'title="Konsultasi dengan Kultivate"'],
  ['description="Ceritakan apa yang sedang Anda bangun. Mulai proyek bersama Kultivate."', 'description="Ceritakan bagian yang membutuhkan perhatian. Kami akan memahami konteksnya sebelum merekomendasikan pekerjaan."'],
  ['label="MULAI PROYEK"', 'label="KONTAK"'],
  ['title="Ceritakan kebutuhan Anda."', 'title="Ceritakan bagian yang membutuhkan perhatian."'],
  ['description="Apa yang sedang dibangun, apa yang menghambat, dan bantuan yang dibutuhkan."', 'description="Bagikan posisi, prioritas, dan dukungan yang sedang Anda pertimbangkan. Kami akan memahami konteksnya sebelum merekomendasikan pekerjaan."'],
  ['<option value="asap">Secepatnya (&lt; 2 minggu)</option>', '<option value="asap">Secepatnya</option>'],
  ['<option value="1-2months">1 - 2 Bulan</option>', '<option value="1-2months">Dalam 1–2 bulan</option>'],
  ['<option value="flexible">Fleksibel / Perencanaan</option>', '<option value="flexible">Masih dalam perencanaan</option>'],
  ['<h2 class="info-title">Lebih suka bicara langsung?</h2>', '<h2 class="info-title">Lebih suka mengirim pesan langsung?</h2>'],
  ['WhatsApp atau email. Pilih yang paling nyaman.', 'Hubungi kami melalui WhatsApp atau email.'],
  ['<span class="link-label text-mono">Email Inquiry</span>', '<span class="link-label text-mono">Email</span>']
]);

await patchFile('src/components/contact/ContactSuccessModal.astro', [
  ["? 'Terima kasih sudah mengisi formulir. Tim kami akan menghubungi Anda paling lambat H+1 hari kerja.'", "? 'Inquiry Anda sudah kami terima. Tim kami akan meninjau detailnya dan menghubungi Anda melalui informasi yang diberikan.'"],
  [": 'Thank you for completing the form. Our team will contact you within one business day.'", ": 'We received your inquiry. Our team will review the details and contact you using the information provided.'"],
  ["{locale === 'id' ? 'Baik, saya mengerti' : 'Got it'}", "{locale === 'id' ? 'Tutup' : 'Close'}"]
]);

await patchFile('src/pages/en/work/index.astro', [
  ['description="ddentity and digital experience concepts built to make a business feel distinct."', 'description="Staging portfolio concepts retained for visual testing until project proof and client approval are available."']
]);

await patchFile('src/pages/id/work/index.astro', [
  ['title="Portofolio oultivate"', 'title="Portofolio Kultivate"'],
  ['description="oonsep identitas dan pengalaman digital yang dibangun untuk membuat bisnis terasa berbeda."', 'description="Konsep portofolio staging yang dipertahankan untuk pengujian visual sampai bukti proyek dan persetujuan client tersedia."']
]);

for (const [absolutePath, text] of edits) {
  await fs.writeFile(absolutePath, text, 'utf8');
}

console.log(`Updated ${edits.length} files.`);
