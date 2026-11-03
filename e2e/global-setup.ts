import { execSync } from 'node:child_process';
import path from 'node:path';

const BACKEND_DIR = path.resolve(__dirname, '../backend');
const E2E_DB = path.resolve(BACKEND_DIR, 'database/e2e.sqlite');

export default function globalSetup() {
  execSync('npm run db:reset', {
    cwd: BACKEND_DIR,
    stdio: 'inherit',
    env: {
      ...process.env,
      DB_STORAGE: E2E_DB,
      NODE_ENV: 'development',
    },
  });
}
