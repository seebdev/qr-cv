import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('desktop and mobile render without console errors or failed assets', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('requestfailed', (request) => {
    if (request.failure()?.errorText !== 'net::ERR_ABORTED') {
      errors.push('Failed request: ' + new URL(request.url()).pathname);
    }
  });
  page.on('response', (response) => {
    if (response.status() >= 400) {
      errors.push(`HTTP ${response.status()}: ${new URL(response.url()).pathname}`);
    }
  });
  await mkdir('.local/audit-screenshots', { recursive: true });
  for (const [locale, width] of [
    ['en', 1440],
    ['es', 390],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto('/' + locale);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.screenshot({ path: `.local/audit-screenshots/${locale}-${width}.png` });
  }
  expect(errors).toEqual([]);
});
