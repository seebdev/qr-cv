import { describe, it, expect } from 'vitest';
import {
  httpsUrl,
  slugify,
  contactSchema,
  projectSchema,
  detectFile,
  settingsSchema,
  experienceSchema,
} from '../../src/lib/validation';
import { localized, textFields } from '../../src/lib/types';
const project = () => ({
  ...Object.fromEntries(textFields.flatMap((f) => ['en', 'es'].map((l) => [f + '_' + l, '']))),
  title_en: 'Demo system',
  slug: 'demo-system',
  category: 'Full Stack',
  project_type: '',
  year: 2026,
  start_date: null,
  end_date: null,
  status: 'completed',
  github_url: '',
  live_url: '',
  external_url: '',
  video_url: '',
  repository_visibility: 'none',
  featured: false,
  published: false,
  featured_order: 0,
  display_order: 0,
});
describe('Untrusted content', () => {
  it.each([
    'javascript:alert(1)',
    'data:text/html,a',
    'http://example.com',
    'https://user:pass@example.com',
  ])('rejects unsafe URL %s', (url) => expect(httpsUrl.safeParse(url).success).toBe(false));
  it('accepts empty and HTTPS URLs', () => {
    expect(httpsUrl.parse('')).toBe('');
    expect(httpsUrl.parse('https://github.com/example')).toContain('github');
  });
  it('normalizes accents in slugs', () =>
    expect(slugify('¡Automatización & IA!')).toBe('automatizacion-ia'));
  it('keeps drafts private by explicit publication validation', () => {
    expect(projectSchema.safeParse(project()).success).toBe(true);
    expect(projectSchema.safeParse({ ...project(), published: true }).success).toBe(false);
  });
  it('requires both translations on publication', () =>
    expect(
      projectSchema.safeParse({
        ...project(),
        title_es: 'Sistema demo',
        short_description_en: 'Demo description',
        short_description_es: 'Descripción demo',
        published: true,
      }).success,
    ).toBe(true));
  it('rejects reverse date ranges', () =>
    expect(
      projectSchema.safeParse({ ...project(), start_date: '2026-03-01', end_date: '2026-01-01' })
        .success,
    ).toBe(false));
  it('strips unknown privileges', () =>
    expect(projectSchema.parse({ ...project(), is_admin: true })).not.toHaveProperty('is_admin'));
  it('rejects fabricated dates', () =>
    expect(projectSchema.safeParse({ ...project(), start_date: '2026-99-99' }).success).toBe(
      false,
    ));
  it('validates contact data bounds', () => {
    const c = {
      name: 'Sam',
      email: 'sam@example.com',
      message: 'A sufficiently detailed message.',
      started: Date.now(),
    };
    expect(contactSchema.safeParse(c).success).toBe(true);
    expect(contactSchema.safeParse({ ...c, email: 'wrong' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...c, message: 'short' }).success).toBe(false);
  });
  it('detects PNG bytes without trusting the file name', () =>
    expect(detectFile(new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 0]))?.mime).toBe(
      'image/png',
    ));
  it('rejects SVG and HTML uploads', () => {
    expect(detectFile(new TextEncoder().encode('<svg onload="alert(1)">'))).toBeNull();
    expect(detectFile(new TextEncoder().encode('<html>not an image</html>'))).toBeNull();
  });
  it('detects PDF signatures', () =>
    expect(detectFile(new TextEncoder().encode('%PDF-1.7\nhello'))?.kind).toBe('document'));
  it('falls back to English only for missing translations', () =>
    expect(localized({ title_en: 'Demo', title_es: '' }, 'title', 'es')).toBe('Demo'));
  it('does not allow asset path injection through settings', () =>
    expect(settingsSchema.shape).not.toHaveProperty('resume_path'));
  it('rejects experience with reversed dates', () =>
    expect(
      experienceSchema.safeParse({
        company: 'Demo',
        role_en: 'Engineer',
        role_es: 'Ingeniero',
        description_en: '',
        description_es: '',
        start_date: '2026-02-01',
        end_date: '2025-01-01',
        technologies: [],
        display_order: 0,
        published: false,
      }).success,
    ).toBe(false));
});
