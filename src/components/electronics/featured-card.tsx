import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Cpu } from 'lucide-react';
import type { Locale } from '@/lib/locales';
import { electronicsCopy } from '@/lib/electronics/copy';
import { electronicsPath, electronicsStack, electronicsUrl } from '@/lib/electronics/links';
import { WorkspaceIllustration } from './visuals';

export function ElectronicsFeaturedCard({
  locale,
  image,
}: {
  locale: Locale;
  image: string | null;
}) {
  const t = electronicsCopy[locale];
  return (
    <article className="ep-featured" data-testid="electronics-featured">
      <div className="ep-featured-copy">
        <span className="ep-featured-badge">
          <span />
          {t.featured}
        </span>
        <div className="ep-featured-product">
          <Cpu size={20} />
          Electronic Parts Intelligence
        </div>
        <h2>
          <Link href={electronicsPath(locale)} className="ep-card-link">
            {t.lead}
          </Link>
        </h2>
        <p>{t.summary}</p>
        <ul className="ep-stack" aria-label={t.stackLabel}>
          {electronicsStack.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <span className="ep-featured-cta" aria-hidden="true">
          {t.readCase}
          <ArrowRight size={18} />
        </span>
      </div>
      <div className="ep-featured-art">
        {image ? (
          <Image
            src={image}
            alt={`${t.screenshot}: ${t.modules[0][0]}`}
            fill
            sizes="(max-width: 800px) 90vw, 55vw"
            preload
            unoptimized={image.startsWith('https:')}
          />
        ) : (
          <WorkspaceIllustration copy={t} />
        )}
      </div>
      <div className="ep-featured-bottom">
        <span>{t.badge}</span>
        <div>
          <a
            href={electronicsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="ep-featured-auth"
          >
            {t.live}
            <ArrowUpRight size={16} />
          </a>
          <small id="ep-featured-auth">{t.auth}</small>
        </div>
      </div>
    </article>
  );
}
