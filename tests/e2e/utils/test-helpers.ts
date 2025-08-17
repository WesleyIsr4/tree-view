import { Page, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  async selectCompany(companyName: string) {
    await this.page.getByRole('button', { name: companyName }).click();
    await expect(this.page.getByText('Ativos')).toBeVisible();
    await expect(this.page.getByText(`/ ${companyName}`)).toBeVisible();
  }

  async waitForTreeToLoad() {
    await this.page.waitForSelector('[data-testid="tree-node"]', {
      timeout: 15000,
    });
  }

  async expandFirstNode() {
    const expandButton = this.page
      .locator('[data-testid="expand-button"]')
      .first();
    if (await expandButton.isVisible()) {
      await expandButton.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async selectFirstNode() {
    const firstNode = this.page.locator('[data-testid="tree-node"]').first();
    await firstNode.click();
    await this.page.waitForTimeout(500);
  }

  async applyEnergyFilter() {
    const energyButton = this.page.getByRole('button', {
      name: /Sensor de Energia/,
    });
    await energyButton.click();
    await this.page.waitForTimeout(500);
  }

  async applyCriticalFilter() {
    const criticalButton = this.page.getByRole('button', { name: 'Crítico' });
    await criticalButton.click();
    await this.page.waitForTimeout(500);
  }

  async searchForText(searchText: string) {
    const searchInput = this.page.getByPlaceholder('Buscar Ativo ou Local');
    await searchInput.fill(searchText);
    await this.page.waitForTimeout(1000);
  }

  async openAdvancedFilters() {
    await this.page.locator('button[title="Filtros avançados"]').click();
    await expect(this.page.getByText('Filtros Avançados')).toBeVisible();
  }

  async openPerformanceMonitor() {
    await this.page.locator('button[title="Monitor de Performance"]').click();
    await expect(this.page.getByText('Performance Monitor')).toBeVisible();
  }

  async toggleVirtualization() {
    const virtualizationButton = this.page.locator(
      'button[title="Alternar Virtualização"]'
    );
    await virtualizationButton.click();
    await this.page.waitForTimeout(500);
  }

  async waitForToast(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async waitForLoadingToComplete() {
    await this.page.waitForSelector('.animate-spin', {
      state: 'hidden',
      timeout: 15000,
    });
  }

  async getNodeCount() {
    return await this.page.locator('[data-testid="tree-node"]').count();
  }

  async getFilteredNodeCount() {
    const allNodes = await this.page
      .locator('[data-testid="tree-node"]')
      .count();
    return allNodes;
  }

  async assertNodeCount(expectedCount: number) {
    const actualCount = await this.getNodeCount();
    expect(actualCount).toBe(expectedCount);
  }

  async assertFilteredNodeCount(expectedCount: number) {
    await this.page.waitForTimeout(1000);
    const actualCount = await this.getFilteredNodeCount();
    expect(actualCount).toBeGreaterThanOrEqual(expectedCount);
  }
}
