import type { ListParams } from '@/types/api-response.type';

export const produtoQueryKeys = {
  all: ['produtos'] as const,
  lists: () => [...produtoQueryKeys.all, 'list'] as const,
  list: (params: ListParams) => [...produtoQueryKeys.lists(), params] as const,
  details: () => [...produtoQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...produtoQueryKeys.details(), id] as const,
};
