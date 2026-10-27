-- Additive multilingual content; existing EN/ES fields, IDs and RLS stay intact.
begin;
alter table public.projects add column if not exists translations jsonb not null default '{}'::jsonb check (jsonb_typeof(translations) = 'object');
alter table public.site_settings add column if not exists translations jsonb not null default '{}'::jsonb check (jsonb_typeof(translations) = 'object');
alter table public.experience add column if not exists translations jsonb not null default '{}'::jsonb check (jsonb_typeof(translations) = 'object');
alter table public.project_media add column if not exists translations jsonb not null default '{}'::jsonb check (jsonb_typeof(translations) = 'object');
alter table public.project_metrics add column if not exists translations jsonb not null default '{}'::jsonb check (jsonb_typeof(translations) = 'object');
create or replace function public.save_project(p_project jsonb, p_technologies uuid[], p_metrics jsonb)
returns uuid language plpgsql security invoker set search_path='' as $$
declare item public.projects; existing public.projects; metric jsonb;
begin
 if not private.is_admin() then raise exception 'Forbidden' using errcode='42501'; end if;
 select * into existing from public.projects where id=(p_project->>'id')::uuid;
 if found then
  item=jsonb_populate_record(existing,p_project - 'created_at' - 'updated_at');
 else
  item=jsonb_populate_record(null::public.projects,p_project);
  item.id=coalesce(item.id,gen_random_uuid()); item.created_at=now(); item.updated_at=now();
 end if;
 item.translations=coalesce(item.translations,'{}'::jsonb);
 insert into public.projects select item.*
 on conflict(id) do update set
 translations=excluded.translations,
 title_en=excluded.title_en,
title_es=excluded.title_es,
short_description_en=excluded.short_description_en,
short_description_es=excluded.short_description_es,
description_en=excluded.description_en,
description_es=excluded.description_es,
case_study_en=excluded.case_study_en,
case_study_es=excluded.case_study_es,
problem_en=excluded.problem_en,
problem_es=excluded.problem_es,
solution_en=excluded.solution_en,
solution_es=excluded.solution_es,
role_en=excluded.role_en,
role_es=excluded.role_es,
contribution_en=excluded.contribution_en,
contribution_es=excluded.contribution_es,
architecture_en=excluded.architecture_en,
architecture_es=excluded.architecture_es,
challenges_en=excluded.challenges_en,
challenges_es=excluded.challenges_es,
decisions_en=excluded.decisions_en,
decisions_es=excluded.decisions_es,
results_en=excluded.results_en,
results_es=excluded.results_es,
learnings_en=excluded.learnings_en,
learnings_es=excluded.learnings_es,
features_en=excluded.features_en,
features_es=excluded.features_es,
duration_en=excluded.duration_en,
duration_es=excluded.duration_es,
slug=excluded.slug,
category=excluded.category,
project_type=excluded.project_type,
year=excluded.year,
start_date=excluded.start_date,
end_date=excluded.end_date,
status=excluded.status,
github_url=excluded.github_url,
live_url=excluded.live_url,
external_url=excluded.external_url,
video_url=excluded.video_url,
repository_visibility=excluded.repository_visibility,
featured=excluded.featured,
featured_order=excluded.featured_order,
display_order=excluded.display_order,
published=excluded.published;
 delete from public.project_technologies where project_id=item.id;
 insert into public.project_technologies(project_id,technology_id) select item.id,unnest(p_technologies);
 delete from public.project_metrics where project_id=item.id;
 for metric in select * from jsonb_array_elements(p_metrics) loop
 insert into public.project_metrics(project_id,label_en,label_es,value,display_order,translations)
 values(item.id,metric->>'label_en',metric->>'label_es',metric->>'value',coalesce((metric->>'display_order')::integer,0),coalesce(metric->'translations','{}'::jsonb));
 end loop;
 return item.id;
end;
$$;
revoke all on function public.save_project(jsonb,uuid[],jsonb) from public,anon;
grant execute on function public.save_project(jsonb,uuid[],jsonb) to authenticated;


notify pgrst, 'reload schema';
commit;
