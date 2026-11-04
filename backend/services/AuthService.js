const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRA_EM } = require('../config/auth');
const { ErroAplicacao } = require('../errors');

class AuthService {
  constructor(Usuario) {
    this.Usuario = Usuario;
  }

  async login(email, senha) {
    const usuario = await this.Usuario.unscoped().findOne({ where: { email } });
    if (!usuario || !(await usuario.verificarSenha(senha))) {
      throw new ErroAplicacao('E-mail ou senha inválidos.', 401);
    }
    const { id, nome } = usuario;
    return { token: jwt.sign({ id, nome, email }, JWT_SECRET, { expiresIn: JWT_EXPIRA_EM }) };
  }
}

module.exports = AuthService;
