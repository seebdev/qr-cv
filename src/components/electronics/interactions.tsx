'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Maximize2, Play, X } from 'lucide-react';
import { moduleIds, type ShowcaseCopy } from '@/lib/electronics/types';
import type { Screen, Video } from '@/lib/electronics/media';
import { ModuleIllustration, moduleIcons } from './visuals';

export function ModuleExplorer({ copy: t }: { copy: ShowcaseCopy }) {
  const [selected, setSelected] = useState(0);
  const [title, benefit, description, workflow] = t.modules[selected];
  const id = moduleIds[selected];
  return (
    <div className="ep-explorer">
      <div className="ep-module-nav" aria-label={t.modulesTitle}>
        {moduleIds.map((module, i) => {
          const Icon = moduleIcons[module];
          return (
            <button
              key={module}
              type="button"
              aria-pressed={i === selected}
              aria-controls="ep-module-detail"
              onClick={() => setSelected(i)}
            >
              <Icon size={18} />
              <span>{t.modules[i][0]}</span>
              <ArrowRight size={14} />
            </button>
          );
        })}
      </div>
      <div id="ep-module-detail" className="ep-module-detail" aria-live="polite" aria-atomic="true">
        <ModuleIllustration id={id} title={title} workflow={workflow} label={t.illustration} />
        <div className="ep-module-copy">
          <span className="ep-micro">
            {String(selected + 1).padStart(2, '0')} / {title}
          </span>
          <h3>{benefit}</h3>
          <p>{description}</p>
          <div className="ep-module-workflow">
            <span>{t.moduleFlow}</span>
            <p>{workflow}</p>
          </div>
          <small className="ep-evidence">
            <Check size={13} />
            {t.source}
          </small>
        </div>
      </div>
    </div>
  );
}

export function MediaGallery({ copy: t, screens }: { copy: ShowcaseCopy; screens: Screen[] }) {
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const screen = screens[selected];
  const index = moduleIds.indexOf(screen.module);
  const move = (offset: number) =>
    setSelected((n) => (n + offset + screens.length) % screens.length);
  const renderScreen = (s: Screen, large = false) => {
    const n = moduleIds.indexOf(s.module);
    return s.src && !failed.includes(s.src) ? (
      <Image
        src={s.src}
        alt={`${t.screenshot}: ${t.modules[n][0]}`}
        fill
        sizes={large ? '90vw' : '(max-width: 700px) 90vw, 30vw'}
        unoptimized={s.src.startsWith('https:')}
        onError={() => setFailed((v) => [...v, s.src!])}
      />
    ) : (
      <ModuleIllustration
        id={s.module}
        title={t.modules[n][0]}
        workflow={t.modules[n][3]}
        label={t.illustration}
      />
    );
  };
  return (
    <>
      <div className="ep-gallery-grid">
        {screens.map((s, i) => (
          <button
            className="ep-gallery-item"
            type="button"
            key={s.module}
            aria-label={`${t.zoom}: ${t.modules[moduleIds.indexOf(s.module)][0]}`}
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setSelected(i);
              dialog.current?.showModal();
            }}
          >
            <span className="ep-gallery-image">{renderScreen(s)}</span>
            <span className="ep-gallery-caption">
              <span>
                <strong>{t.modules[moduleIds.indexOf(s.module)][0]}</strong>
                <small>{s.src && !failed.includes(s.src) ? t.screenshot : t.placeholder}</small>
              </span>
              <Maximize2 size={17} />
            </span>
          </button>
        ))}
      </div>
      <dialog
        className="ep-dialog"
        ref={dialog}
        aria-labelledby="ep-gallery-title"
        onClose={() => trigger.current?.focus()}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            move(1);
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        <div className="ep-dialog-head">
          <h2 id="ep-gallery-title">{t.modules[index][0]}</h2>
          <button
            type="button"
            autoFocus
            aria-label={t.close}
            onClick={() => dialog.current?.close()}
          >
            <X size={22} />
          </button>
        </div>
        <div className="ep-dialog-image">{renderScreen(screen, true)}</div>
        <div className="ep-dialog-controls">
          <button type="button" onClick={() => move(-1)} aria-label={t.previous}>
            <ArrowLeft size={20} />
          </button>
          <span aria-live="polite">
            {selected + 1} / {screens.length} ·{' '}
            {screen.src && !failed.includes(screen.src) ? t.screenshot : t.illustration}
          </span>
          <button type="button" onClick={() => move(1)} aria-label={t.next}>
            <ArrowRight size={20} />
          </button>
        </div>
      </dialog>
    </>
  );
}

export function ProductVideo({ video: v, copy: t }: { video: Video; copy: ShowcaseCopy }) {
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const title = t[v.title];
  return (
    <article className="ep-video" aria-labelledby={`video-${v.id}`}>
      <div className="ep-video-frame">
        {v.src && !failed ? (
          <video
            controls
            playsInline
            preload="none"
            poster={posterFailed ? undefined : v.poster || undefined}
            aria-label={title}
            aria-describedby={`video-description-${v.id}`}
            onError={() => setFailed(true)}
          >
            <source src={v.src} onError={() => setFailed(true)} />
            {v.captions.map((c, i) => (
              <track
                key={c.src}
                kind="captions"
                src={c.src}
                srcLang={c.language}
                label={c.label}
                default={i === 0}
              />
            ))}
          </video>
        ) : (
          <div className="ep-video-empty" aria-live="polite">
            {v.poster && !posterFailed && (
              <Image
                src={v.poster}
                fill
                sizes="(max-width: 700px) 90vw, 45vw"
                alt=""
                unoptimized={v.poster.startsWith('https:')}
                onError={() => setPosterFailed(true)}
              />
            )}
            <span className="ep-play-icon">
              <Play size={26} strokeWidth={1.4} />
            </span>
            <span>{failed ? t.videoError : t.comingSoon}</span>
            <small lang={v.language}>{v.language === 'en' ? 'EN' : '中文'}</small>
          </div>
        )}
      </div>
      <div className="ep-video-copy">
        <span className="ep-micro" lang={v.language}>
          {v.language === 'en' ? 'English Product Walkthrough' : '中文产品演示'}
        </span>
        <h3 id={`video-${v.id}`}>{title}</h3>
        <p id={`video-description-${v.id}`}>{t[v.description]}</p>
      </div>
    </article>
  );
}

export function ScrollReveals() {
  useEffect(() => {
    if (
      !('IntersectionObserver' in window) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = 'true';
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.ep-showcase [data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
