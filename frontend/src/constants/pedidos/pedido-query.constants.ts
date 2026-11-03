import type { ListParams } from '@/types/api-response.type';

export const pedidoQueryKeys = {
  all: ['pedidos'] as const,
  lists: () => [...pedidoQueryKeys.all, 'list'] as const,
  list: (params: ListParams) => [...pedidoQueryKeys.lists(), params] as const,
  details: () => [...pedidoQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...pedidoQueryKeys.details(), id] as const,
};
