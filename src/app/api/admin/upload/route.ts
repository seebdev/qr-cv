import sharp from 'sharp';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { sameOrigin, limitedBody } from '@/lib/http';
import { detectFile } from '@/lib/validation';
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { supabase } = await requireAdmin();
  try {
    const bytes = await limitedBody(request, 26 * 1024 * 1024);
    const form = await new Response(bytes.buffer as ArrayBuffer, {
      headers: { 'content-type': request.headers.get('content-type') || '' },
    }).formData();
    const file = form.get('file');
    if (!(file instanceof File) || !file.size) throw new Error('Select a file.');
    const kind = z.enum(['project', 'resume', 'photo']).parse(form.get('kind'));
    const buffer = new Uint8Array(await file.arrayBuffer()),
      type = detectFile(buffer);
    if (!type || file.type !== type.mime) throw new Error('Unsupported or mismatched file type.');
    const max = type.kind === 'video' ? 25 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > max) throw new Error('File is too large. Images/PDF: 10 MB; videos: 25 MB.');
    if (
      (kind === 'resume' && type.kind !== 'document') ||
      (kind === 'photo' && type.kind !== 'image') ||
      (kind === 'project' && type.kind === 'document')
    )
      throw new Error('This file type is not allowed here.');
    if (type.kind === 'image') {
      try {
        await sharp(Buffer.from(buffer), {
          limitInputPixels: 25_000_000,
          animated: true,
        }).toBuffer();
      } catch {
        throw new Error('Image is damaged or exceeds 25 megapixels.');
      }
    }
    const projectId = kind === 'project' ? z.uuid().parse(form.get('project_id')) : null;
    const alt_en = String(form.get('alt_en') || '').trim(),
      alt_es = String(form.get('alt_es') || '').trim();
    if (kind === 'project' && (!alt_en || !alt_es || alt_en.length > 300 || alt_es.length > 300))
      throw new Error('Add English and Spanish alternative text.');
    if (projectId) {
      const { data: p } = await supabase.from('projects').select('id').eq('id', projectId).single();
      if (!p) throw new Error('Project not found.');
    }
    const path = (projectId || kind) + '/' + crypto.randomUUID() + '.' + type.ext;
    const { error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(path, buffer, { contentType: type.mime, upsert: false, cacheControl: '300' });
    if (uploadError) throw new Error('Upload failed. Try again.');
    let oldPath = '';
    let savedError;
    if (kind === 'project') {
      const { count } = await supabase
        .from('project_media')
        .select('id', { count: 'exact', head: true })
        .eq('project_id', projectId);
      const { error } = await supabase.from('project_media').insert({
        project_id: projectId,
        storage_path: path,
        kind: type.kind,
        alt_en,
        alt_es,
        display_order: count || 0,
        is_cover: false,
      });
      savedError = error;
    } else {
      const { data: s } = await supabase
        .from('site_settings')
        .select('resume_path,photo_path')
        .eq('id', true)
        .single();
      oldPath = (kind === 'resume' ? s?.resume_path : s?.photo_path) || '';
      const { error } = await supabase
        .from('site_settings')
        .update({ [kind + '_path']: path })
        .eq('id', true);
      savedError = error;
    }
    if (savedError) {
      await supabase.storage.from('portfolio').remove([path]);
      throw new Error('Could not save file details.');
    }
    if (oldPath) await supabase.storage.from('portfolio').remove([oldPath]);
    revalidatePath('/', 'layout');
    return NextResponse.json({ ok: true, path }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Upload failed.' },
      { status: 400 },
    );
  }
}
