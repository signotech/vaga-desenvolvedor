import type { Pedido } from '@/models/pedidos/pedido.model';
import { PEDIDO_STATUS } from '@/models/pedidos/pedido.model';
import type { Produto } from '@/models/produtos/produto.model';

export const CHART_COLORS = {
  yellow: '#fcd535',
  black: '#0a0a0a',
  ink: '#181a20',
  muted: '#9aa0a6',
  grid: '#eaecef',
} as const;

/** Alterna amarelo ↔ preto do tema. */
export const CHART_MONO = [CHART_COLORS.yellow, CHART_COLORS.black] as const;

export function chartMonoFill(index: number): string {
  return CHART_MONO[index % CHART_MONO.length];
}

export function pedidoTotal(pedido: Pedido): number {
  const items = (pedido.itens ?? []).reduce(
    (sum, item) => sum + Number(item.preco_unitario) * Number(item.quantidade),
    0,
  );
  return Math.max(0, items - Number(pedido.desconto || 0));
}

export function buildStatusChart(pedidos: Pedido[]) {
  return PEDIDO_STATUS.map((status, index) => {
    const items = pedidos.filter((pedido) => pedido.status === status);
    return {
      name: status,
      value: items.length,
      total: items.reduce((sum, pedido) => sum + pedidoTotal(pedido), 0),
      fill: chartMonoFill(index),
    };
  });
}

export function buildRevenueByStatus(pedidos: Pedido[]) {
  return PEDIDO_STATUS.map((status, index) => {
    const items = pedidos.filter((pedido) => pedido.status === status);
    return {
      status,
      valor: Number(
        items.reduce((sum, pedido) => sum + pedidoTotal(pedido), 0).toFixed(2),
      ),
      fill: chartMonoFill(index),
    };
  });
}

export function buildStockChart(produtos: Produto[]) {
  return [...produtos]
    .sort((a, b) => b.estoque - a.estoque)
    .slice(0, 6)
    .map((produto, index) => ({
      name: produto.titulo.length > 16 ? `${produto.titulo.slice(0, 16)}…` : produto.titulo,
      fullName: produto.titulo,
      estoque: produto.estoque,
      valorEstoque: Number((produto.estoque * Number(produto.preco)).toFixed(2)),
      fill: chartMonoFill(index),
    }));
}

export function buildDashboardKpis(
  pedidos: Pedido[],
  produtosTotal: number,
  clientesTotal: number,
  pedidosTotal: number,
) {
  const faturamento = pedidos
    .filter((pedido) => pedido.status === 'Pago')
    .reduce((sum, pedido) => sum + pedidoTotal(pedido), 0);

  return {
    clientes: clientesTotal,
    produtos: produtosTotal,
    pedidos: pedidosTotal,
    faturamento,
    abertos: pedidos.filter((pedido) => pedido.status === 'Em Aberto').length,
  };
}
