import Image from 'next/image';
import { content, CONTACT } from '@/lib/cv-content';
import type { Locale } from '@/lib/types';

export function CvSection({ locale }: { locale: Locale }) {
  const language = locale === 'es' || locale === 'zh' ? locale : 'en';
  const c = content[language];
  return <section id="cv" className="section wrap cv-section" lang={language}>
    <div className="cv-heading">
      <Image className="cv-photo" src="/cv/foto.jpeg" alt={CONTACT.name} width={160} height={160} />
      <div><span className="eyebrow">CV / {c.hero.eyebrow}</span>
        <h2>{CONTACT.name}</h2><p>{c.hero.role}</p>
        <span className="muted">{CONTACT.location} · {CONTACT.phoneDisplay}</span>
      </div>
    </div>
    <p className="cv-lead">{c.hero.headline}</p>
    <div className="cv-columns">
      <article><h3>{c.about.eyebrow}</h3><p>{c.about.body}</p>
        <ul>{c.about.points.map(point => <li key={point}>{point}</li>)}</ul>
      </article>
      <article><h3>{c.stack.eyebrow}</h3><dl>{c.stack.items.map(([title, body]) =>
        <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl>
      </article>
    </div>
    <div className="cv-downloads"><div><h3>{c.downloads.title}</h3><p>{c.downloads.body}</p></div>
      <a className="button primary" href="/cv/cv-sebastian-solorzano-espanol.pdf" download>{c.downloads.spanish} ↓</a>
      <a className="button" href="/cv/cv-sebastian-solorzano-english.pdf" download>{c.downloads.english} ↓</a>
    </div>
  </section>;
}
