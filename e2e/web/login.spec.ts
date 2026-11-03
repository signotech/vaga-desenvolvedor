import { expect, test } from '@playwright/test';
import { DEMO_USER } from '../helpers/auth';

test.describe('Login UI', () => {
  test('entra com credenciais demo', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Signo Pedidos' })).toBeVisible();

    await page.locator('input[type="email"]').fill(DEMO_USER.email);
    await page.locator('input[type="password"]').fill(DEMO_USER.senha);
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Signo Pedidos', level: 1 })).toBeVisible();
  });
});
