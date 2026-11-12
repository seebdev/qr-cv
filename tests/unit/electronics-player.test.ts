import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProductVideo } from '@/components/electronics/interactions';
import { electronicsCopy } from '@/lib/electronics/copy';
import type { Video } from '@/lib/electronics/media';

const video: Video = {
  id: 'english',
  language: 'en',
  title: 'videoEnglish',
  description: 'videoEnglishBody',
  src: '/electronics/videos/english.mp4',
  poster: null,
  captions: [{ src: '/electronics/captions/en.vtt', language: 'en', label: 'English' }],
};
describe('product video rendering', () => {
  it('renders a real native player on demand with optional captions', () => {
    const html = renderToStaticMarkup(
      createElement(ProductVideo, { video, copy: electronicsCopy.es }),
    );
    expect(html).toContain('<video');
    expect(html).toContain('controls=""');
    expect(html).toContain('preload="none"');
    expect(html).toContain('src="/electronics/videos/english.mp4"');
    expect(html).toContain('kind="captions"');
    expect(html).toContain('srcLang="en"');
    expect(html).toContain(electronicsCopy.es.videoEnglish);
    expect(html).not.toContain('autoPlay');
  });
  it('does not create a player or empty sources when video is absent', () => {
    const html = renderToStaticMarkup(
      createElement(ProductVideo, { video: { ...video, src: null }, copy: electronicsCopy.zh }),
    );
    expect(html).not.toContain('<video');
    expect(html).not.toContain('<source');
    expect(html).not.toContain('<track');
    expect(html).toContain(electronicsCopy.zh.comingSoon);
  });
});
