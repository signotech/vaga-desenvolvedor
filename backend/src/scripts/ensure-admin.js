'use strict';

const bcrypt = require('bcryptjs');
const { Usuario, sequelize } = require('../models');

const DEMO_ADMIN = {
  nome: 'Admin Signotech',
  email: 'admin@signotech.com',
  senha: 'admin123',
};

async function ensureAdmin() {
  await sequelize.authenticate();

  const existing = await Usuario.unscoped().findOne({
    where: { email: DEMO_ADMIN.email },
  });

  if (existing) {
    console.log(`Demo admin already exists (${DEMO_ADMIN.email})`);
    return;
  }

  await Usuario.create({
    nome: DEMO_ADMIN.nome,
    email: DEMO_ADMIN.email,
    senha_hash: await bcrypt.hash(DEMO_ADMIN.senha, 10),
  });

  console.log(`Demo admin created (${DEMO_ADMIN.email} / ${DEMO_ADMIN.senha})`);
}

ensureAdmin()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
