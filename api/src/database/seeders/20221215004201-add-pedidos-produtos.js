/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pedidos_produtos', [
      {
        codigo_pedido: 1,
        sku_produto: '083TEN591',
      },
      {
        codigo_pedido: 1,
        sku_produto: '159JAQ857',
      },
      {
        codigo_pedido: 1,
        sku_produto: '451JEA756',
      },
      {
        codigo_pedido: 1,
        sku_produto: '303SAP741',
      },
      {
        codigo_pedido: 2,
        sku_produto: '643BER941',
      },
      {
        codigo_pedido: 2,
        sku_produto: '258BON963',
      },
      {
        codigo_pedido: 2,
        sku_produto: '083TEN591',
      },
      {
        codigo_pedido: 3,
        sku_produto: '159JAQ857',
      },
      {
        codigo_pedido: 3,
        sku_produto: '451JEA756',
      },
      {
        codigo_pedido: 4,
        sku_produto: '303SAP741',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pedidos_produtos', null, {});
  },
};
