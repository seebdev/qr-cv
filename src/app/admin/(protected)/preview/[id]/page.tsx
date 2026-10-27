import { notFound } from 'next/navigation';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { projectSelect, withMedia } from '@/lib/data';
import type { Project } from '@/lib/types';
import { CaseStudy } from '@/components/case-study';
import { isLocale, locales, languageNames } from '@/lib/locales';
import Link from 'next/link';
export default async function Preview({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const { data, error } = await supabase
    .from('projects')
    .select(projectSelect)
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error('Could not load the project preview.');
  if (!data) notFound();
  const lang = (await searchParams).lang || 'en';
  return (
    <>
      <nav className="actions" aria-label="Preview language">
        {locales.map((l) => (
          <Link className="button small" key={l} href={'/admin/preview/' + id + '?lang=' + l}>
            {languageNames[l]}
          </Link>
        ))}
      </nav>
      <CaseStudy
        project={await withMedia(data as unknown as Project, true)}
        locale={isLocale(lang) ? lang : 'en'}
        preview
      />
    </>
  );
}
