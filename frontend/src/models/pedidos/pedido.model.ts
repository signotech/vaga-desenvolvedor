import type { Cliente } from '@/models/clientes/cliente.model';
import type { Produto } from '@/models/produtos/produto.model';

export const PEDIDO_STATUS = ['Em Aberto', 'Pago', 'Cancelado'] as const;

export type PedidoStatus = (typeof PEDIDO_STATUS)[number];

export type PedidoItem = {
  id: number;
  pedido_id: number;
  produto_id: number;
  quantidade: number;
  preco_unitario: number | string;
  produto?: Produto;
};

export type Pedido = {
  id: number;
  cliente_id: number;
  data_pedido: string;
  status: PedidoStatus;
  desconto: number | string;
  cliente?: Cliente;
  itens?: PedidoItem[];
  createdAt: string;
  updatedAt: string;
};

export type PedidoItemInput = {
  produto_id: number;
  quantidade: number;
};

export type PedidoInput = {
  cliente_id: number;
  data_pedido?: string;
  status?: PedidoStatus;
  desconto?: number;
  itens: PedidoItemInput[];
};
