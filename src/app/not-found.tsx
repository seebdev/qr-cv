import Link from 'next/link';
import { headers } from 'next/headers';
import { isLocale, dictionary } from '@/lib/i18n';
export default async function NotFound() {
  const l = (await headers()).get('x-portfolio-locale') || 'en';
  const locale = isLocale(l) ? l : 'en',
    t = dictionary(locale);
  return (
    <main className="center-page">
      <span className="code">404</span>
      <h1>{t.notFound}</h1>
      <Link className="button primary" href={'/' + locale}>
        {t.home} →
      </Link>
    </main>
  );
}
