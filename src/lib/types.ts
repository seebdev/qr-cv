import type { Locale, Translations } from './locales';
export type { Locale } from './locales';
export const textFields = [
  'title',
  'short_description',
  'description',
  'case_study',
  'problem',
  'solution',
  'role',
  'contribution',
  'architecture',
  'challenges',
  'decisions',
  'results',
  'learnings',
  'features',
  'duration',
] as const;
export type TextField = (typeof textFields)[number];
export type Translated = Record<`${TextField}_${'en' | 'es'}`, string>;
export type Technology = { id: string; name: string; slug: string; icon: string };
export type Media = {
  translations?: Translations;
  id: string;
  project_id: string;
  storage_path: string;
  kind: 'image' | 'video';
  alt_en: string;
  alt_es: string;
  display_order: number;
  is_cover: boolean;
  url?: string;
};
export type Metric = {
  translations?: Translations;
  id?: string;
  label_en: string;
  label_es: string;
  value: string;
  display_order: number;
};
export type Project = Translated & {
  translations?: Translations;
  id: string;
  slug: string;
  category: string;
  project_type: string;
  year: number;
  start_date: string | null;
  end_date: string | null;
  status: string;
  github_url: string;
  live_url: string;
  external_url: string;
  video_url: string;
  repository_visibility: 'public' | 'private' | 'none';
  featured: boolean;
  featured_order: number;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  project_media: Media[];
  project_metrics: Metric[];
  project_technologies: { technologies: Technology }[];
};
export type Settings = {
  translations?: Translations;
  id: boolean;
  name: string;
  headline_en: string;
  headline_es: string;
  bio_en: string;
  bio_es: string;
  about_en: string;
  about_es: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  resume_path: string;
  photo_path: string;
  available: boolean;
  location_en: string;
  location_es: string;
  seo_description_en: string;
  seo_description_es: string;
};
export type Experience = {
  translations?: Translations;
  id: string;
  company: string;
  role_en: string;
  role_es: string;
  description_en: string;
  description_es: string;
  start_date: string;
  end_date: string | null;
  technologies: string[];
  display_order: number;
  published: boolean;
};
export function localized(item: object, field: string, locale: Locale): string {
  const value = item as Record<string, unknown>;
  const translations = value.translations as Translations | undefined;
  return String(
    value[`${field}_${locale}`] ||
      translations?.[locale]?.[field] ||
      value[`${field}_en`] ||
      value[`${field}_es`] ||
      '',
  );
}
export const categories = [
  'AI',
  'Full Stack',
  'Web Apps',
  'Business Systems',
  'Automation',
  'Frontend',
  'Backend',
  'Experiments',
] as const;
