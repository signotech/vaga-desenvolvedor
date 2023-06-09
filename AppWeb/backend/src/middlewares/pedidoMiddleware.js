const validarCampos = (body, campos) => {
  const erros = [];

  for (const campo of campos) {
    if (body[campo] === undefined) {
      erros.push(`O campo "${campo}" é obrigatório`);
    }
    if (body[campo] === '') {
      erros.push(`O campo "${campo}" não pode ser vazio`);
    }
  }

  return erros.join('. '); // Une as mensagens de erro em uma única string
};

const validateBody = (req, res, next) => {
  const { body } = req;
  const campos = ['status','clienteId','produtoId'];

  const erros = validarCampos(body, campos);

  if (erros) {
    return res.status(400).json({ message: erros });
  }

  next();
};

module.exports = {
  validateBody,
};
