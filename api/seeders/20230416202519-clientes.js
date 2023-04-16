'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('clientes', 
      [
        {
          cpf_cliente: '12345678910',
          nome_cliente: 'Luke Skywalker',
          email_cliente: 'luke.skywalker@exemplo.com'
        },
        {
          cpf_cliente: '23456789101',
          nome_cliente: 'Leia Organa',
          email_cliente: 'leia.organa@exemplo.com'
        },
        {
          cpf_cliente: '34567891012',
          nome_cliente: 'Han Solo',
          email_cliente: 'han.solo@exemplo.com'
        },
        {
          cpf_cliente: '45678910123',
          nome_cliente: 'Chewbacca',
          email_cliente: 'chewbacca@exemplo.com'
        },
        {
          cpf_cliente: '56789101234',
          nome_cliente: 'Darth Vader',
          email_cliente: 'darth.vader@exemplo.com'
        },
        {
          cpf_cliente: '67891012345',
          nome_cliente: 'Obi-Wan Kenobi',
          email_cliente: 'obiwan.kenobi@exemplo.com'
        },
        {
          cpf_cliente: '78910123456',
          nome_cliente: 'Yoda',
          email_cliente: 'yoda@exemplo.com'
        },
        {
          cpf_cliente: '89101234567',
          nome_cliente: 'R2-D2',
          email_cliente: 'r2d2@exemplo.com'
        },
        {
          cpf_cliente: '91012345678',
          nome_cliente: 'C-3PO',
          email_cliente: 'c3po@exemplo.com'
        },
        {
          cpf_cliente: '10123456789',
          nome_cliente: 'Lando Calrissian',
          email_cliente: 'lando.calrissian@exemplo.com'
        },
        {
          cpf_cliente: '01234567890',
          nome_cliente: 'Indiana Jones',
          email_cliente: 'indiana.jones@exemplo.com'
        },
        {
          cpf_cliente: '98765432109',
          nome_cliente: 'Marion Ravenwood',
          email_cliente: 'marion.ravenwood@exemplo.com'
        },
        {
          cpf_cliente: '87654321098',
          nome_cliente: 'Sallah',
          email_cliente: 'sallah@exemplo.com'
        },
        {
          cpf_cliente: '76543210987',
          nome_cliente: 'Short Round',
          email_cliente: 'short.round@exemplo.com'
        },
        {
          cpf_cliente: '65432109876',
          nome_cliente: 'Will Turner',
          email_cliente: 'will.turner@exemplo.com'
        },
        {
          cpf_cliente: '54321098765',
          nome_cliente: 'Elizabeth Swann',
          email_cliente: 'elizabeth.swann@exemplo.com'
        },
        {
          cpf_cliente: '43210987654',
          nome_cliente: 'Jack Sparrow',
          email_cliente: 'jack.sparrow@exemplo.com'
        },
        {
          cpf_cliente: '32109876543',
          nome_cliente: 'Hector Barbossa',
          email_cliente: 'hector.barbossa@exemplo.com'
        },
        {
          cpf_cliente: '21098765432',
          nome_cliente: 'Davy Jones',
          email_cliente: 'davy.jones@exemplo.com'
        },
        {
          cpf_cliente: '10987654321',
          nome_cliente: 'Neo',
          email_cliente: 'neo@exemplo.com'
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('clientes', null, {});
  }
};
