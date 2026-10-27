import { requireAdmin } from '@/lib/auth';
import { SettingsForm } from '@/components/admin/forms';
import { AssetManager } from '@/components/admin/media-manager';
import type { Settings } from '@/lib/types';
export default async function SettingsPage() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from('site_settings').select('*').eq('id', true).single();
  if (error) throw error;
  const s = data as Settings;
  return (
    <>
      <div className="admin-top">
        <h1>Site settings</h1>
      </div>
      <SettingsForm settings={s} />
      <div style={{ marginTop: 30 }}>
        <AssetManager kind="resume" path={s.resume_path} />
        <AssetManager kind="photo" path={s.photo_path} />
      </div>
    </>
  );
}
