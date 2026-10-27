export const locales = ['es', 'en', 'fr', 'de', 'it', 'zh', 'ja', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const languageNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  zh: '简体中文',
  ja: '日本語',
  pt: 'Português',
};
export const regions: Record<Locale, string> = {
  es: 'es_CO',
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
  it: 'it_IT',
  zh: 'zh_CN',
  ja: 'ja_JP',
  pt: 'pt_BR',
};
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const languageAlternates = (suffix = '') =>
  Object.fromEntries(locales.map((l) => [l, `/${l}${suffix}`]));
export type Translations = Partial<Record<Locale, Record<string, string>>>;
export function formTranslations(form: FormData): Translations {
  const result: Translations = {};
  for (const [key, value] of form) {
    const [prefix, locale, field] = key.split('.');
    if (prefix === 'translation' && isLocale(locale) && field && typeof value === 'string')
      (result[locale] ??= {})[field] = value;
  }
  return result;
}
