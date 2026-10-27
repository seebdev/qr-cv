import Link from 'next/link';
import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth';
import { logout } from '../actions';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Portfolio admin',
  robots: { index: false, follow: false },
};
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="brand" href="/admin">
          <span className="brand-mark">s.</span>STUDIO / ADMIN
        </Link>
        <nav aria-label="Administration">
          {[
            ['/admin', 'Projects'],
            ['/admin/technologies', 'Technologies'],
            ['/admin/experience', 'Experience'],
            ['/admin/messages', 'Messages'],
            ['/admin/analytics', 'Analytics'],
            ['/admin/settings', 'Settings'],
            ['/en', 'View portfolio ↗'],
          ].map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <form action={logout}>
          <button className="button small">Sign out</button>
        </form>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
