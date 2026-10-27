'use client';
import { useActionState, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  login,
  saveProject,
  saveSettings,
  saveTechnology,
  saveExperience,
  removeRecord,
  projectAction,
  type ActionState,
} from '@/app/admin/actions';
import {
  textFields,
  categories,
  type Project,
  type Technology,
  type Settings,
  type Experience,
  type Metric,
} from '@/lib/types';
import { slugify } from '@/lib/validation';
import { TranslationFields } from './translations';
import { locales, languageNames } from '@/lib/locales';
import { Plus, ArrowUpRight } from '../icons';
const initial: ActionState = {};
export function FormStatus({ state }: { state: ActionState }) {
  return (
    <div aria-live="polite">
      {state.error && (
        <p className="status-message error" role="alert">
          {state.error}
        </p>
      )}
      {state.success && <p className="status-message">{state.success}</p>}
    </div>
  );
}
export function LoginForm({ disabled = false }: { disabled?: boolean }) {
  const [state, action, pending] = useActionState(login, initial);
  return (
    <form action={action}>
      <label className="field">
        Email
        <input type="email" name="email" required autoComplete="username" />
      </label>
      <label className="field">
        Password
        <input
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="current-password"
        />
      </label>
      <button className="button primary" style={{ width: '100%' }} disabled={disabled || pending}>
        {pending ? 'Signing in…' : 'Sign in'}
        <ArrowUpRight size={16} />
      </button>
      <FormStatus state={pending ? {} : state} />
    </form>
  );
}
export function ProjectActions({ project: p }: { project: Project }) {
  const router = useRouter(),
    [pending, start] = useTransition(),
    [state, setState] = useState<ActionState>({});
  const run = (action: 'delete' | 'duplicate' | 'publish' | 'unpublish') => {
    if (action === 'delete' && !confirm('Delete this project and its media permanently?')) return;
    start(async () => {
      const result = await projectAction(p.id, action);
      setState(result);
      if (result.id) router.push('/admin/projects/' + result.id);
      else router.refresh();
    });
  };
  return (
    <div>
      <div className="actions">
        <Link className="button small" href={'/admin/projects/' + p.id}>
          Edit
        </Link>
        <Link className="button small" href={'/admin/preview/' + p.id}>
          Preview
        </Link>
        <button className="button small" onClick={() => run('duplicate')} disabled={pending}>
          Duplicate
        </button>
        <button
          className="button small"
          onClick={() => run(p.published ? 'unpublish' : 'publish')}
          disabled={pending}
        >
          {p.published ? 'Unpublish' : 'Publish'}
        </button>
        <button className="button small" onClick={() => run('delete')} disabled={pending}>
          Delete
        </button>
      </div>
      <FormStatus state={pending ? {} : state} />
    </div>
  );
}
const labels: Record<string, string> = {
  title: 'Project name',
  short_description: 'Short description',
  description: 'Overview / full description',
  case_study: 'Case study narrative',
  problem: 'The problem',
  solution: 'The solution',
  role: 'Role',
  contribution: 'My contribution',
  architecture: 'Architecture (short lines or → for diagram)',
  challenges: 'Challenges',
  decisions: 'Engineering decisions',
  results: 'Results',
  learnings: 'Learnings',
  features: 'Key features (one per line)',
  duration: 'Duration',
};
export function ProjectForm({
  project,
  technologies,
}: {
  project?: Project;
  technologies: Technology[];
}) {
  const router = useRouter(),
    [slug, setSlug] = useState(project?.slug || ''),
    [metrics, setMetrics] = useState<Metric[]>(project?.project_metrics || []);
  const [state, action, pending] = useActionState(async (prev: ActionState, form: FormData) => {
    const result = await saveProject(prev, form);
    if (result.id && !project) router.replace('/admin/projects/' + result.id);
    return result;
  }, initial);
  const textField = (field: string, l: string) => {
    const key = field + '_' + l,
      value = String(project?.[key as keyof Project] || '');
    const short = ['title', 'short_description', 'role', 'duration'].includes(field);
    return (
      <label className="field" key={key}>
        {labels[field]} · {l.toUpperCase()}
        {short ? (
          <input
            name={key}
            defaultValue={value}
            required={key === 'title_en'}
            maxLength={field === 'title' ? 150 : field === 'short_description' ? 320 : 1000}
            onBlur={(e) => {
              if (field === 'title' && l === 'en' && !slug) setSlug(slugify(e.target.value));
            }}
          />
        ) : (
          <textarea
            name={key}
            defaultValue={value}
            rows={field === 'architecture' ? 5 : 4}
            maxLength={20000}
          />
        )}
      </label>
    );
  };
  return (
    <form className="admin-form" action={action}>
      {project && <input type="hidden" name="id" value={project.id} />}
      <section className="panel">
        <h2>Project essentials</h2>
        <div className="form-grid">
          {['title', 'short_description'].flatMap((f) => ['en', 'es'].map((l) => textField(f, l)))}
          <label className="field">
            Slug
            <input
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              maxLength={120}
            />
          </label>
          <label className="field">
            Category
            <select name="category" defaultValue={project?.category || 'Full Stack'}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Project type
            <input name="project_type" defaultValue={project?.project_type || ''} maxLength={100} />
          </label>
          <label className="field">
            Year
            <input
              type="number"
              name="year"
              min={1990}
              max={2100}
              defaultValue={project?.year || new Date().getFullYear()}
              required
            />
          </label>
          {['start_date', 'end_date'].map((d) => (
            <label className="field" key={d}>
              {d === 'start_date' ? 'Start date' : 'End date'}
              <input
                type="date"
                name={d}
                defaultValue={String(project?.[d as keyof Project] || '')}
              />
            </label>
          ))}
          <label className="field">
            Status
            <select name="status" defaultValue={project?.status || 'completed'}>
              {['completed', 'in-progress', 'maintained', 'archived'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          {['role', 'duration'].flatMap((f) => ['en', 'es'].map((l) => textField(f, l)))}
        </div>
      </section>
      <details className="panel" open>
        <summary>Case study · English & Español</summary>
        <p className="muted">
          Plain text is rendered safely. Add only verified details. Empty sections are hidden.
        </p>
        <div className="form-grid">
          {textFields
            .filter((f) => !['title', 'short_description', 'role', 'duration'].includes(f))
            .flatMap((f) => ['en', 'es'].map((l) => textField(f, l)))}
        </div>
      </details>
      <section className="panel">
        <h2>Technology stack</h2>
        {technologies.length ? (
          <div className="check-grid">
            {technologies.map((tech) => (
              <label key={tech.id} className="checkbox">
                <input
                  type="checkbox"
                  name="technologies"
                  value={tech.id}
                  defaultChecked={project?.project_technologies.some(
                    (x) => x.technologies.id === tech.id,
                  )}
                />
                {tech.name}
              </label>
            ))}
          </div>
        ) : (
          <Link className="text-link" href="/admin/technologies">
            Create your first technology →
          </Link>
        )}
      </section>
      <section className="panel">
        <h2>Impact metrics</h2>
        <p className="muted">
          Use measured results only. Leave this section empty when no data is available.
        </p>
        <input
          type="hidden"
          name="metrics"
          value={JSON.stringify(metrics.map((m, i) => ({ ...m, display_order: i })))}
        />
        {metrics.map((m, i) => (
          <div className="form-grid" key={i}>
            {(['label_en', 'label_es', 'value'] as const).map((k) => (
              <label className="field" key={k}>
                {k}
                <input
                  value={m[k]}
                  required
                  maxLength={k === 'value' ? 80 : 100}
                  onChange={(e) =>
                    setMetrics(metrics.map((x, j) => (j === i ? { ...x, [k]: e.target.value } : x)))
                  }
                />
              </label>
            ))}
            <button
              type="button"
              className="button small"
              style={{ alignSelf: 'center' }}
              onClick={() => setMetrics(metrics.filter((_, j) => j !== i))}
            >
              Remove metric
            </button>
            <details>
              <summary>Traducciones</summary>
              {locales
                .filter((l) => l !== 'en' && l !== 'es')
                .map((l) => (
                  <label className="field" key={l}>
                    {languageNames[l]}
                    <input
                      maxLength={100}
                      value={m.translations?.[l]?.label || ''}
                      onChange={(e) =>
                        setMetrics(
                          metrics.map((x, j) =>
                            j === i
                              ? {
                                  ...x,
                                  translations: {
                                    ...x.translations,
                                    [l]: { label: e.target.value },
                                  },
                                }
                              : x,
                          ),
                        )
                      }
                    />
                  </label>
                ))}
            </details>
          </div>
        ))}
        <button
          type="button"
          className="button small"
          disabled={metrics.length >= 20}
          onClick={() =>
            setMetrics([
              ...metrics,
              { label_en: '', label_es: '', value: '', display_order: metrics.length },
            ])
          }
        >
          <Plus size={15} />
          Add metric
        </button>
      </section>
      <section className="panel">
        <h2>Links & publishing</h2>
        <div className="form-grid">
          {['github_url', 'live_url', 'external_url', 'video_url'].map((f) => (
            <label className="field" key={f}>
              {f.replace('_url', '').toUpperCase()} URL
              <input
                type="url"
                name={f}
                defaultValue={String(project?.[f as keyof Project] || '')}
                placeholder="https://"
                maxLength={2048}
              />
            </label>
          ))}
          <label className="field">
            Repository visibility
            <select
              name="repository_visibility"
              defaultValue={project?.repository_visibility || 'none'}
            >
              <option>public</option>
              <option>private</option>
              <option>none</option>
            </select>
          </label>
          {['featured_order', 'display_order'].map((f) => (
            <label className="field" key={f}>
              {f === 'featured_order' ? 'Featured order' : 'Project order'}
              <input
                type="number"
                name={f}
                min={0}
                max={10000}
                defaultValue={Number(project?.[f as keyof Project] || 0)}
              />
            </label>
          ))}
        </div>
        <label className="checkbox">
          <input name="featured" type="checkbox" defaultChecked={project?.featured} />
          Featured project (up to 6 shown)
        </label>
        <label className="checkbox">
          <input name="published" type="checkbox" defaultChecked={project?.published} />
          Published · visible to everyone
        </label>
      </section>
      <TranslationFields value={project?.translations} fields={textFields} />
      <div className="save-bar">
        <button className="button primary" disabled={pending}>
          {pending ? 'Saving…' : 'Save project'}
        </button>
        {project && (
          <Link className="button" href={'/admin/preview/' + project.id}>
            Preview
          </Link>
        )}
        <FormStatus state={pending ? {} : state} />
      </div>
    </form>
  );
}
export function DeleteButton({
  table,
  id,
  label = 'Delete',
}: {
  table: 'technologies' | 'experience' | 'contact_messages';
  id: string;
  label?: string;
}) {
  const [pending, start] = useTransition(),
    [state, setState] = useState<ActionState>({}),
    router = useRouter();
  return (
    <>
      <button
        className="button small"
        disabled={pending}
        onClick={() => {
          if (confirm('Delete this record permanently?'))
            start(async () => {
              setState(await removeRecord(table, id));
              router.refresh();
            });
        }}
      >
        {label}
      </button>
      <FormStatus state={pending ? {} : state} />
    </>
  );
}
export function TechnologyForm({ technology }: { technology?: Technology }) {
  const [state, action, pending] = useActionState(saveTechnology, initial);
  return (
    <form action={action} className="panel">
      {technology && <input type="hidden" name="id" value={technology.id} />}
      <div className="form-grid">
        <label className="field">
          Name
          <input name="name" required defaultValue={technology?.name} maxLength={80} />
        </label>
        <label className="field">
          Slug
          <input
            name="slug"
            defaultValue={technology?.slug}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            maxLength={100}
          />
        </label>
        <label className="field">
          Icon label (optional, local text)
          <input name="icon" defaultValue={technology?.icon} maxLength={40} />
        </label>
      </div>
      <button className="button primary small" disabled={pending}>
        {pending ? 'Saving…' : technology ? 'Save technology' : 'Create technology'}
      </button>
      <FormStatus state={pending ? {} : state} />
    </form>
  );
}
export function SettingsForm({ settings: s }: { settings: Settings }) {
  const [state, action, pending] = useActionState(saveSettings, initial);
  const fields = [
    'name',
    'headline_en',
    'headline_es',
    'bio_en',
    'bio_es',
    'about_en',
    'about_es',
    'email',
    'github_url',
    'linkedin_url',
    'location_en',
    'location_es',
    'seo_description_en',
    'seo_description_es',
  ] as const;
  return (
    <form action={action} className="admin-form">
      <div className="panel">
        <div className="form-grid">
          {fields.map((f) => (
            <label className="field" key={f}>
              {f.replaceAll('_', ' ')}
              {['bio', 'headline', 'about', 'seo'].some((x) => f.startsWith(x)) ? (
                <textarea name={f} defaultValue={s[f]} rows={3} />
              ) : (
                <input
                  name={f}
                  defaultValue={s[f]}
                  type={f === 'email' ? 'email' : f.includes('url') ? 'url' : 'text'}
                />
              )}
            </label>
          ))}
        </div>
        <label className="checkbox">
          <input name="available" type="checkbox" defaultChecked={s.available} />
          Available for opportunities
        </label>
      </div>
      <div className="save-bar">
        <button className="button primary" disabled={pending}>
          {pending ? 'Saving…' : 'Save settings'}
        </button>
        <FormStatus state={pending ? {} : state} />
      </div>
    </form>
  );
}
export function ExperienceForm({ experience: e }: { experience?: Experience }) {
  const [state, action, pending] = useActionState(saveExperience, initial);
  return (
    <form className="panel" action={action}>
      {e && <input type="hidden" name="id" value={e.id} />}
      <div className="form-grid">
        {['company', 'role_en', 'role_es'].map((f) => (
          <label className="field" key={f}>
            {f.replaceAll('_', ' ')}
            <input name={f} required defaultValue={String(e?.[f as keyof Experience] || '')} />
          </label>
        ))}
        {['description_en', 'description_es'].map((f) => (
          <label className="field" key={f}>
            {f.replaceAll('_', ' ')}
            <textarea name={f} defaultValue={String(e?.[f as keyof Experience] || '')} />
          </label>
        ))}
        {['start_date', 'end_date'].map((f) => (
          <label className="field" key={f}>
            {f.replaceAll('_', ' ')}
            <input
              type="date"
              name={f}
              required={f === 'start_date'}
              defaultValue={String(e?.[f as keyof Experience] || '')}
            />
          </label>
        ))}
        <label className="field">
          Technologies (comma separated)
          <input name="technologies" defaultValue={e?.technologies.join(', ')} />
        </label>
        <label className="field">
          Display order
          <input type="number" name="display_order" defaultValue={e?.display_order || 0} min={0} />
        </label>
      </div>
      <TranslationFields value={e?.translations} fields={['role', 'description']} />
      <label className="checkbox">
        <input type="checkbox" name="published" defaultChecked={e?.published} />
        Published
      </label>
      <button className="button primary small" disabled={pending}>
        {pending ? 'Saving…' : 'Save experience'}
      </button>
      <FormStatus state={pending ? {} : state} />
    </form>
  );
}
