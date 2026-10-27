import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { projectSelect } from '@/lib/data';
import type { Project } from '@/lib/types';
import { ProjectActions } from '@/components/admin/forms';
export default async function Dashboard() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from('projects')
    .select(projectSelect)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  const projects = (data || []) as unknown as Project[];
  const stats = [
    ['Total projects', projects.length],
    ['Published', projects.filter((p) => p.published).length],
    ['Drafts', projects.filter((p) => !p.published).length],
    ['Featured', projects.filter((p) => p.featured).length],
  ];
  return (
    <>
      <div className="admin-top">
        <div>
          <span className="eyebrow">YOUR WORK, IN ONE PLACE</span>
          <h1>Projects</h1>
        </div>
        <Link className="button primary" href="/admin/projects/new">
          + New project
        </Link>
      </div>
      <div className="admin-stats">
        {stats.map(([label, value]) => (
          <div className="stat" key={label}>
            <span className="mono muted">{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      {projects.length ? (
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {['Project', 'Status', 'Featured', 'Year', 'Updated', 'Actions'].map((x) => (
                  <th key={x} scope="col">
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.title_en}
                    <br />
                    <span className="mono muted">{p.slug}</span>
                  </td>
                  <td>
                    <span className={'badge ' + (!p.published ? 'draft' : '')}>
                      {p.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{p.featured ? 'Yes · ' + p.featured_order : '—'}</td>
                  <td>{p.year}</td>
                  <td>{new Date(p.updated_at).toISOString().slice(0, 10)}</td>
                  <td>
                    <ProjectActions project={p} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-empty">
          <h2>No projects yet.</h2>
          <p>Your next case study starts here.</p>
          <Link className="button" href="/admin/projects/new">
            Create your first project →
          </Link>
        </div>
      )}
    </>
  );
}
