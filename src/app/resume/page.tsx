import { redirect } from 'next/navigation';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getSettings, assetUrl } from '@/lib/data';
import { dictionary, isLocale } from '@/lib/i18n';
export default async function Resume() {
  const s = await getSettings(),
    url = await assetUrl(s.resume_path);
  if (url) redirect(url);
  const preference = (await cookies()).get('portfolio_locale')?.value || 'en';
  const locale = isLocale(preference) ? preference : 'en',
    t = dictionary(locale);
  return (
    <main className="center-page">
      <span className="code">/ resume</span>
      <h1>{t.noResume}</h1>
      <p className="muted">{t.resumeContact}</p>
      <Link className="button primary" href={`/${locale}#contact`}>
        {t.contactCta} ↗
      </Link>
    </main>
  );
}
