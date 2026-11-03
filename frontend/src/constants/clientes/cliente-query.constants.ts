import type { ListParams } from '@/types/api-response.type';

export const clienteQueryKeys = {
  all: ['clientes'] as const,
  lists: () => [...clienteQueryKeys.all, 'list'] as const,
  list: (params: ListParams) => [...clienteQueryKeys.lists(), params] as const,
  details: () => [...clienteQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...clienteQueryKeys.details(), id] as const,
};
