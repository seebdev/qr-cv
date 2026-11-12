import { describe, expect, it, vi } from 'vitest';
import { locales } from '@/lib/locales';
import { electronicsCopy } from '@/lib/electronics/copy';
import { moduleIds } from '@/lib/electronics/types';
import { electronicsPath, electronicsSlug, electronicsUrl } from '@/lib/electronics/links';
import { electronicsArchive, withoutElectronics } from '@/lib/electronics/project';
import { isMediaSource, validMediaOrigins } from '@/lib/electronics/media-policy';
import config from '@/lib/electronics/media.json';
import type { Project } from '@/lib/types';
vi.mock('server-only', () => ({}));
import { resolveSource, showcaseMedia } from '@/lib/electronics/media';

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  return Object.values(value as Record<string, unknown>).flatMap(strings);
}

describe('localized product content', () => {
  it.each(locales)('%s contains complete copy without fallback or corrupt text', (locale) => {
    const copy = electronicsCopy[locale];
    expect(Object.keys(copy).sort()).toEqual(Object.keys(electronicsCopy.en).sort());
    expect(copy.modules).toHaveLength(moduleIds.length);
    expect(copy.aiSteps).toHaveLength(5);
    expect(copy.workflowSteps).toHaveLength(6);
    expect(copy.layers).toHaveLength(4);
    expect(copy.uses).toHaveLength(5);
    for (const text of strings(copy)) {
      expect(text.trim().length).toBeGreaterThan(0);
      expect(text).not.toMatch(/�|Ã|TODO|Lorem ipsum/);
    }
    if (locale !== 'en')
      for (const key of [
        'lead',
        'summary',
        'explore',
        'comingSoon',
        'videoError',
        'close',
        'placeholder',
      ] as const)
        expect(copy[key]).not.toBe(electronicsCopy.en[key]);
  });

  it('preserves the existing project list and adds a single leading showcase', () => {
    const originals = [
      { slug: 'crepes-waffles' },
      { slug: electronicsSlug },
      { slug: 'la-parrilla' },
    ];
    const result = [electronicsArchive(), ...withoutElectronics(originals)];
    expect(result.map((p) => p.slug)).toEqual([electronicsSlug, 'crepes-waffles', 'la-parrilla']);
    expect(originals).toHaveLength(3);
    expect(electronicsArchive().live_url).toBe(electronicsUrl);
    for (const locale of locales) {
      expect(electronicsPath(locale)).toBe(`/${locale}/projects/demo-electronics`);
      expect(electronicsArchive().translations?.[locale]?.short_description).toBe(
        electronicsCopy[locale].summary,
      );
    }
  });
});

describe('safe media configuration', () => {
  it('always supplies both independent video languages and localized keys', () => {
    expect(config.videos.map((v) => v.language)).toEqual(['en', 'zh-Hans']);
    expect(new Set(config.videos.map((v) => v.adminOrder)).size).toBe(2);
    for (const locale of locales)
      for (const video of config.videos) {
        expect(electronicsCopy[locale]).toHaveProperty(video.title);
        expect(electronicsCopy[locale]).toHaveProperty(video.description);
      }
  });

  it('accepts local MP4/WebM, HTTPS allowlisted video and local WebVTT', () => {
    expect(isMediaSource('/electronics/videos/english.mp4', 'video', [])).toBe(true);
    expect(isMediaSource('/electronics/videos/chinese.webm', 'video', [])).toBe(true);
    expect(isMediaSource('/electronics/captions/en.vtt', 'captions', [])).toBe(true);
    expect(
      isMediaSource('https://media.example.test/video.mp4?version=2', 'video', [
        'https://media.example.test',
      ]),
    ).toBe(true);
  });

  it.each([
    '//evil.test/video.mp4',
    'http://media.example.test/video.mp4',
    'javascript:alert(1)',
    'https://evil.test/video.mp4',
    'https://user:pass@media.example.test/video.mp4',
    '/electronics/../secret.mp4',
    '/electronics/%2e%2e/secret.mp4',
    '/outside/video.mp4',
    '/electronics/file.svg',
    '/electronics\\video.mp4',
  ])('rejects invalid or unauthorized sources: %s', (src) => {
    expect(isMediaSource(src, 'video', ['https://media.example.test'])).toBe(false);
  });

  it('does not broaden the CSP to unsafe origins', () => {
    expect(
      validMediaOrigins([
        'https://media.example.test',
        'https://media.example.test/path',
        'http://media.example.test',
        'https://example.test; script-src *',
      ]),
    ).toEqual(['https://media.example.test']);
  });

  it('does not emit requests for absent files', async () => {
    expect(await resolveSource('/electronics/videos/not-uploaded.mp4', 'video')).toBeNull();
    const media = await showcaseMedia();
    expect(media.videos).toHaveLength(2);
    expect(media.videos.every((v) => v.src === null && v.poster === null)).toBe(true);
    expect(media.screens).toHaveLength(6);
    expect(media.screens.every((s) => s.src === null)).toBe(true);
  });

  it('reuses only unambiguous published admin video slots', async () => {
    const id = 'a135b9ec-9f98-42c8-962a-e6bb4e4e4249';
    const project = {
      slug: electronicsSlug,
      published: true,
      project_media: [{ id, kind: 'video', display_order: 10 }],
    } as Project;
    expect((await showcaseMedia([project])).videos[0].src).toBe(`/api/media/${id}`);
    expect((await showcaseMedia([{ ...project, published: false }])).videos[0].src).toBeNull();
    expect(
      (
        await showcaseMedia([
          { ...project, project_media: [...project.project_media, ...project.project_media] },
        ])
      ).videos[0].src,
    ).toBeNull();
  });
});
