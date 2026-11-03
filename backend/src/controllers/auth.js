const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  async login(req, res, next) {
    try {
      const email = String(req.body.email || '').trim().toLowerCase();
      const senha = String(req.body.senha || '');

      const usuario = await Usuario.unscoped().findOne({ where: { email } });
      if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos' });
      }

      const safe = usuario.toJSON();
      delete safe.senha_hash;

      return res.json({
        token: signToken(usuario),
        user: safe,
      });
    } catch (err) {
      return next(err);
    }
  },

  async me(req, res) {
    res.json(req.user);
  },
};
