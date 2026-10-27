import type { Settings } from './types';
import { redesignCopy } from './redesign-copy';
import { locales } from './locales';
const en = redesignCopy('en'),
  es = redesignCopy('es');
export const defaultSettings: Settings = {
  id: true,
  name: 'Sebastián Solórzano',
  headline_en: en.headline,
  headline_es: es.headline,
  bio_en: en.bio,
  bio_es: es.bio,
  about_en: en.aboutDefault,
  about_es: es.aboutDefault,
  email: 'sebastianssc01@gmail.com',
  github_url: '',
  linkedin_url: '',
  resume_path: '',
  photo_path: '',
  available: true,
  location_en: 'Colombia',
  location_es: 'Colombia',
  seo_description_en: en.bio,
  seo_description_es: es.bio,
  translations: Object.fromEntries(
    locales.map((l) => {
      const t = redesignCopy(l);
      return [
        l,
        {
          headline: t.headline,
          bio: t.bio,
          about: t.aboutDefault,
          location: 'Colombia',
          seo_description: t.bio,
        },
      ];
    }),
  ),
};
