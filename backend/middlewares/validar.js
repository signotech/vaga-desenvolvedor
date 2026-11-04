const { validationResult, matchedData } = require('express-validator');
const { ValidacaoError } = require('../errors');

// Executa as regras e deixa em req.body somente os campos validados (evita mass assignment).
module.exports = regras => [
  ...regras,
  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) return next(new ValidacaoError(erros.array().map(erro => erro.msg).join(' ')));
    req.body = matchedData(req, { locations: ['body'] });
    next();
  }
];
