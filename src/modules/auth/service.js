'use strict';

const bcrypt = require('bcryptjs');

const { User } = require('../../models');

function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase();
}

async function authenticate(email, password) {
  const user = await User.findOne({
    where: { email: normalizeEmail(email) },
  });

  if (!user) {
    return null;
  }

  const matches = await bcrypt.compare(
    String(password || ''),
    user.passwordHash,
  );

  return matches ? user : null;
}

module.exports = { authenticate };
