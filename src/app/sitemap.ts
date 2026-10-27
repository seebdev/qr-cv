export const dynamic = 'force-dynamic';
import { locales, languageAlternates } from '@/lib/locales';
import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/data';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    projects = await getProjects();
  return locales.flatMap((locale) => [
    {
      url: base + '/' + locale,
      changeFrequency: 'monthly' as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates()).map(([l, p]) => [l, base + p]),
        ),
      },
    },
    ...projects.map((p) => ({
      url: `${base}/${locale}/projects/${p.slug}`,
      lastModified: p.updated_at,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates('/projects/' + p.slug)).map(([l, path]) => [
            l,
            base + path,
          ]),
        ),
      },
    })),
  ]);
}
