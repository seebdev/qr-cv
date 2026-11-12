import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { locales } from '../../src/lib/locales';
import { electronicsCopy } from '../../src/lib/electronics/copy';
import { electronicsPath, electronicsUrl } from '../../src/lib/electronics/links';

test('featured card is first, opens the localized case and keeps the live link separate', async ({
  page,
}) => {
  await page.goto('/es');
  const card = page.getByTestId('electronics-featured');
  await expect(page.locator('#work article').first()).toHaveAttribute(
    'data-testid',
    'electronics-featured',
  );
  const existing = await page.locator('.project-card h2').allTextContents();
  expect(existing.length).toBeGreaterThan(0);
  await page.screenshot({ path: '.local/electronics-home.png' });
  await expect(card.locator('h2 a')).toHaveAttribute('href', electronicsPath('es'));
  await expect(card.getByRole('link', { name: electronicsCopy.es.live })).toHaveAttribute(
    'href',
    electronicsUrl,
  );
  await expect(card.getByRole('link', { name: electronicsCopy.es.live })).toHaveAttribute(
    'target',
    '_blank',
  );
  // The stretched native link deliberately covers the illustration. Click the
  // visible card area as a user would, rather than targeting the covered div.
  await card.locator('.ep-featured-art').scrollIntoViewIfNeeded();
  const art = await card.locator('.ep-featured-art').boundingBox();
  expect(art).not.toBeNull();
  await page.mouse.click(art!.x + art!.width / 2, art!.y + art!.height / 2);
  await expect(page).toHaveURL(electronicsPath('es'));
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Electronic Parts');
  await page.getByRole('link', { name: electronicsCopy.es.back }).click();
  await expect(page.locator('.project-card h2')).toHaveText(existing);
  await card.locator('h2 a').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(electronicsPath('es'));
});

test('all eight locales load complete product copy, metadata and the supplied video', async ({
  page,
  request,
}) => {
  const mediaRequests: string[] = [];
  page.on('request', (r) => {
    if (/\.(mp4|webm)(\?|$)/.test(r.url())) mediaRequests.push(r.url());
  });
  for (const locale of locales) {
    const response = await page.goto(electronicsPath(locale));
    expect(response?.status()).toBe(200);
    const t = electronicsCopy[locale];
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('.ep-hero-lead')).toHaveText(t.lead);
    await expect(page.locator('.ep-video-empty')).toHaveCount(1);
    await expect(page.locator('.ep-video-empty').first()).toContainText(t.comingSoon);
    await expect(page.locator('video')).toHaveCount(1);
    await expect(page.locator('video source')).toHaveAttribute(
      'src',
      '/electronics/videos/english.mp4',
    );
    await expect(page.locator('video')).toHaveAttribute('preload', 'none');
    await expect(page.locator('video')).toHaveAttribute(
      'poster',
      '/electronics/posters/english.webp',
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      new RegExp(`${electronicsPath(locale)}$`),
    );
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(9);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      t.summary,
    );
    const schema = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').first().textContent()) || '{}',
    );
    expect(schema.inLanguage).toBe(locale);
    expect(schema.about.applicationCategory).toBe('BusinessApplication');
    expect(schema.aggregateRating).toBeUndefined();
  }
  expect(mediaRequests).toEqual([]);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const locale of locales) expect(sitemap).toContain(electronicsPath(locale));
  const og = await request.get('/en/projects/demo-electronics/opengraph-image');
  expect(og.status()).toBe(200);
  expect(og.headers()['content-type']).toContain('image/png');
});

test('language changes keep the project route and saved preference', async ({ page }) => {
  await page.goto(electronicsPath('en'));
  await page.locator('.language-options a[lang="zh"]').click();
  await expect(page).toHaveURL(electronicsPath('zh'));
  await expect(page.locator('.ep-hero-lead')).toHaveText(electronicsCopy.zh.lead);
  await page.goto('/');
  await expect(page).toHaveURL('/zh');
});

test('module navigation and the gallery support keyboard use and restore focus', async ({
  page,
}) => {
  await page.goto(electronicsPath('en'));
  const modules = page.locator('.ep-module-nav button');
  for (let i = 0; i < 11; i++) {
    await modules.nth(i).focus();
    await page.keyboard.press('Enter');
    await expect(modules.nth(i)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.ep-module-copy h3')).toHaveText(electronicsCopy.en.modules[i][1]);
  }
  const trigger = page.locator('.ep-gallery-item').first();
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Clients', exact: true });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#ep-gallery-title')).toHaveText('Opportunity Finder');
  await page.keyboard.press('Escape');
  await expect(page.locator('.ep-dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

for (const width of [360, 768, 1440, 1920])
  test(`showcase fits ${width}px and has no automated accessibility violations`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const locale of ['es', 'zh', 'ja'] as const) {
      await page.goto(electronicsPath(locale));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await page.screenshot({ path: `.local/electronics-${locale}-${width}-hero.png` });
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(result.violations).toEqual([]);
      await page.screenshot({
        path: `.local/electronics-${locale}-${width}-full.png`,
        fullPage: true,
      });
    }
    await page.screenshot({ path: `.local/electronics-${width}.png`, fullPage: true });
  });

test('showcase loads without runtime errors or missing assets', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${new URL(r.url()).pathname}`);
  });
  await page.goto(electronicsPath('en'));
  for (const section of await page.locator('.ep-showcase section').all())
    await section.scrollIntoViewIfNeeded();
  expect(errors).toEqual([]);
});
