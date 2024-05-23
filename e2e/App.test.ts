import { test, expect } from './baseFixtures';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Simple Countdown test', async ({ page }) => {
  const customElementCountdown = await page.locator('x-countdown');

  await expect(customElementCountdown).toBeVisible();
  await expect(customElementCountdown).toContainText('02:03:05');
  await expect(customElementCountdown).toHaveAttribute('days', '2');
  await expect(customElementCountdown).toHaveAttribute('hours', '3');
  await expect(customElementCountdown).toHaveAttribute('minutes', '5');
  await expect(customElementCountdown).toHaveAttribute('seconds', '7');
});
