import type { Produto } from '@/models/produtos/produto.model';

export const produtoMock: Produto = {
  id: 1,
  sku: 'NB-001',
  titulo: 'Notebook Pro 14',
  preco: 4599.9,
  estoque: 12,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
