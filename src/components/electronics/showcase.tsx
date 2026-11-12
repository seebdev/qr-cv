import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Database,
  Layers,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import type { Locale } from '@/lib/locales';
import type { Screen, Video } from '@/lib/electronics/media';
import { electronicsCopy } from '@/lib/electronics/copy';
import { electronicsStack, electronicsUrl } from '@/lib/electronics/links';
import { MediaGallery, ModuleExplorer, ProductVideo, ScrollReveals } from './interactions';
import { WorkspaceIllustration } from './visuals';

export function ElectronicsShowcase({
  locale,
  screens,
  videos,
}: {
  locale: Locale;
  screens: Screen[];
  videos: Video[];
}) {
  const t = electronicsCopy[locale];
  const hero = screens.find((s) => s.module === 'clients');
  const icons = [Layers, ShieldCheck, Database, Cpu];
  return (
    <main id="main" className="ep-showcase">
      <ScrollReveals />
      <div className="ep-topline wrap">
        <Link href={`/${locale}#work`}>
          <ArrowLeft size={16} />
          {t.back}
        </Link>
        <span>{t.featured}</span>
      </div>
      <section className="ep-hero wrap">
        <div className="ep-hero-copy">
          <span className="ep-kicker">
            <Cpu size={16} />
            {t.badge}
          </span>
          <h1>
            Electronic Parts
            <br />
            <em>Intelligence.</em>
          </h1>
          <p className="ep-hero-lead">{t.lead}</p>
          <p className="ep-hero-summary">{t.summary}</p>
          <div className="ep-actions">
            <a className="ep-button ep-button-blue" href="#capabilities">
              {t.explore}
              <ArrowRight size={17} />
            </a>
            <a
              className="ep-button"
              href={electronicsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="ep-access-note"
            >
              {t.live}
              <ArrowUpRight size={17} />
            </a>
          </div>
          <small id="ep-access-note">{t.auth}</small>
        </div>
        <figure className="ep-hero-visual">
          <div className="ep-hero-glow" />
          <div className="ep-browser">
            <div className="ep-browser-bar">
              <i />
              <i />
              <i />
              <span>Electronic Parts Intelligence</span>
              <Cpu size={14} />
            </div>
            <div className="ep-hero-image">
              {hero?.src ? (
                <Image
                  src={hero.src}
                  alt={`${t.screenshot}: ${t.modules[0][0]}`}
                  fill
                  sizes="(max-width: 900px) 90vw, 56vw"
                  preload
                  unoptimized={hero.src.startsWith('https:')}
                />
              ) : (
                <WorkspaceIllustration copy={t} />
              )}
            </div>
          </div>
          <figcaption>
            <span className="ep-dot" />
            {hero?.src ? t.screenshot : t.illustration}
            <span>{t.demoData}</span>
          </figcaption>
        </figure>
      </section>
      <div className="ep-context wrap">
        <p>{t.study}</p>
        <ul aria-label={t.stackLabel}>
          {electronicsStack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
      <nav className="ep-section-nav" aria-label={t.overview}>
        <div className="wrap">
          {[
            ['overview', t.overview],
            ['capabilities', t.explore],
            ['intelligence', t.aiLabel],
            ['walkthroughs', t.videoTitle],
            ['gallery', t.galleryTitle],
          ].map(([id, label]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </div>
      </nav>
      <section id="overview" className="ep-section wrap ep-problem" data-reveal>
        <div>
          <span className="ep-kicker">01 / {t.problemLabel}</span>
          <h2>{t.problemTitle}</h2>
          <p>{t.problemBody}</p>
          <div className="ep-scattered" aria-hidden="true">
            <span>MPN</span>
            <span>CSV</span>
            <span>XLSX</span>
            <span>…</span>
          </div>
        </div>
        <div className="ep-solution">
          <span className="ep-kicker">{t.solutionLabel}</span>
          <h2>{t.solutionTitle}</h2>
          <p>{t.solutionBody}</p>
          <div className="ep-connected" aria-hidden="true">
            <span>MPN</span>
            <i />
            <Cpu size={30} />
            <i />
            <span>B2B</span>
          </div>
        </div>
      </section>
      <section id="capabilities" className="ep-section ep-capabilities">
        <div className="wrap" data-reveal>
          <div className="ep-section-heading">
            <div>
              <span className="ep-kicker">02 / {t.overview}</span>
              <h2>{t.modulesTitle}</h2>
            </div>
            <p>{t.modulesIntro}</p>
          </div>
          <ModuleExplorer copy={t} />
        </div>
      </section>
      <section id="intelligence" className="ep-section ep-intelligence">
        <div className="wrap" data-reveal>
          <span className="ep-kicker">
            <Sparkles size={16} />
            {t.aiLabel}
          </span>
          <div className="ep-ai-heading">
            <h2>{t.aiTitle}</h2>
            <p>{t.aiBody}</p>
          </div>
          <ol className="ep-ai-flow" aria-label={t.aiLabel}>
            {t.aiSteps.map((step, i) => (
              <li key={step}>
                <span>0{i + 1}</span>
                <strong>{step}</strong>
                {i < t.aiSteps.length - 1 && <ArrowRight size={17} aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <div className="ep-ai-explained">
            <article>
              <Database size={23} />
              <h3>{t.structuredTitle}</h3>
              <p>{t.structuredBody}</p>
            </article>
            <article>
              <Sparkles size={23} />
              <h3>{t.generativeTitle}</h3>
              <p>{t.generativeBody}</p>
            </article>
            <article>
              <ShieldCheck size={23} />
              <h3>{t.boundaryTitle}</h3>
              <p>{t.boundaryBody}</p>
            </article>
          </div>
        </div>
      </section>
      <section className="ep-section wrap ep-architecture" data-reveal>
        <div>
          <span className="ep-kicker">03 / {t.stackLabel}</span>
          <h2>{t.architectureTitle}</h2>
          <p>{t.architectureBody}</p>
        </div>
        <ol className="ep-layers">
          {t.layers.map(([title, body], i) => {
            const Icon = icons[i];
            return (
              <li key={title}>
                <Icon size={22} />
                <div>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
                <span>0{i + 1}</span>
              </li>
            );
          })}
        </ol>
      </section>
      <section className="ep-section wrap ep-workflow" data-reveal>
        <span className="ep-kicker">
          <Workflow size={16} />
          {t.moduleFlow}
        </span>
        <div className="ep-section-heading">
          <h2>{t.workflowTitle}</h2>
          <p>{t.workflowBody}</p>
        </div>
        <ol>
          {t.workflowSteps.map((step, i) => (
            <li key={step}>
              <span>0{i + 1}</span>
              <h3>{step}</h3>
              {i < t.workflowSteps.length - 1 && <ArrowRight size={19} aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </section>
      <section id="walkthroughs" className="ep-section ep-videos">
        <div className="wrap" data-reveal>
          <div className="ep-section-heading">
            <div>
              <span className="ep-kicker">04 / {t.overview}</span>
              <h2>{t.videoTitle}</h2>
            </div>
            <p>{t.videoIntro}</p>
          </div>
          <div className="ep-video-grid">
            {videos.map((video) => (
              <ProductVideo video={video} copy={t} key={video.id} />
            ))}
          </div>
        </div>
      </section>
      <section className="ep-section wrap" data-reveal>
        <span className="ep-kicker">05 / B2B</span>
        <h2>{t.useTitle}</h2>
        <div className="ep-use-cases">
          {t.uses.map(([title, body], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="gallery" className="ep-section ep-gallery">
        <div className="wrap" data-reveal>
          <div className="ep-section-heading">
            <div>
              <span className="ep-kicker">06 / {t.overview}</span>
              <h2>{t.galleryTitle}</h2>
            </div>
            <p>{t.galleryBody}</p>
          </div>
          <MediaGallery copy={t} screens={screens} />
        </div>
      </section>
      <section className="ep-section wrap" data-reveal>
        <span className="ep-kicker">07 / {t.source}</span>
        <h2>{t.engineeringTitle}</h2>
        <div className="ep-engineering">
          {t.engineering.map(([title, body], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <aside className="ep-source-note">
          <ShieldCheck size={20} />
          <p>{t.sourceNote}</p>
        </aside>
      </section>
      <section className="ep-final">
        <div className="wrap">
          <div className="ep-final-mark" aria-hidden="true">
            <Cpu size={52} strokeWidth={1} />
          </div>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
          <div className="ep-actions">
            <Link href={`/${locale}#contact`} className="ep-button ep-button-white">
              {t.contact}
              <ArrowRight size={18} />
            </Link>
            <a
              className="ep-button"
              href={electronicsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.live}
              <ArrowUpRight size={17} />
            </a>
          </div>
          <small>{t.auth}</small>
        </div>
      </section>
    </main>
  );
}
