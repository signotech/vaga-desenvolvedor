import { useQuery } from '@tanstack/react-query';
import { clienteQueryKeys } from '@/constants/clientes/cliente-query.constants';
import { pedidoQueryKeys } from '@/constants/pedidos/pedido-query.constants';
import { produtoQueryKeys } from '@/constants/produtos/produto-query.constants';
import { ClienteService } from '@/services/clientes/cliente.service';
import { PedidoService } from '@/services/pedidos/pedido.service';
import { ProdutoService } from '@/services/produtos/produto.service';
import {
  buildDashboardKpis,
  buildRevenueByStatus,
  buildStatusChart,
  buildStockChart,
} from '@/utils/dashboard.util';
import { getErrorMessage } from '@/utils/error.util';

const DASHBOARD_PARAMS = { page: 1, limit: 100 } as const;

export function useDashboard() {
  const pedidosQuery = useQuery({
    queryKey: [...pedidoQueryKeys.lists(), 'dashboard', DASHBOARD_PARAMS],
    queryFn: () => PedidoService.list(DASHBOARD_PARAMS),
  });

  const produtosQuery = useQuery({
    queryKey: [...produtoQueryKeys.lists(), 'dashboard', DASHBOARD_PARAMS],
    queryFn: () => ProdutoService.list(DASHBOARD_PARAMS),
  });

  const clientesQuery = useQuery({
    queryKey: [...clienteQueryKeys.lists(), 'dashboard', { page: 1, limit: 1 }],
    queryFn: () => ClienteService.list({ page: 1, limit: 1 }),
  });

  const pedidos = pedidosQuery.data?.data ?? [];
  const produtos = produtosQuery.data?.data ?? [];

  return {
    loading: pedidosQuery.isLoading || produtosQuery.isLoading || clientesQuery.isLoading,
    error:
      pedidosQuery.error || produtosQuery.error || clientesQuery.error
        ? getErrorMessage(
            pedidosQuery.error || produtosQuery.error || clientesQuery.error,
            'Falha ao carregar indicadores',
          )
        : null,
    kpis: buildDashboardKpis(
      pedidos,
      produtosQuery.data?.meta.total ?? produtos.length,
      clientesQuery.data?.meta.total ?? 0,
      pedidosQuery.data?.meta.total ?? pedidos.length,
    ),
    statusChart: buildStatusChart(pedidos),
    revenueChart: buildRevenueByStatus(pedidos),
    stockChart: buildStockChart(produtos),
  };
}
