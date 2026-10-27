import { NextResponse } from 'next/server';
import { configured, publicClient } from '@/lib/supabase/server';
export async function GET() {
  if (!configured()) return NextResponse.json({ status: 'unconfigured' }, { status: 503 });
  const { error } = await publicClient().from('site_settings').select('id').limit(1);
  return NextResponse.json(
    { status: error ? 'unavailable' : 'ok' },
    { status: error ? 503 : 200, headers: { 'Cache-Control': 'no-store' } },
  );
}
