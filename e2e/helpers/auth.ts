import type { APIRequestContext, Page } from '@playwright/test';

export const DEMO_USER = {
  email: 'admin@signotech.com',
  senha: 'admin123',
} as const;

let cachedToken: string | null = null;

export async function loginApi(request: APIRequestContext): Promise<string> {
  if (cachedToken) return cachedToken;

  const response = await request.post('/api/auth/login', {
    data: { email: DEMO_USER.email, senha: DEMO_USER.senha },
  });

  if (!response.ok()) {
    throw new Error(`Login falhou: ${response.status()} ${await response.text()}`);
  }

  const body = (await response.json()) as { token: string };
  cachedToken = body.token;
  return cachedToken;
}

export async function authHeaders(request: APIRequestContext): Promise<Record<string, string>> {
  return { Authorization: `Bearer ${await loginApi(request)}` };
}

export async function loginUi(page: Page): Promise<void> {
  await page.goto('/login');
  await page.locator('input[type="email"]').fill(DEMO_USER.email);
  await page.locator('input[type="password"]').fill(DEMO_USER.senha);
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.waitForURL('/');
}
