import { requireAdmin } from '@/lib/auth';
import { TechnologyForm, DeleteButton } from '@/components/admin/forms';
export default async function Technologies() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from('technologies').select('*').order('name');
  if (error) throw error;
  return (
    <>
      <div className="admin-top">
        <h1>Technologies</h1>
      </div>
      <TechnologyForm />
      {!data?.length && <p className="muted">No technologies yet.</p>}
      {data?.map((t) => (
        <details className="panel" key={t.id}>
          <summary>{t.name}</summary>
          <TechnologyForm technology={t} />
          <DeleteButton table="technologies" id={t.id} />
        </details>
      ))}
    </>
  );
}
