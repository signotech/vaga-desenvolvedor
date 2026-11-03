import { expect, test } from '@playwright/test';
import { DEMO_USER } from '../helpers/auth';

test.describe('API auth', () => {
  test('login retorna token', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: { email: DEMO_USER.email, senha: DEMO_USER.senha },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.token).toBeTruthy();
    expect(body.user).toMatchObject({ email: DEMO_USER.email });
  });

  test('rejeita senha inválida', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: { email: DEMO_USER.email, senha: 'errada' },
    });
    expect(response.status()).toBe(401);
  });
});
