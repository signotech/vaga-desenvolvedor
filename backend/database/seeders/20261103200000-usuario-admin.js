const ADMIN = { nome: 'Administrador', email: 'admin@teste.com', senha: '123456' };

module.exports = {
  async up() {
    const { Usuario } = require('../models');
    await Usuario.findOrCreate({ where: { email: ADMIN.email }, defaults: ADMIN });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Usuarios', { email: ADMIN.email });
  }
};
