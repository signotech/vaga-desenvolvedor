const ResourceAlreadyExistsError = require('../errors/resource-already-exists-error');
const ResourceNotFoundError = require('../errors/resource-not-found-error');
const ValidationError = require('../errors/validation-error');
const {
  serverError,
  badRequest,
  conflict,
  notFound,
} = require('../util/http');

class ErrorMiddleware {
  static handle(error) {
    if (error instanceof ValidationError) {
      return badRequest({ mensagem: error.message });
    }
    if (error instanceof ResourceNotFoundError) {
      return notFound({ mensagem: error.message });
    }
    if (error instanceof ResourceAlreadyExistsError) {
      return conflict({ mensagem: error.message });
    }
    // eslint-disable-next-line no-console
    console.error(error);
    return serverError({ mensagem: 'Ocorreu um erro inesperado' });
  }
}

module.exports = ErrorMiddleware;
