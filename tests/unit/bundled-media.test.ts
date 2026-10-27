import { beforeEach, describe, expect, it, vi } from 'vitest';
import catalog from '../../content/portfolio/catalog.json';

const mocks = vi.hoisted(() => ({ visible: true, storage: false }));
vi.mock('@/lib/supabase/server', () => ({ publicClient: () => ({
  from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({
    data: mocks.visible ? catalog.items[0].cover : null, error: null,
  }) }) }) }),
  storage: { from: () => ({ download: async () => mocks.storage ?
    { data: new Blob(['uploaded'], { type: 'image/webp' }), error: null } :
    { data: null, error: { message: 'Object not found' } },
  }) },
}) }));
import { GET } from '../../src/app/api/media/[id]/route';

describe('initial portfolio covers', () => {
  beforeEach(() => { mocks.visible = true; mocks.storage = false; });
  const request = () => GET(new Request('http://localhost/api/media/test'), {
    params: Promise.resolve({ id: catalog.items[0].cover.id }),
  });
  it('serves the bundled image when its public row exists but Storage is empty', async () => {
    const response = await request();
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('image/webp');
    expect((await response.arrayBuffer()).byteLength).toBeGreaterThan(1000);
  });
  it('does not expose the bundled image when RLS hides the media row', async () => {
    mocks.visible = false;
    expect((await request()).status).toBe(404);
  });
  it('prefers the uploaded image if available', async () => {
    mocks.storage = true;
    expect(await (await request()).text()).toBe('uploaded');
  });
});
