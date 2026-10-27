import { z } from 'zod';
import { textFields, categories } from './types';
export const translationsSchema = z
  .partialRecord(
    z.enum(['en', 'es', 'fr', 'de', 'it', 'zh', 'ja', 'pt']),
    z.record(
      z
        .string()
        .regex(/^[a-z_]+$/)
        .max(60),
      z.string().max(20000),
    ),
  )
  .default({});
export const httpsUrl = z
  .string()
  .trim()
  .max(2048)
  .refine((v) => {
    if (!v) return true;
    try {
      const u = new URL(v);
      return u.protocol === 'https:' && !u.username && !u.password;
    } catch {
      return false;
    }
  }, 'Use a valid HTTPS URL without credentials.');
const textShape = Object.fromEntries(
  textFields.flatMap((f) =>
    ['en', 'es'].map((l) => [
      `${f}_${l}`,
      z
        .string()
        .trim()
        .max(f === 'title' ? 150 : f === 'short_description' ? 320 : 20000)
        .default(''),
    ]),
  ),
);
export const metricSchema = z.object({
  translations: translationsSchema,
  label_en: z.string().trim().min(1).max(100),
  label_es: z.string().trim().min(1).max(100),
  value: z.string().trim().min(1).max(80),
  display_order: z.number().int().min(0).default(0),
});
export const projectSchema = z
  .object({
    ...textShape,
    translations: translationsSchema,
    id: z.uuid().optional(),
    slug: z
      .string()
      .min(1)
      .max(120)
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    category: z.enum(categories),
    project_type: z.string().trim().max(100).default(''),
    year: z.number().int().min(1990).max(2100),
    start_date: z.iso.date().nullable(),
    end_date: z.iso.date().nullable(),
    status: z.enum(['completed', 'in-progress', 'maintained', 'archived']),
    github_url: httpsUrl,
    live_url: httpsUrl,
    external_url: httpsUrl,
    video_url: httpsUrl,
    repository_visibility: z.enum(['public', 'private', 'none']),
    featured: z.boolean(),
    published: z.boolean(),
    featured_order: z.number().int().min(0).max(10000),
    display_order: z.number().int().min(0).max(10000),
  })
  .superRefine((v, ctx) => {
    const values = v as Record<string, unknown>;
    if (!String(values.title_en || '').trim())
      ctx.addIssue({
        code: 'custom',
        message: 'An English title is required.',
        path: ['title_en'],
      });
    if (v.published)
      for (const f of ['title_en', 'title_es', 'short_description_en', 'short_description_es'])
        if (!String(values[f] || '').trim())
          ctx.addIssue({
            code: 'custom',
            message: 'Published projects require titles and summaries in both languages.',
            path: [f],
          });
    if (v.start_date && v.end_date && v.end_date < v.start_date)
      ctx.addIssue({
        code: 'custom',
        message: 'End date must follow start date.',
        path: ['end_date'],
      });
  });
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  company: z.string().trim().max(150).default(''),
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(300).default(''),
  started: z.number().finite(),
});
export const settingsSchema = z.object({
  translations: translationsSchema,
  name: z.string().trim().min(2).max(100),
  headline_en: z.string().trim().min(5).max(180),
  headline_es: z.string().trim().min(5).max(180),
  bio_en: z.string().max(1000),
  bio_es: z.string().max(1000),
  about_en: z.string().max(5000),
  about_es: z.string().max(5000),
  email: z.union([z.email(), z.literal('')]),
  github_url: httpsUrl,
  linkedin_url: httpsUrl,
  available: z.boolean(),
  location_en: z.string().max(100),
  location_es: z.string().max(100),
  seo_description_en: z.string().max(320),
  seo_description_es: z.string().max(320),
});
export const experienceSchema = z
  .object({
    id: z.uuid().optional(),
    translations: translationsSchema,
    company: z.string().trim().min(1).max(120),
    role_en: z.string().trim().min(1).max(150),
    role_es: z.string().trim().min(1).max(150),
    description_en: z.string().max(5000),
    description_es: z.string().max(5000),
    start_date: z.iso.date(),
    end_date: z.iso.date().nullable(),
    technologies: z.array(z.string().trim().min(1).max(80)).max(30),
    display_order: z.number().int().min(0).max(10000),
    published: z.boolean(),
  })
  .refine((v) => !v.end_date || v.end_date >= v.start_date, {
    message: 'End date must follow start date.',
  });
export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120);
}
export function detectFile(
  bytes: Uint8Array,
): { mime: string; ext: string; kind: 'image' | 'video' | 'document' } | null {
  const text = (a: number, b: number) => String.fromCharCode(...bytes.slice(a, b));
  if (bytes.length < 12) return null;
  if (bytes[0] === 0x89 && text(1, 4) === 'PNG' && bytes[4] === 13 && bytes[5] === 10)
    return { mime: 'image/png', ext: 'png', kind: 'image' };
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255)
    return { mime: 'image/jpeg', ext: 'jpg', kind: 'image' };
  if (['GIF87a', 'GIF89a'].includes(text(0, 6)))
    return { mime: 'image/gif', ext: 'gif', kind: 'image' };
  if (text(0, 4) === 'RIFF' && text(8, 12) === 'WEBP')
    return { mime: 'image/webp', ext: 'webp', kind: 'image' };
  if (text(4, 8) === 'ftyp') return { mime: 'video/mp4', ext: 'mp4', kind: 'video' };
  if (bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3)
    return { mime: 'video/webm', ext: 'webm', kind: 'video' };
  if (text(0, 5) === '%PDF-') return { mime: 'application/pdf', ext: 'pdf', kind: 'document' };
  return null;
}
