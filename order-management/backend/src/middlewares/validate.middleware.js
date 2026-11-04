'use strict';

const { errorResponse } = require('../utils/helpers');

/**
 * Fábrica de middleware: valida body/params/query da requisição com um esquema Zod.
 * @param {import('zod').ZodSchema} schema - Esquema Zod usado na validação
 * @param {'body'|'params'|'query'} source - Origem dos dados
 */
function validate(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req[source]);

      if (!result.success) {
        const errors = result.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        return res.status(422).json(errorResponse('Dados inválidos', errors, 'VALIDATION_ERROR'));
      }

      // Substitui os dados da requisição pelos dados validados e transformados
      req[source] = result.data;
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { validate };
