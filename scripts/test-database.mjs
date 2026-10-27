import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
  key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !key || !secret)
  throw new Error(
    'A disposable Supabase test instance and all three API credentials are required.',
  );
if (
  !['localhost', '127.0.0.1'].includes(new URL(url).hostname) &&
  process.env.ALLOW_REMOTE_TESTS !== 'true'
)
  throw new Error('Remote test data requires ALLOW_REMOTE_TESTS=true. Prefer local Supabase.');
const options = {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    headers: process.env.SUPABASE_AUTH_ADMIN_TOKEN
      ? { Authorization: 'Bearer ' + process.env.SUPABASE_AUTH_ADMIN_TOKEN }
      : {},
  },
};
const admin = createClient(url, secret, options),
  anon = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }),
  member = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const unique = Date.now(),
  password = crypto.randomUUID() + 'Aa1!',
  email = 'rls-test-' + unique + '@example.com';
let userId;
const projectIds = [];
try {
  const { data: u, error: ue } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  assert.ifError(ue);
  userId = u.user.id;
  await admin.from('profiles').insert({ id: userId, is_admin: false });
  const { error: loginError } = await member.auth.signInWithPassword({ email, password });
  assert.ifError(loginError);
  const { data: projects, error: pe } = await admin
    .from('projects')
    .insert([
      {
        slug: 'rls-draft-' + unique,
        title_en: 'RLS test draft',
        title_es: '',
        short_description_en: '',
        short_description_es: '',
        published: false,
      },
      {
        slug: 'rls-live-' + unique,
        title_en: 'RLS test published',
        title_es: 'Prueba publicada',
        short_description_en: 'Automated test',
        short_description_es: 'Prueba automática',
        published: true,
      },
    ])
    .select();
  assert.ifError(pe);
  projectIds.push(...projects.map((x) => x.id));
  const draft = projects.find((x) => !x.published),
    published = projects.find((x) => x.published);
  const { error: me } = await admin.from('project_metrics').insert([
    { project_id: draft.id, label_en: 'Demo', label_es: 'Demo', value: 'test' },
    { project_id: published.id, label_en: 'Demo', label_es: 'Demo', value: 'test' },
  ]);
  assert.ifError(me);
  for (const client of [anon, member]) {
    const { data: visible, error } = await client
      .from('projects')
      .select('id')
      .in('id', projectIds);
    assert.ifError(error);
    assert.deepEqual(
      visible.map((x) => x.id),
      [published.id],
    );
    const { data: metrics } = await client
      .from('project_metrics')
      .select('project_id')
      .in('project_id', projectIds);
    assert.deepEqual(
      metrics.map((x) => x.project_id),
      [published.id],
    );
    const { error: insertError } = await client
      .from('projects')
      .insert({ slug: 'forbidden-' + unique, title_en: 'forbidden' });
    assert.ok(insertError);
    const { data: changed } = await client
      .from('projects')
      .update({ title_en: 'hacked' })
      .eq('id', published.id)
      .select();
    assert.equal(changed?.length || 0, 0);
    const { data: contacts } = await client.from('contact_messages').select('*');
    assert.equal(contacts?.length || 0, 0);
  }
  const { error: escalation } = await member
    .from('profiles')
    .update({ is_admin: true })
    .eq('id', userId);
  assert.ok(escalation);
  const { error: rpcError } = await member.rpc('save_project', {
    p_project: { id: published.id, title_en: 'hacked' },
    p_technologies: [],
    p_metrics: [],
  });
  assert.ok(rpcError);
  const { error: rateError } = await anon.rpc('consume_rate_limit', {
    p_key: 'test',
    p_limit: 1,
    p_seconds: 60,
  });
  assert.ok(rateError);
  const { data: limits } = await Promise.all(
    [1, 2, 3].map(() =>
      admin.rpc('consume_rate_limit', { p_key: 'test-' + unique, p_limit: 2, p_seconds: 60 }),
    ),
  ).then((r) => ({ data: r.map((x) => x.data) }));
  assert.equal(limits.filter(Boolean).length, 2);
  const { data: profile } = await admin
    .from('profiles')
    .select('is_admin')
    .eq('id', userId)
    .single();
  assert.equal(profile.is_admin, false);
  process.stdout.write(
    'PASS: anonymous/member RLS, draft children, write denial, privilege escalation, restricted RPC and atomic rate limiting.\n',
  );
} finally {
  if (projectIds.length) await admin.from('projects').delete().in('id', projectIds);
  if (userId) await admin.auth.admin.deleteUser(userId);
  await admin
    .from('rate_limits')
    .delete()
    .eq('key', 'test-' + unique);
}
