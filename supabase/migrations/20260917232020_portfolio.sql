-- Reproducible portfolio schema. No professional claims or demo projects.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated, service_role;

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 is_admin boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
grant select on public.profiles to authenticated;
create policy profile_self on public.profiles for select to authenticated using (id=(select auth.uid()));
-- Admin membership can only be set by the trusted provisioning script / SQL owner.
create function private.is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select (select auth.uid()) is not null and exists(select 1 from public.profiles where id=(select auth.uid()) and is_admin);
$$;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated, service_role;

create table public.projects (
 id uuid primary key default gen_random_uuid(),
 slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 title_en text not null default '',
title_es text not null default '',
short_description_en text not null default '',
short_description_es text not null default '',
description_en text not null default '',
description_es text not null default '',
case_study_en text not null default '',
case_study_es text not null default '',
problem_en text not null default '',
problem_es text not null default '',
solution_en text not null default '',
solution_es text not null default '',
role_en text not null default '',
role_es text not null default '',
contribution_en text not null default '',
contribution_es text not null default '',
architecture_en text not null default '',
architecture_es text not null default '',
challenges_en text not null default '',
challenges_es text not null default '',
decisions_en text not null default '',
decisions_es text not null default '',
results_en text not null default '',
results_es text not null default '',
learnings_en text not null default '',
learnings_es text not null default '',
features_en text not null default '',
features_es text not null default '',
duration_en text not null default '',
duration_es text not null default '',
 category text not null default 'Full Stack' check(category in ('AI','Full Stack','Web Apps','Business Systems','Automation','Frontend','Backend','Experiments')),
 project_type text not null default '', year integer not null default extract(year from now()) check(year between 1990 and 2100),
 start_date date, end_date date,
 status text not null default 'completed' check(status in ('completed','in-progress','maintained','archived')),
 github_url text not null default '' check(github_url='' or github_url ~ '^https://'),
 live_url text not null default '' check(live_url='' or live_url ~ '^https://'),
 external_url text not null default '' check(external_url='' or external_url ~ '^https://'),
 video_url text not null default '' check(video_url='' or video_url ~ '^https://'),
 repository_visibility text not null default 'none' check(repository_visibility in ('public','private','none')),
 featured boolean not null default false, featured_order integer not null default 0,
 display_order integer not null default 0, published boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check(end_date is null or start_date is null or end_date>=start_date),
 check(not published or (length(trim(title_en))>0 and length(trim(title_es))>0 and length(trim(short_description_en))>0 and length(trim(short_description_es))>0))
);
create index projects_published_order on public.projects(display_order,year desc) where published;
create index projects_featured_order on public.projects(featured_order) where published and featured;
create index projects_category on public.projects(category) where published;

create table public.technologies (
 id uuid primary key default gen_random_uuid(), name text not null unique,
 slug text not null unique check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'), icon text not null default ''
);
create table public.project_technologies (
 project_id uuid not null references public.projects on delete cascade,
 technology_id uuid not null references public.technologies on delete cascade,
 primary key(project_id,technology_id)
);
create index project_technologies_technology on public.project_technologies(technology_id);
create table public.project_media (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects on delete cascade,
 storage_path text not null unique, kind text not null check(kind in ('image','video')),
 alt_en text not null default '', alt_es text not null default '',
 display_order integer not null default 0, is_cover boolean not null default false,
 created_at timestamptz not null default now(), check(not is_cover or kind='image')
);
create index project_media_project on public.project_media(project_id,display_order);
create unique index one_cover_per_project on public.project_media(project_id) where is_cover;
create table public.project_metrics (
 id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects on delete cascade,
 label_en text not null, label_es text not null, value text not null,
 display_order integer not null default 0
);
create index project_metrics_project on public.project_metrics(project_id);
create table public.site_settings (
 id boolean primary key default true check(id),
 name text not null default 'Sebastián Solórzano',
 headline_en text not null default E'I build systems,\nnot just websites.',
 headline_es text not null default E'Construyo sistemas,\nno solo sitios web.',
 bio_en text not null default 'Full-stack developer building AI-powered tools, business platforms, automation systems and digital products from idea to production.',
 bio_es text not null default 'Desarrollador full-stack de herramientas con IA, plataformas empresariales, automatizaciones y productos digitales, desde la idea hasta producción.',
 about_en text not null default '', about_es text not null default '',
 email text not null default '', github_url text not null default '', linkedin_url text not null default '',
 resume_path text not null default '', photo_path text not null default '',
 available boolean not null default true, location_en text not null default 'Colombia', location_es text not null default 'Colombia',
 seo_description_en text not null default 'Sebastián Solórzano — full-stack developer building AI tools, business platforms and automation systems. Available worldwide.',
 seo_description_es text not null default 'Sebastián Solórzano — desarrollador full-stack de herramientas con IA, plataformas empresariales y automatizaciones. Disponible globalmente.',
 updated_at timestamptz not null default now()
);
insert into public.site_settings(id) values(true);
create table public.experience (
 id uuid primary key default gen_random_uuid(), company text not null,
 role_en text not null default '', role_es text not null default '',
 description_en text not null default '', description_es text not null default '',
 start_date date not null, end_date date, technologies text[] not null default '{}',
 display_order integer not null default 0, published boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check(end_date is null or end_date>=start_date)
);
create table public.contact_messages (
 id uuid primary key default gen_random_uuid(), name text not null, email text not null,
 company text not null default '', message text not null, read boolean not null default false,
 created_at timestamptz not null default now()
);
create table public.analytics_events (
 id bigint generated always as identity primary key, event text not null check(event in ('project_view','live_demo_click','github_click','contact_click','resume_click')),
 project_id uuid references public.projects on delete set null,
 created_at timestamptz not null default now()
);
create index analytics_events_created on public.analytics_events(created_at);
create index analytics_events_project on public.analytics_events(project_id);
create table public.rate_limits (
 key text primary key, hits integer not null default 1, expires_at timestamptz not null
);
create index rate_limits_expiry on public.rate_limits(expires_at);
alter table public.rate_limits enable row level security;
revoke all on public.rate_limits from anon,authenticated;
grant all on public.rate_limits to service_role;

create function private.touch_updated_at() returns trigger language plpgsql set search_path='' as $$
begin new.updated_at=now(); return new; end;
$$;
do $$ declare t text; begin
 foreach t in array array['profiles','projects','site_settings','experience'] loop
 execute format('create trigger touch_updated_at before update on public.%I for each row execute function private.touch_updated_at()',t);
 end loop;
 foreach t in array array['projects','technologies','project_technologies','project_media','project_metrics','site_settings','experience','contact_messages','analytics_events'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('grant select,insert,update,delete on public.%I to authenticated',t);
 execute format('grant all on public.%I to service_role',t);
 execute format('create policy admin_all on public.%I for all to authenticated using ((select private.is_admin())) with check ((select private.is_admin()))',t);
 end loop;
 foreach t in array array['projects','technologies','project_technologies','project_media','project_metrics','site_settings','experience'] loop
 execute format('grant select on public.%I to anon',t);
 end loop;
 foreach t in array array['project_technologies','project_media','project_metrics'] loop
 execute format('create policy public_published on public.%I for select to anon,authenticated using (exists(select 1 from public.projects p where p.id=project_id and p.published))',t);
 end loop;
end $$;
grant all on public.profiles to service_role;
grant usage,select on sequence public.analytics_events_id_seq to service_role;
create policy projects_public on public.projects for select to anon,authenticated using(published);
create policy technologies_public on public.technologies for select to anon,authenticated using(true);
create policy settings_public on public.site_settings for select to anon,authenticated using(true);
create policy experience_public on public.experience for select to anon,authenticated using(published);

-- Atomic save of project + technology relationships + metrics. Invoker respects RLS.
create function public.save_project(p_project jsonb, p_technologies uuid[], p_metrics jsonb)
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
 insert into public.projects select item.*
 on conflict(id) do update set
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
 insert into public.project_metrics(project_id,label_en,label_es,value,display_order)
 values(item.id,metric->>'label_en',metric->>'label_es',metric->>'value',coalesce((metric->>'display_order')::integer,0));
 end loop;
 return item.id;
end;
$$;
revoke all on function public.save_project(jsonb,uuid[],jsonb) from public,anon;
grant execute on function public.save_project(jsonb,uuid[],jsonb) to authenticated;

create function public.set_project_cover(p_project uuid,p_media uuid) returns void
language plpgsql security invoker set search_path='' as $$
begin
 if not private.is_admin() then raise exception 'Forbidden' using errcode='42501'; end if;
 perform 1 from public.projects where id=p_project for update;
 if not exists(select 1 from public.project_media where id=p_media and project_id=p_project and kind='image') then raise exception 'Invalid image'; end if;
 update public.project_media set is_cover=false where project_id=p_project and is_cover;
 update public.project_media set is_cover=true where id=p_media and project_id=p_project;
end;
$$;
revoke all on function public.set_project_cover(uuid,uuid) from public,anon;
grant execute on function public.set_project_cover(uuid,uuid) to authenticated;

-- Only the server credential can invoke the atomic abuse limiter.
create function public.consume_rate_limit(p_key text,p_limit integer,p_seconds integer) returns boolean
language plpgsql security invoker set search_path='' as $$
declare count_now integer;
begin
 delete from public.rate_limits where expires_at<now() - interval '1 day';
 insert into public.rate_limits(key,hits,expires_at) values(p_key,1,now()+make_interval(secs=>p_seconds))
 on conflict(key) do update set hits=case when public.rate_limits.expires_at<now() then 1 else public.rate_limits.hits+1 end,
 expires_at=case when public.rate_limits.expires_at<now() then now()+make_interval(secs=>p_seconds) else public.rate_limits.expires_at end
 returning hits into count_now;
 return count_now<=p_limit;
end;
$$;
revoke all on function public.consume_rate_limit(text,integer,integer) from public,anon,authenticated;
grant execute on function public.consume_rate_limit(text,integer,integer) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('portfolio','portfolio',false,26214400,array['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','application/pdf']);
create policy portfolio_admin on storage.objects for all to authenticated
 using(bucket_id='portfolio' and (select private.is_admin()))
 with check(bucket_id='portfolio' and (select private.is_admin()));
create policy portfolio_public_read on storage.objects for select to anon,authenticated using(
 bucket_id='portfolio' and (
 exists(select 1 from public.project_media m join public.projects p on p.id=m.project_id where m.storage_path=name and p.published)
 or exists(select 1 from public.site_settings s where s.resume_path=name or s.photo_path=name)
 )
);
