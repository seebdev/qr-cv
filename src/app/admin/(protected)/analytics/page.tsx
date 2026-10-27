import { daysAgo } from '@/lib/time';
import { requireAdmin } from '@/lib/auth';
export default async function Analytics() {
  const { supabase } = await requireAdmin();
  const since = daysAgo(30);
  const { data, error } = await supabase
    .from('analytics_events')
    .select('event,project_id,projects(title_en)')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(1000);
  if (error) throw error;
  const rows = data || [],
    events = ['project_view', 'live_demo_click', 'github_click', 'contact_click', 'resume_click'],
    counts = new Map<string, number>();
  for (const r of rows.filter((x) => x.event === 'project_view')) {
    const p = r.projects as unknown as { title_en: string } | null;
    const name = p?.title_en || 'Deleted project';
    counts.set(name, (counts.get(name) || 0) + 1);
  }
  return (
    <>
      <div className="admin-top">
        <h1>Analytics</h1>
        <span className="mono muted">LAST 30 DAYS · LATEST 1,000 EVENTS</span>
      </div>
      {process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'true' && (
        <div className="notice">
          Analytics is disabled. Set NEXT_PUBLIC_ANALYTICS_ENABLED=true and rebuild to enable
          anonymous event counts. No cookies or personal profiles are created.
        </div>
      )}
      <div className="admin-stats">
        {events.map((event) => (
          <div className="stat" key={event}>
            <span className="mono muted">{event.replaceAll('_', ' ')}</span>
            <strong>{rows.filter((x) => x.event === event).length}</strong>
          </div>
        ))}
      </div>
      <section className="panel">
        <h2>Most viewed projects</h2>
        {[...counts]
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => (
            <p key={name}>
              {name} <span className="accent">{count}</span>
            </p>
          ))}
        {!counts.size && <p className="muted">No project views recorded.</p>}
      </section>
    </>
  );
}
