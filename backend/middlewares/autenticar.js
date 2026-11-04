const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/auth');
const { ErroAplicacao } = require('../errors');

module.exports = (req, res, next) => {
  const [tipo, token] = (req.headers.authorization || '').split(' ');
  try {
    if (tipo !== 'Bearer' || !token) throw new Error();
    req.usuario = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    next(new ErroAplicacao('Sessão inválida ou expirada. Faça login novamente.', 401));
  }
};
