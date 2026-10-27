import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
  key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !key || !secret) throw new Error('Configure a disposable test Supabase.');
if (
  !['127.0.0.1', 'localhost'].includes(new URL(url).hostname) &&
  process.env.ALLOW_REMOTE_TESTS !== 'true'
)
  throw new Error('Remote testing requires ALLOW_REMOTE_TESTS=true.');
const options = { auth: { persistSession: false, autoRefreshToken: false } },
  service = createClient(url, secret, options),
  anon = createClient(url, key, options);
let projectId, path;
try {
  const authSettings = await fetch(url + '/auth/v1/settings', { headers: { apikey: key } }).then(
    (r) => r.json(),
  );
  assert.equal(authSettings.disable_signup, true, 'Public signup must be disabled');
  const { data: p, error } = await service
    .from('projects')
    .insert({
      slug: 'storage-test-' + Date.now(),
      title_en: 'Storage test',
      title_es: 'Prueba Storage',
      short_description_en: 'Temporary test',
      short_description_es: 'Prueba temporal',
    })
    .select()
    .single();
  assert.ifError(error);
  projectId = p.id;
  path = p.id + '/test.png';
  const file = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAFAAAAAyCAIAAABET8urAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAlUlEQVRoge3XQREAMQhDUeR/ZXVTD6uiw2HfDAIggSTMuf2qZr0DA4fhrHRuOKIVlWZLZ9skBY8krUTLZOk8D/mW7r5hsKVeQDDrkGO4pxDMOuQYDsNZ6dxwRCsqzZbOD2rWOzBwGM5K54YjWlFptnS2TVLwSNJKtEyWzvOQb+nuGwZb6gUEsw45hnsKwaxDjuGeQvABwxXb385tsgYAAAAASUVORK5CYII=',
    'base64',
  );
  const { error: upload } = await service.storage
    .from('portfolio')
    .upload(path, file, { contentType: 'image/png' });
  assert.ifError(upload);
  const { error: media } = await service.from('project_media').insert({
    project_id: p.id,
    storage_path: path,
    kind: 'image',
    alt_en: 'Test image',
    alt_es: 'Imagen de prueba',
  });
  assert.ifError(media);
  const { error: draft } = await anon.storage.from('portfolio').createSignedUrl(path, 60);
  assert.ok(draft, 'Draft storage must be inaccessible');
  await service.from('projects').update({ published: true }).eq('id', p.id);
  const { data: signed, error: published } = await anon.storage
    .from('portfolio')
    .createSignedUrl(path, 60);
  assert.ifError(published);
  assert.ok(signed.signedUrl);
  const response = await fetch(signed.signedUrl);
  assert.equal(response.status, 200);
  const { error: forbiddenUpload } = await anon.storage
    .from('portfolio')
    .upload('forbidden.png', file, { contentType: 'image/png' });
  assert.ok(forbiddenUpload);
  await service.from('projects').update({ published: false }).eq('id', p.id);
  const { error: hidden } = await anon.storage.from('portfolio').createSignedUrl(path, 60);
  assert.ok(hidden, 'Unpublishing denies new links');
  process.stdout.write(
    'PASS: public signup disabled, real storage upload/download, draft privacy, published access and unpublishing.\n',
  );
} finally {
  if (projectId) await service.from('projects').delete().eq('id', projectId);
  if (path) await service.storage.from('portfolio').remove([path]);
}
