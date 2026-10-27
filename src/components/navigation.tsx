'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import type { Locale, Settings } from '@/lib/types';
import { locales, languageNames } from '@/lib/locales';
import { Flag } from './flag';
import { dictionary } from '@/lib/i18n';
import { ArrowUpRight, Menu, X, Command, Search, ArrowRight } from './icons';
import { TrackLink } from './track-link';
export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const path = usePathname();
  return (
    <nav className="language" aria-label={dictionary(locale).changeLanguage}>
      <div className="language-options">
        {locales.map((l) => (
          <Link
            key={l}
            href={path.replace(/^\/(en|es|fr|de|it|zh|ja|pt)(?=\/|$)/, '/' + l)}
            lang={l}
            hrefLang={l}
            aria-label={languageNames[l]}
            title={languageNames[l]}
            aria-current={l === locale ? 'true' : undefined}
            onClick={(e) => {
              document.cookie = 'portfolio_locale=' + l + ';path=/;max-age=31536000;SameSite=Lax';
              e.currentTarget.closest('details')?.removeAttribute('open');
            }}
          >
            <Flag locale={l} />
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Header({
  locale,
  settings,
  hasExperience,
}: {
  locale: Locale;
  settings: Settings;
  hasExperience: boolean;
}) {
  const t = dictionary(locale),
    [open, setOpen] = useState(false);
  useEffect(() => {
    if (document.documentElement.lang !== locale) document.documentElement.lang = locale;
  }, [locale]);
  const links = [
    ['work', t.work],
    ['cv', 'CV'],
    ['services', t.services],
    ['about', t.about],
    ...(hasExperience ? [['experience', t.experience]] : []),
    ['contact', t.contact],
  ];
  return (
    <>
      <header className="header wrap">
        <Link className="brand" href={`/${locale}`}>
          <Image className="brand-photo" src="/cv/foto.jpeg" alt="" width={42} height={42} />
          {settings.name}
          <span className="accent">/</span>
        </Link>
        <nav className="nav" aria-label={t.menu}>
          {links.map(([id, label]) => (
            <Link key={id} href={`/${locale}#${id}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher locale={locale} />
          {settings.resume_path && (
            <TrackLink className="button small" href="/resume" event="resume_click">
              {t.resume}
              <ArrowUpRight size={14} />
            </TrackLink>
          )}
          <button
            className="menu-button"
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>
      {open && (
        <nav id="mobile-menu" className="mobile-nav wrap" aria-label={t.menu}>
          {links.map(([id, label]) => (
            <Link key={id} href={`/${locale}#${id}`} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          {settings.resume_path && <Link href="/resume">{t.resume}</Link>}
        </nav>
      )}
    </>
  );
}
export function CommandPalette({ locale, settings }: { locale: Locale; settings: Settings }) {
  const t = dictionary(locale),
    dialog = useRef<HTMLDialogElement>(null),
    input = useRef<HTMLInputElement>(null),
    [query, setQuery] = useState('');
  const path = usePathname();
  const open = () => {
    setQuery('');
    dialog.current?.showModal();
    input.current?.focus();
  };
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else {
          setQuery('');
          dialog.current?.showModal();
          input.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  const items = [
    { name: t.work, href: `/${locale}#work` },
    { name: t.about, href: `/${locale}#about` },
    { name: t.contact, href: `/${locale}#contact` },
    ...(settings.github_url ? [{ name: 'GitHub', href: settings.github_url }] : []),
    ...(settings.linkedin_url ? [{ name: 'LinkedIn', href: settings.linkedin_url }] : []),
    ...(settings.resume_path ? [{ name: t.resume, href: '/resume' }] : []),
    {
      name: t.changeLanguage,
      href: path.replace(/^\/(en|es|fr|de|it|zh|ja|pt)(?=\/|$)/, locale === 'en' ? '/es' : '/en'),
    },
  ].filter((x) => x.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <button className="key-button" aria-label={t.commands} onClick={open}>
        <Command size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> K
      </button>
      <dialog
        ref={dialog}
        className="command-dialog"
        aria-label={t.commands}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const elements = Array.from(
              dialog.current!.querySelectorAll<HTMLElement>('input,a,button'),
            );
            const i = elements.indexOf(document.activeElement as HTMLElement);
            elements[
              (i + (e.key === 'ArrowDown' ? 1 : -1) + elements.length) % elements.length
            ]?.focus();
          }
        }}
      >
        <div className="command-top">
          <Search size={18} />
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.commandPlaceholder}
            aria-label={t.commandPlaceholder}
          />
          <button onClick={() => dialog.current?.close()} aria-label={t.close}>
            esc
          </button>
        </div>
        {query.toLowerCase() === 'hire sebastian' ? (
          <div className="easter">
            &gt; candidate found
            <br />
            &gt; loading projects...
            <br />
            &gt; ready.
            <br />
            <Link href={`/${locale}#contact`} onClick={() => dialog.current?.close()}>
              {t.letsTalk} →
            </Link>
          </div>
        ) : (
          <div className="command-list">
            {items.map((item) => (
              <Link
                className="command-item"
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (item.name === t.changeLanguage)
                    document.cookie = `portfolio_locale=${locale === 'en' ? 'es' : 'en'};path=/;max-age=31536000;SameSite=Lax`;
                  dialog.current?.close();
                }}
              >
                {item.name}
                <ArrowRight size={14} />
              </Link>
            ))}
            {items.length === 0 && (
              <p className="muted" style={{ padding: 14 }}>
                {t.noResults}
              </p>
            )}
          </div>
        )}
        <div className="command-bottom">
          ↑ ↓ &nbsp; {locale === 'en' ? 'Navigate' : 'Navegar'} &nbsp; · &nbsp; esc &nbsp; {t.close}
        </div>
      </dialog>
    </>
  );
}
export function Footer({ locale, settings }: { locale: Locale; settings: Settings }) {
  const t = dictionary(locale);
  return (
    <footer className="footer wrap">
      <div className="footer-main">
        <Link className="brand" href={`/${locale}`}>
          <Image className="brand-photo" src="/cv/foto.jpeg" alt="" width={42} height={42} />
          {settings.name}
        </Link>
        <div className="hero-socials">
          {settings.github_url && (
            <a href={settings.github_url} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          )}
          {settings.linkedin_url && (
            <a href={settings.linkedin_url} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          )}
          {settings.email && <a href={`mailto:${settings.email}`}>{t.email} ↗</a>}
          <CommandPalette locale={locale} settings={settings} />
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} · {t.built}
        </span>
        <span>{t.footer}</span>
      </div>
    </footer>
  );
}
