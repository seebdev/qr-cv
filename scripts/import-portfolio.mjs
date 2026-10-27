import fs from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import ts from 'typescript';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url || !['127.0.0.1', 'localhost'].includes(new URL(url).hostname))
  throw Error('Local development only; remote imports require separate authorization.');
const db = createClient(url, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } });
const check = ({ data, error }) => {
  if (error) throw error;
  return data;
};
const catalog = JSON.parse(await fs.readFile('scripts/portfolio-catalog.json', 'utf8'));
const usage = JSON.parse(await fs.readFile('scripts/portfolio-usage.json', 'utf8'));
const locales = ['es', 'en', 'fr', 'de', 'it', 'zh', 'ja', 'pt'];
const compiled = ts.transpileModule(await fs.readFile('src/lib/redesign-copy.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const ex = {};
new Function('exports', compiled)(ex);
const before = check(
  await db.from('projects').select('*,project_media(*),project_metrics(*),project_technologies(*)'),
);
await fs.mkdir('.local/redesign-backup', { recursive: true });
try {
  await fs.writeFile('.local/redesign-backup/catalog.json', JSON.stringify(before, null, 2), {
    flag: 'wx',
  });
} catch (e) {
  if (e.code !== 'EEXIST') throw e;
}
const settings = check(await db.from('site_settings').select('*').eq('id', true).single());
try {
  await fs.writeFile('.local/redesign-backup/settings.json', JSON.stringify(settings, null, 2), {
    flag: 'wx',
  });
} catch (e) {
  if (e.code !== 'EEXIST') throw e;
}
const fields = [
  'title',
  'short_description',
  'description',
  'case_study',
  'problem',
  'solution',
  'role',
  'contribution',
  'architecture',
  'challenges',
  'decisions',
  'results',
  'learnings',
  'features',
  'duration',
];
for (let i = 0; i < catalog.length; i++) {
  const p = catalog[i],
    existing = before.find((x) => x.live_url === p.url || x.slug === p.slug);
  const translations = {};
  for (let j = 0; j < locales.length; j++)
    translations[locales[j]] = {
      title: p.name,
      short_description: p.descriptions[j],
      description: p.descriptions[j],
      features: usage[i][j],
    };
  const data = {
    ...Object.fromEntries(fields.flatMap((f) => ['en', 'es'].map((l) => [f + '_' + l, '']))),
    slug: p.slug,
    category: p.category,
    project_type: 'showcase',
    year: 2026,
    status: 'in-progress',
    start_date: null,
    end_date: null,
    github_url: '',
    external_url: '',
    video_url: '',
    repository_visibility: 'none',
    live_url: p.url,
    featured: true,
    featured_order: i + 1,
    display_order: i + 1,
    published: true,
    translations,
  };
  for (const l of ['en', 'es'])
    for (const f of ['title', 'short_description', 'description', 'features'])
      data[f + '_' + l] = translations[l][f];
  // Existing authored content is preserved; the import only manages presentation/order and missing translations.
  const saved = existing
    ? check(
        await db
          .from('projects')
          .update({
            featured: true,
            featured_order: i + 1,
            display_order: i + 1,
            published: true,
            live_url: p.url,
            translations: { ...translations, ...existing.translations },
          })
          .eq('id', existing.id)
          .select()
          .single(),
      )
    : check(await db.from('projects').insert(data).select().single());
  if (p.slug !== 'la-parrilla' && !existing?.project_media?.some((m) => m.is_cover)) {
    const buffer = await sharp('.local/redesign-media/' + p.slug + '.png')
      .resize({ width: 1440, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    const path = saved.id + '/site-capture.webp';
    check(
      await db.storage
        .from('portfolio')
        .upload(path, buffer, { contentType: 'image/webp', upsert: true }),
    );
    check(
      await db.from('project_media').upsert(
        {
          project_id: saved.id,
          storage_path: path,
          kind: 'image',
          alt_en: p.name + ' — website screenshot',
          alt_es: p.name + ' — captura del sitio',
          is_cover: true,
          display_order: 0,
          translations: Object.fromEntries(
            locales.map((l) => [l, { alt: p.name + ' — ' + ex.redesignCopy(l).overview }]),
          ),
        },
        { onConflict: 'storage_path' },
      ),
    );
  }
  console.log(i + 1 + '. ' + p.name);
}
check(
  await db
    .from('projects')
    .update({ published: false, featured: false })
    .in('slug', [
      'visual-demo-orbit-crm',
      'visual-demo-atlas-ai',
      'visual-demo-flowdesk',
      'visual-demo-nexo-commerce',
      'visual-demo-pulse-analytics',
    ]),
);
const content = {};
const tr = { ...settings.translations };
for (const l of locales) {
  const t = ex.redesignCopy(l);
  const value = {
    headline: t.headline,
    bio: t.bio,
    seo_description: t.bio,
    about: t.aboutDefault,
    location: 'Colombia',
  };
  if (['es', 'en'].includes(l)) {
    for (const [k, v] of Object.entries(value)) content[k + '_' + l] = v;
  } else tr[l] = value;
}
check(
  await db
    .from('site_settings')
    .update({ ...content, translations: tr, email: 'sebastianssc01@gmail.com' })
    .eq('id', true),
);
console.log('Six featured projects; fictional demos retained privately. Local import complete.');
