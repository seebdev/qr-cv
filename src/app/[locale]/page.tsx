import type { Metadata } from 'next';
import Image from 'next/image';
import { PortfolioImage } from '@/components/portfolio-image';
import { bundledCover } from '@/lib/bundled-cover';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjects, getSettings, getExperience, withMedia, assetUrl } from '@/lib/data';
import { isLocale, dictionary } from '@/lib/i18n';
import { languageAlternates, regions } from '@/lib/locales';
import { localized } from '@/lib/types';
import { archiveProject } from '@/lib/archive';
import { ProjectCard } from '@/components/project-card';
import { ProjectArchive } from '@/components/project-archive';
import { CopyEmail } from '@/components/contact-form';
import { CvSection } from '@/components/cv-section';
import { ArrowUpRight, ArrowDown, Code2, Database, Cpu, Layers3 } from '@/components/icons';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const s = await getSettings(),
    t = dictionary(locale),
    description = localized(s, 'seo_description', locale) || t.bio;
  return {
    title: s.name + ' — ' + t.frontend + ' & ' + t.backend,
    description,
    alternates: {
      canonical: '/' + locale,
      languages: { ...languageAlternates(), 'x-default': '/en' },
    },
    openGraph: {
      title: s.name + ' — ' + t.headline,
      description,
      url: '/' + locale,
      locale: regions[locale],
      type: 'website',
      images: ['/api/og?locale=' + locale],
    },
  };
}
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = dictionary(locale);
  const [s, projects, experience] = await Promise.all([
    getSettings(),
    getProjects(),
    getExperience(),
  ]);
  const featured = await Promise.all(
    projects
      .filter((p) => p.featured)
      .sort((a, b) => a.featured_order - b.featured_order || a.display_order - b.display_order)
      .slice(0, 6)
      .map((p) => withMedia(p)),
  );
  const first = featured[0],
    cover = first?.project_media.find((m) => m.is_cover),
    photo = await assetUrl(s.photo_path);
  const services = [
    { title: t.frontend, body: t.frontendBody, Icon: Code2 },
    { title: t.backend, body: t.backendBody, Icon: Database },
    { title: t.ai, body: t.aiBody, Icon: Layers3 },
    { title: t.infra, body: t.infraBody, Icon: Cpu },
  ];
  return (
    <main id="main">
      <section id="work" className="section wrap projects-first">
        <div className="section-head">
          <div>
            <span className="eyebrow">01 / {t.work}</span>
            <h1>{t.selected}</h1>
          </div>
          <p>{t.selectedIntro}</p>
        </div>
        {featured.length ? (
          <div className="project-grid">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} locale={locale} index={i} />
            ))}
          </div>
        ) : (
          <p>{t.selectedEmptyBody}</p>
        )}
      </section>
      <CvSection locale={locale} />
      <section className="intro wrap">
        <div className="intro-copy">
          <span className="eyebrow">
            {s.name} · {t.heroLabel}
          </span>
          <h2>{localized(s, 'headline', locale) || t.headline}</h2>
          <p>{localized(s, 'bio', locale) || t.bio}</p>
          <div className="hero-buttons">
            <a className="button primary" href="#work">
              {t.workCta}
              <ArrowDown size={17} />
            </a>
            <a className="intro-contact" href="#contact">
              {t.contactCta}
              <ArrowUpRight size={17} />
            </a>
          </div>
          <span className="intro-location">{t.remote}</span>
        </div>
        {cover?.url && first && (
          <Link className="intro-showcase" href={'/' + locale + '/projects/' + first.slug}>
            <div className="browser-top">
              <span />
              <span />
              <span />
              <small>{localized(first, 'title', locale)}</small>
              <ArrowUpRight size={15} />
            </div>
            <div className="intro-image">
              <PortfolioImage
                bundled={Boolean(bundledCover(cover))}
                src={cover.url}
                alt={localized(cover, 'alt', locale)}
                fill
                sizes="(max-width: 900px) 92vw, 57vw"
              />
            </div>
            <div className="showcase-caption">
              <span>01 / {t.work}</span>
              <strong>{localized(first, 'title', locale)}</strong>
              <ArrowUpRight size={20} />
            </div>
          </Link>
        )}
      </section>
      <section id="services" className="section wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">02 / {t.services}</span>
            <h2>{t.capabilities}</h2>
          </div>
        </div>
        <div className="capabilities-grid">
          {services.map(({ title, body, Icon }, i) => (
            <article className="capability" key={title}>
              <div className="service-top">
                <Icon size={26} />
                <span>0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="process-section">
        <div className="wrap">
          <h2>{t.process}</h2>
          <div className="process-grid">
            {t.steps.split('|').map((step, i) => (
              <article key={step}>
                <span>0{i + 1}</span>
                <h3>{step}</h3>
                <p>{t.stepBodies.split('|')[i]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="section wrap">
        <div className="about-grid">
          <div>
            <span className="eyebrow">03 / {t.about}</span>
            <h2>{t.aboutTitle}</h2>
            {photo && (
              <div className="about-photo">
                <Image src={photo} alt={s.name} fill sizes="340px" />
              </div>
            )}
          </div>
          <div>
            <p>{localized(s, 'about', locale) || t.aboutDefault}</p>
            <div className="about-notes">
              <span>{localized(s, 'location', locale)}</span>
              {s.resume_path && (
                <Link className="text-link" href="/resume">
                  {t.resume}
                  <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      {experience.length > 0 && (
        <section id="experience" className="section wrap">
          <h2>{t.experience}</h2>
          {experience.map((e) => (
            <article className="timeline-row" key={e.id}>
              <span>
                {e.start_date.slice(0, 7)} — {e.end_date?.slice(0, 7) || '…'}
              </span>
              <div>
                <h3>{localized(e, 'role', locale)}</h3>
                <span>{e.company}</span>
                <p>{localized(e, 'description', locale)}</p>
              </div>
            </article>
          ))}
        </section>
      )}
      <section id="archive" className="section wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">04 / {t.archive}</span>
            <h2>{t.archive}</h2>
          </div>
          <p>{t.archiveIntro}</p>
        </div>
        <ProjectArchive projects={projects.map(archiveProject)} locale={locale} />
      </section>
      <section id="contact" className="section wrap">
        <div className="contact-grid">
          <div>
            <span className="eyebrow">05 / {t.contact}</span>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactIntro}</p>
            <a className="text-link contact-email" href="mailto:sebastianssc01@gmail.com">
              sebastianssc01@gmail.com
              <ArrowUpRight size={16} />
            </a>
            <div style={{ marginTop: 16 }}>
              <CopyEmail email="sebastianssc01@gmail.com" locale={locale} />
            </div>
            <div className="contact-links">
              {s.github_url && (
                <a href={s.github_url} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              )}
              {s.linkedin_url && (
                <a href={s.linkedin_url} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
          <div className="contact-direct">
            <a className="button primary" href="https://wa.me/573108853158" target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={18} /></a>
            <a className="button" href="https://mail.google.com/mail/?view=cm&fs=1&to=sebastianssc01%40gmail.com" target="_blank" rel="noopener noreferrer">Gmail <ArrowUpRight size={18} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
