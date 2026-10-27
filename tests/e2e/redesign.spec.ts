import { test, expect } from '@playwright/test';
import { locales } from '../../src/lib/locales';
import fs from 'node:fs';
const catalog = JSON.parse(fs.readFileSync('scripts/portfolio-catalog.json', 'utf8')) as {
  name: string;
  url: string;
  descriptions: string[];
}[];
import { hasTestDatabase } from './test-environment';
test('eight locales preserve the catalog, links and project route', async ({ page, request }) => {
  test.skip(!hasTestDatabase(), 'Requires imported local catalog');
  for (const locale of locales) {
    expect((await page.goto('/' + locale))?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('main>section').first()).toHaveAttribute('id', 'work');
    await expect(page.locator('.project-card h2')).toHaveText(catalog.map((p) => p.name));
    expect(
      await page
        .locator('.project-card .project-links a[target="_blank"]')
        .evaluateAll((els) => els.map((e) => e.getAttribute('href'))),
    ).toEqual(catalog.map((p) => p.url));
    await expect(page.locator('.project-card').first().locator('p')).toHaveText(
      catalog[0].descriptions[locales.indexOf(locale)],
    );
    await page.locator('.project-links a').first().click();
    await expect(page).toHaveURL(new RegExp('/' + locale + '/projects/crepes-waffles$'));

    const other = locale === 'fr' ? 'ja' : 'fr';
    await page.locator('.language-options a[lang="' + other + '"]').click();
    await expect(page).toHaveURL(new RegExp('/' + other + '/projects/crepes-waffles$'));
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', other);
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const l of locales) expect(sitemap).toContain('/' + l + '/projects/crepes-waffles');
});
test('contact links are exact, safe and comfortable on narrow screens', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/es');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const buttons = page.locator('.floating-contact a');
  await expect(buttons.nth(0)).toHaveAttribute('href', 'https://wa.me/573108853158');
  await expect(buttons.nth(1)).toHaveAttribute(
    'href',
    'https://mail.google.com/mail/?view=cm&fs=1&to=sebastianssc01%40gmail.com',
  );
  for (const link of await buttons.all()) {
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    const box = await link.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.floating-contact')).not.toBeVisible();
});
