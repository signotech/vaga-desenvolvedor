module.exports = {
  async up() {
    const { Cliente, Produto, Pedido, sequelize } = require('../models');
    const fabrica = require('../factories');

    const QUANTIDADE = 5;
    if (await Cliente.count()) return; // já populado

    await sequelize.transaction(async transaction => {
      await Cliente.bulkCreate(fabrica.clientes(QUANTIDADE), { transaction });
      await Produto.bulkCreate(fabrica.produtos(QUANTIDADE), { transaction });

      const contexto = {
        clientes: await Cliente.findAll({ transaction }),
        produtos: await Produto.findAll({ transaction })
      };
      for (const pedido of fabrica.pedidos(QUANTIDADE, contexto)) {
        await Pedido.create(pedido, { include: ['itens'], transaction });
      }
    });
  },

  async down(queryInterface) {
    for (const tabela of ['PedidoItens', 'Pedidos', 'Produtos', 'Clientes']) {
      await queryInterface.bulkDelete(tabela, null);
    }
  }
};
