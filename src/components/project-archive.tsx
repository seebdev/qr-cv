'use client';
import { useState } from 'react';
import { categoryLabel } from '@/lib/labels';
import type { ArchiveProject } from '@/lib/archive';
import Link from 'next/link';
import { Search, ArrowUpRight } from './icons';
import { categories, localized, type Locale } from '@/lib/types';
import { dictionary } from '@/lib/i18n';
export function ProjectArchive({
  projects,
  locale,
}: {
  projects: ArchiveProject[];
  locale: Locale;
}) {
  const t = dictionary(locale),
    [query, setQuery] = useState(''),
    [category, setCategory] = useState('All'),
    [tech, setTech] = useState(''),
    [sort, setSort] = useState('featured');
  const technologies = Array.from(
    new Map(
      projects.flatMap((p) =>
        p.project_technologies.map((x) => [x.technologies.id, x.technologies] as const),
      ),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));
  const filtered = projects
    .filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (!tech || p.project_technologies.some((x) => x.technologies.id === tech)) &&
        `${localized(p, 'title', locale)} ${localized(p, 'short_description', locale)} ${p.project_technologies.map((x) => x.technologies.name).join(' ')}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === 'newest'
        ? b.year - a.year
        : sort === 'oldest'
          ? a.year - b.year
          : Number(b.featured) - Number(a.featured) ||
            a.featured_order - b.featured_order ||
            a.display_order - b.display_order,
    );
  return (
    <div>
      <div className="filters" aria-label={t.categoryLabel}>
        {['All', ...categories].map((c) => (
          <button
            className="filter"
            key={c}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c === 'All' ? t.all : categoryLabel(c, locale)}
          </button>
        ))}
      </div>
      <div className="archive-toolbar">
        <div className="search-field">
          <Search size={17} />
          <input
            type="search"
            aria-label={t.search}
            placeholder={t.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select aria-label={t.tech} value={tech} onChange={(e) => setTech(e.target.value)}>
          <option value="">{t.tech}</option>
          {technologies.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
        </select>
        <select aria-label={t.sortLabel} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">{t.featured}</option>
          <option value="newest">{t.newest}</option>
          <option value="oldest">{t.oldest}</option>
        </select>
      </div>
      <p className="archive-count mono" role="status">
        {String(filtered.length).padStart(2, '0')} {t.projects}
      </p>
      {filtered.map((p, i) => (
        <Link
          className="archive-row"
          href={p.live_url || `/${locale}/projects/${p.slug}`}
          key={p.id}
          target={p.live_url ? '_blank' : undefined}
          rel={p.live_url ? 'noopener noreferrer' : undefined}
        >
          <span className="mono muted">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3>{localized(p, 'title', locale)}</h3>
            <p>{localized(p, 'short_description', locale)}</p>
          </div>
          <div className="tags">
            {p.project_technologies.slice(0, 3).map((x) => (
              <span className="tag" key={x.technologies.id}>
                {x.technologies.name}
              </span>
            ))}
          </div>
          <span className="mono muted year">{p.project_type === 'showcase' ? '' : p.year}</span>
          <ArrowUpRight size={19} />
        </Link>
      ))}
      {filtered.length === 0 && (
        <div className="archive-empty">
          <p>{t.noResults}</p>
          {(query || tech || category !== 'All') && (
            <button
              className="button small"
              onClick={() => {
                setQuery('');
                setTech('');
                setCategory('All');
              }}
            >
              {t.reset}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
