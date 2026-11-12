import type { ArchiveProject } from '../archive';
import type { Project } from '../types';
import { locales } from '../locales';
import { electronicsCopy } from './copy';
import { electronicsSlug, electronicsStack, electronicsUrl } from './links';

export function electronicsArchive(): ArchiveProject {
  return {
    id: electronicsSlug,
    slug: electronicsSlug,
    live_url: electronicsUrl,
    title_en: 'Electronic Parts Intelligence',
    title_es: 'Electronic Parts Intelligence',
    short_description_en: electronicsCopy.en.summary,
    short_description_es: electronicsCopy.es.summary,
    translations: Object.fromEntries(
      locales.map((l) => [
        l,
        { title: 'Electronic Parts Intelligence', short_description: electronicsCopy[l].summary },
      ]),
    ),
    year: 2026,
    project_type: 'showcase',
    category: 'Business Systems',
    featured: true,
    featured_order: -1,
    display_order: -1,
    project_technologies: electronicsStack.map((name) => ({
      technologies: { id: name, name, slug: name.toLowerCase(), icon: '' },
    })),
  };
}

export function withoutElectronics<T extends Pick<Project, 'slug'>>(projects: T[]) {
  return projects.filter((p) => p.slug !== electronicsSlug);
}
