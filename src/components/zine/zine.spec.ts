import { expect, test } from '../../../e2e/baseFixtures.ts';
import type { Page } from '@playwright/test';

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto('/www/zine');
});

const runZineTests = () => {
  test('should pass simple test', async ({ page }) => {
    const customElementZine = await page.locator('x-zine').first();

    await expect(customElementZine).not.toBeVisible();
    await expect(customElementZine).toContainText('Choose a file (Click me)');
    await expect(customElementZine).not.toHaveAttribute('open');
    const removeButton = await page.locator('#remove-button');
    await removeButton.click();
  });
};

test.describe('Zine in dark mode', () => {
  test.use({
    colorScheme: 'dark'
  });
  runZineTests();
});

test.describe('Zine in light mode', () => {
  test.use({
    colorScheme: 'light'
  });
  runZineTests();
});
