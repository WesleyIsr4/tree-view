import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';

test.describe('Filter Features', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    helpers = new TestHelpers(page);
  });

  test('should show filter buttons', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Jaguar' })).toBeVisible();

    await helpers.selectCompany('Jaguar');

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    await helpers.waitForTreeToLoad();

    const energyButton = page.getByRole('button', {
      name: /Sensor de Energia/,
    });
    const criticalButton = page.getByRole('button', { name: 'Crítico' });

    await expect(energyButton).toBeVisible();
    await expect(criticalButton).toBeVisible();
  });

  test('should show search input', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Jaguar' })).toBeVisible();

    await helpers.selectCompany('Jaguar');

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    await helpers.waitForTreeToLoad();

    const searchInput = page.getByPlaceholder('Buscar Ativo ou Local');
    await expect(searchInput).toBeVisible();
  });

  test('should show advanced filters button', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Jaguar' })).toBeVisible();

    await helpers.selectCompany('Jaguar');

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    await helpers.waitForTreeToLoad();

    const advancedFiltersButton = page.locator(
      'button[title="Filtros avançados"]'
    );
    await expect(advancedFiltersButton).toBeVisible();
  });
});
