'use client';
import { usePathname } from 'next/navigation';
import { isLocale, dictionary } from '@/lib/i18n';
export default function ErrorPage({ retry }: { retry: () => void }) {
  const l = usePathname().split('/')[1],
    t = dictionary(isLocale(l) ? l : 'en');
  return (
    <main className="center-page">
      <h1>{t.error}</h1>
      <button className="button primary" onClick={retry}>
        {t.retry}
      </button>
    </main>
  );
}
