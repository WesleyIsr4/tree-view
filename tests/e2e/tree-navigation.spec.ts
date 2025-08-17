import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Tree Navigation', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    helpers = new TestHelpers(page);
  });

  test('should load tree structure', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Jaguar' })).toBeVisible();

    await helpers.selectCompany('Jaguar');

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    await helpers.waitForTreeToLoad();

    const treeNodes = page.locator('[data-testid="tree-node"]');
    const nodeCount = await treeNodes.count();
    expect(nodeCount).toBeGreaterThan(0);
  });

  test('should show company selection', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Jaguar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tobias' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apex' })).toBeVisible();
  });
});
