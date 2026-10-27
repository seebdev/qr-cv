import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
const env = readFileSync('.env.local', 'utf8');
if (!/NEXT_PUBLIC_SUPABASE_URL=http:\/\/(127\.0\.0\.1|localhost):/.test(env))
  throw new Error('This helper is only for the local Supabase instance.');
const output = execFileSync(
  'supabase',
  ['gen', 'bearer-jwt', '--role', 'service_role', '--valid-for', '24h'],
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
);
const token = output.match(/eyJ[\w-]+\.[\w-]+\.[\w-]+/)?.[0];
if (!token) throw new Error('Local signing key unavailable.');
writeFileSync(
  '.env.local',
  env.replace(/^SUPABASE_AUTH_ADMIN_TOKEN=.*\r?\n?/m, '').trimEnd() +
    '\nSUPABASE_AUTH_ADMIN_TOKEN=' +
    token +
    '\n',
);
process.stdout.write(
  'Local Auth provisioning token refreshed for 24 hours. No credentials displayed.\n',
);
