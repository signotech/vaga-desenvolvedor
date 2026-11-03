import type { Pedido } from '@/models/pedidos/pedido.model';
import { clienteMock } from '@/mocks/clientes/cliente.mock';
import { produtoMock } from '@/mocks/produtos/produto.mock';

export const pedidoMock: Pedido = {
  id: 1,
  cliente_id: 1,
  data_pedido: new Date().toISOString(),
  status: 'Em Aberto',
  desconto: 0,
  cliente: clienteMock,
  itens: [
    {
      id: 1,
      pedido_id: 1,
      produto_id: 1,
      quantidade: 1,
      preco_unitario: 4599.9,
      produto: produtoMock,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
