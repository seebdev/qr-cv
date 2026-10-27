import 'server-only';
import { redirect } from 'next/navigation';
import { configured, serverClient } from './supabase/server';
export async function requireAdmin() {
  if (!configured()) redirect('/admin/login?setup=1');
  const supabase = await serverClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect('/admin/login');
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .maybeSingle();
  if (profileError) throw new Error('Could not verify administrator access. Try again.');
  if (!profile?.is_admin) {
    await supabase.auth.signOut();
    redirect('/admin/login?denied=1');
  }
  return { supabase, user };
}
