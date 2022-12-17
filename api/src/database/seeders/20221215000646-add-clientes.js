/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clientes', [
      {
        cpf_cliente: '16517931074',
        nome_cliente: 'John Doe',
        email_cliente: 'john.doe@email.com',
      },
      {
        cpf_cliente: '08334034008',
        nome_cliente: 'Mary Jane',
        email_cliente: 'maryjane@email.com',
      },
      {
        cpf_cliente: '40555966003',
        nome_cliente: 'Jane Doe',
        email_cliente: 'jane.doe@email.com',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});
  },
};
