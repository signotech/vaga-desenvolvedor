const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? null : 'segredo-apenas-desenvolvimento');

if (!JWT_SECRET) throw new Error('Defina a variável JWT_SECRET em produção.');

module.exports = { JWT_SECRET, JWT_EXPIRA_EM: '8h' };
