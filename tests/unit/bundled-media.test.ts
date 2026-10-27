import { beforeEach, describe, expect, it, vi } from 'vitest';
import catalog from '../../content/portfolio/catalog.json';
import sharp from 'sharp';

const mocks = vi.hoisted(() => ({ visible: true, storage: false, custom: false, downloads: 0 }));
vi.mock('@/lib/supabase/server', () => ({ publicClient: () => ({
  from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({
    data: mocks.visible ? { ...catalog.items[0].cover,
      storage_path: mocks.custom ? 'custom/image.webp' : catalog.items[0].cover.storage_path } : null, error: null,
  }) }) }) }),
  storage: { from: () => ({ download: async () => { mocks.downloads++; return mocks.storage ?
    { data: new Blob(['uploaded'], { type: 'image/webp' }), error: null } :
    { data: null, error: { message: 'Object not found' } }; },
  }) },
}) }));
import { GET } from '../../src/app/api/media/[id]/route';

describe('initial portfolio covers', () => {
  beforeEach(() => { mocks.visible = true; mocks.storage = false; mocks.custom = false; mocks.downloads = 0; });
  const request = (query = '') => GET(new Request('http://localhost/api/media/test' + query), {
    params: Promise.resolve({ id: catalog.items[0].cover.id }),
  });
  it('serves the bundled image when its public row exists but Storage is empty', async () => {
    const response = await request();
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('image/webp');
    expect((await response.arrayBuffer()).byteLength).toBeGreaterThan(1000);
    expect(mocks.downloads).toBe(0);
  });
  it('does not expose the bundled image when RLS hides the media row', async () => {
    mocks.visible = false;
    expect((await request()).status).toBe(404);
  });
  it('uses Storage for a new administrator upload', async () => {
    mocks.storage = true;
    mocks.custom = true;
    expect(await (await request()).text()).toBe('uploaded');
  });
  it('serves the smaller prebuilt mobile variant without encoding or Storage', async () => {
    const response = await request('?w=480');
    const bytes = Buffer.from(await response.arrayBuffer());
    expect((await sharp(bytes).metadata()).width).toBe(480);
    expect(bytes.byteLength).toBeLessThan(20000);
    expect(mocks.downloads).toBe(0);
  });
});
