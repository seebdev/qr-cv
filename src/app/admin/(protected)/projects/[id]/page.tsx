import { notFound } from 'next/navigation';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { projectSelect, withMedia } from '@/lib/data';
import type { Project } from '@/lib/types';
import { ProjectForm } from '@/components/admin/forms';
import { MediaManager } from '@/components/admin/media-manager';
export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  if (!z.uuid().safeParse(id).success) notFound();
  const [{ data: p, error: projectError }, { data: technologies, error }] = await Promise.all([
    supabase.from('projects').select(projectSelect).eq('id', id).maybeSingle(),
    supabase.from('technologies').select('*').order('name'),
  ]);
  if (projectError) throw new Error('Could not load the project.');
  if (error) throw error;
  if (!p) notFound();
  const project = await withMedia(p as unknown as Project, true);
  return (
    <>
      <div className="admin-top">
        <div>
          <span className="eyebrow">EDIT PROJECT</span>
          <h1>{project.title_en}</h1>
        </div>
      </div>
      <ProjectForm project={project} technologies={technologies || []} />
      <div style={{ marginTop: 35 }}>
        <MediaManager projectId={id} media={project.project_media} />
      </div>
    </>
  );
}
