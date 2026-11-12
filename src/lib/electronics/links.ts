import type { Locale } from '../locales';
export const electronicsSlug = 'demo-electronics';
export const electronicsUrl = 'https://demo-electronics.onrender.com/clients';
export const electronicsPath = (locale: Locale) => `/${locale}/projects/${electronicsSlug}`;
export const electronicsStack = ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'OpenAI'];
