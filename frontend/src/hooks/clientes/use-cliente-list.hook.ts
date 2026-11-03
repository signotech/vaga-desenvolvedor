import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clienteQueryKeys } from '@/constants/clientes/cliente-query.constants';
import type { ClienteInput } from '@/models/clientes/cliente.model';
import { ClienteService } from '@/services/clientes/cliente.service';
import { useClienteStore } from '@/stores/clientes/cliente.store';
import type { ListParams, SortOrder } from '@/types/api-response.type';
import { getErrorMessage } from '@/utils/error.util';

export function useClienteList() {
  const queryClient = useQueryClient();
  const {
    page,
    filters,
    appliedFilters,
    sortBy,
    sortOrder,
    limit,
    setPage,
    setFilters,
    applyFilters,
    setSort,
    setLimit,
  } = useClienteStore();

  const params: ListParams = {
    page,
    limit,
    sortBy,
    sortOrder,
    q: appliedFilters.q || undefined,
  };

  const listQuery = useQuery({
    queryKey: clienteQueryKeys.list(params),
    queryFn: () => ClienteService.list(params),
  });

  const saveMutation = useMutation({
    mutationFn: async ({ payload, id }: { payload: ClienteInput; id?: number }) => {
      if (id) return ClienteService.update(id, payload);
      return ClienteService.create(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: clienteQueryKeys.lists() });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => ClienteService.remove(id),
    onSuccess: async () => {
      const total = listQuery.data?.meta.total ?? 1;
      const nextPage = page > 1 && total - 1 <= (page - 1) * limit ? page - 1 : page;
      if (nextPage !== page) setPage(nextPage);
      await queryClient.invalidateQueries({ queryKey: clienteQueryKeys.lists() });
    },
  });

  const removeManyMutation = useMutation({
    mutationFn: (ids: number[]) => ClienteService.removeMany(ids),
    onSuccess: async (_data, ids) => {
      const total = listQuery.data?.meta.total ?? ids.length;
      const nextPage =
        page > 1 && total - ids.length <= (page - 1) * limit ? page - 1 : page;
      if (nextPage !== page) setPage(nextPage);
      await queryClient.invalidateQueries({ queryKey: clienteQueryKeys.lists() });
    },
  });

  return {
    items: listQuery.data?.data ?? [],
    meta: listQuery.data?.meta ?? { total: 0, page, limit, totalPages: 1 },
    loading: listQuery.isLoading || listQuery.isFetching,
    error: listQuery.error ? getErrorMessage(listQuery.error, 'Falha ao carregar clientes') : null,
    filters,
    sortBy,
    sortOrder,
    limit,
    setFilters,
    search: applyFilters,
    changePage: setPage,
    changeSort: (nextSortBy: string, nextSortOrder: SortOrder) => setSort(nextSortBy, nextSortOrder),
    changeLimit: setLimit,
    save: async (payload: ClienteInput, id?: number) => {
      try {
        await saveMutation.mutateAsync({ payload, id });
        return { ok: true as const };
      } catch (error) {
        return { ok: false as const, message: getErrorMessage(error, 'Falha ao salvar cliente') };
      }
    },
    remove: async (id: number) => {
      try {
        await removeMutation.mutateAsync(id);
        return { ok: true as const };
      } catch (error) {
        return { ok: false as const, message: getErrorMessage(error, 'Falha ao excluir cliente') };
      }
    },
    removeMany: async (ids: number[]) => {
      try {
        await removeManyMutation.mutateAsync(ids);
        return { ok: true as const };
      } catch (error) {
        return {
          ok: false as const,
          message: getErrorMessage(error, 'Falha ao excluir clientes'),
        };
      }
    },
  };
}
