'use server';
import { formTranslations } from '@/lib/locales';
import { translationsSchema } from '@/lib/validation';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { serverClient, configured } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';
import {
  projectSchema,
  metricSchema,
  settingsSchema,
  experienceSchema,
  slugify,
} from '@/lib/validation';
import { textFields, type Project } from '@/lib/types';
import { projectSelect } from '@/lib/data';
export type ActionState = { error?: string; success?: string; id?: string };
function refresh() {
  revalidatePath('/', 'layout');
}
function errorMessage(error: unknown) {
  return error instanceof z.ZodError
    ? error.issues
        .map((x) => x.message)
        .slice(0, 3)
        .join(' ')
    : 'The change could not be saved. Check your connection and try again.';
}
export async function login(_state: ActionState, form: FormData): Promise<ActionState> {
  if (!configured()) return { error: 'Configure Supabase before signing in.' };
  const parsed = z
    .object({ email: z.email(), password: z.string().min(8).max(256) })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: 'Enter a valid email and password.' };
  const supabase = await serverClient(),
    { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { error: 'Invalid credentials or access unavailable.' };
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', data.user.id)
    .single();
  if (!profile?.is_admin) {
    await supabase.auth.signOut();
    return { error: 'This account does not have administrator access.' };
  }
  redirect('/admin');
}
export async function logout() {
  const client = await serverClient();
  await client.auth.signOut();
  redirect('/admin/login');
}
export async function saveProject(_state: ActionState, form: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  try {
    const raw: Record<string, unknown> = {
      ...Object.fromEntries(form),
      translations: formTranslations(form),
    };
    for (const n of ['year', 'featured_order', 'display_order']) raw[n] = Number(raw[n] || 0);
    for (const b of ['featured', 'published']) raw[b] = raw[b] === 'on';
    for (const d of ['start_date', 'end_date']) raw[d] = raw[d] || null;
    if (!raw.id) delete raw.id;
    const project = projectSchema.parse(raw);
    const technologies = z.array(z.uuid()).max(50).parse(form.getAll('technologies'));
    const metrics = z
      .array(metricSchema)
      .max(20)
      .parse(JSON.parse(String(form.get('metrics') || '[]')));
    const { data, error } = await supabase.rpc('save_project', {
      p_project: project,
      p_technologies: technologies,
      p_metrics: metrics,
    });
    if (error) {
      if (error.code === '23505') return { error: 'This slug is already used by another project.' };
      throw error;
    }
    refresh();
    return { success: 'Project saved.', id: String(data) };
  } catch (e) {
    return { error: errorMessage(e) };
  }
}
export async function projectAction(
  id: string,
  action: 'delete' | 'duplicate' | 'publish' | 'unpublish',
): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  try {
    z.enum(['delete', 'duplicate', 'publish', 'unpublish']).parse(action);
    z.uuid().parse(id);
    const { data, error } = await supabase
      .from('projects')
      .select(projectSelect)
      .eq('id', id)
      .single();
    if (error) throw error;
    const p = data as unknown as Project;
    if (action === 'delete') {
      const paths = p.project_media.map((m) => m.storage_path);
      const { error: e } = await supabase.from('projects').delete().eq('id', id);
      if (e) throw e;
      if (paths.length) {
        const { error: storageError } = await supabase.storage.from('portfolio').remove(paths);
        if (storageError)
          return {
            error:
              'Project deleted; some inaccessible storage files could not be removed. Retry cleanup from Storage.',
          };
      }
    } else if (action === 'duplicate') {
      const raw: Record<string, unknown> = {
        ...p,
        id: crypto.randomUUID(),
        slug: p.slug.slice(0, 90) + '-copy-' + crypto.randomUUID().slice(0, 6),
        published: false,
        featured: false,
      };
      for (const field of textFields)
        for (const l of ['en', 'es'])
          raw[`${field}_${l}`] = p[`${field}_${l}` as keyof Project] || '';
      raw.title_en = p.title_en + ' (copy)';
      raw.title_es = p.title_es ? p.title_es + ' (copia)' : '';
      const { data: newId, error: e } = await supabase.rpc('save_project', {
        p_project: projectSchema.parse(raw),
        p_technologies: p.project_technologies.map((x) => x.technologies.id),
        p_metrics: p.project_metrics.map(
          ({ label_en, label_es, value, display_order, translations }) => ({
            translations,
            label_en,
            label_es,
            value,
            display_order,
          }),
        ),
      });
      if (e) throw e;
      for (const m of p.project_media) {
        const target =
          String(newId) + '/' + crypto.randomUUID() + '.' + m.storage_path.split('.').pop();
        const { error: copyError } = await supabase.storage
          .from('portfolio')
          .copy(m.storage_path, target);
        if (copyError)
          return {
            error: 'Draft copy saved, but a media file could not be copied.',
            id: String(newId),
          };
        const { error: insertError } = await supabase.from('project_media').insert({
          project_id: newId,
          storage_path: target,
          kind: m.kind,
          translations: m.translations || {},
          alt_en: m.alt_en,
          alt_es: m.alt_es,
          display_order: m.display_order,
          is_cover: m.is_cover,
        });
        if (insertError) {
          await supabase.storage.from('portfolio').remove([target]);
          throw insertError;
        }
      }
      refresh();
      return { id: String(newId), success: 'Draft duplicated.' };
    } else {
      const published = action === 'publish';
      projectSchema.parse({ ...p, published });
      const { error: e } = await supabase.from('projects').update({ published }).eq('id', id);
      if (e) throw e;
    }
    refresh();
    return { success: 'Project updated.' };
  } catch (e) {
    return { error: errorMessage(e) };
  }
}
export async function saveSettings(_state: ActionState, form: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  try {
    const raw = {
      ...Object.fromEntries(form),
      translations: formTranslations(form),
      available: form.get('available') === 'on',
    };
    const data = settingsSchema.parse(raw);
    const { error } = await supabase.from('site_settings').update(data).eq('id', true);
    if (error) throw error;
    refresh();
    return { success: 'Settings saved.' };
  } catch (e) {
    return { error: errorMessage(e) };
  }
}
export async function saveTechnology(_state: ActionState, form: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  try {
    const data = z
      .object({
        name: z.string().trim().min(1).max(80),
        slug: z
          .string()
          .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
          .max(100),
        icon: z.string().max(40),
      })
      .parse({
        name: form.get('name'),
        slug: form.get('slug') || slugify(String(form.get('name'))),
        icon: form.get('icon') || '',
      });
    const id = form.get('id');
    const query = id
      ? supabase.from('technologies').update(data).eq('id', z.uuid().parse(id))
      : supabase.from('technologies').insert(data);
    const { error } = await query;
    if (error) throw error;
    refresh();
    return { success: 'Technology saved.' };
  } catch (e) {
    return { error: errorMessage(e) };
  }
}
export async function removeRecord(
  table: 'technologies' | 'experience' | 'contact_messages',
  id: string,
): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  try {
    z.enum(['technologies', 'experience', 'contact_messages']).parse(table);
    z.uuid().parse(id);
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
    refresh();
    return { success: 'Deleted.' };
  } catch (e) {
    return { error: errorMessage(e) };
  }
}
export async function saveExperience(_state: ActionState, form: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  try {
    const raw = {
      ...Object.fromEntries(form),
      translations: formTranslations(form),
      id: form.get('id') || undefined,
      end_date: form.get('end_date') || null,
      technologies: String(form.get('technologies') || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      display_order: Number(form.get('display_order') || 0),
      published: form.get('published') === 'on',
    };
    const data = experienceSchema.parse(raw);
    const { error } = await supabase.from('experience').upsert(data);
    if (error) throw error;
    refresh();
    return { success: 'Experience saved.' };
  } catch (e) {
    return { error: errorMessage(e) };
  }
}
export async function markRead(id: string) {
  const { supabase } = await requireAdmin();
  z.uuid().parse(id);
  const { error } = await supabase.from('contact_messages').update({ read: true }).eq('id', id);
  if (error) throw new Error('Could not mark the message as read.');
  refresh();
}
export async function updateMedia(
  id: string,
  changes: {
    translations?: import('@/lib/locales').Translations;
    alt_en?: string;
    alt_es?: string;
    display_order?: number;
  },
): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  try {
    z.uuid().parse(id);
    const data = z
      .object({
        translations: translationsSchema.optional(),
        alt_en: z.string().trim().min(1).max(300).optional(),
        alt_es: z.string().trim().min(1).max(300).optional(),
        display_order: z.number().int().min(0).max(10000).optional(),
      })
      .parse(changes);
    const { error } = await supabase.from('project_media').update(data).eq('id', id);
    if (error) throw error;
    refresh();
    return { success: 'Media updated.' };
  } catch (e) {
    return { error: errorMessage(e) };
  }
}
export async function mediaAction(id: string, action: 'delete' | 'cover'): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  try {
    z.enum(['delete', 'cover']).parse(action);
    z.uuid().parse(id);
    const { data: m, error } = await supabase
      .from('project_media')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    if (action === 'cover') {
      const { error: e } = await supabase.rpc('set_project_cover', {
        p_project: m.project_id,
        p_media: id,
      });
      if (e) throw e;
    } else {
      const { error: e } = await supabase.from('project_media').delete().eq('id', id);
      if (e) throw e;
      const { error: s } = await supabase.storage.from('portfolio').remove([m.storage_path]);
      if (s) throw s;
    }
    refresh();
    return { success: 'Media updated.' };
  } catch (e) {
    return { error: errorMessage(e) };
  }
}
export async function removeAsset(kind: 'resume' | 'photo'): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  try {
    z.enum(['resume', 'photo']).parse(kind);
    const key = kind + '_path';
    const { data, error: readError } = await supabase
      .from('site_settings')
      .select('resume_path,photo_path')
      .eq('id', true)
      .single();
    if (readError) throw readError;
    const path = kind === 'resume' ? data?.resume_path : data?.photo_path;
    const { error } = await supabase
      .from('site_settings')
      .update({ [key]: '' })
      .eq('id', true);
    if (error) throw error;
    if (path) {
      const { error: storageError } = await supabase.storage.from('portfolio').remove([path]);
      if (storageError) {
        refresh();
        return { error: 'Asset detached, but its storage file could not be removed.' };
      }
    }
    refresh();
    return { success: 'Asset removed.' };
  } catch (e) {
    return { error: errorMessage(e) };
  }
}
