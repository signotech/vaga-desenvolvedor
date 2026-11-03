'use strict';

let seq = 0;
const next = () => ++seq;

const factories = {
  usuario: (overrides = {}) => ({
    nome: `Usuario ${next()}`,
    email: `usuario${next()}@email.com`,
    senha_hash: 'hash',
    ...overrides,
  }),

  cliente: (overrides = {}) => ({
    nome: `Cliente ${next()}`,
    cpf: String(10000000000 + next()).slice(0, 11),
    email: `cliente${next()}@email.com`,
    ...overrides,
  }),

  produto: (overrides = {}) => ({
    sku: `SKU-${next()}`,
    titulo: `Produto ${next()}`,
    preco: 99.9,
    estoque: 10,
    ...overrides,
  }),

  pedido: (overrides = {}) => ({
    cliente_id: 1,
    data_pedido: new Date(),
    status: 'Em Aberto',
    desconto: 0,
    ...overrides,
  }),

  pedidoItem: (overrides = {}) => ({
    pedido_id: 1,
    produto_id: 1,
    quantidade: 1,
    preco_unitario: 99.9,
    ...overrides,
  }),
};

module.exports = factories;
