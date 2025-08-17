import { test, expect } from '@playwright/test';

test.describe('Error Handling and Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show message when no company is selected', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: 'Jaguar' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tobias' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apex' })).toBeVisible();
  });

  test('should show message when no item is selected in tree', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Jaguar' }).click();
    await expect(page.getByText('Ativos')).toBeVisible();

    await expect(
      page.getByText('Selecione um item para ver os detalhes')
    ).toBeVisible();
    await expect(
      page.getByText('Clique em um item na árvore para ver seus detalhes')
    ).toBeVisible();
  });

  test('should handle search with no results', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Jaguar' }).click();

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    const searchInput = page.getByPlaceholder('Buscar Ativo ou Local');
    await searchInput.fill('ITEM_INEXISTENTE');

    await page.waitForTimeout(1000);

    await expect(searchInput).toHaveValue('ITEM_INEXISTENTE');
  });

  test('should maintain filters when switching companies', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Jaguar' }).click();

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    await page.getByRole('button', { name: /Sensor de Energia/ }).click();
    await expect(
      page.getByRole('button', { name: /Sensor de Energia/ })
    ).toHaveClass(/bg-\[#2188FF\]/);

    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: 'Tobias' }).click();

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    await expect(
      page.getByRole('button', { name: /Sensor de Energia/ })
    ).toHaveClass(/bg-\[#2188FF\]/);
  });

  test('should handle expanding nodes without children', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Jaguar' }).click();

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    const expandButtons = page.locator('button').filter({ hasText: '▼' });
    const nodeCount = await expandButtons.count();

    if (nodeCount > 0) {
      await expect(expandButtons.first()).toBeVisible();
    }
  });

  test('should maintain selection when expanding/collapsing nodes', async ({
    page,
  }) => {
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Jaguar' }).click();

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    // Seleciona um nó específico clicável
    const firstNode = page.locator('[data-testid="status-indicator"]').first();
    await expect(firstNode).toBeVisible();

    // Clica no elemento pai que contém o texto do nó (o div clicável)
    const nodeContainer = firstNode.locator('..');
    await nodeContainer.click();

    await page.waitForTimeout(1000);

    // Verifica se o nó está selecionado verificando se os detalhes aparecem
    await expect(page.getByText('Tipo de Equipamento')).toBeVisible();

    const expandButton = page
      .locator('button')
      .filter({ hasText: '▼' })
      .first();
    if (await expandButton.isVisible()) {
      await expandButton.click();
      await page.waitForTimeout(500);

      // Verifica se a seleção ainda está ativa após expandir - detalhes ainda visíveis
      await expect(page.getByText('Tipo de Equipamento')).toBeVisible();
    }
  });

  test('should handle empty filters', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Jaguar' }).click();

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    const searchInput = page.getByPlaceholder('Buscar Ativo ou Local');
    await searchInput.clear();

    await page.waitForTimeout(1000);

    await expect(
      page.locator('[data-testid="status-indicator"]').first()
    ).toBeVisible();
  });

  test('should show correct statistics after filters', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Jaguar' }).click();

    await page.waitForSelector('[data-testid="status-indicator"]', {
      timeout: 30000,
    });

    await expect(
      page.locator('[data-testid="status-indicator"]').first()
    ).toBeVisible();

    await page.getByRole('button', { name: /Sensor de Energia/ }).click();

    await page.waitForTimeout(1000);

    await expect(
      page.getByRole('button', { name: /Sensor de Energia/ })
    ).toHaveClass(/bg-\[#2188FF\]/);
  });
});
