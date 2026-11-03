import { expect, test } from '@playwright/test';
import { loginUi } from '../helpers/auth';
import { uniqueSku, uniqueSuffix } from '../helpers/unique';

test.describe('Produtos UI', () => {
  test.beforeEach(async ({ page }) => {
    await loginUi(page);
  });

  test('cria um produto pela interface', async ({ page }) => {
    const suffix = uniqueSuffix();
    const sku = uniqueSku('UI');
    const titulo = `UI Produto ${suffix}`;

    await page.goto('/produtos');
    await expect(page.getByRole('heading', { name: 'Produtos', level: 1 })).toBeVisible();

    await page.getByRole('button', { name: /Novo produto/ }).click();
    const modal = page.locator('#produto-form-modal');
    await expect(modal).toBeVisible();

    await modal.locator('#produto-form-modal-sku').fill(sku);
    await modal.locator('#produto-form-modal-titulo').fill(titulo);
    await modal.locator('#produto-form-modal-preco').fill('123.45');
    await modal.locator('#produto-form-modal-estoque').fill('7');
    await modal.getByRole('button', { name: 'Salvar' }).click();

    await expect(modal).toBeHidden();
    await expect(page.getByText(titulo)).toBeVisible();
  });
});
