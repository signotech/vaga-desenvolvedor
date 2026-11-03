import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clienteQueryKeys } from '@/constants/clientes/cliente-query.constants';
import { pedidoQueryKeys } from '@/constants/pedidos/pedido-query.constants';
import { produtoQueryKeys } from '@/constants/produtos/produto-query.constants';
import type { PedidoInput, PedidoStatus } from '@/models/pedidos/pedido.model';
import { ClienteService } from '@/services/clientes/cliente.service';
import { PedidoService } from '@/services/pedidos/pedido.service';
import { ProdutoService } from '@/services/produtos/produto.service';
import { usePedidoStore } from '@/stores/pedidos/pedido.store';
import type { ListParams, SortOrder } from '@/types/api-response.type';
import { getErrorMessage } from '@/utils/error.util';

export function usePedidoList() {
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
  } = usePedidoStore();

  const params: ListParams = {
    page,
    limit,
    sortBy,
    sortOrder,
    status: appliedFilters.status || undefined,
    cliente: appliedFilters.cliente || undefined,
  };

  const listQuery = useQuery({
    queryKey: pedidoQueryKeys.list(params),
    queryFn: () => PedidoService.list(params),
  });

  const clientesQuery = useQuery({
    queryKey: clienteQueryKeys.list({ limit: 100, sortBy: 'nome', sortOrder: 'ASC' }),
    queryFn: () => ClienteService.list({ limit: 100, sortBy: 'nome', sortOrder: 'ASC' }),
  });

  const produtosQuery = useQuery({
    queryKey: produtoQueryKeys.list({ limit: 100, sortBy: 'titulo', sortOrder: 'ASC' }),
    queryFn: () => ProdutoService.list({ limit: 100, sortBy: 'titulo', sortOrder: 'ASC' }),
  });

  const saveMutation = useMutation({
    mutationFn: async ({ payload, id }: { payload: PedidoInput; id?: number }) => {
      if (id) return PedidoService.update(id, payload);
      return PedidoService.create(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: pedidoQueryKeys.lists() });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => PedidoService.remove(id),
    onSuccess: async () => {
      const total = listQuery.data?.meta.total ?? 1;
      const nextPage = page > 1 && total - 1 <= (page - 1) * limit ? page - 1 : page;
      if (nextPage !== page) setPage(nextPage);
      await queryClient.invalidateQueries({ queryKey: pedidoQueryKeys.lists() });
    },
  });

  const removeManyMutation = useMutation({
    mutationFn: (ids: number[]) => PedidoService.removeMany(ids),
    onSuccess: async (_data, ids) => {
      const total = listQuery.data?.meta.total ?? ids.length;
      const nextPage =
        page > 1 && total - ids.length <= (page - 1) * limit ? page - 1 : page;
      if (nextPage !== page) setPage(nextPage);
      await queryClient.invalidateQueries({ queryKey: pedidoQueryKeys.lists() });
    },
  });

  return {
    items: listQuery.data?.data ?? [],
    meta: listQuery.data?.meta ?? { total: 0, page, limit, totalPages: 1 },
    loading: listQuery.isLoading || listQuery.isFetching,
    error: listQuery.error ? getErrorMessage(listQuery.error, 'Falha ao carregar pedidos') : null,
    filters,
    sortBy,
    sortOrder,
    limit,
    clientes: clientesQuery.data?.data ?? [],
    produtos: produtosQuery.data?.data ?? [],
    setFilters: (next: Partial<{ status: PedidoStatus | ''; cliente: string }>) => setFilters(next),
    search: applyFilters,
    changePage: setPage,
    changeSort: (nextSortBy: string, nextSortOrder: SortOrder) => setSort(nextSortBy, nextSortOrder),
    changeLimit: setLimit,
    save: async (payload: PedidoInput, id?: number) => {
      try {
        await saveMutation.mutateAsync({ payload, id });
        return { ok: true as const };
      } catch (error) {
        return { ok: false as const, message: getErrorMessage(error, 'Falha ao salvar pedido') };
      }
    },
    remove: async (id: number) => {
      try {
        await removeMutation.mutateAsync(id);
        return { ok: true as const };
      } catch (error) {
        return { ok: false as const, message: getErrorMessage(error, 'Falha ao excluir pedido') };
      }
    },
    removeMany: async (ids: number[]) => {
      try {
        await removeManyMutation.mutateAsync(ids);
        return { ok: true as const };
      } catch (error) {
        return {
          ok: false as const,
          message: getErrorMessage(error, 'Falha ao excluir pedidos'),
        };
      }
    },
  };
}
