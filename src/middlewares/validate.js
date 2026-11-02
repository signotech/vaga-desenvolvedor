'use strict';

const { validationResult } = require('express-validator');

function wantsJson(req) {
  return (
    req.path.startsWith('/api') ||
    req.accepts(['html', 'json']) === 'json'
  );
}

function toErrorList(result) {
  return result.array({ onlyFirstError: true }).map((error) => ({
    field: error.path,
    message: error.msg,
  }));
}

/**
 * Executa as regras do express-validator e centraliza o tratamento dos erros.
 *
 * - API: responde 422 com a lista de erros em JSON.
 * - Web: disponibiliza `req.validationErrors` (mapeado por campo) para que o
 *   controller re-renderize o formulário com as mensagens.
 */
function validate(rules) {
  const ruleList = Array.isArray(rules) ? rules : [rules];

  return [
    ...ruleList,
    (req, res, next) => {
      const result = validationResult(req);

      if (result.isEmpty()) {
        return next();
      }

      req.validationErrors = result.mapped();

      if (wantsJson(req)) {
        return res.status(422).json({
          error: 'Dados inválidos.',
          errors: toErrorList(result),
        });
      }

      return next();
    },
  ];
}

module.exports = validate;
