import { languageAlternates, regions } from '@/lib/locales';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjects, withMedia } from '@/lib/data';
import { isLocale } from '@/lib/i18n';
import { localized } from '@/lib/types';
import { CaseStudy } from '@/components/case-study';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const p = (await getProjects()).find((x) => x.slug === slug);
  if (!p) return { robots: { index: false, follow: false } };
  const title = localized(p, 'title', locale),
    description = localized(p, 'short_description', locale);
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: languageAlternates('/projects/' + slug),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: '/' + locale + '/projects/' + slug,
      locale: regions[locale],
      images: [`/api/og?slug=${slug}&locale=${locale}`],
    },
    twitter: { card: 'summary_large_image', images: [`/api/og?slug=${slug}&locale=${locale}`] },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const projects = await getProjects(),
    p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const next =
    projects.length > 1 ? projects[(projects.indexOf(p) + 1) % projects.length] : undefined;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: localized(p, 'title', locale),
    description: localized(p, 'short_description', locale),
    author: { '@type': 'Person', name: 'Sebastián Solórzano' },
    inLanguage: locale,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }}
      />
      <CaseStudy project={await withMedia(p)} locale={locale} next={next} />
    </>
  );
}
