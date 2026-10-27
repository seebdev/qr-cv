import { PortfolioImage as Image } from './portfolio-image';
import { bundledCover } from '@/lib/bundled-cover';
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
        href={p.live_url || '/' + locale + '/projects/' + p.slug}
        target={p.live_url ? '_blank' : undefined}
        rel={p.live_url ? 'noopener noreferrer' : undefined}
        aria-label={localized(p, 'title', locale) + ' — ' + (p.live_url ? t.live : t.caseStudy)}
      >
        <div className="project-art">
          {cover?.url ? (
            <Image
              bundled={Boolean(bundledCover(cover))}
              src={cover.url}
              alt={localized(cover, 'alt', locale)}
              fill
              priority={index < 2}
              sizes="(max-width:767px) 92vw, 46vw"
            />
          ) : (
            <div className="project-noimage">
              <span>{localized(p, 'title', locale)}</span>
            </div>
          )}
        </div>
        <div className="project-info">
          <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h2>{localized(p, 'title', locale)}</h2>
            <p>{localized(p, 'short_description', locale)}</p>
            <div className="project-links">
              <span>
                {p.live_url ? t.live : t.caseStudy}
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
