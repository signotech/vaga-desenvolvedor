class ErroAplicacao extends Error {
  constructor(mensagem, status = 400) {
    super(mensagem);
    this.status = status;
  }
}

class NaoEncontradoError extends ErroAplicacao {
  constructor(mensagem = 'Registro não encontrado.') {
    super(mensagem, 404);
  }
}

class ValidacaoError extends ErroAplicacao {
  constructor(mensagem = 'Dados inválidos.') {
    super(mensagem, 422);
  }
}

module.exports = { ErroAplicacao, NaoEncontradoError, ValidacaoError };
