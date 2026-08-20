export type Locale = 'en' | 'id';

export function composePageTitle(title: string | undefined, siteName: string, tagline: string) {
  if (!title) return `${siteName} — ${tagline}`;
  if (new RegExp(`(?:^|[|—-]\\s*)${siteName}$`, 'i').test(title.trim())) return title.trim();
  return title.toLowerCase().includes(siteName.toLowerCase()) ? title.trim() : `${title.trim()} | ${siteName}`;
}

export function localeCode(locale: Locale) {
  return locale === 'id' ? 'id-ID' : 'en';
}

export function openGraphLocale(locale: Locale) {
  return locale === 'id' ? 'id_ID' : 'en_US';
}

export function organizationSchema(origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kultivate',
    url: origin,
    logo: new URL('/kultivate-logo.svg', origin).href,
  };
}

export function websiteSchema(origin: string, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kultivate',
    url: new URL(`/${locale}/`, origin).href,
    inLanguage: localeCode(locale),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
