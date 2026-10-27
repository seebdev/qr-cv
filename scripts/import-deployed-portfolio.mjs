import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const check = ({ data, error }) => { if (error) throw error; return data; };
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');

export async function importPortfolio(db, bundle, readImage, log = console.log) {
  // Read the destination schema and visibility before changing anything.
  const rows = check(await db.from('projects').select('id,slug,published,translations'));
  check(await db.from('project_media').select('id,translations').limit(1));
  const bucket = check(await db.storage.getBucket('portfolio'));
  if (bucket.public) throw Error('The portfolio bucket must remain private.');
  for (const { project, cover, file } of bundle.items) {
    const existing = rows.find(p => p.slug === project.slug || p.id === project.id);
    if (existing && (existing.id !== project.id || existing.slug !== project.slug)) {
      log('Conservado (identidad distinta): ' + project.slug);
      continue;
    }
    const existingCover = existing && check(await db.from('project_media').select('id').eq('project_id', existing.id).eq('is_cover', true).maybeSingle());
    if (existingCover) {
      log('Conservado: ' + project.slug + (existing.published ? '' : ' (sin publicar)'));
      continue;
    }
    const bytes = await readImage(file);
    const previous = await db.storage.from('portfolio').download(cover.storage_path);
    if (previous.data) {
      if (hash(Buffer.from(await previous.data.arrayBuffer())) !== hash(bytes)) throw Error('Existing image differs; preserved: ' + project.slug);
    } else {
      const status = String(previous.error?.statusCode || previous.error?.status || '');
      if (!['400', '404'].includes(status) || !/not found|does not exist/i.test(previous.error?.message || '')) throw previous.error || Error('Could not inspect image.');
      check(await db.storage.from('portfolio').upload(cover.storage_path, bytes, { contentType: 'image/webp', upsert: false }));
    }
    if (!existing) check(await db.from('projects').insert(project));
    check(await db.from('project_media').insert(cover));
    log('Importado: ' + project.slug);
  }
  const visible = check(await db.from('projects').select('id').in('slug', bundle.items.map(i => i.project.slug)).eq('published', true));
  log('Catálogo: ' + visible.length + '/' + bundle.items.length + ' proyectos publicados.');
}

async function main() {
  if (process.argv.includes('--if-enabled') && process.env.IMPORT_PORTFOLIO !== 'true') {
    console.log('Importación omitida: configura IMPORT_PORTFOLIO=true o ejecuta npm run content:import.');
    return;
  }
  const root = new URL('../content/portfolio/', import.meta.url);
  const bundle = JSON.parse(await fs.readFile(new URL('catalog.json', root), 'utf8'));
  const url = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || '');
  if (url.protocol !== 'https:' || url.hostname !== bundle.target) throw Error('Importación limitada al Supabase de qr-cv: ' + bundle.target);
  if (!process.env.SUPABASE_SECRET_KEY) throw Error('Añade SUPABASE_SECRET_KEY en Environment de Render. Nunca en NEXT_PUBLIC_* ni en Git.');
  const db = createClient(url.origin, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  await importPortfolio(db, bundle, file => {
    if (!/^[a-z0-9-]+\.webp$/.test(file)) throw Error('Invalid asset filename');
    return fs.readFile(new URL(file, root));
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    // Never serialize the client, request headers or environment into logs.
    console.error('Importación fallida:', error.message || 'Error de Supabase', error.code || '');
    process.exitCode = 1;
  });
}
