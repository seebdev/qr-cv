import { publicClient } from '@/lib/supabase/server';

// Resolve media on demand: lazy images must not contain an expiring signed URL.
// The anonymous client enforces both project visibility and Storage RLS.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response(null, { status: 404 });
  const client = publicClient();
  const { data: media, error } = await client.from('project_media').select('storage_path').eq('id', id).maybeSingle();
  if (error || !media) return new Response(null, { status: 404 });
  const { data, error: downloadError } = await client.storage.from('portfolio').download(media.storage_path);
  if (downloadError || !data) return new Response(null, { status: 404 });
  return new Response(data, { headers: {
    'Content-Type': data.type || 'application/octet-stream',
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff',
  } });
}
