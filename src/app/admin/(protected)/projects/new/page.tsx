import { requireAdmin } from '@/lib/auth';
import { ProjectForm } from '@/components/admin/forms';
export default async function NewProject() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from('technologies').select('*').order('name');
  if (error) throw error;
  return (
    <>
      <div className="admin-top">
        <div>
          <span className="eyebrow">START A NEW STORY</span>
          <h1>New project</h1>
        </div>
      </div>
      <ProjectForm technologies={data || []} />
    </>
  );
}
