import { expect, test } from '@playwright/test';
import { loginUi } from '../helpers/auth';

test.describe('Pedidos UI', () => {
  test.beforeEach(async ({ page }) => {
    await loginUi(page);
  });

  test('lista pedidos e abre modal de criação', async ({ page }) => {
    await page.goto('/pedidos');

    await expect(page.getByRole('heading', { name: 'Pedidos', level: 1 })).toBeVisible();
    await expect(page.locator('table tbody tr').first()).toBeVisible();

    await page.getByRole('button', { name: /Novo pedido/ }).click();
    const modal = page.locator('#pedido-form-modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole('heading', { name: 'Novo pedido' })).toBeVisible();
    await modal.getByRole('button', { name: 'Cancelar' }).click();
    await expect(modal).toBeHidden();
  });
});
