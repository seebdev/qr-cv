import { createClient } from '@supabase/supabase-js';
const {
  NEXT_PUBLIC_SUPABASE_URL: url,
  SUPABASE_SECRET_KEY: key,
  ADMIN_EMAIL: email,
  ADMIN_PASSWORD: password,
} = process.env;
if (!url || !key || !email || !password || password.length < 16)
  throw new Error(
    'Set Supabase URL, secret key, ADMIN_EMAIL and a password of at least 16 characters in .env.local.',
  );
const client = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    headers: process.env.SUPABASE_AUTH_ADMIN_TOKEN
      ? { Authorization: 'Bearer ' + process.env.SUPABASE_AUTH_ADMIN_TOKEN }
      : {},
  },
});
const { data, error } = await client.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});
if (error) throw new Error(error.message);
const { error: profileError } = await client
  .from('profiles')
  .insert({ id: data.user.id, is_admin: true });
if (profileError) {
  await client.auth.admin.deleteUser(data.user.id);
  throw profileError;
}
process.stdout.write('Administrator created. Remove ADMIN_PASSWORD from the environment now.\n');
