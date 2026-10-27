-- Supabase default privileges can grant more than an explicit GRANT suggests.
-- RLS remains the row boundary; this migration also narrows table privileges.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
do $$ declare table_name text; begin
 foreach table_name in array array[
 'projects','technologies','project_technologies','project_media','project_metrics',
 'site_settings','experience','contact_messages','analytics_events'
 ] loop
 execute format('revoke all on public.%I from anon, authenticated',table_name);
 execute format('grant select,insert,update,delete on public.%I to authenticated',table_name);
 end loop;
 foreach table_name in array array[
 'projects','technologies','project_technologies','project_media','project_metrics','site_settings','experience'
 ] loop
 execute format('grant select on public.%I to anon',table_name);
 end loop;
end $$;
