import 'server-only';
import { cache } from 'react';
import { publicClient, configured, serverClient } from './supabase/server';
import { defaultSettings } from './defaults';
import type { Project, Settings, Experience } from './types';
export const projectSelect =
  '*, project_technologies(technologies(*)), project_media(*), project_metrics(*)';
export const getSettings = cache(async (): Promise<Settings> => {
  if (!configured()) return defaultSettings;
  const { data, error } = await publicClient()
    .from('site_settings')
    .select('*')
    .eq('id', true)
    .single();
  if (error) throw new Error('Could not load site settings.');
  return { ...defaultSettings, ...data };
});
export const getProjects = cache(async (): Promise<Project[]> => {
  if (!configured()) return [];
  const { data, error } = await publicClient()
    .from('projects')
    .select(projectSelect)
    .eq('published', true)
    .order('display_order')
    .order('year', { ascending: false });
  if (error) throw new Error('Could not load projects.');
  return (data || []) as unknown as Project[];
});
export const getExperience = cache(async (): Promise<Experience[]> => {
  if (!configured()) return [];
  const { data, error } = await publicClient()
    .from('experience')
    .select('*')
    .eq('published', true)
    .order('display_order');
  if (error) throw new Error('Could not load experience.');
  return data || [];
});
export async function withMedia(project: Project, admin = false): Promise<Project> {
  const client = admin ? await serverClient() : publicClient();
  const media = await Promise.all(
    project.project_media
      .sort((a, b) => a.display_order - b.display_order)
      .map(async (item) => {
        if (!admin) return { ...item, url: '/api/media/' + item.id };
        const { data, error } = await client.storage
          .from('portfolio')
          .createSignedUrl(item.storage_path, 300);
        if (error) throw new Error('Could not load project media.');
        return { ...item, url: data?.signedUrl };
      }),
  );
  return { ...project, project_media: media };
}
export async function assetUrl(path: string) {
  if (!path || !configured()) return null;
  const { data, error } = await publicClient().storage.from('portfolio').createSignedUrl(path, 300);
  if (error) throw new Error('Could not load the requested asset.');
  return data?.signedUrl || null;
}
