/** All auth operations run on the server; client JavaScript never needs the session cookie. */
export const authCookieOptions = {
  httpOnly: true,
  secure: (process.env.NEXT_PUBLIC_SITE_URL || '').startsWith('https:'),
  sameSite: 'lax' as const,
  path: '/',
};
