module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'orderflow_dev_jwt_secret_key_32chars_min',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,

  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 8 * 60 * 60 * 1000, // 8 hours in ms
  },

  roles: {
    ADMIN: 'ADMIN',
    OPERATOR: 'OPERATOR',
  },
};
