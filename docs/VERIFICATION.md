# Verification record

Verified on September 17, 2026 (America/Bogota), using the optimized Next.js production server and a real isolated local Supabase instance.

| Check                            | Result                                                |
| -------------------------------- | ----------------------------------------------------- |
| ESLint                           | PASS, no errors or warnings                           |
| TypeScript                       | PASS, production build type check, zero errors        |
| Unit tests                       | PASS, 18 / 18                                         |
| Public and contact browser tests | PASS, 16 / 16                                         |
| Authenticated browser lifecycle  | PASS, 1 / 1                                           |
| Database integration             | PASS, real anon/member/service sessions               |
| Storage integration              | PASS, real upload/download and publication policies   |
| Database lint                    | PASS, public/private schemas, no errors               |
| Production build                 | PASS, all application routes and proxy                |
| Accessibility                    | Axe: zero automated violations on EN and ES homepages |
| Responsive layout                | PASS at 375, 390, 430, 768, 1024, 1440 and 1920 px    |

## What was exercised

The browser lifecycle signs in, verifies HttpOnly authentication cookies, creates and edits a draft, confirms its public 404, rejects a damaged image, uploads and decodes an actual cover image, publishes, views the public case study, duplicates the project and its media, unpublishes, and deletes the temporary records. A separate contact test fills and submits the visible form, checks its success state, and verifies that the message exists in the private database inbox, then removes it.

Public checks include both languages, persisted language preference, the document language, command palette keyboard controls, the easter egg, archive controls, all protected administration routes, missing-page HTTP 404 responses, malformed/cross-origin contact requests, mobile navigation and all requested viewport widths.

Database tests verify draft and child-record isolation, administrator privilege escalation denial, unauthorized writes and RPC access, and atomic rate limiting. Storage tests verify private draft files, published access, loss of new access after unpublishing, anonymous upload denial, and disabled public registration.

Temporary test projects/messages are removed. No fabricated professional content is published.

## Reproduce

Run npm run lint, npm run typecheck, npm test, npm run build, npm run test:db, and npm run test:e2e. Integration tests need a disposable Supabase instance. Admin browser tests need E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD; missing credentials cause an explicit skip.

The local environment used Node 22.16.0, Next.js 16.3.5, installed Chrome, and Supabase CLI 2.75.0. Deploy with a currently patched Node 22 release. A temporary local Auth provisioning token handles the installed CLI/Auth signing compatibility; it is not used by the website.

## Scope and remaining configuration

Supabase PostgreSQL, Auth and Storage were connected and tested locally. No remote database was migrated, and no Render service was deployed. The connected remote account contains a project whose name belongs to another site; selecting the intended remote target is still required.

Add verified project content, the real email/social links, resume PDF and optional portrait in the administrator before public launch. Analytics is implemented but disabled by default; no live visitor traffic was used in verification.

Automated accessibility checks do not replace manual assistive-technology testing. No populated production portfolio or remote hosting performance is claimed.

## Lighthouse

Final production-server measurement, Lighthouse 12.6.1, fresh headless Chrome profiles, standard simulated mobile throttling and the standard desktop preset:

| Mode    | Performance | Accessibility | Best practices | SEO |
| ------- | ----------: | ------------: | -------------: | --: |
| Desktop |         100 |           100 |            100 | 100 |
| Mobile  |          83 |           100 |            100 | 100 |

The mobile performance target of 95 is **not met**. The final run recorded LCP 2.91 seconds, TBT 468 ms and CLS 0. Earlier optimization measurements varied between 79 and 89; these are local laboratory measurements, not field data. Validate and continue performance work on the final deployed hostname with actual project media before considering the performance requirement complete.

Font preloading/fallbacks, deferred offscreen layout, reduced unnecessary document-language updates, optimized image delivery and small client components are implemented. The final desktop result meets all four targets. No guarantee is made for a populated portfolio on another network or device.

Machine-readable results: [lighthouse-summary.json](lighthouse-summary.json). Full local reports are in .local/lighthouse-mobile-final.json and .local/lighthouse-desktop-final.json. Lighthouse was a temporary audit tool and is removed from the application dependencies.

## Final delivery checks

The browser assets were scanned against the configured private credentials: no matches. The real database-backed /api/health returned HTTP 200 with status ok. The final public regression checks passed after the font/layout changes. Screenshots for desktop, mobile and Spanish are in .local/screenshots; all three captures reported no browser page errors. Full-page screenshots explicitly render offscreen sections for visual inspection.

The 17 unique browser checks passed across the public, admin and contact runs; the final typography regression reran the nine language/accessibility/viewport checks. Repository initialization and ignore checks confirmed that .env.local, .local, node_modules and .next remain outside source control.

Dependency audit after removing the temporary Lighthouse tool: **0 vulnerabilities** across production and development dependencies.
