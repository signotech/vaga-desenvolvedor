'use strict';

const bcrypt = require('bcryptjs');

const STATUSES = ['Em Aberto', 'Pago', 'Cancelado'];
const DEMO_ADMIN = {
  nome: 'Admin Signotech',
  email: 'admin@signotech.com',
  senha: 'admin123',
};

const FIRST_NAMES = [
  'Ana', 'Bruno', 'Carla', 'Diego', 'Elena', 'Fábio', 'Gabriela', 'Hugo', 'Iris', 'João',
  'Karen', 'Lucas', 'Marina', 'Nuno', 'Olívia', 'Paulo', 'Queila', 'Rafael', 'Sofia', 'Tiago',
  'Úrsula', 'Vitor', 'Wanda', 'Xavier', 'Yasmin', 'Zeca', 'Alice', 'Beto', 'Cíntia', 'Davi',
];

const LAST_NAMES = [
  'Silva', 'Costa', 'Dias', 'Souza', 'Rocha', 'Lima', 'Alves', 'Mendes', 'Nunes', 'Pereira',
  'Oliveira', 'Santos', 'Ferreira', 'Rodrigues', 'Almeida', 'Barbosa', 'Cardoso', 'Teixeira',
];

const PRODUCT_CATALOG = [
  { sku: 'NB-001', titulo: 'Notebook Pro 14', preco: 4599.9, estoque: 12 },
  { sku: 'MS-010', titulo: 'Mouse Sem Fio', preco: 129.9, estoque: 80 },
  { sku: 'TC-020', titulo: 'Teclado Mecânico', preco: 349.0, estoque: 35 },
  { sku: 'MN-030', titulo: 'Monitor 27"', preco: 1899.0, estoque: 18 },
  { sku: 'HD-040', titulo: 'SSD 1TB', preco: 499.9, estoque: 50 },
  { sku: 'HB-050', titulo: 'Headset Gamer', preco: 599.0, estoque: 40 },
  { sku: 'WB-060', titulo: 'Webcam Full HD', preco: 279.9, estoque: 28 },
  { sku: 'CH-070', titulo: 'Cadeira Ergonômica', preco: 1499.0, estoque: 15 },
  { sku: 'PK-080', titulo: 'Hub USB-C 7-em-1', preco: 249.9, estoque: 60 },
  { sku: 'PW-090', titulo: 'Fonte 650W', preco: 429.0, estoque: 22 },
];

function padCpf(n) {
  return String(n).padStart(11, '0');
}

function buildClientes(count) {
  return Array.from({ length: count }, (_, i) => {
    const nome = `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[i % LAST_NAMES.length]}`;
    const slug = nome
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '.');
    return {
      nome,
      cpf: padCpf(10000000000 + i + 1),
      email: `${slug}.${i + 1}@email.com`,
    };
  });
}

function daysAgo(base, days) {
  const d = new Date(base);
  d.setDate(d.getDate() - days);
  return d;
}

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const clientes = buildClientes(40);
    const produtos = PRODUCT_CATALOG;

    await queryInterface.bulkInsert('usuarios', [
      {
        nome: DEMO_ADMIN.nome,
        email: DEMO_ADMIN.email,
        senha_hash: await bcrypt.hash(DEMO_ADMIN.senha, 10),
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.bulkInsert(
      'clientes',
      clientes.map((c) => ({ ...c, created_at: now, updated_at: now })),
    );

    await queryInterface.bulkInsert(
      'produtos',
      produtos.map((p) => ({ ...p, created_at: now, updated_at: now })),
    );

    const [clienteRows] = await queryInterface.sequelize.query(
      'SELECT id FROM clientes ORDER BY id',
    );
    const [produtoRows] = await queryInterface.sequelize.query(
      'SELECT id, preco FROM produtos ORDER BY id',
    );

    const pedidos = Array.from({ length: 150 }, (_, i) => {
      const status = STATUSES[i % STATUSES.length];
      const desconto = status === 'Pago' ? (i % 5) * 10 : i % 7 === 0 ? 25 : 0;
      return {
        cliente_id: clienteRows[i % clienteRows.length].id,
        data_pedido: daysAgo(now, i % 90),
        status,
        desconto,
        created_at: now,
        updated_at: now,
      };
    });

    await queryInterface.bulkInsert('pedidos', pedidos);

    const [pedidoRows] = await queryInterface.sequelize.query(
      'SELECT id FROM pedidos ORDER BY id',
    );

    const itens = [];
    for (let i = 0; i < pedidoRows.length; i += 1) {
      const itemCount = 1 + (i % 3);
      for (let j = 0; j < itemCount; j += 1) {
        const produto = produtoRows[(i + j) % produtoRows.length];
        itens.push({
          pedido_id: pedidoRows[i].id,
          produto_id: produto.id,
          quantidade: 1 + ((i + j) % 4),
          preco_unitario: produto.preco,
          created_at: now,
          updated_at: now,
        });
      }
    }

    await queryInterface.bulkInsert('pedido_itens', itens);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('pedido_itens', null, {});
    await queryInterface.bulkDelete('pedidos', null, {});
    await queryInterface.bulkDelete('produtos', null, {});
    await queryInterface.bulkDelete('clientes', null, {});
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};
