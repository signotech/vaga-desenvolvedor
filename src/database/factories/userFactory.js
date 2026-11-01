'use strict';

const bcrypt = require('bcryptjs');

function buildUser({ password = 'admin123', ...overrides } = {}) {
  return {
    name: 'Administrador',
    email: 'admin@teste.com',
    passwordHash: bcrypt.hashSync(password, 10),
    ...overrides,
  };
}

module.exports = { buildUser };
