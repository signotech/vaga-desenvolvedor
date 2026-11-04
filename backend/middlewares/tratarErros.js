const STATUS_POR_ERRO = {
  SequelizeValidationError: 422,
  SequelizeUniqueConstraintError: 409,
  SequelizeForeignKeyConstraintError: 409
};

module.exports = (erro, req, res, next) => {
  const status = erro.status ?? STATUS_POR_ERRO[erro.name] ?? 500;

  if (status >= 500) {
    console.error(erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }

  const mensagens = {
    SequelizeForeignKeyConstraintError: 'Este registro está vinculado a outros cadastros e não pode ser excluído.',
    SyntaxError: 'JSON inválido no corpo da requisição.'
  };
  const mensagem = mensagens[erro.name] ?? (erro.errors?.map(item => item.message).join(' ') || erro.message);

  res.status(status).json({ mensagem });
};
