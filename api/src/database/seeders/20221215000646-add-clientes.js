/* eslint-disable no-unused-vars */
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
      {
        cpf_cliente: '12345678901',
        nome_cliente: 'Wednesday Addams',
        email_cliente: 'wedadd@email.com',
      },
      {
        cpf_cliente: '10987654321',
        nome_cliente: 'Charles Xavier',
        email_cliente: 'charlie@email.com',
      },
      {
        cpf_cliente: '65498732109',
        nome_cliente: 'Wanda Maximoff',
        email_cliente: 'wandamax@email.com',
      },
      {
        cpf_cliente: '75395125846',
        nome_cliente: 'Luke Skywalker',
        email_cliente: 'littleluke@email.com',
      },
      {
        cpf_cliente: '85236974109',
        nome_cliente: 'Ellie Willians',
        email_cliente: 'ellie.w@email.com',
      },
      {
        cpf_cliente: '96325874197',
        nome_cliente: 'Joel Miller',
        email_cliente: 'miller.joel@email.com',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});
  },
};
