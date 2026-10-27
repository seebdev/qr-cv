import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from './icons';
import { localized, type Locale, type Project } from '@/lib/types';
import { dictionary } from '@/lib/i18n';
export function ProjectCard({
  project: p,
  locale,
  index,
}: {
  project: Project;
  locale: Locale;
  index: number;
}) {
  const cover = p.project_media.find((m) => m.is_cover),
    t = dictionary(locale);
  return (
    <article className="project-card">
      <Link
        href={'/' + locale + '/projects/' + p.slug}
        aria-label={localized(p, 'title', locale) + ' — ' + t.caseStudy}
      >
        <div className="project-art">
          {cover?.url ? (
            <Image
              src={cover.url}
              alt={localized(cover, 'alt', locale)}
              fill
              priority={index === 0}
              sizes="(max-width:767px) 92vw, 46vw"
            />
          ) : (
            <div className="project-noimage">
              <span>{localized(p, 'title', locale)}</span>
            </div>
          )}
        </div>
      </Link>
      <div className="project-info">
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h2>{localized(p, 'title', locale)}</h2>
          <p>{localized(p, 'short_description', locale)}</p>
          <div className="project-links">
            <Link href={'/' + locale + '/projects/' + p.slug}>
              {t.caseStudy}
              <ArrowUpRight size={16} />
            </Link>
            {p.live_url && (
              <a href={p.live_url} target="_blank" rel="noopener noreferrer">
                {t.live}
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
