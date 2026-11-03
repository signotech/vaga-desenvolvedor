import { expect, test } from '@playwright/test';
import { loginUi } from '../helpers/auth';

async function ensureSidebarExpanded(page: import('@playwright/test').Page) {
  const shell = page.locator('.app-shell');
  if (await shell.evaluate((el) => el.classList.contains('is-collapsed'))) {
    await page.getByRole('button', { name: 'Expandir menu' }).click();
  }
  await expect(shell).toHaveClass(/is-expanded/);
}

test.describe('Navegação', () => {
  test.beforeEach(async ({ page }) => {
    await loginUi(page);
  });

  test('sidebar navega entre as listagens', async ({ page }) => {
    await page.goto('/');
    await ensureSidebarExpanded(page);

    const nav = page.getByRole('navigation', { name: 'Navegação principal' });

    await nav.getByRole('link', { name: 'Clientes' }).click();
    await expect(page).toHaveURL(/\/clientes$/);
    await expect(page.getByRole('heading', { name: 'Clientes', level: 1 })).toBeVisible();

    await nav.getByRole('link', { name: 'Produtos' }).click();
    await expect(page).toHaveURL(/\/produtos$/);
    await expect(page.getByRole('heading', { name: 'Produtos', level: 1 })).toBeVisible();

    await nav.getByRole('link', { name: 'Pedidos' }).click();
    await expect(page).toHaveURL(/\/pedidos$/);
    await expect(page.getByRole('heading', { name: 'Pedidos', level: 1 })).toBeVisible();

    await nav.getByRole('link', { name: 'Início' }).click();
    await expect(page).toHaveURL('/');
  });

  test('recolhe e expande o sidebar no desktop', async ({ page }) => {
    await page.goto('/');
    await ensureSidebarExpanded(page);

    const shell = page.locator('.app-shell');
    await page.getByRole('button', { name: 'Recolher menu' }).click();
    await expect(shell).toHaveClass(/is-collapsed/);
    await expect(page.getByRole('button', { name: 'Expandir menu' })).toBeVisible();

    await page.getByRole('button', { name: 'Expandir menu' }).click();
    await expect(shell).toHaveClass(/is-expanded/);
    await expect(page.getByRole('button', { name: 'Recolher menu' })).toBeVisible();
  });
});
