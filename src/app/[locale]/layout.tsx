import { notFound } from 'next/navigation';
import { FloatingContact } from '@/components/floating-contact';
import { dictionary, isLocale } from '@/lib/i18n';
import { getSettings, getExperience } from '@/lib/data';
import { Header, Footer } from '@/components/navigation';
export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const [settings, experience] = await Promise.all([getSettings(), getExperience()]);
  return (
    <>
      <a className="skip" href="#main">
        {dictionary(locale).skip}
      </a>
      <Header locale={locale} settings={settings} hasExperience={experience.length > 0} />
      {children}
      <FloatingContact locale={locale} />
      <Footer locale={locale} settings={settings} />
    </>
  );
}
