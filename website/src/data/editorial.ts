export type Locale = 'id' | 'en';

export interface EditorialItem {
  slug: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  alt: string;
}

export const editorialItems: Record<Locale, EditorialItem[]> = {
  id: [
    { slug: 'website-sebagai-pusat-sistem', category: 'Website', title: 'Perjelas langkah berikutnya', summary: 'Hubungkan pertanyaan yang dicari pelanggan dengan penjelasan yang jelas tentang apa yang bisnis Anda tawarkan.', date: '12 Agustus 2026', image: '/assets/blog/digital-center.webp', alt: 'Bidang kaca biru sebagai pusat dari beberapa jalur cahaya' },
    { slug: 'seo-sebelum-keyword', category: 'SEO', title: 'SEO dimulai sebelum keyword dipilih', summary: 'Struktur yang jelas membuat maksud pencarian dan nilai bisnis bertemu lebih cepat.', date: '4 Agustus 2026', image: '/assets/blog/search-intent.webp', alt: 'Garis cahaya melewati lapisan ruang menuju satu bukaan' },
    { slug: 'konten-dimulai-dari-sistem', category: 'Content', title: 'Konten yang berguna dimulai dari pertanyaan pelanggan', summary: 'Proses yang praktis mengubah pertanyaan tersebut menjadi halaman yang dapat terus diperbarui oleh tim Anda.', date: '28 Juli 2026', image: '/assets/blog/content-system.webp', alt: 'Urutan objek modular biru yang bergerak dalam satu ritme' },
    { slug: 'kecepatan-dan-positioning', category: 'Website', title: 'Kecepatan adalah bagian dari positioning', summary: 'Performa website memengaruhi kemudahan pelanggan memahami dan menggunakan apa yang Anda tawarkan.', date: '19 Juli 2026', image: '/assets/portfolio/lumen.webp', alt: 'Garis cahaya presisi menghubungkan cakram metalik' },
    { slug: 'setelah-ditemukan', category: 'Growth', title: 'Ditemukan saja belum cukup', summary: 'Halaman setelah klik perlu melanjutkan pertanyaan dan memperjelas langkah berikutnya.', date: '10 Juli 2026', image: '/assets/portfolio/naru.webp', alt: 'Patung energi kaca dengan aliran cahaya biru' },
    { slug: 'arah-sebelum-channel', category: 'Strategy', title: 'Mulai dari prioritas yang jelas sebelum menambah channel', summary: 'Pilih pekerjaan yang menjawab kebutuhan saat ini sebelum memperluas cakupan.', date: '2 Juli 2026', image: '/assets/portfolio/sora.webp', alt: 'Interior terhubung oleh pencahayaan biru yang tenang' }
  ],
  en: [
    { slug: 'website-as-the-system-center', category: 'Website', title: 'Make the next step clear', summary: 'Connect the questions customers search with a clear explanation of what your business offers.', date: '12 August 2026', image: '/assets/blog/digital-center.webp', alt: 'A blue glass plane at the center of several paths of light' },
    { slug: 'seo-before-keywords', category: 'SEO', title: 'SEO starts before a keyword is chosen', summary: 'Clear structure helps search intent and business value meet sooner.', date: '4 August 2026', image: '/assets/blog/search-intent.webp', alt: 'A line of light moving through layered space toward one opening' },
    { slug: 'content-starts-with-a-system', category: 'Content', title: 'Useful content starts with customer questions', summary: 'A practical process turns those questions into pages your team can keep current.', date: '28 July 2026', image: '/assets/blog/content-system.webp', alt: 'A sequence of blue modular objects moving in one rhythm' },
    { slug: 'speed-and-positioning', category: 'Website', title: 'Speed is part of your positioning', summary: 'Website performance affects how easily customers can understand and use what you offer.', date: '19 July 2026', image: '/assets/portfolio/lumen.webp', alt: 'A precise line of light connecting metallic discs' },
    { slug: 'what-happens-after-discovery', category: 'Growth', title: 'Being found is only the beginning', summary: 'The page after the click needs to continue the question and make the next step clear.', date: '10 July 2026', image: '/assets/portfolio/naru.webp', alt: 'A glass energy sculpture carrying blue light' },
    { slug: 'direction-before-channels', category: 'Strategy', title: 'Start with a clear priority before adding more channels', summary: 'Choose the work that addresses the current need before expanding the scope.', date: '2 July 2026', image: '/assets/portfolio/sora.webp', alt: 'An interior connected by calm blue light' }
  ]
};
