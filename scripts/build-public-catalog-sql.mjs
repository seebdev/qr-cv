import fs from 'node:fs/promises';
const bundle = JSON.parse(await fs.readFile('content/portfolio/catalog.json', 'utf8'));
const payload = JSON.stringify(bundle.items.map(({ project, cover }) => ({ project, cover })));
if (payload.includes('$catalog$')) throw Error('SQL delimiter collision');
const sql = `-- Adds the six PUBLIC portfolio projects and their cover references.
-- Run AFTER setup-new-project.sql, not instead of it.
-- No secrets, users, schema changes or deletion. Existing rows are preserved.
-- Images ship with the app and are served only after anonymous RLS validation.
begin;
do $import$
declare
  item jsonb;
  entries jsonb := $catalog$${payload}$catalog$::jsonb;
begin
  for item in select value from jsonb_array_elements(entries) loop
    insert into public.projects
    select p.* from jsonb_populate_record(null::public.projects,
      (item->'project') || jsonb_build_object('created_at', now(), 'updated_at', now())) p
    where true on conflict do nothing;

    if exists (select 1 from public.projects
      where id=(item->'project'->>'id')::uuid and slug=item->'project'->>'slug') then
      insert into public.project_media
      select m.* from jsonb_populate_record(null::public.project_media,
        (item->'cover') || jsonb_build_object('created_at', now())) m
      where true on conflict do nothing;
    end if;
  end loop;
end $import$;
commit;
select slug, published, featured from public.projects
where slug in (${bundle.items.map(i => "'" + i.project.slug.replaceAll("'", "''") + "'").join(', ')})
order by featured_order;
`;
await fs.writeFile('supabase/import-public-portfolio.sql', sql);
console.log('Created SQL import for ' + bundle.items.length + ' public projects.');
