import fs from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url || !['localhost', '127.0.0.1'].includes(new URL(url).hostname)) throw Error('Export is local only.');
// Export only rows and assets already readable by an anonymous visitor.
const db = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false } });
const catalog = JSON.parse(await fs.readFile('scripts/portfolio-catalog.json', 'utf8'));
const check = ({ data, error }) => { if (error) throw error; return data; };
await fs.mkdir('content/portfolio', { recursive: true });
const items = [];
for (const entry of catalog) {
  const row = check(await db.from('projects').select('*,project_media(*)').eq('slug', entry.slug).eq('published', true).single());
  const { project_media: media, ...project } = row;
  delete project.created_at;
  delete project.updated_at;
  const cover = media.find(m => m.is_cover && m.kind === 'image');
  if (!cover) throw Error('Missing cover: ' + entry.slug);
  const image = check(await db.storage.from('portfolio').download(cover.storage_path));
  const file = entry.slug + '.webp';
  await fs.writeFile('content/portfolio/' + file, Buffer.from(await image.arrayBuffer()));
  const publicMedia = { ...cover };
  delete publicMedia.created_at;
  items.push({ project, cover: publicMedia, file });
}
await fs.writeFile('content/portfolio/catalog.json', JSON.stringify({ target: 'xmuwahdcpujesxcykqrt.supabase.co', items }, null, 2) + '\n');
console.log('Exported ' + items.length + ' published projects and their covers. No users or private records exported.');
