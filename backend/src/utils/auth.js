const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'signotech-dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h';

function signToken(usuario) {
  return jwt.sign(
    { sub: usuario.id, email: usuario.email, nome: usuario.nome },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signToken, verifyToken, JWT_SECRET };
