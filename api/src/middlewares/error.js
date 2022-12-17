const ResourceAlreadyExistsError = require('../errors/resource-already-exists-error');
const ValidationError = require('../errors/validation-error');
const { serverError, badRequest, conflict } = require('../util/http');

class ErrorMiddleware {
  handle(error) {
    if (error instanceof ValidationError) {
      return badRequest({ mensagem: error.message });
    }
    if (error instanceof ResourceAlreadyExistsError) {
      return conflict({ mensagem: error.message });
    }
    return serverError({ mensagem: 'Ocorreu um erro inesperado' });
  }
}

module.exports = ErrorMiddleware;
