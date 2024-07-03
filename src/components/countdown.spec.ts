import { expect, test } from '../../e2e/baseFixtures.ts';
import AxeBuilder from '@axe-core/playwright';
import { ONE } from '../constants.ts';
import type { Page } from '@playwright/test';

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto('/');
});

test('Simple Countdown test', async ({ page }) => {
  const customElementCountdown = await page.locator('x-countdown').first();

  await expect(customElementCountdown).toBeVisible();
  await expect(customElementCountdown).toContainText('02:03:05');
  await expect(customElementCountdown).toHaveAttribute('days', '2');
  await expect(customElementCountdown).toHaveAttribute('hours', '3');
  await expect(customElementCountdown).toHaveAttribute('minutes', '5');
  await expect(customElementCountdown).toHaveAttribute('seconds', '7');
});

test('Countdown variants match screenshots', async ({ page }) => {
  const customElementCountdownRegularColor = await page
    .locator('x-countdown')
    .first();
  const customElementCountdownOddballColor = await page
    .locator('x-countdown')
    .nth(ONE);

  await expect(customElementCountdownRegularColor).toHaveScreenshot({
    mask: [customElementCountdownRegularColor.locator('.seconds').first()]
  });
  await expect(customElementCountdownOddballColor).toHaveScreenshot({
    mask: [customElementCountdownOddballColor.locator('.seconds').first()]
  });
});

test.describe('Countdown', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
