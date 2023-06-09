const jwt = require('jsonwebtoken');


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

  // Validar se a senha é igual à confirmação de senha
  if (body.senha !== body.confirmarsenha) {
    erros.push('A senha e a confirmação de senha devem ser iguais');
  }

  return erros.join('. '); // Une as mensagens de erro em uma única string
};

const validateBody = (req, res, next) => {
  const { body } = req;
  const campos = ['nome', 'email', 'senha', 'confirmarsenha'];

  const erros = validarCampos(body, campos);

  if (erros.length > 0) {
    return res.status(400).json({ message: erros });
  }

  next();
};

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado' });
  }

  try {
    // Verificar e decodificar o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};







module.exports = {
  validateBody,
  auth
};
