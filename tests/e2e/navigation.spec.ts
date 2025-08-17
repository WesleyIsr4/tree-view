import { test, expect } from '@playwright/test';

test.describe('Basic Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load initial page with company selector', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: 'Jaguar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tobias' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apex' })).toBeVisible();
  });

  test('should allow company selection', async ({ page }) => {
    await page.getByRole('button', { name: 'Jaguar' }).click();

    await expect(page.getByText('Ativos')).toBeVisible();
    await expect(page.getByText('/ Jaguar')).toBeVisible();
    await expect(page.getByText('Sensor de Energia')).toBeVisible();
    await expect(page.getByText('Crítico')).toBeVisible();
  });

  test('should show success toast when selecting company', async ({ page }) => {
    await page.getByRole('button', { name: 'Jaguar' }).click();

    await expect(page.getByText('Empresa selecionada')).toBeVisible();
    await expect(
      page.getByText('Jaguar foi selecionada com sucesso!')
    ).toBeVisible();
  });

  test('should switch between companies', async ({ page }) => {
    await page.getByRole('button', { name: 'Jaguar' }).click();
    await expect(page.getByText('/ Jaguar')).toBeVisible();

    await page.getByRole('button', { name: 'Tobias' }).click();
    await expect(page.getByText('/ Tobias')).toBeVisible();

    await page.getByRole('button', { name: 'Apex' }).click();
    await expect(page.getByText('/ Apex')).toBeVisible();
  });
});
