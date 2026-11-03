const apiUrl = import.meta.env.VITE_API_URL ?? '/api';
const timeoutRaw = import.meta.env.VITE_API_TIMEOUT_MS ?? '15000';
const timeoutMs = Number(timeoutRaw);

export const env = {
  apiUrl,
  apiTimeoutMs: Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 15_000,
} as const;
