import { idTranslations } from './id';
import { enTranslations } from './en';

export const translations = {
  id: idTranslations,
  en: enTranslations
};

/**
 * Helper to get active locale translation text
 */
export function useTranslations(locale: 'id' | 'en') {
  return function t(key: keyof typeof idTranslations): string {
    const localeDict = translations[locale] || idTranslations;
    return localeDict[key] || idTranslations[key] || String(key);
  };
}

/**
 * Returns the equivalent route in another locale.
 * Assumes the URL pathname begins with /id/ or /en/
 */
export function getAlternateLocalePath(pathname: string, targetLocale: 'id' | 'en'): string {
  if (!/^\/(id|en)(\/|$)/.test(pathname)) return `/${targetLocale}/`;

  const cleanPath = pathname.replace(/^\/(id|en)/, '');
  // Normalize double slashes
  const pathPart = cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath;
  return `/${targetLocale}${pathPart}`;
}
