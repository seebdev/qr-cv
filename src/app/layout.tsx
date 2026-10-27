import { isLocale } from '@/lib/locales';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import localFont from 'next/font/local';
import './globals.css';
import './redesign.css';
const sans = localFont({
  src: '../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  variable: '--font-manrope',
  display: 'optional',
  preload: true,
  fallback: ['Arial'],
  adjustFontFallback: 'Arial',
});
const mono = localFont({
  src: '../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
  variable: '--font-jetbrains',
  display: 'optional',
  preload: false,
  adjustFontFallback: false,
});
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Sebastián Solórzano — Full-Stack Developer',
    template: '%s · Sebastián Solórzano',
  },
  description: 'Full-stack developer building AI tools, business platforms and automation systems.',
  robots: { index: true, follow: true },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers(),
    locale = isLocale(h.get('x-portfolio-locale') || '') ? h.get('x-portfolio-locale')! : 'en';
  return (
    <html lang={locale} className={sans.variable + ' ' + mono.variable}>
      <body>{children}</body>
    </html>
  );
}
