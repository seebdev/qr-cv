import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { hasTestDatabase } from './test-environment';
const email = process.env.E2E_ADMIN_EMAIL,
  password = process.env.E2E_ADMIN_PASSWORD;
// A trace records filled passwords and session headers; never persist it for this test.
test.use({ trace: 'off' });
test.describe('Authenticated lifecycle against real Supabase', () => {
  test.skip(
    !email || !password || !hasTestDatabase(),
    'Requires a disposable Supabase instance and E2E admin credentials.',
  );
  test('all studio sections render with an authenticated session', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/admin/login');
    await page.getByLabel('Email', { exact: true }).fill(email!);
    await page.getByLabel('Password', { exact: true }).fill(password!);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(page).toHaveURL(/\/admin$/);
    for (const [route, heading] of [
      ['/admin/settings', 'Site settings'],
      ['/admin/technologies', 'Technologies'],
      ['/admin/experience', 'Experience'],
      ['/admin/messages', 'Messages'],
      ['/admin/analytics', 'Analytics'],
      ['/admin/projects/new', 'New project'],
    ]) {
      expect((await page.goto(route))?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    }
    for (const route of ['/admin/projects/not-a-uuid', '/admin/preview/not-a-uuid']) {
      expect((await page.goto(route))?.status()).toBe(404);
    }
    expect(errors).toEqual([]);
  });
  test('login, create, edit, upload, publish, verify RLS, duplicate and delete', async ({
    page,
    browser,
  }) => {
    const stamp = Date.now(),
      slug = 'e2e-demo-' + stamp,
      title = 'E2E demo project ' + stamp;
    const cleanup = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    try {
      await page.goto('/admin/login');
      await page.getByLabel('Email', { exact: true }).fill(email!);
      await page.getByLabel('Password', { exact: true }).fill(password!);
      await page.getByRole('button', { name: 'Sign in', exact: true }).click();
      await expect(page).toHaveURL(/\/admin$/);
      await page.reload();
      await expect(page).toHaveURL(/\/admin$/);
      const authCookies = (await page.context().cookies()).filter((c) =>
        c.name.includes('-auth-token'),
      );
      expect(authCookies.length).toBeGreaterThan(0);
      expect(authCookies.every((c) => c.httpOnly)).toBe(true);
      await page.getByRole('link', { name: '+ New project' }).click();
      await page.getByLabel('Project name · EN', { exact: true }).fill(title);
      await page.getByLabel('Project name · ES', { exact: true }).fill('Proyecto demo de prueba');
      await page
        .getByLabel('Short description · EN', { exact: true })
        .fill('Clearly labeled temporary automated test content.');
      await page
        .getByLabel('Short description · ES', { exact: true })
        .fill('Contenido temporal de prueba automatizada.');
      await page.getByLabel('Slug', { exact: true }).fill(slug);
      await page.getByRole('button', { name: 'Save project', exact: true }).click();
      await expect(page).toHaveURL(/\/admin\/projects\/[a-f0-9-]+$/);
      const id = page.url().split('/').at(-1)!;
      const publicContext = await browser.newContext(),
        publicPage = await publicContext.newPage();
      const draft = await publicPage.goto('/en/projects/' + slug);
      expect(draft?.status()).toBe(404);
      await page.getByLabel('Project name · EN', { exact: true }).fill(title + ' edited');
      await page.locator('textarea[name="translation.fr.title"]').evaluate((el) => {
        let p = el.parentElement;
        while (p) {
          if (p.tagName === 'DETAILS') p.setAttribute('open', '');
          p = p.parentElement;
        }
      });
      await page.locator('textarea[name="translation.fr.title"]').fill('Projet de test français');
      await page.getByRole('button', { name: 'Save project', exact: true }).click();
      await expect(page.getByText('Project saved.')).toBeVisible();
      await page.reload();
      await expect(page.getByLabel('Project name · EN', { exact: true })).toHaveValue(
        title + ' edited',
      );
      await expect(page.locator('textarea[name="translation.fr.title"]')).toHaveValue(
        'Projet de test français',
      );
      const damagedUpload = await page.request.post('/api/admin/upload', {
        headers: { origin: new URL(page.url()).origin },
        multipart: {
          kind: 'project',
          project_id: id,
          alt_en: 'Damaged test file',
          alt_es: 'Archivo de prueba dañado',
          file: {
            name: 'damaged.png',
            mimeType: 'image/png',
            buffer: Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 0, 0, 0, 0, 0]),
          },
        },
      });
      expect(damagedUpload.status()).toBe(400);
      expect((await damagedUpload.json()).error).toContain('damaged');
      const png = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAFAAAAAyCAIAAABET8urAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAlUlEQVRoge3XQREAMQhDUeR/ZXVTD6uiw2HfDAIggSTMuf2qZr0DA4fhrHRuOKIVlWZLZ9skBY8krUTLZOk8D/mW7r5hsKVeQDDrkGO4pxDMOuQYDsNZ6dxwRCsqzZbOD2rWOzBwGM5K54YjWlFptnS2TVLwSNJKtEyWzvOQb+nuGwZb6gUEsw45hnsKwaxDjuGeQvABwxXb385tsgYAAAAASUVORK5CYII=',
        'base64',
      );
      await page
        .getByLabel('Upload project', { exact: true })
        .setInputFiles({ name: 'test-cover.png', mimeType: 'image/png', buffer: png });
      await page.getByLabel('Alternative text · EN', { exact: true }).fill('Temporary test image');
      await page
        .getByLabel('Alternative text · ES', { exact: true })
        .fill('Imagen temporal de prueba');
      await page.getByRole('button', { name: 'Upload media', exact: true }).click();
      await expect(page.getByText('Upload complete.')).toBeVisible();
      await page.getByRole('button', { name: 'Set cover', exact: true }).click();
      await expect(page.getByText('Cover', { exact: true })).toBeVisible();
      await page.getByLabel('Published · visible to everyone').check();
      await page.getByRole('button', { name: 'Save project', exact: true }).click();
      await expect(page.getByText('Project saved.')).toBeVisible();
      await publicPage.goto('/en/projects/' + slug);
      await expect(publicPage.getByRole('heading', { level: 1 })).toContainText('edited');
      await publicPage.goto('/fr/projects/' + slug);
      await expect(publicPage.getByRole('heading', { level: 1 })).toHaveText(
        'Projet de test français',
      );
      await publicPage.goto('/en/projects/' + slug);
      await expect
        .poll(() =>
          publicPage
            .getByRole('img', { name: 'Temporary test image', exact: true })
            .evaluate((img) => (img as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
      await page.goto('/admin');
      const row = page.getByRole('row').filter({ hasText: title });
      await row.getByRole('button', { name: 'Duplicate', exact: true }).click();
      await expect(page).toHaveURL(/\/admin\/projects\/[a-f0-9-]+$/);
      const copyId = page.url().split('/').at(-1)!;
      expect(copyId).not.toBe(id);
      await expect(page.getByLabel('Published · visible to everyone')).not.toBeChecked();
      page.on('dialog', (dialog) => dialog.accept());
      await page.goto('/admin');
      await page
        .getByRole('row')
        .filter({ hasText: title + ' edited (copy)' })
        .getByRole('button', { name: 'Delete', exact: true })
        .click();
      await expect(page.getByRole('row').filter({ hasText: title + ' edited (copy)' })).toHaveCount(
        0,
      );
      const original = page.getByRole('row').filter({ hasText: title });
      await original.getByRole('button', { name: 'Unpublish', exact: true }).click();
      await expect(original.getByText('Draft', { exact: true })).toBeVisible();
      await publicPage.goto('/en/projects/' + slug);
      await expect(publicPage.getByRole('heading', { level: 1 })).toContainText('page');
      await original.getByRole('button', { name: 'Delete', exact: true }).click();
      await expect(page.getByRole('row').filter({ hasText: title })).toHaveCount(0);
      await publicContext.close();
      await page.getByRole('button', { name: 'Sign out', exact: true }).click();
      await expect(page).toHaveURL(/\/admin\/login/);
      await page.goto('/admin');
      await expect(page).toHaveURL(/\/admin\/login/);
    } finally {
      // Only this run's unique slug and its copies; also clean up if a browser assertion fails.
      const { data: projects, error } = await cleanup
        .from('projects')
        .select('id')
        .like('slug', slug + '%');
      expect(error).toBeNull();
      if (projects?.length) {
        const ids = projects.map((project) => project.id);
        const { data: media, error: mediaError } = await cleanup
          .from('project_media')
          .select('storage_path')
          .in('project_id', ids);
        expect(mediaError).toBeNull();
        if (media?.length) {
          const { error: storageError } = await cleanup.storage
            .from('portfolio')
            .remove(media.map((item) => item.storage_path));
          expect(storageError).toBeNull();
        }
        const { error: deleteError } = await cleanup.from('projects').delete().in('id', ids);
        expect(deleteError).toBeNull();
      }
    }
  });
});
