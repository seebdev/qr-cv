import { isLocale } from '@/lib/locales';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function Home() {
  const locale = (await cookies()).get('portfolio_locale')?.value;
  redirect('/' + (locale && isLocale(locale) ? locale : 'en'));
}
