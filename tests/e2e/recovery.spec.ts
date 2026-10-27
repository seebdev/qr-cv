import { test, expect } from '@playwright/test';
import { execFileSync } from 'node:child_process';

test('a real database API outage is visible and Retry recovers', async ({ page, request }) => {
  test.skip(
    process.env.E2E_LOCAL_RECOVERY !== 'true',
    'Opt-in: temporarily stops only local PostgREST.',
  );
  expect(new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).origin).toBe('http://127.0.0.1:54321');
  const container = 'supabase_rest_sebastian_solorzano_carvajal';
  const docker = (action: string) =>
    execFileSync('docker', [action, container], { stdio: 'pipe', timeout: 30000 });
  expect((await request.get('/api/health')).status()).toBe(200);
  try {
    docker('stop');
    expect((await request.get('/api/health')).status()).toBe(503);
    // The failing streamed document can remain open while the error UI is already interactive.
    await page.goto('/en', { waitUntil: 'commit' });
    await expect(page.getByRole('heading', { level: 1 })).toContainText('interrupted');
    docker('start');
    await expect.poll(async () => (await request.get('/api/health')).status()).toBe(200);
    await page.getByRole('button', { name: 'Try again', exact:true }).click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Ideas you can explore');
  } finally {
    docker('start');
  }
});
