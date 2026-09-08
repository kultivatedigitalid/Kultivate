export type FounderLocale = 'en' | 'id';

export const founderIdentity = {
  name: 'Galdino, Hans',
  role: 'Founder & CEO',
  slug: 'galdino-hans',
  portrait: '',
  teachingImage: '',
} as const;

export const founderCopy = {
  en: {
    heroDescription: 'Founder & CEO of Kultivate.',
    metaDescription: 'Meet Galdino, Hans, Founder & CEO of Kultivate, and explore his approach to clear, context-led digital work.',
    introductionTitle: 'A founder profile in progress',
    introductionBody: 'Development placeholder: the verified biography and background of Galdino, Hans will be added here after founder review.',
    portraitLabel: 'Founder portrait placeholder',
    portraitAlt: 'Development placeholder reserved for the final portrait of Galdino, Hans',
    storyTitle: 'The story behind Kultivate',
    storyBody: 'Development placeholder: the founder’s personal path and the verified story behind Kultivate will be published here after review.',
    philosophyTitle: 'Working philosophy',
    philosophyQuote: 'A good website should help people understand your business, trust it, and know what to do next. Kultivate starts with your context first, so every recommendation has a clear business reason behind it.',
    expertiseTitle: 'Areas of expertise',
    expertiseIntro: 'Verified expertise descriptions are still being prepared. These placeholders reserve the final structure without publishing unconfirmed claims.',
    expertise: [
      {
        title: 'Expertise area 01',
        description: 'Development placeholder: final expertise description awaiting verified founder input.',
      },
      {
        title: 'Expertise area 02',
        description: 'Development placeholder: final expertise description awaiting verified founder input.',
      },
      {
        title: 'Expertise area 03',
        description: 'Development placeholder: final expertise description awaiting verified founder input.',
      },
    ],
    experienceTitle: 'Experience and credibility',
    experienceIntro: 'This section will only publish information that has been reviewed and approved by the founder.',
    experience: [
      ['Background', 'Development placeholder: verified professional background to be added.'],
      ['Experience', 'Development placeholder: verified experience and responsibilities to be added.'],
      ['Credentials', 'Development placeholder: verified achievements or credentials to be added.'],
    ],
    insightsTitle: 'Selected Insights by Galdino, Hans',
    insightsBody: 'Recent notes on search, websites, and the decisions that connect them.',
    readInsight: 'Read article',
    learnTitle: 'Learn the thinking behind the work',
    learnBody: 'Explore short learning series built from the questions businesses face before choosing a direction.',
    learnCta: 'Explore Learn',
    backAbout: 'Back to About Us',
    shortBio: 'Development placeholder: a verified short biography for Galdino, Hans will be added after founder review.',
    profileCta: 'View founder profile',
  },
  id: {
    heroDescription: 'Founder & CEO Kultivate.',
    metaDescription: 'Kenali Galdino, Hans, Founder & CEO Kultivate, serta pendekatannya terhadap pekerjaan digital yang jelas dan berbasis konteks.',
    introductionTitle: 'Profil founder sedang disiapkan',
    introductionBody: 'Placeholder pengembangan: biografi dan latar belakang terverifikasi Galdino, Hans akan ditambahkan setelah ditinjau oleh founder.',
    portraitLabel: 'Placeholder foto founder',
    portraitAlt: 'Placeholder pengembangan untuk foto final Galdino, Hans',
    storyTitle: 'Cerita di balik Kultivate',
    storyBody: 'Placeholder pengembangan: perjalanan personal founder dan cerita terverifikasi di balik Kultivate akan dipublikasikan setelah ditinjau.',
    philosophyTitle: 'Filosofi kerja',
    philosophyQuote: 'Website yang baik harus membantu orang memahami bisnis Anda, mempercayainya, dan tahu langkah berikutnya. Kultivate selalu mulai dari konteks Anda, agar setiap rekomendasi memiliki alasan bisnis yang jelas.',
    expertiseTitle: 'Area expertise',
    expertiseIntro: 'Deskripsi expertise terverifikasi masih disiapkan. Placeholder ini menjaga struktur final tanpa mempublikasikan klaim yang belum dikonfirmasi.',
    expertise: [
      {
        title: 'Area expertise 01',
        description: 'Placeholder pengembangan: deskripsi final menunggu input founder yang sudah diverifikasi.',
      },
      {
        title: 'Area expertise 02',
        description: 'Placeholder pengembangan: deskripsi final menunggu input founder yang sudah diverifikasi.',
      },
      {
        title: 'Area expertise 03',
        description: 'Placeholder pengembangan: deskripsi final menunggu input founder yang sudah diverifikasi.',
      },
    ],
    experienceTitle: 'Pengalaman dan kredibilitas',
    experienceIntro: 'Bagian ini hanya akan mempublikasikan informasi yang telah ditinjau dan disetujui oleh founder.',
    experience: [
      ['Latar belakang', 'Placeholder pengembangan: latar belakang profesional terverifikasi akan ditambahkan.'],
      ['Pengalaman', 'Placeholder pengembangan: pengalaman dan tanggung jawab terverifikasi akan ditambahkan.'],
      ['Kredensial', 'Placeholder pengembangan: pencapaian atau kredensial terverifikasi akan ditambahkan.'],
    ],
    insightsTitle: 'Insight pilihan dari Galdino, Hans',
    insightsBody: 'Catatan terbaru tentang search, website, dan keputusan yang menghubungkan keduanya.',
    readInsight: 'Baca artikel',
    learnTitle: 'Pelajari cara berpikir di balik pekerjaan',
    learnBody: 'Jelajahi series singkat yang dibangun dari pertanyaan bisnis sebelum menentukan arah.',
    learnCta: 'Jelajahi Learn',
    backAbout: 'Kembali ke About Us',
    shortBio: 'Placeholder pengembangan: biografi singkat terverifikasi Galdino, Hans akan ditambahkan setelah ditinjau oleh founder.',
    profileCta: 'Lihat profil founder',
  },
} satisfies Record<FounderLocale, Record<string, unknown>>;

export const founderProfilePath = (locale: FounderLocale) =>
  `/${locale}/about/${founderIdentity.slug}/`;

export const founderPersonEntity = (origin: string, locale: FounderLocale) => ({
  '@type': 'Person',
  name: founderIdentity.name,
  url: new URL(founderProfilePath(locale), origin).href,
  jobTitle: founderIdentity.role,
  worksFor: {
    '@type': 'Organization',
    name: 'Kultivate',
    url: origin,
  },
});

export const founderPersonSchema = (origin: string, locale: FounderLocale) => ({
  '@context': 'https://schema.org',
  ...founderPersonEntity(origin, locale),
});
