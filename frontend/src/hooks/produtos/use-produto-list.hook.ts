import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produtoQueryKeys } from '@/constants/produtos/produto-query.constants';
import type { ProdutoInput } from '@/models/produtos/produto.model';
import { ProdutoService } from '@/services/produtos/produto.service';
import { useProdutoStore } from '@/stores/produtos/produto.store';
import type { ListParams, SortOrder } from '@/types/api-response.type';
import { getErrorMessage } from '@/utils/error.util';

export function useProdutoList() {
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
  } = useProdutoStore();

  const params: ListParams = {
    page,
    limit,
    sortBy,
    sortOrder,
    sku: appliedFilters.sku || undefined,
    titulo: appliedFilters.titulo || undefined,
  };

  const listQuery = useQuery({
    queryKey: produtoQueryKeys.list(params),
    queryFn: () => ProdutoService.list(params),
  });

  const saveMutation = useMutation({
    mutationFn: async ({ payload, id }: { payload: ProdutoInput; id?: number }) => {
      if (id) return ProdutoService.update(id, payload);
      return ProdutoService.create(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: produtoQueryKeys.lists() });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => ProdutoService.remove(id),
    onSuccess: async () => {
      const total = listQuery.data?.meta.total ?? 1;
      const nextPage = page > 1 && total - 1 <= (page - 1) * limit ? page - 1 : page;
      if (nextPage !== page) setPage(nextPage);
      await queryClient.invalidateQueries({ queryKey: produtoQueryKeys.lists() });
    },
  });

  const removeManyMutation = useMutation({
    mutationFn: (ids: number[]) => ProdutoService.removeMany(ids),
    onSuccess: async (_data, ids) => {
      const total = listQuery.data?.meta.total ?? ids.length;
      const nextPage =
        page > 1 && total - ids.length <= (page - 1) * limit ? page - 1 : page;
      if (nextPage !== page) setPage(nextPage);
      await queryClient.invalidateQueries({ queryKey: produtoQueryKeys.lists() });
    },
  });

  return {
    items: listQuery.data?.data ?? [],
    meta: listQuery.data?.meta ?? { total: 0, page, limit, totalPages: 1 },
    loading: listQuery.isLoading || listQuery.isFetching,
    error: listQuery.error ? getErrorMessage(listQuery.error, 'Falha ao carregar produtos') : null,
    filters,
    sortBy,
    sortOrder,
    limit,
    setFilters,
    search: applyFilters,
    changePage: setPage,
    changeSort: (nextSortBy: string, nextSortOrder: SortOrder) => setSort(nextSortBy, nextSortOrder),
    changeLimit: setLimit,
    save: async (payload: ProdutoInput, id?: number) => {
      try {
        await saveMutation.mutateAsync({ payload, id });
        return { ok: true as const };
      } catch (error) {
        return { ok: false as const, message: getErrorMessage(error, 'Falha ao salvar produto') };
      }
    },
    remove: async (id: number) => {
      try {
        await removeMutation.mutateAsync(id);
        return { ok: true as const };
      } catch (error) {
        return { ok: false as const, message: getErrorMessage(error, 'Falha ao excluir produto') };
      }
    },
    removeMany: async (ids: number[]) => {
      try {
        await removeManyMutation.mutateAsync(ids);
        return { ok: true as const };
      } catch (error) {
        return {
          ok: false as const,
          message: getErrorMessage(error, 'Falha ao excluir produtos'),
        };
      }
    },
  };
}
