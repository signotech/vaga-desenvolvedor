import { expect, test } from '@playwright/test';

test.describe('API health', () => {
  test('GET /api/health returns ok', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    await expect(response.json()).resolves.toEqual({ status: 'ok' });
  });
});
