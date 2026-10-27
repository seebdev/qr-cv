'use client';
import { useState } from 'react';
import { dictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/types';
import { ArrowUpRight, Copy, Check } from './icons';
import { track } from '@/lib/analytics';
export function CopyEmail({ email, locale }: { email: string; locale: Locale }) {
  const [copied, setCopied] = useState(false),
    [error, setError] = useState(false),
    t = dictionary(locale);
  return (
    <>
      <button
        className="copy-button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          } catch {
            setError(true);
          }
        }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        <span role="status">{copied ? t.copied : t.copy}</span>
      </button>
      {error && <span className="mono">{email}</span>}
    </>
  );
}
export function ContactForm({ locale, enabled }: { locale: Locale; enabled: boolean }) {
  const t = dictionary(locale),
    [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle'),
    [started] = useState(() => Date.now());
  if (!enabled) return <div className="notice">{t.contactUnavailable}</div>;
  return (
    <form
      className="contact-form"
      onInvalid={(e) => {
        const el = e.target as HTMLInputElement;
        el.setCustomValidity(t.sendError);
      }}
      onInput={(e) => (e.target as HTMLInputElement).setCustomValidity?.('')}
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setState('sending');
        const values = Object.fromEntries(new FormData(form));
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...values, started }),
          });
          if (!res.ok) throw new Error();
          setState('sent');
          form.reset();
          track('contact_click');
        } catch {
          setState('error');
        }
      }}
    >
      <div className="field-row">
        <label className="field">
          {t.name}
          <input name="name" autoComplete="name" required minLength={2} maxLength={100} />
        </label>
        <label className="field">
          {t.email}
          <input type="email" name="email" autoComplete="email" required maxLength={254} />
        </label>
      </div>
      <label className="field">
        {t.company} <span className="sr-only">{t.optional}</span>
        <input
          name="company"
          autoComplete="organization"
          maxLength={150}
          placeholder={t.optional}
        />
      </label>
      <label className="field">
        {t.message}
        <textarea name="message" required minLength={20} maxLength={5000} rows={4} />
      </label>
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="button primary" disabled={state === 'sending'} type="submit">
        {state === 'sending' ? t.sending : t.send}
        <ArrowUpRight size={17} />
      </button>
      <div aria-live="polite">
        {state === 'sent' && <p className="status-message">{t.sent}</p>}
        {state === 'error' && (
          <p className="status-message error" role="alert">
            {t.sendError}
          </p>
        )}
      </div>
      <p className="form-note">{t.consent}</p>
    </form>
  );
}
