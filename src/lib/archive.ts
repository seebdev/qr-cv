import type { Project } from './types';
export type ArchiveProject = Pick<
  Project,
  | 'translations'
  | 'id'
  | 'slug'
  | 'title_en'
  | 'title_es'
  | 'short_description_en'
  | 'short_description_es'
  | 'year'
  | 'project_type'
  | 'category'
  | 'featured'
  | 'featured_order'
  | 'display_order'
  | 'project_technologies'
>;
export function archiveProject(p: Project): ArchiveProject {
  const {
    translations,
    id,
    slug,
    title_en,
    title_es,
    short_description_en,
    short_description_es,
    year,
    project_type,
    category,
    featured,
    featured_order,
    display_order,
    project_technologies,
  } = p;
  return {
    translations: Object.fromEntries(
      Object.entries(translations || {}).map(([l, v]) => [
        l,
        { title: v?.title || '', short_description: v?.short_description || '' },
      ]),
    ),
    id,
    slug,
    title_en,
    title_es,
    short_description_en,
    short_description_es,
    year,
    project_type,
    category,
    featured,
    featured_order,
    display_order,
    project_technologies,
  };
}
