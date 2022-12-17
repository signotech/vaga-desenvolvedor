/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pedidos', [
      {
        codigo_pedido: 1,
        status: 'Em Aberto',
        data_pedido: new Date('2019-01-05T15:20:10Z'),
        cpf_cliente: '08334034008',
      },
      {
        codigo_pedido: 2,
        status: 'Pago',
        data_pedido: new Date('2020-04-10T10:35:20Z'),
        cpf_cliente: '16517931074',
      },
      {
        codigo_pedido: 3,
        status: 'Cancelado',
        data_pedido: new Date('2021-07-15T05:50:30Z'),
        cpf_cliente: '08334034008',
      },
      {
        codigo_pedido: 4,
        status: 'Cancelado',
        data_pedido: new Date('2022-10-20T00:05:40Z'),
        cpf_cliente: '40555966003',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pedidos', null, {});
  },
};
