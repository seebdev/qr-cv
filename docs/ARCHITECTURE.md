# Design and architecture

The portfolio is an editorial product built around rapid scanning and technical depth. The public site uses charcoal (#101110), warm white (#f0f0e8) and lime (#c6ed88), Manrope Variable for interface/headlines and JetBrains Mono for metadata. Fine borders, generous spacing and a lightweight DOM/SVG system diagram provide character. Reduced motion disables transforms and transitions. Narrow screens use a native monospace fallback to avoid a second initial font download. Offscreen homepage sections defer layout with content-visibility:auto; their content remains in the DOM and accessibility tree (https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility).

## Information architecture

Hero → selected work (maximum six, ordered) → capabilities → optional experience → about → searchable archive → contact → footer. English is canonical by default; /en and /es are independently indexable. The language control stores a SameSite cookie, and / follows that preference.

Each project supports an overview, problem, solution, contribution, architecture, features, decisions, challenges, results, lessons, metrics, stack and multimedia. Empty content sections are omitted. A diagram is produced only for short explicit architecture steps; the application never invents a system architecture.

## Application boundaries

- src/app/[locale]: server-rendered public routes and metadata.
- src/components: reusable presentation components and small interactive client islands.
- src/lib/data.ts: public-only data access using the publishable key without administrator cookies.
- src/lib/supabase/server.ts: cookie-aware and privileged clients, restricted to server modules.
- src/lib/auth.ts: live Auth user check and database administrator membership lookup.
- src/app/admin/(protected): separate dashboard, editors, assets, settings and inbox.
- src/app/admin/actions.ts: server-authorized mutations and Zod validation.
- src/app/api: bounded uploads, contact ingestion, privacy-respecting analytics and health.
- supabase/migrations: versioned schema, indexes, functions and policies.
- tests: critical validation, RLS integration and browser lifecycle.

## Data relationships

projects → project_technologies → technologies (many to many).
projects → project_media / project_metrics (one to many).
profiles references auth.users and provides immutable-to-browser administrator membership.
site_settings is a singleton. experience is optional. contact_messages and analytics_events are admin-only.
rate_limits is server-only and expires identifiers; it does not store raw addresses.

All project copy is stored in explicit _en and _es columns. Identity defaults are supplied from the brief for an unconfigured local preview; projects never fall back to hardcoded data.

## Security

A publishable key is not an authorization boundary: RLS is enabled for every public table. Public SELECT policies require published=true, including child records. The Storage bucket is private; public access is allowed only for media of published projects and referenced public settings assets. Assets are served with short-lived signed URLs. Previously issued links expire within five minutes; previously downloaded material cannot be revoked.

Admin status is read from profiles, never user_metadata. Profiles cannot be modified by authenticated browser users. The private.is_admin function has an explicit auth.uid check and a fixed empty search_path. Sensitive operations check live auth plus membership; proxy only refreshes sessions.

The service/secret key is used only by contact/analytics/provisioning. Form content is rendered as escaped React text, never trusted HTML. Uploads verify byte signatures and declared MIME type, fully decode images with a 25-megapixel limit, reject SVG/HTML, constrain sizes, use generated paths, and clean up when metadata insertion fails. PDFs are delivered via Supabase's asset origin.

Contact requests are same-origin, body-limited, Zod-validated, honeypot-checked and atomically rate-limited. Hashed daily network identifiers are used for abuse control. Configure the reverse proxy to overwrite/append trustworthy forwarded addresses; the implementation uses the final X-Forwarded-For value for Render. Supabase Auth provides login rate limits; disable public signups in the remote Auth dashboard.

The content security policy permits Next.js inline scripts/styles and therefore is defense in depth rather than a strict nonce-based policy. User content cannot inject markup. No analytics SDK, cookies, fingerprint or raw address logging is used.

## Runtime

Node 22.16+ and Next.js 16. Render runs npm ci && npm run build followed by npm start. Public configuration must exist at build time; secret keys remain runtime-only. No local persistent filesystem is required in production.
