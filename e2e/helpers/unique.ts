export function uniqueSuffix() {
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export function uniqueCpf(seed = uniqueSuffix()) {
  return String(seed).replace(/\D/g, '').slice(-11).padStart(11, '9');
}

export function uniqueEmail(prefix = 'e2e') {
  return `${prefix}.${uniqueSuffix()}@example.com`;
}

export function uniqueSku(prefix = 'E2E') {
  return `${prefix}-${uniqueSuffix()}`.slice(0, 100);
}
