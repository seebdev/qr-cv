import type { Locale } from '@/lib/types';
export function Flag({ locale }: { locale: Locale }) {
  const stripes: Partial<Record<Locale, string[]>> = {
    es: ['#fcd116', '#003893', '#ce1126'],
    de: ['#111', '#d00', '#ffce00'],
    fr: ['#0055a4', '#fff', '#ef4135'],
    it: ['#009246', '#fff', '#ce2b37'],
  };
  const colors = stripes[locale];
  return (
    <svg viewBox="0 0 30 20" width="24" height="16" aria-hidden="true" className="flag">
      {colors ? (
        colors.map((c, i) => (
          <rect
            key={c}
            fill={c}
            x={locale === 'fr' || locale === 'it' ? i * 10 : 0}
            y={
              locale === 'fr' || locale === 'it'
                ? 0
                : locale === 'es'
                  ? [0, 10, 15][i]
                  : (i * 20) / 3
            }
            width={locale === 'fr' || locale === 'it' ? 10 : 30}
            height={
              locale === 'fr' || locale === 'it' ? 20 : locale === 'es' ? [10, 5, 5][i] : 20 / 3
            }
          />
        ))
      ) : locale === 'en' ? (
        <>
          <rect width="30" height="20" fill="white" />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} y={(i * 20) / 7} width="30" height="1.54" fill="#b22234" />
          ))}
          <rect width="13" height="11" fill="#3c3b6e" />
          {Array.from({ length: 12 }, (_, i) => (
            <circle
              key={i}
              cx={2 + (i % 4) * 3}
              cy={2 + Math.floor(i / 4) * 3}
              r=".6"
              fill="white"
            />
          ))}
        </>
      ) : locale === 'ja' ? (
        <>
          <rect width="30" height="20" fill="white" />
          <circle cx="15" cy="10" r="6" fill="#bc002d" />
        </>
      ) : locale === 'zh' ? (
        <>
          <rect width="30" height="20" fill="#de2910" />
          <path fill="#ffde00" d="m6 3 1 3h3L8 8l1 3-3-2-3 2 1-3-2-2h3Z" />
          <circle cx="13" cy="4" r="1" fill="#ffde00" />
          <circle cx="15" cy="7" r="1" fill="#ffde00" />
          <circle cx="15" cy="11" r="1" fill="#ffde00" />
        </>
      ) : (
        <>
          <rect width="30" height="20" fill="#009739" />
          <path d="m15 2 13 8-13 8L2 10Z" fill="#ffdf00" />
          <circle cx="15" cy="10" r="5" fill="#002776" />
          <path d="M11 8q5 0 8 4" stroke="white" fill="none" />
        </>
      )}
    </svg>
  );
}
