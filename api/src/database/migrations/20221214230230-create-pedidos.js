/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', {
      codigoPedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'codigo_pedido',
      },
      status: {
        type: Sequelize.STRING(100),
      },
      dataPedido: {
        type: Sequelize.DATE,
        field: 'data_pedido',
      },
      cpfCliente: {
        type: Sequelize.CHAR(11),
        references: {
          model: 'clientes',
          key: 'cpf_cliente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'cpf_cliente',
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pedidos');
  },
};
