import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('root redirects to the real portfolio and preserves legitimate 404 responses', async ({
  page,
  request,
}) => {
  const root = await request.get('/', { maxRedirects: 0 });
  expect(root.status()).toBe(307);
  expect(root.headers().location).toBe('/en');
  await page.goto('/');
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ideas you can explore');
  for (const locale of ['es', 'invalid']) {
    const response = await request.get('/', {
      maxRedirects: 0,
      headers: { Cookie: `portfolio_locale=${locale}` },
    });
    expect(response.status()).toBe(307);
    expect(response.headers().location).toBe(locale === 'es' ? '/es' : '/en');
  }
  expect((await request.get('/invalid')).status()).toBe(404);
});
test('anonymous uploads are rejected before processing files', async ({ request }) => {
  const response = await request.post('/api/admin/upload', {
    headers: { Origin: 'http://localhost:4563' },
    maxRedirects: 0,
    data: {},
  });
  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe('/admin/login');
});
test('homepage communicates identity and switches language persistently', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ideas you can explore');

  await page.getByRole('link', { name: 'Español', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Ideas que ya puedes explorar',
  );
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await page.goto('/');
  await expect(page).toHaveURL(/\/es$/);
});
test('admin routes require authentication', async ({ page }) => {
  for (const path of [
    '/admin',
    '/admin/settings',
    '/admin/projects/new',
    '/admin/preview/00000000-0000-4000-8000-000000000000',
  ]) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  }
});
test('command palette supports keyboard, escape, and easter egg', async ({ page }) => {
  await page.goto('/en');
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('dialog').getByRole('textbox').fill('hire sebastian');
  await expect(page.getByRole('dialog')).toContainText('candidate found');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});
test('project filters and search show a recoverable empty state', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('searchbox').fill('nonexistent search term');
  await expect(page.getByText('No projects match these filters.')).toBeVisible();
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.getByRole('searchbox')).toHaveValue('');
});
test('404 and missing project return not-found pages', async ({ page }) => {
  for (const path of ['/en/projects/definitely-missing', '/not-a-real-route']) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('page');
  }
});
test('contact rejects invalid payload and cross-origin requests', async ({ request }) => {
  const a = await request.post('/api/contact', {
    headers: { Origin: 'https://evil.example' },
    data: {},
  });
  expect(a.status()).toBe(403);
  const b = await request.post('/api/contact', {
    headers: { Origin: 'http://localhost:4563' },
    data: { name: 'a', email: 'wrong', message: 'bad', started: Date.now() },
  });
  expect(b.status()).toBe(400);
  const malformed = await request.post('/api/contact', {
    headers: { Origin: 'http://localhost:4563', 'Content-Type': 'application/json' },
    data: '{',
  });
  expect(malformed.status()).toBe(400);
  const oversized = await request.post('/api/contact', {
    headers: { Origin: 'http://localhost:4563', 'Content-Type': 'application/json' },
    data: 'x'.repeat(13000),
  });
  expect(oversized.status()).toBe(413);
});
test('public pages have no automated accessibility violations', async ({ page }) => {
  for (const locale of ['en', 'es']) {
    await page.goto('/' + locale);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});
for (const width of [375, 390, 430, 768, 1024, 1440, 1920])
  test('layout fits ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
test('mobile navigation opens and closes on selection', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en');
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page
    .getByRole('navigation', { name: 'Menu', exact: true })
    .getByRole('link', { name: 'Contact', exact: true })
    .click();
  await expect(page.getByRole('navigation', { name: 'Menu', exact: true })).not.toBeVisible();
});
