import { test, expect } from 'vitest';
import { locales, languageAlternates } from '../src/lib/locales';
import { localized } from '../src/lib/types';
import { dictionary } from '../src/lib/i18n';
import { translationsSchema } from '../src/lib/validation';
test('all public languages have complete redesign copy and routes', () => {
  for (const l of locales) {
    const t = dictionary(l);
    expect(t.headline).toBeTruthy();
    expect(t.steps.split('|')).toHaveLength(4);
    expect(languageAlternates('/projects/example')[l]).toBe('/' + l + '/projects/example');
  }
});
test('content fallback is explicit and original columns remain editable', () => {
  const p = {
    title_en: 'Edited title',
    title_es: 'Título',
    translations: { en: { title: 'Old title' }, fr: { title: 'Titre' } },
  };
  expect(localized(p, 'title', 'en')).toBe('Edited title');
  expect(localized(p, 'title', 'fr')).toBe('Titre');
  expect(localized(p, 'title', 'ja')).toBe('Edited title');
  expect(localized({}, 'title', 'zh')).toBe('');
});
test('translation validation accepts partial locales and rejects unexpected languages', () => {
  expect(translationsSchema.safeParse({ fr: { title: 'Titre' } }).success).toBe(true);
  expect(translationsSchema.safeParse({ xx: { title: 'x' } }).success).toBe(false);
});
