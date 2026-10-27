import { test, expect } from '@playwright/test';
test('contact uses direct messaging without a misleading email form', async ({ page }) => {
  await page.goto('/es');
  await expect(page.locator('#contact form')).toHaveCount(0);
  await expect(page.locator('#contact .contact-direct a').first()).toHaveAttribute('href', 'https://wa.me/573108853158');
  await expect(page.locator('#contact .contact-direct a').last()).toHaveAttribute('href', /mail.google.com/);
  await expect(page.locator('main > section').nth(1)).toHaveAttribute('id', 'cv');
  await expect(page.locator('#cv a[download]')).toHaveCount(2);
  await expect(page.locator('.language summary')).toHaveCount(0);
  for (const flag of await page.locator('.language-options a').all()) await expect(flag).toBeVisible();
  await expect(page.locator('.project-card img')).toHaveCount(6);
  for (const image of await page.locator('.project-card img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  await page.locator('.intro-image').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.intro-image img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
});
