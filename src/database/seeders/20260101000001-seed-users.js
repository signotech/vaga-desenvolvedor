'use strict';

const { User } = require('../../models');
const { buildUser } = require('../factories/userFactory');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up() {
    const count = await User.count();

    if (count > 0) {
      console.log('Usuários já cadastrados, seed ignorado.');
      return;
    }

    await User.create(buildUser());
    console.log('Usuário administrador criado (admin@teste.com / admin123).');
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@teste.com' });
  },
};
