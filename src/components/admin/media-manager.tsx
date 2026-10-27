'use client';
import { TranslationFields } from './translations';
import { formTranslations } from '@/lib/locales';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Media } from '@/lib/types';
import { mediaAction, updateMedia, removeAsset, type ActionState } from '@/app/admin/actions';
import { FormStatus } from './forms';
export function UploadForm({
  kind,
  projectId,
}: {
  kind: 'project' | 'resume' | 'photo';
  projectId?: string;
}) {
  const router = useRouter(),
    [files, setFiles] = useState<File[]>([]),
    [state, setState] = useState<ActionState>({}),
    [pending, setPending] = useState(false);
  async function upload(form: FormData) {
    setPending(true);
    setState({});
    try {
      if (!files.length) throw new Error('Choose a file first.');
      for (const file of files) {
        const data = new FormData();
        data.set('file', file);
        data.set('kind', kind);
        if (projectId) data.set('project_id', projectId);
        data.set('alt_en', String(form.get('alt_en') || ''));
        data.set('alt_es', String(form.get('alt_es') || ''));
        const res = await fetch('/api/admin/upload', { method: 'POST', body: data });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Upload failed.');
      }
      setFiles([]);
      setState({ success: 'Upload complete.' });
      router.refresh();
    } catch (e) {
      setState({ error: e instanceof Error ? e.message : 'Upload failed.' });
    } finally {
      setPending(false);
    }
  }
  return (
    <form action={upload}>
      <div
        className="upload-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setFiles(Array.from(e.dataTransfer.files).slice(0, kind === 'project' ? 10 : 1));
        }}
      >
        <label className="field" style={{ margin: 0 }}>
          Drop files here, or choose files
          <input
            aria-label={'Upload ' + kind}
            type="file"
            multiple={kind === 'project'}
            accept={
              kind === 'resume'
                ? 'application/pdf'
                : kind === 'photo'
                  ? 'image/png,image/jpeg,image/webp,image/gif'
                  : 'image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm'
            }
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
        </label>
        <span className="mono muted">
          {files.length
            ? files.map((f) => f.name).join(' · ')
            : 'Images / PDF ≤ 10 MB · videos ≤ 25 MB'}
        </span>
      </div>
      {kind === 'project' && (
        <div className="form-grid" style={{ marginTop: 20 }}>
          <label className="field">
            Alternative text · EN
            <input name="alt_en" required maxLength={300} />
          </label>
          <label className="field">
            Alternative text · ES
            <input name="alt_es" required maxLength={300} />
          </label>
        </div>
      )}
      <button
        className="button small"
        style={{ marginTop: 15 }}
        disabled={pending || !files.length}
      >
        {pending ? 'Uploading…' : 'Upload ' + (kind === 'project' ? 'media' : kind)}
      </button>
      <FormStatus state={state} />
    </form>
  );
}
function MediaItem({ media: m, index, total }: { media: Media; index: number; total: number }) {
  const [state, setState] = useState<ActionState>({}),
    [pending, start] = useTransition(),
    router = useRouter();
  const run = (action: 'cover' | 'delete') => {
    if (action === 'delete' && !confirm('Delete this media file permanently?')) return;
    start(async () => {
      setState(await mediaAction(m.id, action));
      router.refresh();
    });
  };
  return (
    <article className="media-item">
      <div className="media-preview">
        {m.url &&
          (m.kind === 'image' ? (
            <Image src={m.url} alt={m.alt_en} fill sizes="300px" unoptimized />
          ) : (
            <video src={m.url} controls preload="metadata">
              <track kind="captions" />
            </video>
          ))}
      </div>
      {m.is_cover && <span className="badge">Cover</span>}
      <form
        action={(form) =>
          start(async () => {
            setState(
              await updateMedia(m.id, {
                translations: formTranslations(form),
                alt_en: String(form.get('alt_en')),
                alt_es: String(form.get('alt_es')),
                display_order: Number(form.get('display_order')),
              }),
            );
            router.refresh();
          })
        }
      >
        <label className="field">
          Alt EN
          <input name="alt_en" defaultValue={m.alt_en} required maxLength={300} />
        </label>
        <label className="field">
          Alt ES
          <input name="alt_es" defaultValue={m.alt_es} required maxLength={300} />
        </label>
        <label className="field">
          Order
          <input
            name="display_order"
            type="number"
            min={0}
            max={10000}
            defaultValue={m.display_order}
          />
        </label>
        <TranslationFields value={m.translations} fields={['alt']} />
        <button className="button small" disabled={pending}>
          Save details
        </button>
      </form>
      <div className="media-actions">
        {m.kind === 'image' && !m.is_cover && (
          <button className="button small" disabled={pending} onClick={() => run('cover')}>
            Set cover
          </button>
        )}
        <button className="button small" disabled={pending} onClick={() => run('delete')}>
          Delete
        </button>
        <span className="mono muted">
          {index + 1}/{total}
        </span>
      </div>
      <FormStatus state={state} />
    </article>
  );
}
export function MediaManager({ projectId, media }: { projectId: string; media: Media[] }) {
  return (
    <section className="panel">
      <h2>Cover & gallery</h2>
      <p className="muted">
        Upload images, GIFs and videos. Choose a cover and change the order numbers to arrange the
        gallery. The selected cover is also the video poster; videos never autoplay.
      </p>
      <UploadForm kind="project" projectId={projectId} />
      <div className="media-grid">
        {media.map((m, i) => (
          <MediaItem
            key={m.id + m.display_order + m.is_cover}
            media={m}
            index={i}
            total={media.length}
          />
        ))}
      </div>
    </section>
  );
}
export function AssetManager({ kind, path }: { kind: 'resume' | 'photo'; path: string }) {
  const [state, setState] = useState<ActionState>({}),
    [pending, start] = useTransition(),
    router = useRouter();
  return (
    <section className="panel">
      <h2>{kind === 'resume' ? 'Resume PDF' : 'About photograph'}</h2>
      {path && (
        <div style={{ marginBottom: 20 }}>
          <span className="badge">Uploaded</span>{' '}
          <button
            className="button small"
            disabled={pending}
            onClick={() => {
              if (confirm('Remove this asset?'))
                start(async () => {
                  setState(await removeAsset(kind));
                  router.refresh();
                });
            }}
          >
            Remove
          </button>
          {kind === 'resume' && (
            <a className="button small" href="/resume" target="_blank">
              View PDF ↗
            </a>
          )}
        </div>
      )}
      <UploadForm kind={kind} />
      <FormStatus state={state} />
    </section>
  );
}
