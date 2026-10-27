import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';
import { importPortfolio } from './import-deployed-portfolio.mjs';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url || !['localhost', '127.0.0.1'].includes(new URL(url).hostname)) throw Error('Local test only');
const db = createClient(url, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } });
const check = ({ data, error }) => { if (error) throw error; return data; };
const source = JSON.parse(await fs.readFile('content/portfolio/catalog.json', 'utf8'));
const item = structuredClone(source.items[0]);
const id = randomUUID();
item.project.id = id;
item.project.slug = 'import-check-' + id;
item.cover.id = randomUUID();
item.cover.project_id = id;
item.cover.storage_path = id + '/import-check.webp';
const bundle = { items: [item] };
const read = file => fs.readFile('content/portfolio/' + file);
try {
  await importPortfolio(db, bundle, read);
  assert.equal(check(await db.from('project_media').select('id').eq('project_id', id)).length, 1);
  check(await db.storage.from('portfolio').download(item.cover.storage_path));
  // Reruns must preserve an administrator's decision to edit and unpublish.
  check(await db.from('projects').update({ title_es: 'Editado por administrador', published: false }).eq('id', id));
  await importPortfolio(db, bundle, read);
  const saved = check(await db.from('projects').select('title_es,published').eq('id', id).single());
  assert.equal(saved.title_es, 'Editado por administrador');
  assert.equal(saved.published, false);
  assert.equal(check(await db.from('project_media').select('id').eq('project_id', id)).length, 1);
  // A partial import can restore a missing cover without republishing a draft.
  check(await db.from('project_media').delete().eq('project_id', id));
  await importPortfolio(db, bundle, read);
  assert.equal(check(await db.from('projects').select('published').eq('id', id).single()).published, false);
  console.log('PASS: fresh import, private image upload, repeat, preserved edits/drafts and partial recovery.');
} finally {
  check(await db.from('projects').delete().eq('id', id));
  check(await db.storage.from('portfolio').remove([item.cover.storage_path]));
}
