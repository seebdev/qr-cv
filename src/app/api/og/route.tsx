import { isLocale } from '@/lib/locales';
import { ImageResponse } from 'next/og';
import { getProjects, getSettings } from '@/lib/data';
import { localized } from '@/lib/types';
export async function GET(request: Request) {
  const u = new URL(request.url),
    locale = isLocale(u.searchParams.get('locale') || '')
      ? (u.searchParams.get('locale') as import('@/lib/types').Locale)
      : 'en',
    slug = u.searchParams.get('slug'),
    s = await getSettings();
  const p = slug ? (await getProjects()).find((x) => x.slug === slug) : null;
  return new ImageResponse(
    <div
      style={{
        background: '#F7F5F0',
        color: '#102A43',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 80,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', fontSize: 24, color: '#153E75' }}>s. / {s.name}</div>
      <div style={{ display: 'flex', fontSize: 78, letterSpacing: -4, maxWidth: 1000 }}>
        {p ? localized(p, 'title', locale) : localized(s, 'headline', locale)}
      </div>
      <div style={{ display: 'flex', fontSize: 22, color: '#526174' }}>
        {p
          ? localized(p, 'short_description', locale)
          : localized(s, 'bio', locale)}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
