'use strict';

const { errorResponse } = require('../utils/helpers');

/**
 * Middleware centralizado de tratamento de erros.
 * Deve ser registrado por ÚLTIMO na cadeia de middlewares do Express.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV === 'development';

  // Registra o erro no servidor (evita expor informações em produção)
  if (isDev || process.env.LOG_LEVEL === 'debug') {
    console.error(`[ErrorHandler] ${err.name}: ${err.message}`);
    if (isDev) console.error(err.stack);
  }

  // Erros de validação do Sequelize
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors
      ? err.errors.map((e) => ({ field: e.path, message: e.message }))
      : [{ field: 'unknown', message: err.message }];

    return res.status(422).json(errorResponse('Erro de validação do banco de dados', errors, 'DB_VALIDATION_ERROR'));
  }

  // Erros de restrição de chave estrangeira do Sequelize
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(409).json(
      errorResponse('Operação não permitida: registro possui dependências', null, 'FOREIGN_KEY_CONSTRAINT')
    );
  }

  // Erros de banco de dados do Sequelize
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json(errorResponse('Erro interno do banco de dados', null, 'DB_ERROR'));
  }

  // Erros conhecidos da aplicação
  if (err.statusCode) {
    return res.status(err.statusCode).json(errorResponse(err.message, err.errors, err.code));
  }

  // Erros de JWT (se não forem capturados pelo middleware de autenticação)
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json(errorResponse('Token inválido ou expirado', null, 'AUTH_ERROR'));
  }

  // Padrão: erro interno do servidor
  return res.status(500).json(
    errorResponse(
      isDev ? err.message : 'Erro interno do servidor',
      isDev ? { stack: err.stack } : null,
      'INTERNAL_ERROR'
    )
  );
}

/**
 * Cria um erro da aplicação com código de status.
 */
function createError(message, statusCode = 500, code = null, errors = null) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.code = code;
  err.errors = errors;
  return err;
}

/**
 * Tratamento de 404 não encontrado — registre ANTES de errorHandler e DEPOIS de todas as rotas.
 */
function notFoundHandler(req, res) {
  res.status(404).json(errorResponse(`Rota ${req.method} ${req.path} não encontrada`, null, 'NOT_FOUND'));
}

module.exports = { errorHandler, notFoundHandler, createError };
