import { createClient } from '@supabase/supabase-js';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url || !['127.0.0.1', 'localhost'].includes(new URL(url).hostname))
  throw new Error('Local cleanup only.');
const client = createClient(url, process.env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});
const { data, error } = await client
  .from('projects')
  .select('id,project_media(storage_path)')
  .like('slug', 'e2e-demo-%')
  .like('title_en', 'E2E demo project %');
if (error) throw error;
for (const p of data) {
  const paths = p.project_media.map((m) => m.storage_path);
  await client.from('projects').delete().eq('id', p.id);
  if (paths.length) await client.storage.from('portfolio').remove(paths);
}
process.stdout.write('Removed ' + data.length + ' temporary E2E projects.\n');
