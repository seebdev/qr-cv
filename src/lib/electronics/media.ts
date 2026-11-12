import 'server-only';
import { access, realpath } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import config from './media.json';
import { isMediaSource, type MediaKind } from './media-policy';
import type { Media, Project } from '../types';
import { electronicsSlug } from './links';
import { moduleIds, type ModuleId, type ShowcaseCopy } from './types';

export type Video = {
  id: string;
  language: string;
  title: keyof Pick<ShowcaseCopy, 'videoEnglish' | 'videoChinese'>;
  description: keyof Pick<ShowcaseCopy, 'videoEnglishBody' | 'videoChineseBody'>;
  src: string | null;
  poster: string | null;
  captions: { src: string; language: string; label: string }[];
};
export type Screen = { module: ModuleId; src: string | null };

// Files with missing/invalid paths never become browser requests. Do not probe external hosts.
export const resolveSource = cache(
  async (src: unknown, kind: MediaKind): Promise<string | null> => {
    if (!isMediaSource(src, kind, config.allowedOrigins)) return null;
    if (!src.startsWith('/')) return src;
    try {
      const root = await realpath(path.join(process.cwd(), 'public', 'electronics'));
      const file = await realpath(path.join(process.cwd(), 'public', src.slice(1)));
      const relative = path.relative(root, file);
      if (relative.startsWith('..') || path.isAbsolute(relative)) return null;
      await access(file);
      return src;
    } catch {
      return null;
    }
  },
);

function adminVideo(media: Media[], order: number) {
  const candidates = media.filter((m) => m.kind === 'video' && m.display_order === order);
  // Ambiguous slots stay empty rather than guessing a language.
  return candidates.length === 1 &&
    /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(candidates[0].id)
    ? `/api/media/${candidates[0].id}`
    : null;
}

export async function showcaseMedia(projects: Project[] = []) {
  const project = projects.find((p) => p.slug === electronicsSlug && p.published);
  const videos: Video[] = await Promise.all(
    config.videos.map(async (v) => ({
      id: v.id,
      language: v.language,
      title: v.title as Video['title'],
      description: v.description as Video['description'],
      src:
        (await resolveSource(v.src, 'video')) ||
        adminVideo(project?.project_media ?? [], v.adminOrder),
      poster: await resolveSource(v.poster, 'image'),
      captions: (
        await Promise.all(
          (v.captions as { src: string; language: string; label: string }[]).map(async (c) => {
            const src = await resolveSource(c.src, 'captions');
            // Cross-origin tracks require CORS and can prevent otherwise valid video playback.
            return src?.startsWith('/') && c.language && c.label ? { ...c, src } : null;
          }),
        )
      ).filter((c): c is NonNullable<typeof c> => c !== null),
    })),
  );
  const screens: Screen[] = await Promise.all(
    config.screenshots.map(async (s) => ({
      module: moduleIds.includes(s.module as ModuleId) ? (s.module as ModuleId) : 'clients',
      src: await resolveSource(s.src, 'image'),
    })),
  );
  return { videos, screens };
}
