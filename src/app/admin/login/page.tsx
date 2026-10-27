import Link from 'next/link';
import { LoginForm } from '@/components/admin/forms';
import { configured } from '@/lib/supabase/server';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin sign in',
  robots: { index: false, follow: false },
};
export default function Login() {
  return (
    <main className="login-wrap">
      <div className="login-card">
        <Link className="brand" href="/en">
          <span className="brand-mark">s.</span>SEBASTIÁN / STUDIO
        </Link>
        <h1>Welcome back.</h1>
        <p>A private space to manage your work.</p>
        {!configured() && (
          <div className="notice">
            Supabase configuration is required. Follow the README to connect this installation.
          </div>
        )}
        <LoginForm disabled={!configured()} />
        <Link className="text-link muted" style={{ marginTop: 25 }} href="/en">
          ← Back to portfolio
        </Link>
      </div>
    </main>
  );
}
