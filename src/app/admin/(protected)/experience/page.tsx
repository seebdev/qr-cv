import { requireAdmin } from '@/lib/auth';
import { ExperienceForm, DeleteButton } from '@/components/admin/forms';
export default async function ExperiencePage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from('experience').select('*').order('display_order');
  if (error) throw error;
  return (
    <>
      <div className="admin-top">
        <h1>Experience</h1>
      </div>
      <p className="muted">
        Optional. Add only real roles and contributions. Unpublished entries stay private.
      </p>
      <details className="panel">
        <summary>+ Add experience</summary>
        <ExperienceForm />
      </details>
      {data?.map((e) => (
        <details className="panel" key={e.id}>
          <summary>
            {e.company} · {e.role_en}
          </summary>
          <ExperienceForm experience={e} />
          <DeleteButton table="experience" id={e.id} />
        </details>
      ))}
    </>
  );
}
