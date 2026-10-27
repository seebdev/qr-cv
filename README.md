# qr-cv — Portafolio de Sebastián Solórzano

A bilingual developer portfolio and private content studio built with Next.js, React, TypeScript, Tailwind CSS and Supabase. English-first, designed for recruiters and clients who need to understand the work quickly and explore the engineering decisions in depth.

There are no seeded professional claims, projects, clients or impact statistics. The technology catalog is the only seed data. Add verified projects through the administrator.

## Requirements

- Node.js 22.16 or newer; npm. Use a currently patched Node 22 LTS release for deployment.
- A dedicated Supabase project, or Docker Desktop + Supabase CLI for local integration tests.
- A Render web service for deployment.

## Local development

1. Copy .env.example to .env.local.
2. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY and NEXT_PUBLIC_SITE_URL.
3. Install: npm ci.
4. Apply the versioned migration and seed to your selected Supabase project.
5. Add the server-only key and rate-limit secret to enable the contact inbox.
6. Start: npm run dev.

An installation without credentials renders the design with honest empty states and a disabled admin login. It does not simulate database writes or messages.

### Local Supabase

Run these commands from the repository:

```sh
supabase start
node scripts/configure-local.mjs
npm run admin:create
npm run dev
```

configure-local refuses to overwrite an existing .env.local. It captures local credentials without printing them and generates a random local admin password. The local email is portfolio-admin@example.test; use the ADMIN_PASSWORD value from your own ignored .env.local for login. Never reuse local credentials in production. The helper also generates a local Auth provisioning token valid for 24 hours, needed by some CLI/Auth version combinations. Refresh it with node scripts/refresh-local-auth.mjs before later provisioning or database tests. It is only used by test/provisioning scripts, never by the website.

Public signup is disabled at [auth].enable_signup in supabase/config.toml; [auth.email].enable_signup remains enabled so existing administrators can sign in. The CLI applies supabase/migrations and supabase/seed.sql on first startup. For a disposable local reset, use supabase db reset after checking supabase db reset --help; this removes local data.

### Remote Supabase

Choose the target project explicitly. Never point migration commands at an unrelated production database.

```sh
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

The migrations create all application tables, indexes, RLS, private storage and RPCs. Apply supabase/seed.sql once for the optional technology catalog (it is idempotent). Check current CLI help before using commands. Disable new user signups in Auth settings, configure Site URL to your deployed origin, and run security/performance advisors.

### Administrator creation

No public registration exists. Set ADMIN_EMAIL and a unique ADMIN_PASSWORD of at least 16 characters, along with SUPABASE_SECRET_KEY, in .env.local. Run npm run admin:create. The script creates a confirmed Auth user and an administrator profile; it rolls back the user if profile creation fails. Remove ADMIN_PASSWORD afterward. To authorize an existing account, use a trusted SQL session to insert its auth.users UUID into profiles with is_admin=true. Never grant permission based on user-editable metadata.

## Environment variables

| Variable                             | Purpose                                                                       | Public |
| ------------------------------------ | ----------------------------------------------------------------------------- | ------ |
| NEXT_PUBLIC_SUPABASE_URL             | Supabase API origin                                                           | Yes    |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | Publishable key, protected by RLS                                             | Yes    |
| NEXT_PUBLIC_SITE_URL                 | Absolute deployed canonical origin, no trailing slash                         | Yes    |
| SUPABASE_SECRET_KEY                  | Secret key (legacy service_role supported) for contact/analytics/provisioning | No     |
| CONTACT_RATE_LIMIT_SECRET            | Random 32+ character secret for daily hashed abuse identifiers                | No     |
| NEXT_PUBLIC_ANALYTICS_ENABLED        | true enables anonymous event counts; defaults false                           | Yes    |
| ADMIN_EMAIL / ADMIN_PASSWORD         | One-time provisioning script                                                  | No     |
| E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD | Disposable test administrator                                                 | No     |

Never expose secret/service keys through NEXT_PUBLIC variables. Keep .env.local out of source control. Production uses a dedicated administrator, not the test account.

## Content studio

/admin requires Auth plus profiles.is_admin. Manage projects, translated case studies, metrics, reusable technologies, cover/gallery images, GIF/video uploads, settings, optional experience and contact messages.

Save drafts before uploading media. Provide bilingual alt text; select an uploaded image as the cover. Order fields determine featured and gallery order. Published projects require names and summaries in both languages. A maximum of six featured projects is displayed, without filler cards.

The resume PDF and optional about photograph are managed in Settings. Social links are hidden until valid URLs are supplied. Contact messages are actually persisted in /admin/messages; no outbound email notification is configured. Delete inbox messages according to your retention needs.

## Routes

- / → saved language, English by default.
- /en, /es → portfolio, archive and contact.
- /en/projects/[slug], /es/projects/[slug] → published case studies.
- /projects/[slug] → English case-study alias.
- /projects → archive alias.
- /resume → currently uploaded PDF, or contact fallback.
- /admin/login → administrator login.
- /admin → statistics and projects.
- /admin/projects/new, /admin/projects/[id] → project editor.
- /admin/preview/[id]?lang=es → private case study preview.
- /admin/settings, /admin/technologies, /admin/experience.
- /admin/messages, /admin/analytics.
- /api/contact, /api/events, /api/admin/upload.
- /api/health, /api/og, /sitemap.xml, /robots.txt.

## Testing and quality

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:db
npm run test:e2e
```

Unit tests cover URL validation, publication requirements, dates, input boundaries, privilege stripping and file signatures. Database tests use real anon/member/service sessions and clean up their temporary records. Remote integration testing requires ALLOW_REMOTE_TESTS=true explicitly; prefer local Supabase.

Playwright uses installed Chrome. Public tests cover language persistence, admin guards, command palette, contact validation, missing routes, accessibility and widths 375/390/430/768/1024/1440/1920. The authenticated lifecycle needs E2E credentials and tests creation, edit, real cover upload, publication, draft privacy, duplication and deletion. Tests with missing credentials are skipped, not claimed as passed.

Production commands: npm run build and npm start. Lighthouse target is 95+ in all categories; actual scores must be measured against the final deployed content and infrastructure. See docs/VERIFICATION.md for this delivery's exact results.

## Render deployment

Guía actual en español y requisitos para trasladar el catálogo local: [DESPLIEGUE_RENDER.md](DESPLIEGUE_RENDER.md).

1. Push this repository and lockfile to your Git provider.
2. Create a Render Blueprint using render.yaml.
3. Supply the environment variables above, with a real HTTPS site origin.
4. Use Node 22.16+; build npm ci && npm run build; start npm start.
5. Apply migrations to the chosen Supabase project before the first health check.
6. Create a production administrator, disable public signup, add verified content and test /api/health.
7. Confirm login, publish/unpublish, uploads, inbox and canonical/OG URLs on the deployed hostname.

The server binds 0.0.0.0 and Next.js respects Render's PORT. Render's /api/health checks real Supabase connectivity. The configured Render starter instance is a paid plan; review your account's pricing before deploying.

## Security and operational notes

See docs/ARCHITECTURE.md for RLS, storage, server authorization, content safety, cookie refresh and abuse controls. The public data client is deliberately independent of administrator cookies, so private previews cannot populate public pages.

Storage URLs expire after five minutes. Publishing media makes it retrievable, and unpublishing prevents new links but cannot revoke downloads or still-valid links. The rate limiter relies on Render's trusted final forwarded address; adapt this for another proxy.

The analytics dashboard is an anonymous, bounded view of the latest 1,000 events in the last 30 days. For higher traffic, add SQL aggregates and a retention job. No counts or impact metrics are fabricated.

Optional future improvements: contact email notifications, CAPTCHA for sustained abuse, caption-file support for narrated video, gallery drag-and-drop, strict nonce CSP, MFA enforcement and a larger analytics aggregation pipeline.
