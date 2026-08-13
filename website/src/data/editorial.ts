export type Locale = 'id' | 'en';

export interface PortfolioItem {
  brand: string;
  descriptor: string;
  image: string;
  alt: string;
  theme: string;
}

export interface EditorialItem {
  slug: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  alt: string;
}

export const portfolioItems: Record<Locale, PortfolioItem[]> = {
  id: [
    { brand: 'Naru', descriptor: 'Energi sehari-hari', image: '/assets/portfolio/naru.webp', alt: 'Hasil kerja Naru dengan patung energi kaca biru', theme: '#0b5bd7' },
    { brand: 'Sora', descriptor: 'Rumah lebih ringan', image: '/assets/portfolio/sora.webp', alt: 'Hasil kerja Sora dalam interior rumah bercahaya biru', theme: '#6882c9' },
    { brand: 'Lumen', descriptor: 'Finansial tanpa friksi', image: '/assets/portfolio/lumen.webp', alt: 'Hasil kerja Lumen dengan cakram presisi dan garis cahaya', theme: '#163a80' },
    { brand: 'Karsa', descriptor: 'Pangan lokal terhubung', image: '/assets/portfolio/karsa.webp', alt: 'Hasil kerja Karsa dengan hasil bumi dan kemasan berwarna biru', theme: '#b45b35' },
    { brand: 'Nadi', descriptor: 'Perawatan yang mengikuti', image: '/assets/portfolio/nadi.webp', alt: 'Hasil kerja Nadi dengan wearable kesehatan dan bentuk lembut', theme: '#8a8bd0' },
    { brand: 'Aruna', descriptor: 'Bergerak dengan yakin', image: '/assets/portfolio/aruna.webp', alt: 'Hasil kerja Aruna dengan transportasi elektrik di waktu senja', theme: '#10579f' },
    { brand: 'Tala', descriptor: 'Mobilitas yang terhubung', image: '/assets/portfolio/tala.webp', alt: 'Hasil kerja Tala dengan struktur transit urban berpendar biru', theme: '#176b8f' },
    { brand: 'Reka', descriptor: 'Ruang yang bekerja', image: '/assets/portfolio/reka.webp', alt: 'Hasil kerja Reka dengan susunan bidang arsitektur gelap', theme: '#334b65' },
    { brand: 'Aksa', descriptor: 'Belajar lebih terarah', image: '/assets/portfolio/aksa.webp', alt: 'Hasil kerja Aksa dengan lapisan halaman dan cahaya terarah', theme: '#3158a6' },
    { brand: 'Veda', descriptor: 'Wellbeing yang terjaga', image: '/assets/portfolio/veda.webp', alt: 'Hasil kerja Veda dengan wadah obsidian dalam cahaya biru', theme: '#36536b' },
    { brand: 'Loka', descriptor: 'Pengalaman yang berkesan', image: '/assets/portfolio/loka.webp', alt: 'Hasil kerja Loka dengan lorong arsitektur yang tenang', theme: '#17445b' },
    { brand: 'Svara', descriptor: 'Suara yang menemukan audiens', image: '/assets/portfolio/svara.webp', alt: 'Hasil kerja Svara dengan gelombang metalik biru', theme: '#1f4c87' }
  ],
  en: [
    { brand: 'Naru', descriptor: 'Everyday energy', image: '/assets/portfolio/naru.webp', alt: 'Naru project featuring a blue glass energy sculpture', theme: '#0b5bd7' },
    { brand: 'Sora', descriptor: 'Home made simple', image: '/assets/portfolio/sora.webp', alt: 'Sora project shown in a blue-lit residential interior', theme: '#6882c9' },
    { brand: 'Lumen', descriptor: 'Frictionless finance', image: '/assets/portfolio/lumen.webp', alt: 'Lumen project featuring precision discs and a line of light', theme: '#163a80' },
    { brand: 'Karsa', descriptor: 'Local food connected', image: '/assets/portfolio/karsa.webp', alt: 'Karsa project featuring local produce and blue packaging', theme: '#b45b35' },
    { brand: 'Nadi', descriptor: 'Care that follows', image: '/assets/portfolio/nadi.webp', alt: 'Nadi project featuring a health wearable and soft forms', theme: '#8a8bd0' },
    { brand: 'Aruna', descriptor: 'Move with confidence', image: '/assets/portfolio/aruna.webp', alt: 'Aruna project featuring electric transit at dusk', theme: '#10579f' },
    { brand: 'Tala', descriptor: 'Connected mobility', image: '/assets/portfolio/tala.webp', alt: 'Tala project featuring a blue-lit urban transit structure', theme: '#176b8f' },
    { brand: 'Reka', descriptor: 'Spaces that work', image: '/assets/portfolio/reka.webp', alt: 'Reka project featuring dark architectural planes', theme: '#334b65' },
    { brand: 'Aksa', descriptor: 'Learning with direction', image: '/assets/portfolio/aksa.webp', alt: 'Aksa project featuring layered pages and focused light', theme: '#3158a6' },
    { brand: 'Veda', descriptor: 'Wellbeing, sustained', image: '/assets/portfolio/veda.webp', alt: 'Veda project featuring an obsidian vessel in blue light', theme: '#36536b' },
    { brand: 'Loka', descriptor: 'A memorable stay', image: '/assets/portfolio/loka.webp', alt: 'Loka project featuring a calm architectural passage', theme: '#17445b' },
    { brand: 'Svara', descriptor: 'Sound finds its audience', image: '/assets/portfolio/svara.webp', alt: 'Svara project featuring a metallic blue sound wave', theme: '#1f4c87' }
  ]
};

export const editorialItems: Record<Locale, EditorialItem[]> = {
  id: [
    { slug: 'website-sebagai-pusat-sistem', category: 'Website', title: 'Website Anda bukan brosur. Ia adalah pusat sistem.', summary: 'Tempat pesan, pencarian, dan distribusi bertemu, lalu bergerak menuju satu tindakan.', date: '12 Agustus 2026', image: '/assets/blog/digital-center.webp', alt: 'Bidang kaca biru sebagai pusat dari beberapa jalur cahaya' },
    { slug: 'seo-sebelum-keyword', category: 'SEO', title: 'SEO dimulai sebelum keyword dipilih.', summary: 'Struktur yang jelas membuat maksud pencarian dan nilai bisnis bertemu lebih cepat.', date: '4 Agustus 2026', image: '/assets/blog/search-intent.webp', alt: 'Garis cahaya melewati lapisan ruang menuju satu bukaan' },
    { slug: 'konten-dimulai-dari-sistem', category: 'Social', title: 'Konten yang konsisten tidak dimulai dari kalender.', summary: 'Ia dimulai dari sistem yang cukup ringan untuk terus dijalankan.', date: '28 Juli 2026', image: '/assets/blog/content-system.webp', alt: 'Urutan objek modular biru yang bergerak dalam satu ritme' },
    { slug: 'kecepatan-dan-positioning', category: 'Website', title: 'Kecepatan adalah bagian dari positioning.', summary: 'Sebelum copy dibaca, performa sudah membentuk rasa percaya.', date: '19 Juli 2026', image: '/assets/portfolio/lumen.webp', alt: 'Garis cahaya presisi menghubungkan cakram metalik' },
    { slug: 'setelah-ditemukan', category: 'Growth', title: 'Ditemukan saja belum cukup.', summary: 'Perjalanan sesudah klik menentukan apakah perhatian berubah menjadi inquiry.', date: '10 Juli 2026', image: '/assets/portfolio/naru.webp', alt: 'Patung energi kaca dengan aliran cahaya biru' },
    { slug: 'arah-sebelum-channel', category: 'Strategy', title: 'Lebih banyak channel bukan selalu lebih banyak dampak.', summary: 'Arah yang sama mengalahkan aktivitas yang tersebar.', date: '2 Juli 2026', image: '/assets/portfolio/sora.webp', alt: 'Interior terhubung oleh pencahayaan biru yang tenang' }
  ],
  en: [
    { slug: 'website-as-the-system-center', category: 'Website', title: 'Your website is not a brochure. It is the center.', summary: 'Where messaging, search, and distribution meet, then move toward one action.', date: '12 August 2026', image: '/assets/blog/digital-center.webp', alt: 'A blue glass plane at the center of several paths of light' },
    { slug: 'seo-before-keywords', category: 'SEO', title: 'SEO starts before a keyword is chosen.', summary: 'Clear structure helps search intent and business value meet sooner.', date: '4 August 2026', image: '/assets/blog/search-intent.webp', alt: 'A line of light moving through layered space toward one opening' },
    { slug: 'content-starts-with-a-system', category: 'Social', title: 'Consistent content does not start with a calendar.', summary: 'It starts with a system light enough to keep running.', date: '28 July 2026', image: '/assets/blog/content-system.webp', alt: 'A sequence of blue modular objects moving in one rhythm' },
    { slug: 'speed-and-positioning', category: 'Website', title: 'Speed is part of your positioning.', summary: 'Before copy is read, performance has already shaped trust.', date: '19 July 2026', image: '/assets/portfolio/lumen.webp', alt: 'A precise line of light connecting metallic discs' },
    { slug: 'what-happens-after-discovery', category: 'Growth', title: 'Being found is only the beginning.', summary: 'What happens after the click decides whether attention becomes an inquiry.', date: '10 July 2026', image: '/assets/portfolio/naru.webp', alt: 'A glass energy sculpture carrying blue light' },
    { slug: 'direction-before-channels', category: 'Strategy', title: 'More channels do not always create more impact.', summary: 'Shared direction beats scattered activity.', date: '2 July 2026', image: '/assets/portfolio/sora.webp', alt: 'An interior connected by calm blue light' }
  ]
};