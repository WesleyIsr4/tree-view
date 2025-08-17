import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Smoke Test - Basic Features', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    helpers = new TestHelpers(page);
  });

  test('should load application successfully', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Jaguar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tobias' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apex' })).toBeVisible();
  });

  test('should select company', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Jaguar' })).toBeVisible();

    await helpers.selectCompany('Jaguar');

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    const nodeCount = await page
      .locator('[data-testid="status-indicator"]')
      .count();
    expect(nodeCount).toBeGreaterThan(0);
  });
});
