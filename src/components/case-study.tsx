import { statusLabel } from '@/lib/labels';
import { PortfolioImage as Image } from './portfolio-image';
import { bundledCover } from '@/lib/bundled-cover';
import Link from 'next/link';
import { localized, type Locale, type Project } from '@/lib/types';
import { dictionary } from '@/lib/i18n';
import { ArrowLeft, ArrowUpRight, ArrowRight } from './icons';
import { TrackLink, ProjectView } from './track-link';
export function CaseStudy({
  project: p,
  locale,
  next,
  preview = false,
}: {
  project: Project;
  locale: Locale;
  next?: Project;
  preview?: boolean;
}) {
  const Container = preview ? 'article' : 'main';
  const t = dictionary(locale),
    cover = p.project_media.find((x) => x.is_cover);
  const sections = [
    ['description', t.overview],
    ['case_study', t.caseStudy],
    ['problem', t.problem],
    ['solution', t.solution],
    ['role', t.role],
    ['contribution', t.contribution],
    ['architecture', t.architecture],
    ['features', t.features],
    ['challenges', t.challenges],
    ['decisions', t.decisions],
    ['results', t.results],
    ['learnings', t.learnings],
  ].filter(([field]) => localized(p, field, locale));
  const architecture = localized(p, 'architecture', locale)
    .split(/→|\n/)
    .map((x) => x.trim())
    .filter(Boolean);
  return (
    <Container id="main" className="wrap">
      {!preview && <ProjectView id={p.id} />}
      <div className="case-hero">
        {preview && (
          <div className="notice">Private preview · {p.published ? 'Published' : 'Draft'}</div>
        )}
        <Link className="text-link muted" href={preview ? '/admin' : `/${locale}#archive`}>
          <ArrowLeft size={14} />
          {preview ? 'Admin' : t.back}
        </Link>
        <h1>{localized(p, 'title', locale)}</h1>
        <p className="case-description">{localized(p, 'short_description', locale)}</p>
        <dl className="case-meta">
          {[
            [t.year, p.project_type === 'showcase' ? '' : String(p.year)],
            [t.role, localized(p, 'role', locale)],
            [t.duration, localized(p, 'duration', locale)],
            [t.status, p.project_type === 'showcase' ? '' : statusLabel(p.status, locale)],
          ]
            .filter(([, v]) => v)
            .map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
        </dl>
        <div className="hero-buttons">
          {p.live_url && (
            <TrackLink
              className="button primary"
              href={p.live_url}
              target="_blank"
              rel="noreferrer"
              event="live_demo_click"
              projectId={p.id}
            >
              {t.live}
              <ArrowUpRight size={16} />
            </TrackLink>
          )}
          {p.github_url && p.repository_visibility === 'public' && (
            <TrackLink
              className="button"
              href={p.github_url}
              target="_blank"
              rel="noreferrer"
              event="github_click"
              projectId={p.id}
            >
              GitHub
              <ArrowUpRight size={16} />
            </TrackLink>
          )}
          {p.external_url && (
            <a className="button" href={p.external_url} target="_blank" rel="noreferrer">
              {t.detailsLabel} ↗
            </a>
          )}
          {p.repository_visibility === 'private' && (
            <span className="mono muted" style={{ alignSelf: 'center' }}>
              {t.privateRepo}
            </span>
          )}
        </div>
      </div>
      {cover?.url && (
        <div className="case-cover">
          <Image
            bundled={!preview && Boolean(bundledCover(cover))}
            src={cover.url}
            alt={localized(cover, 'alt', locale)}
            fill
            sizes="100vw"
            priority
            unoptimized={preview}
          />
        </div>
      )}
      {p.project_metrics.length > 0 && (
        <div className="metrics">
          {p.project_metrics
            .sort((a, b) => a.display_order - b.display_order)
            .map((m, i) => (
              <div className="metric" key={m.id || i}>
                <strong>{m.value}</strong>
                <span>{localized(m, 'label', locale)}</span>
              </div>
            ))}
        </div>
      )}
      <div className="case-body">
        <nav className="case-aside" aria-label={t.caseStudy}>
          {sections.map(([field, label]) => (
            <a key={field} href={`#${field}`}>
              {label}
            </a>
          ))}
        </nav>
        <div>
          {sections
            .filter(([field]) => !['architecture', 'decisions', 'challenges'].includes(field))
            .map(([field, label]) => (
              <section className="case-section" id={field} key={field}>
                <h2>{label}</h2>
                {field === 'features' ? (
                  <ul className="prose">
                    {localized(p, field, locale)
                      .split('\n')
                      .filter(Boolean)
                      .map((x, i) => (
                        <li key={i}>{x.replace(/^[-*]\s*/, '')}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="prose">{localized(p, field, locale)}</p>
                )}
                {field === 'architecture' &&
                  architecture.length > 1 &&
                  architecture.length <= 7 &&
                  architecture.every((x) => x.length < 55) && (
                    <div className="architecture-flow">
                      {architecture.map((x, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span className="architecture-node">{x}</span>
                          {i < architecture.length - 1 && <ArrowRight size={14} />}
                        </div>
                      ))}
                    </div>
                  )}
              </section>
            ))}
          {sections
            .filter(([f]) => ['architecture', 'decisions', 'challenges'].includes(f))
            .map(([f, label]) => (
              <details className="case-section" key={f} id={f}>
                <summary>{label}</summary>
                <p className="prose">{localized(p, f, locale)}</p>
              </details>
            ))}
          {p.project_technologies.length > 0 && (
            <section className="case-section">
              <h2>{t.stack}</h2>
              <div className="tags">
                {p.project_technologies.map((x) => (
                  <span className="tag" key={x.technologies.id}>
                    {x.technologies.name}
                  </span>
                ))}
              </div>
            </section>
          )}
          {(p.project_media.some((m) => !m.is_cover) || p.video_url) && (
            <section className="case-section">
              <h2>{t.gallery}</h2>
              <div className="gallery">
                {p.video_url && (
                  <a className="button" href={p.video_url} target="_blank" rel="noreferrer">
                    {t.videoLabel} ↗
                  </a>
                )}
                {p.project_media
                  .filter((m) => !m.is_cover && m.url)
                  .map((m) => (
                    <figure key={m.id}>
                      {m.kind === 'video' ? (
                        <video
                          src={m.url}
                          controls
                          preload="none"
                          poster={cover?.url}
                          aria-label={localized(m, 'alt', locale)}
                        >
                          <track kind="captions" />
                        </video>
                      ) : (
                        <Image
                          bundled={!preview && Boolean(bundledCover(m))}
                          src={m.url!}
                          alt={localized(m, 'alt', locale)}
                          width={1200}
                          height={800}
                          sizes="(max-width: 767px) 100vw, 70vw"
                          unoptimized={preview}
                        />
                      )}
                      <figcaption>{localized(m, 'alt', locale)}</figcaption>
                    </figure>
                  ))}
              </div>
            </section>
          )}
        </div>
      </div>
      {next && (
        <Link className="next-project" href={`/${locale}/projects/${next.slug}`}>
          <div>
            <span className="mono muted">{t.next}</span>
            <h2>{localized(next, 'title', locale)}</h2>
          </div>
          <ArrowUpRight size={38} />
        </Link>
      )}
    </Container>
  );
}
