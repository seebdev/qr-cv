import { isLocale } from '@/lib/locales';
import { authCookieOptions } from '@/lib/cookie-options';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
export async function proxy(request: NextRequest) {
  const h = new Headers(request.headers);
  const locale = request.nextUrl.pathname.split('/')[1];
  h.set('x-portfolio-locale', isLocale(locale) ? locale : 'en');
  let response = NextResponse.next({ request: { headers: h } });
  if (
    !request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/api/admin')
  )
    return response;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
    return response;
  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookieOptions: authCookieOptions,
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(values) {
          values.forEach(({ name, value }) => request.cookies.set(name, value));
          h.set('cookie', request.cookies.toString());
          response = NextResponse.next({ request: { headers: h } });
          values.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );
  await client.auth.getClaims();
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
export const config = {
  matcher: [
    '/en/:path*',
    '/es/:path*',
    '/fr/:path*',
    '/de/:path*',
    '/it/:path*',
    '/zh/:path*',
    '/ja/:path*',
    '/pt/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
