import { test as base, expect } from '@playwright/test';
import { authHeaders } from './helpers/auth';

type AuthFixtures = {
  auth: Record<string, string>;
};

export const test = base.extend<AuthFixtures>({
  auth: async ({ request }, use) => {
    await use(await authHeaders(request));
  },
});

export { expect };
