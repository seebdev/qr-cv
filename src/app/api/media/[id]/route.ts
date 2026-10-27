import { publicClient } from '@/lib/supabase/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { bundledCover } from '@/lib/bundled-cover';

// Resolve media on demand: lazy images must not contain an expiring signed URL.
// The anonymous client enforces both project visibility and Storage RLS.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response(null, { status: 404 });
  const client = publicClient();
  const { data: media, error } = await client.from('project_media').select('id,project_id,storage_path').eq('id', id).maybeSingle();
  if (error || !media) return new Response(null, { status: 404 });
  // Initial captures have immutable IDs/paths; admin uploads always receive new paths.
  // Check anonymous RLS first even for local assets, so unpublishing takes effect.
  const bundled = bundledCover(media);
  if (bundled) {
    try {
      const width = new URL(request.url).searchParams.get('w');
      const file = width === '480' || width === '960'
        ? bundled.file.replace('.webp', '-' + width + '.webp') : bundled.file;
      const bytes = await readFile(path.join(process.cwd(), 'content', 'portfolio', file));
      return new Response(new Uint8Array(bytes), { headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      } });
    } catch { return new Response(null, { status: 404 }); }
  }
  const { data, error: downloadError } = await client.storage.from('portfolio').download(media.storage_path);
  if (downloadError || !data) return new Response(null, { status: 404 });
  return new Response(data, { headers: {
    'Content-Type': data.type || 'application/octet-stream',
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff',
  } });
}
