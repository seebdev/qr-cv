import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ElectronicsShowcase } from '@/components/electronics/showcase';
import { electronicsCopy } from '@/lib/electronics/copy';
import { electronicsPath, electronicsSlug } from '@/lib/electronics/links';
import { showcaseMedia } from '@/lib/electronics/media';
import { getProjects } from '@/lib/data';
import { isLocale, languageAlternates, regions } from '@/lib/locales';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = electronicsCopy[locale];
  const title = `Electronic Parts Intelligence — ${t.badge}`;
  const url = electronicsPath(locale);
  const image = `${url}/opengraph-image`;
  return {
    title,
    description: t.summary,
    alternates: {
      canonical: url,
      languages: {
        ...languageAlternates(`/projects/${electronicsSlug}`),
        'x-default': electronicsPath('en'),
      },
    },
    openGraph: {
      title,
      description: t.summary,
      url,
      type: 'website',
      locale: regions[locale],
      alternateLocale: Object.values(regions).filter((region) => region !== regions[locale]),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description: t.summary, images: [image] },
  };
}

export default async function ElectronicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { videos, screens } = await showcaseMedia(await getProjects());
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Electronic Parts Intelligence',
    description: electronicsCopy[locale].summary,
    url: `${base}${electronicsPath(locale)}`,
    inLanguage: locale,
    author: { '@type': 'Person', name: 'Sebastián Solórzano' },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Electronic Parts Intelligence',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <ElectronicsShowcase locale={locale} screens={screens} videos={videos} />
    </>
  );
}
