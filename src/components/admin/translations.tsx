'use client';
import { languageNames, locales, type Translations } from '@/lib/locales';
export function TranslationFields({
  value,
  fields,
}: {
  value?: Translations;
  fields: readonly string[];
}) {
  return (
    <details className="panel">
      <summary>Traducciones · Français / Deutsch / Italiano / 中文 / 日本語 / Português</summary>
      <p className="muted">Los campos vacíos usan inglés y después español como alternativa.</p>
      {locales
        .filter((l) => l !== 'en' && l !== 'es')
        .map((l) => (
          <details key={l}>
            <summary>{languageNames[l]}</summary>
            <div className="form-grid">
              {fields.map((f) => (
                <label className="field" key={f}>
                  {f.replaceAll('_', ' ')} · {l.toUpperCase()}
                  <textarea
                    name={`translation.${l}.${f}`}
                    defaultValue={value?.[l]?.[f] || ''}
                    maxLength={20000}
                    rows={3}
                  />
                </label>
              ))}
            </div>
          </details>
        ))}
    </details>
  );
}
