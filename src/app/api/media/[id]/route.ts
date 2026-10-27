import { publicClient } from '@/lib/supabase/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import catalog from '../../../../../content/portfolio/catalog.json';

// Resolve media on demand: lazy images must not contain an expiring signed URL.
// The anonymous client enforces both project visibility and Storage RLS.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response(null, { status: 404 });
  const client = publicClient();
  const { data: media, error } = await client.from('project_media').select('id,project_id,storage_path').eq('id', id).maybeSingle();
  if (error || !media) return new Response(null, { status: 404 });
  const { data, error: downloadError } = await client.storage.from('portfolio').download(media.storage_path);
  if (downloadError || !data) {
    // Only a media row visible through anonymous RLS can use a bundled cover.
    // Unpublishing still returns 404 above, including for these initial projects.
    const bundled = catalog.items.find(item => item.cover.id === media.id &&
      item.cover.project_id === media.project_id && item.cover.storage_path === media.storage_path);
    if (!bundled) return new Response(null, { status: 404 });
    try {
      const bytes = await readFile(path.join(process.cwd(), 'content', 'portfolio', bundled.file));
      return new Response(new Uint8Array(bytes), { headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      } });
    } catch { return new Response(null, { status: 404 }); }
  }
  return new Response(data, { headers: {
    'Content-Type': data.type || 'application/octet-stream',
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff',
  } });
}
