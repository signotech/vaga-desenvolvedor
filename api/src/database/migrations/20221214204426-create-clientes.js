/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      cpfCliente: {
        type: Sequelize.CHAR(11),
        primaryKey: true,
        field: 'cpf_cliente',
      },
      nomeCliente: {
        type: Sequelize.STRING(150),
        field: 'nome_cliente',
      },
      emailCliente: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'email_cliente',
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clientes');
  },
};
