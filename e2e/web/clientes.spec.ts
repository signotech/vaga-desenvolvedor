import { expect, test } from '@playwright/test';
import { loginUi } from '../helpers/auth';
import { uniqueCpf, uniqueEmail, uniqueSuffix } from '../helpers/unique';

test.describe('Clientes UI', () => {
  test.beforeEach(async ({ page }) => {
    await loginUi(page);
  });

  test('cria e busca um cliente', async ({ page }) => {
    const suffix = uniqueSuffix();
    const nome = `UI Cliente ${suffix}`;
    const email = uniqueEmail('ui.cliente');
    const cpf = uniqueCpf(suffix);

    await page.goto('/clientes');
    await expect(page.getByRole('heading', { name: 'Clientes', level: 1 })).toBeVisible();

    await page.getByRole('button', { name: /Novo cliente/ }).click();
    const modal = page.locator('#cliente-form-modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole('heading', { name: 'Novo cliente' })).toBeVisible();

    await modal.locator('#cliente-form-modal-nome').fill(nome);
    await modal.locator('#cliente-form-modal-cpf').fill(cpf);
    await modal.locator('#cliente-form-modal-email').fill(email);
    await modal.getByRole('button', { name: 'Salvar' }).click();

    await expect(modal).toBeHidden();

    await page.locator('.toolbar input[type="search"], .toolbar input[type="text"]').first().fill(nome);
    await page.getByRole('button', { name: /Filtrar|search/i }).click();

    await expect(page.getByRole('cell', { name: nome, exact: true })).toBeVisible();
  });
});
