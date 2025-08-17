import { test, expect } from '@playwright/test';

test.describe('Advanced Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Jaguar' })).toBeVisible();
    await page.getByRole('button', { name: 'Jaguar' }).click();
    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });
    await expect(page.getByText('Ativos')).toBeVisible();
  });

  test('should show performance monitor button', async ({ page }) => {
    const performanceButton = page.locator(
      'button[title="Monitor de Performance"]'
    );
    await expect(performanceButton).toBeVisible();
  });

  test('should show virtualization button', async ({ page }) => {
    const virtualizationButton = page.locator(
      'button[title="Alternar Virtualização"]'
    );
    await expect(virtualizationButton).toBeVisible();
  });

  test('should show company information', async ({ page }) => {
    await expect(page.getByText('Ativos')).toBeVisible();
    await expect(page.getByText('/ Jaguar')).toBeVisible();
  });
});
