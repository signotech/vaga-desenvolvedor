const { Usuario } = require('../models');
const { verifyToken } = require('../utils/auth');

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    const payload = verifyToken(token);
    const usuario = await Usuario.findByPk(payload.sub);
    if (!usuario) return res.status(401).json({ error: 'Não autenticado' });

    req.user = usuario;
    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

module.exports = requireAuth;
