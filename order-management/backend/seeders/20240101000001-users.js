'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Verifica se o administrador já existe para tornar a seed idempotente
    const [existing] = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email = 'admin@orderflow.dev' LIMIT 1"
    );

    if (existing.length > 0) {
      console.log('Users seed already applied, skipping...');
      return;
    }

    const passwordHash = await bcrypt.hash('Admin@123', 12);
    const operatorHash = await bcrypt.hash('Operator@123', 12);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Administrador',
        email: 'admin@orderflow.dev',
        password_hash: passwordHash,
        role: 'ADMIN',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Operador Padrão',
        email: 'operator@orderflow.dev',
        password_hash: operatorHash,
        role: 'OPERATOR',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: ['admin@orderflow.dev', 'operator@orderflow.dev'],
    });
  },
};
