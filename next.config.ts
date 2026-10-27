import type { NextConfig } from 'next';
const origin = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
const storage = new URL(origin),
  local = ['127.0.0.1', 'localhost'].includes(storage.hostname);
const config: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: storage.protocol.replace(':', '') as 'http' | 'https',
        hostname: storage.hostname,
        port: storage.port,
        pathname: '/storage/v1/**',
      },
    ],
    dangerouslyAllowLocalIP: local,
    formats: ['image/webp'],
    minimumCacheTTL: 300,
  },
  experimental: { serverActions: { bodySizeLimit: '2mb' } },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'" +
              (process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : '') +
              "; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: " +
              origin +
              "; media-src 'self' blob: " +
              origin +
              "; connect-src 'self' " +
              origin +
              (local ? ' ws://127.0.0.1:*' : '') +
              "; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
          },
          ...((process.env.NEXT_PUBLIC_SITE_URL || '').startsWith('https:')
            ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }]
            : []),
        ],
      },
    ];
  },
};
export default config;
