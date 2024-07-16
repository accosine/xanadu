import { expect, test } from '../../../e2e/baseFixtures.ts';
import AxeBuilder from '@axe-core/playwright';
import { ONE } from '../../constants.ts';
import type { Page } from '@playwright/test';

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto('/www/countdown');
});

const runCountdownTests = () => {
  test('should pass simple test', async ({ page }) => {
    const customElementCountdown = await page.locator('x-countdown').first();

    await expect(customElementCountdown).toBeVisible();
    await expect(customElementCountdown).toContainText('02:03:05');
    await expect(customElementCountdown).toHaveAttribute('days', '2');
    await expect(customElementCountdown).toHaveAttribute('hours', '3');
    await expect(customElementCountdown).toHaveAttribute('minutes', '5');
    await expect(customElementCountdown).toHaveAttribute('seconds', '7');
  });

  test('should match variants screenshots', async ({ page }) => {
    const customElementCountdownRegularColor = await page
      .locator('x-countdown')
      .first();
    const customElementCountdownColorViaPart = await page
      .locator('x-countdown')
      .nth(ONE);
    const customElementCountdownColorViaCustom = await page
      .locator('.viacustomproperty')
      .first();

    // Standard styling
    await expect(customElementCountdownRegularColor).toHaveScreenshot({
      mask: [customElementCountdownRegularColor.locator('.seconds').first()]
    });
    // Styling via part pseudo element
    await expect(customElementCountdownColorViaPart).toHaveScreenshot({
      mask: [customElementCountdownColorViaPart.locator('.seconds').first()]
    });
    // Styling via custom properties from outside of component
    await expect(customElementCountdownColorViaCustom).toHaveScreenshot({
      mask: [customElementCountdownColorViaCustom.locator('.seconds').first()]
    });
  });

  test('should not have accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
};

test.describe('Countdown in dark mode', () => {
  test.use({
    colorScheme: 'dark'
  });
  runCountdownTests();
});

test.describe('Countdown in light mode', () => {
  test.use({
    colorScheme: 'light'
  });
  runCountdownTests();
});
