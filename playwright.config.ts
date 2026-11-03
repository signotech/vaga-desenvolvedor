import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const API_PORT = process.env.E2E_API_PORT || '3001';
const WEB_PORT = process.env.E2E_WEB_PORT || '5177';
const HOST = process.env.CI ? '0.0.0.0' : '127.0.0.1';
const API_BASE = `http://127.0.0.1:${API_PORT}`;
const WEB_BASE = `http://127.0.0.1:${WEB_PORT}`;
const BACKEND_DIR = path.resolve(__dirname, 'backend');
const E2E_DB = path.resolve(BACKEND_DIR, 'database/e2e.sqlite');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  globalSetup: './e2e/global-setup.ts',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: [
    {
      command: 'node src/server.js',
      cwd: BACKEND_DIR,
      url: `${API_BASE}/api/health`,
      reuseExistingServer: false,
      timeout: 120_000,
      env: {
        ...process.env,
        PORT: API_PORT,
        NODE_ENV: 'development',
        DB_STORAGE: E2E_DB,
      },
    },
    {
      command: `npm --prefix frontend run dev -- --host ${HOST} --port ${WEB_PORT}`,
      url: WEB_BASE,
      reuseExistingServer: false,
      timeout: 120_000,
      env: {
        ...process.env,
        VITE_API_PROXY: API_BASE,
      },
    },
  ],
  projects: [
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
      use: {
        baseURL: API_BASE,
      },
    },
    {
      name: 'web',
      testMatch: /web\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: WEB_BASE,
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
});
