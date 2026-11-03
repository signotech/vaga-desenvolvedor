import { expect, test } from '@playwright/test';
import { loginUi } from '../helpers/auth';

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await loginUi(page);
  });

  test('exibe hero, atalhos e gráficos', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Signo Pedidos', level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /Abrir pedidos/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Ver clientes/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Ver produtos/i })).toBeVisible();

    await expect(page.getByRole('region', { name: 'Indicadores' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pedidos por status' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Valor por status' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Estoque por produto' })).toBeVisible();
  });
});
