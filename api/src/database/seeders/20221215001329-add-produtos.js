/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('produtos', [
      {
        sku_produto: '083TEN591',
        titulo_produto: 'Tênis',
        preco: 290.90,
        estoque: 8,
      },
      {
        sku_produto: '159JAQ857',
        titulo_produto: 'Jaqueta',
        preco: 117.99,
        estoque: 3,
      },
      {
        sku_produto: '451JEA756',
        titulo_produto: 'Calça Jeans',
        preco: 69.50,
        estoque: 5,
      },
      {
        sku_produto: '303SAP741',
        titulo_produto: 'Sapato Social',
        preco: 89.90,
        estoque: 18,
      },
      {
        sku_produto: '643BER941',
        titulo_produto: 'Bermuda',
        preco: 32.99,
        estoque: 30,
      },
      {
        sku_produto: '258BON963',
        titulo_produto: 'Boné',
        preco: 24.99,
        estoque: 12,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('produtos', null, {});
  },
};
