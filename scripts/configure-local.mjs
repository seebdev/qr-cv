import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
if (existsSync('.env.local'))
  throw new Error('.env.local already exists; refusing to replace configuration.');
const output = execFileSync('supabase', ['status', '-o', 'env'], {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});
const values = Object.fromEntries(
  output
    .split(/\r?\n/)
    .map((line) => line.match(/^([A-Z_]+)="(.*)"$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);
if (!values.API_URL || !values.ANON_KEY || !values.SERVICE_ROLE_KEY)
  throw new Error('Supabase local is not ready.');
const authOutput = execFileSync(
  'supabase',
  ['gen', 'bearer-jwt', '--role', 'service_role', '--valid-for', '24h'],
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
);
const token = authOutput.match(/eyJ[\w-]+\.[\w-]+\.[\w-]+/)?.[0];
if (!token) throw new Error('Local Auth signing key unavailable.');
const password = randomBytes(24).toString('base64url') + 'aA1!';
writeFileSync(
  '.env.local',
  [
    'NEXT_PUBLIC_SUPABASE_URL=' + values.API_URL,
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=' + values.ANON_KEY,
    'NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000',
    'SUPABASE_SECRET_KEY=' + values.SERVICE_ROLE_KEY,
    'SUPABASE_AUTH_ADMIN_TOKEN=' + token,
    'CONTACT_RATE_LIMIT_SECRET=' + randomBytes(32).toString('hex'),
    'NEXT_PUBLIC_ANALYTICS_ENABLED=false',
    'ADMIN_EMAIL=portfolio-admin@example.test',
    'ADMIN_PASSWORD=' + password,
    'E2E_ADMIN_EMAIL=portfolio-admin@example.test',
    'E2E_ADMIN_PASSWORD=' + password,
    '',
  ].join('\n'),
);
process.stdout.write(
  'Local configuration created without displaying credentials. Run npm run admin:create.\n',
);
