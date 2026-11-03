import type { ListParams } from '@/types/api-response.type';

export function toQueryParams(params: ListParams): Record<string, string> {
  const query: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === '') return;
    query[key] = String(value);
  });

  return query;
}
