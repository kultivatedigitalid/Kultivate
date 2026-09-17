import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / 'website'
data = {'id': [], 'en': []}

def service(locale, key, title, tagline, summary, description, image, principles, problems, causes, impacts, inspections, audience, scope, deliverables, process, faqs):
    record = dict(id=key, slug=key, title=title, tagline=tagline, summary=summary, description=description, image=image)
    for name, value in [('principles',principles),('problemsSolved',problems),('problemCauses',causes),('impacts',impacts),('inspections',inspections),('whoItIsFor',audience),('scope',scope),('deliverables',deliverables),('process',process)]:
        record[name] = value.split('|')
    record['faqs'] = [dict(question=q, answer=a) for q,a in faqs]
    data[locale].append(record)

service('id','seo','SEO',
    'Temukan demand yang bernilai bagi bisnis Anda.',
    'Pahami apa yang pelanggan cari, lalu hubungkan pencarian itu dengan halaman yang membantu mereka mengambil keputusan.',
    'Kami memulai SEO dari bisnis, buyer, dan demand. Peluang pencarian menentukan halaman, konten, dan perbaikan teknis yang diprioritaskan; hasilnya ditinjau hingga inquiry dan peluang bisnis yang dapat diukur.',
    '/assets/services/seo-focus-v3.webp',
    'Demand sebelum keyword.|Nilai bisnis sebelum traffic.|Ukur hingga tindakan.',
    'Pelanggan yang tepat belum menemukan penawaran Anda.|Traffic bertambah, tetapi inquiry relevan belum mengikuti.|Rekomendasi SEO belum menjadi perubahan nyata di website.',
    'Struktur halaman belum mengikuti search demand dan pertanyaan buyer.|Keyword dipilih karena volume, sementara intent dan nilai bisnisnya belum dinilai.|Riset, konten, dan development berjalan dengan prioritas serta ownership yang terpisah.',
    'Peluang bernilai dapat jatuh ke kompetitor sebelum buyer mengenal bisnis Anda.|Aktivitas meningkat tanpa memperjelas kontribusinya pada proses penjualan.|Hambatan teknis dan kekosongan konten terus membatasi discovery.',
    'Search demand, intent, halaman yang tersedia, dan visibility kompetitor.|Relevansi landing page, pertanyaan buyer, CTA, dan jalur menuju inquiry.|Crawlability, indexability, internal linking, backlog, dan kapasitas implementasi.',
    'Bisnis B2B dan layanan bernilai tinggi yang buyernya melakukan riset sebelum membeli.|Tim yang membutuhkan prioritas SEO dan dukungan implementasi.|Website existing, baru, atau yang akan redesign dengan search demand yang relevan.',
    'Pemahaman bisnis, buyer, search intent, dan peluang komersial.|Audit website, search-to-page mapping, arsitektur konten, dan internal linking.|Technical SEO, on-page SEO, dan penguatan halaman prioritas.|Konten yang menjawab pertanyaan buyer dan menunjukkan bukti relevan.|Measurement, review inquiry, dan backlog optimasi sesuai data yang tersedia.',
    'Peta search demand dan prioritas peluang bisnis.|Audit dan roadmap SEO dengan alasan di balik setiap prioritas.|Pemetaan demand ke halaman serta brief konten.|Implementasi atau dukungan teknis sesuai scope.|Review visibility, perilaku pengunjung, inquiry, dan langkah berikutnya.',
    'Pahami bisnis: Kenali penawaran, nilai customer, mekanisme penjualan, dan prioritas bisnis.|Pelajari buyer: Petakan pertanyaan, kekhawatiran, kriteria keputusan, dan bukti yang dibutuhkan.|Petakan demand: Nilai intent, relevansi, kompetisi, dan nilai bisnis setiap kelompok pencarian.|Tentukan prioritas: Hubungkan demand dengan halaman yang ada dan pekerjaan yang paling layak dilakukan.|Implementasikan: Perkuat halaman, konten, dan fondasi teknis bersama tim Anda.|Pelajari dan tingkatkan: Gunakan data search, perilaku website, dan feedback sales untuk menentukan langkah berikutnya.',
    [('Apakah SEO harus disertai website baru?','Tidak. Kami meninjau website yang ada terlebih dahulu. Redesign hanya masuk scope ketika perubahan besar memang diperlukan; banyak kebutuhan dapat ditangani dengan memperbaiki halaman dan fondasi existing.'),('Apa ukuran keberhasilan SEO?','Kami menghubungkan visibility dan organic clicks dengan kunjungan relevan, interaksi CTA, inquiry, dan qualified leads. Revenue dapat ditinjau ketika datanya tersedia. Kami tidak menjamin ranking atau hasil komersial tertentu.')])

service('en','seo','SEO',
    'Find the demand that matters to your business.',
    'Understand what customers search for, then connect that demand to pages that help them make a decision.',
    'We start SEO with the business, the buyer, and the demand. Search opportunities guide the pages, content, and technical work we prioritize; progress is reviewed through to inquiries and measurable business opportunities.',
    '/assets/services/seo-focus-v3.webp',
    'Demand before keywords.|Business value before traffic.|Measure through to action.',
    'The right customers are not finding your offer.|Traffic is growing, but relevant inquiries are not following.|SEO recommendations are not becoming changes on the website.',
    'Page structure does not reflect search demand and buyer questions.|Keywords are selected for volume before intent and business value are assessed.|Research, content, and development have separate priorities and ownership.',
    'Valuable opportunities can reach competitors before buyers discover your business.|Activity grows without a clear contribution to the sales process.|Technical friction and content gaps continue to limit discovery.',
    'Search demand, intent, existing pages, and competitor visibility.|Landing-page relevance, buyer questions, calls to action, and the path to inquiry.|Crawling, indexing, internal links, the backlog, and implementation capacity.',
    'B2B and high-value service businesses whose buyers research before purchasing.|Teams that need clear SEO priorities and help putting them into practice.|Existing, new, or migrating websites with relevant search demand.',
    'Business and buyer understanding, search intent, and commercial opportunities.|Website audits, search-to-page mapping, content architecture, and internal links.|Technical SEO, on-page SEO, and priority-page improvements.|Content that answers buyer questions and presents relevant evidence.|Measurement, inquiry reviews, and an optimization backlog grounded in available data.',
    'A search demand map and prioritized business opportunities.|An SEO audit and roadmap with the reasoning behind each priority.|Demand-to-page mapping and content briefs.|Implementation or technical support within the agreed scope.|Reviews of visibility, visitor behavior, inquiries, and next steps.',
    'Understand the business: Learn the offer, customer value, sales mechanism, and commercial priorities.|Study the buyer: Map the questions, concerns, decision criteria, and evidence buyers need.|Map the demand: Assess intent, relevance, competition, and business value across search clusters.|Choose the priorities: Connect demand to existing pages and the changes worth making first.|Implement: Improve pages, content, and technical foundations with your team.|Learn and grow: Use search data, website behavior, and sales feedback to guide the next step.',
    [('Does SEO require a new website?','No. We review the existing website first. A redesign enters the scope only when larger changes are needed; many priorities can be addressed by improving existing pages and foundations.'),('How do you measure SEO progress?','We connect visibility and organic clicks to relevant visits, CTA interactions, inquiries, and qualified leads. Revenue can be reviewed when the data is available. We do not guarantee rankings or a specific commercial result.')])

service('id','web-services','Web Services',
    'Bangun website dari cara pelanggan mencari dan memutuskan.',
    'Search membentuk apa yang perlu dibangun. Kebutuhan buyer membentuk bagaimana website menjelaskan, meyakinkan, dan mengarahkan tindakan.',
    'Sebelum sitemap dan UI, kami memahami bisnis, buyer, dan search demand Anda. Insight tersebut membentuk arsitektur, pesan, pengalaman, dan fondasi teknis website sebagai bagian dari satu sistem akuisisi customer.',
    '/assets/services/web-foundation-v3.webp',
    'Search sebelum sitemap.|Buyer sebelum UI.|Nilai bisnis sebelum traffic.',
    'Website belum membantu buyer memahami dan mengevaluasi penawaran.|SEO baru dipikirkan setelah website selesai dibangun.|Redesign berisiko menghilangkan visibility dan data yang sudah ada.',
    'Sitemap dan desain dibuat sebelum pertanyaan serta kriteria keputusan buyer dipahami.|Search demand belum ikut menentukan arsitektur dan hubungan antar konten.|Perubahan URL, redirect, indexability, dan tracking belum memiliki rencana validasi.',
    'Pengunjung kesulitan menemukan alasan untuk percaya atau menghubungi tim Anda.|Halaman dan fondasi teknis perlu dikerjakan ulang saat optimasi dimulai.|Organic equity, jalur inquiry, dan kemampuan mengukur hasil dapat terganggu.',
    'Tujuan tiap halaman, message hierarchy, bukti, FAQ, dan tindakan berikutnya.|Search demand, sitemap, URL, CMS, internal linking, dan ruang pengembangan.|Halaman yang terindeks, redirects, canonical, analytics, formulir, dan launch QA.',
    'Bisnis dengan penawaran yang membutuhkan penjelasan dan proses evaluasi.|Tim yang membutuhkan website baru, redesign, atau implementasi rekomendasi SEO.|Website yang memerlukan perbaikan UX, performance, maintenance, atau migrasi.',
    'Business dan buyer discovery, disertai riset demand sesuai skala proyek.|Information architecture, message hierarchy, dan jalur conversion.|Wireframe, UI/UX, sistem komponen, dan implementasi responsif.|Development, CMS bila diperlukan, performance, accessibility, dan search readiness.|Rencana migrasi, launch QA, tracking, dan optimasi sesuai scope.',
    'Business brief, buyer decision map, dan prioritas peluang.|Sitemap, search-to-page map, dan brief halaman utama.|Wireframe, desain, komponen, dan website siap produksi.|Catatan QA, rencana migrasi jika relevan, dan measurement setup.|Dokumentasi pengelolaan, handover, dan backlog peningkatan.',
    'Pahami bisnis: Kenali cara bisnis menghasilkan nilai dan bagian yang ingin ditingkatkan.|Pelajari buyer: Pahami informasi dan bukti yang dibutuhkan sebelum mereka mengambil keputusan.|Petakan demand: Pelajari pencarian yang perlu dijawab oleh website.|Rancang sistem: Terjemahkan insight menjadi arsitektur, pesan, conversion flow, dan UX/UI.|Bangun dengan tepat: Implementasikan website yang cepat, responsif, mudah dikembangkan, dan siap untuk search; validasi sebelum launch.|Pelajari dan tingkatkan: Gunakan data nyata dan feedback sales untuk memperbaiki pengalaman serta prioritas berikutnya.',
    [('Apakah bisa mengambil Web Services tanpa SEO retainer?','Bisa. Riset demand tetap membantu membentuk website, dengan kedalaman sesuai scope proyek. SEO berkelanjutan merupakan pekerjaan terpisah yang ditentukan berdasarkan kebutuhan.'),('Bagaimana Website dan SEO bekerja bersama?','SEO membantu memahami bagaimana pelanggan menemukan bisnis. Website membantu mereka memahami, mengevaluasi, dan mengambil tindakan setelah menemukannya. Strategi, arsitektur, dan measurement dirancang saling terhubung.'),('Bagaimana dengan organic traffic yang sudah ada?','Kami meninjau halaman dan URL yang bernilai, menyusun rencana migrasi bila diperlukan, lalu memvalidasi redirect, indexability, tracking, dan formulir sebelum serta setelah launch.')])

service('en','web-services','Web Services',
    'Build around how customers search and decide.',
    'Search shapes what needs to be built. Buyer needs shape how the website explains, earns trust, and guides action.',
    'Before the sitemap and interface, we understand your business, buyers, and search demand. Those insights shape the architecture, messaging, experience, and technical foundations of a website designed as part of one customer acquisition system.',
    '/assets/services/web-foundation-v3.webp',
    'Search before sitemap.|Buyer before UI.|Business value before traffic.',
    'Your website does not help buyers understand and evaluate the offer.|SEO is considered after the website has already been built.|A redesign could lose visibility and data you have already earned.',
    'The sitemap and design come before buyer questions and decision criteria.|Search demand has not shaped the architecture or content relationships.|URL changes, redirects, indexing, and tracking lack a clear validation plan.',
    'Visitors struggle to find a reason to trust the business or contact your team.|Pages and technical foundations need to be reworked when optimization begins.|Organic equity, inquiry paths, and the ability to measure results can be disrupted.',
    'The purpose of each page, message hierarchy, evidence, FAQs, and next action.|Search demand, sitemap, URLs, CMS, internal links, and room to grow.|Indexed pages, redirects, canonicals, analytics, forms, and launch QA.',
    'Businesses whose offers need explanation and considered evaluation.|Teams planning a website, redesign, or implementation of SEO recommendations.|Websites needing UX, performance, maintenance, or migration support.',
    'Business and buyer discovery, with demand research appropriate to the project.|Information architecture, message hierarchy, and conversion paths.|Wireframes, UI/UX, component systems, and responsive implementation.|Development, CMS where needed, performance, accessibility, and search readiness.|Migration planning, launch QA, tracking, and optimization within scope.',
    'A business brief, buyer decision map, and opportunity priorities.|A sitemap, search-to-page map, and priority-page briefs.|Wireframes, design, components, and a production-ready website.|QA records, migration planning where relevant, and measurement setup.|Management documentation, handover, and an improvement backlog.',
    'Understand the business: Learn how the business creates value and what needs to improve.|Understand the buyer: Identify the information and evidence customers need to make a decision.|Map the demand: Study the searches the website needs to answer.|Design the system: Turn the insights into architecture, messaging, conversion paths, and UX/UI.|Build it right: Develop a fast, responsive, scalable, search-ready website and validate it before launch.|Learn and grow: Use real data and sales feedback to improve the experience and choose the next priorities.',
    [('Can we use Web Services without an SEO retainer?','Yes. Demand research still helps shape the website, at a depth appropriate to the project. Ongoing SEO is a separate engagement based on your needs.'),('How do Website and SEO work together?','SEO helps us understand how customers discover a business. The website helps them understand, evaluate, and act after discovery. Strategy, architecture, and measurement are designed to work together.'),('What happens to our existing organic traffic?','We review valuable pages and URLs, plan the migration where needed, and validate redirects, indexing, tracking, and forms before and after launch.')])

service('id','social-media-management','Social Media Management',
    'Ubah expertise menjadi kehadiran yang konsisten.',
    'Bawa pengetahuan dan pengalaman bisnis ke konten yang bernilai, agar audiens terus mengenal kemampuan Anda.',
    'Kami menggali pengetahuan dari founder, tim, customer questions, dan pengalaman proyek. Insight tersebut menjadi arah konten, materi sumber, dan komunikasi yang membangun attention, familiarity, serta authority secara konsisten.',
    '/assets/services/social-distribution-v2.webp',
    'Expertise sebelum konten.|Audiens sebelum algoritma.|Konsistensi sebelum viralitas.',
    'Keahlian bisnis Anda belum cukup terlihat oleh market.|Konten diproduksi, tetapi terasa seperti milik siapa saja.|Akun aktif, tetapi pembelajaran dari respons audiens belum jelas.',
    'Knowledge masih tersimpan di founder, sales call, proyek, dan tim internal.|Ide dimulai dari kalender atau tren tanpa insight dan sudut pandang yang kuat.|Reporting berhenti pada jumlah posting, views, dan followers.',
    'Audiens belum punya cukup kesempatan untuk mengenal cara bisnis Anda berpikir.|Brand sulit membangun asosiasi yang khas dengan keahliannya.|Tim mengulang aktivitas tanpa keputusan tentang apa yang perlu diperbaiki.',
    'Expertise tim, pertanyaan customer, pengalaman, dan bukti yang boleh dibagikan.|Kesesuaian topik dengan expertise, kebutuhan audiens, dan relevansi komersial.|Relevant attention, respons konten, brand interest, DM, inquiry, dan sinyal bisnis.',
    'Bisnis dengan expertise bernilai yang belum dikomunikasikan secara konsisten.|Founder dan tim yang siap membagikan knowledge sebagai sumber konten.|Brand yang ingin membangun familiarity dan authority di audiens relevan.',
    'Strategi social berdasarkan perannya dalam customer journey.|Expertise mining bersama founder, expert, sales, atau tim proyek.|Content territories, point of view, dan pengembangan materi sumber.|Adaptasi format, copy, produksi, quality control, dan distribusi pada channel yang disepakati.|Review respons audiens, brand interest, dan sinyal komersial.',
    'Social strategy brief dengan tujuan dan audiens yang jelas.|Expertise bank dan peta content territories.|Materi sumber serta rencana konten dan distribusi.|Konten untuk format dan channel yang disepakati.|Review pembelajaran dengan keputusan untuk melanjutkan, memperbaiki, menghentikan, atau menguji.',
    'Pahami bisnis dan audiens: Tentukan perhatian siapa yang penting dan peran social bagi bisnis.|Gali expertise: Kumpulkan knowledge, pengalaman, pertanyaan customer, dan sudut pandang yang dapat dibuktikan.|Tentukan territory: Pilih topik yang ingin diasosiasikan dengan brand.|Bangun materi sumber: Kembangkan satu ide mendalam menjadi beberapa bentuk konten bernilai.|Buat dan distribusikan: Adaptasikan pesan ke format dan channel, lalu periksa kualitas sebelum publikasi.|Ukur dan pelajari: Gunakan respons market untuk menentukan apa yang diteruskan, diperbaiki, dan diuji berikutnya.',
    [('Apakah layanan ini bisa berdiri sendiri?','Bisa. Social Media Management merupakan layanan berkelanjutan dengan metode tersendiri. Insight-nya dapat memperkuat Website dan SEO ketika ada hubungan yang relevan.'),('Berapa posting dan channel yang termasuk?','Format, volume, channel, dan ritme produksi ditentukan setelah memahami tujuan, audiens, materi sumber, serta kapasitas tim. Setiap bagian dijelaskan dalam scope.'),('Apa yang perlu disiapkan tim kami?','Akses ke expertise dan pengalaman nyata: percakapan dengan founder atau expert, pertanyaan customer, proyek, dan data yang boleh dibagikan. Sumber yang spesifik membuat komunikasi terasa milik brand Anda.')])

service('en','social-media-management','Social Media Management',
    'Turn expertise into consistent market presence.',
    'Bring your knowledge and experience into useful content, so the right audience keeps recognizing what you know.',
    'We uncover knowledge from founders, teams, customer questions, and project experience. Those insights become content territories, source material, and communication that consistently builds attention, familiarity, and authority.',
    '/assets/services/social-distribution-v2.webp',
    'Expertise before content.|Audience before algorithm.|Consistency before virality.',
    'The market is not seeing enough of your expertise.|Content keeps going out, but could belong to any business.|Your account is active, but audience response rarely informs the next cycle.',
    'Knowledge stays inside the founder, sales calls, projects, and internal team.|Ideas start with a calendar or trend before there is a strong source and point of view.|Reporting stops at post counts, views, and followers.',
    'The right audience has too few opportunities to recognize how your business thinks.|The brand struggles to build a distinctive association with its expertise.|The team repeats activity without deciding what to improve.',
    'Team expertise, customer questions, experience, and evidence available to share.|The connection between topics, expertise, audience needs, and commercial relevance.|Relevant attention, content response, brand interest, DMs, inquiries, and business signals.',
    'Businesses with valuable expertise they do not yet communicate consistently.|Founders and teams willing to share knowledge as the source of content.|Brands building familiarity and authority with a relevant audience.',
    'Social strategy based on the channel’s role in the customer journey.|Expertise mining with founders, experts, sales, or project teams.|Content territories, points of view, and source material development.|Format adaptation, copy, production, quality control, and distribution on agreed channels.|Audience response, brand interest, and commercial-signal reviews.',
    'A social strategy brief with a clear objective and audience.|An expertise bank and content territory map.|Source material, content planning, and a distribution plan.|Content for the formats and channels agreed in the scope.|Learning reviews with decisions to continue, improve, stop, or test.',
    'Understand the business and audience: Decide whose attention matters and the role social should play.|Mine the expertise: Gather knowledge, experience, customer questions, and points of view grounded in evidence.|Define the territory: Choose what the brand should become known for.|Build the source: Develop one deep idea into several useful expressions.|Create and distribute: Adapt the message to each format and channel, with quality checks before publication.|Measure and learn: Use market response to decide what to continue, improve, and test next.',
    [('Can this service stand on its own?','Yes. Social Media Management is an ongoing service with its own method. Its insights can also strengthen Website and SEO work when the connection is relevant.'),('How many posts and channels are included?','Formats, volume, channels, and production rhythm follow the objective, audience, source material, and team capacity. Each part is defined in the scope.'),('What does our team need to provide?','Access to real expertise and experience: founder or expert conversations, customer questions, projects, and data that can be shared. Specific source material makes the communication your own.')])

service('id','visual-strategy','Visual Strategy',
    'Buat brand lebih mudah dipahami, dikenali, dan diingat.',
    'Mulai dari pesan yang perlu dipahami, lalu bangun bahasa visual yang khas dan konsisten di berbagai touchpoint.',
    'Kami menerjemahkan tujuan bisnis, kebutuhan audiens, dan pesan menjadi satu sistem komunikasi visual. Konsep, ilustrasi, diagram, iconography, dan motion dipilih berdasarkan apa yang perlu dipahami dan diingat.',
    '/assets/why/purposeful-craft.webp',
    'Makna sebelum gaya.|Kejelasan sebelum dekorasi.|Sistem sebelum aset.',
    'Penawaran yang kuat masih sulit dijelaskan secara visual.|Komunikasi brand terasa berbeda di setiap touchpoint.|Tim memiliki banyak aset, tetapi kesulitan mengembangkannya.',
    'Medium dan style dipilih sebelum pesan serta kebutuhan audiens dipahami.|Komposisi, warna, tipografi, imagery, dan motion belum memiliki bahasa bersama.|Output diserahkan tanpa aturan, template, dan konteks penggunaannya.',
    'Audiens dapat melewatkan informasi penting atau salah memahami nilai penawaran.|Brand lebih sulit dikenali dan diingat secara konsisten.|Setiap kebutuhan baru mengulang keputusan desain dari awal.',
    'Core message, informasi prioritas, kompleksitas, dan persepsi yang ingin dibangun.|Visual direction di website, social, campaign, dan sales material.|Guidelines, template, asset library, penggunaan sehari-hari, dan skalabilitas.',
    'Bisnis dengan produk, proses, atau expertise yang membutuhkan penjelasan visual.|Brand yang ingin memperkuat recognition dan konsistensi komunikasi.|Tim yang membutuhkan sistem visual yang dapat digunakan dan dikembangkan.',
    'Business, audience, communication objective, serta message dan perception mapping.|Visual concept, art direction, dan eksplorasi key visual dengan rationale.|Sistem ilustrasi, iconography, information design, komposisi, dan prinsip motion sesuai kebutuhan.|Aplikasi pada website, social, campaign, presentation, atau sales material.|Validasi kejelasan dan konsistensi, guidelines, template, dan handover.',
    'Visual strategy brief dan message & perception map.|Visual direction dengan konsep, referensi, dan alasan pemilihannya.|Sistem visual dengan aturan komposisi, warna, tipografi, dan image treatment.|Aplikasi pada touchpoint nyata yang disepakati.|Visual guidelines, template, asset library, dan usage rules sesuai scope.',
    'Pahami bisnis dan audiens: Tentukan masalah komunikasi dan konteks penggunaannya.|Petakan pesan dan persepsi: Tentukan apa yang perlu dipahami, dirasakan, dan diingat.|Tentukan arah visual: Terjemahkan makna menjadi konsep dan bahasa visual yang tepat.|Bangun sistem: Tetapkan aturan agar aset berikutnya tetap terasa seperti brand yang sama.|Terapkan: Bawa sistem ke format dan touchpoint nyata.|Validasi dan serahkan: Periksa kejelasan, konsistensi, dan kemudahan penggunaan; bekali tim dengan panduan.',
    [('Apakah Visual Strategy hanya membuat ilustrasi?','Ilustrasi adalah salah satu medium. Kami mulai dari masalah komunikasi, lalu menentukan apakah ilustrasi, diagram, iconography, motion, atau information design paling membantu.'),('Apakah harus disertai proyek website atau social?','Tidak. Visual Strategy dapat berdiri sendiri sebagai strategi visual, brand illustration system, information design, atau campaign dan digital visual system. Sistem yang sama juga dapat memperkuat layanan lain.'),('Bisakah tim kami memakai sistemnya sendiri?','Kemudahan penggunaan menjadi bagian dari handover. Guidelines, template, asset library, dan aturan penggunaan disusun sesuai scope agar tim dapat melanjutkan sistem tanpa kehilangan ide dasarnya.')])

service('en','visual-strategy','Visual Strategy',
    'Make your brand easier to understand, recognize, and remember.',
    'Start with what people need to understand, then build a distinctive visual language that works across touchpoints.',
    'We translate business goals, audience needs, and meaning into a visual communication system. Concepts, illustration, diagrams, iconography, and motion are chosen around what people need to understand and remember.',
    '/assets/why/purposeful-craft.webp',
    'Meaning before style.|Clarity before decoration.|System before assets.',
    'A strong offer is still difficult to explain visually.|The brand feels different across its touchpoints.|Your team has many assets but struggles to build on them.',
    'The medium and style are chosen before the message and audience needs.|Composition, color, typography, imagery, and motion do not share a common language.|Outputs are handed over without rules, templates, and context for using them.',
    'People can miss important information or misunderstand the value of your offer.|The brand becomes harder to recognize and remember consistently.|Each new requirement restarts the design decisions from the beginning.',
    'The core message, priority information, complexity, and intended perception.|Visual direction across the website, social, campaigns, and sales material.|Guidelines, templates, the asset library, everyday use, and room to grow.',
    'Businesses with products, processes, or expertise that benefit from visual explanation.|Brands that want stronger recognition and more consistent communication.|Teams that need a visual system they can use and develop.',
    'Business, audience, communication objectives, and message and perception mapping.|Visual concepts, art direction, and key visual exploration with clear rationale.|Illustration, iconography, information design, composition, and motion principles as needed.|Application across website, social, campaigns, presentations, or sales material.|Clarity and consistency validation, guidelines, templates, and handover.',
    'A visual strategy brief and message & perception map.|Visual direction with concepts, references, and the reasoning behind them.|A system of composition, color, typography, and image-treatment rules.|Applications across agreed real-world touchpoints.|Visual guidelines, templates, an asset library, and usage rules within scope.',
    'Understand the business and audience: Define the communication problem and its context.|Map message and perception: Decide what people should understand, feel, and remember.|Find the visual direction: Translate meaning into a relevant concept and visual language.|Build the system: Set the rules that keep future assets recognizable as the same brand.|Apply it: Bring the system to life in real formats and touchpoints.|Validate and hand over: Check clarity, consistency, and usability, then equip the team with guidance.',
    [('Is Visual Strategy only about illustration?','Illustration is one possible medium. We start with the communication problem, then decide whether illustration, diagrams, iconography, motion, or information design is most useful.'),('Does it require a website or social project?','No. Visual Strategy can stand alone as visual strategy, a brand illustration system, information design, or a campaign and digital visual system. It can also strengthen other services.'),('Can our team use the system independently?','Everyday usability is part of the handover. Guidelines, templates, the asset library, and usage rules follow the agreed scope so your team can build on the system without losing its central idea.')])

schema = '''/** Public adaptation of Kultivate Services.docx, supplied 15 September 2026. */
export interface ServiceDetail {
  id: string; title: string; slug: string; tagline: string; summary: string;
  description: string; image: string; principles: string[];
  problemsSolved: string[]; problemCauses: string[]; impacts: string[]; inspections: string[];
  whoItIsFor: string[]; scope: string[]; deliverables: string[]; process: string[];
  faqs: { question: string; answer: string }[];
}

export const servicesData: Record<'id' | 'en', ServiceDetail[]> = '''
(ROOT / 'src/data/services.ts').write_text(schema + json.dumps(data, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
print('Wrote four complete services in both locales.')
