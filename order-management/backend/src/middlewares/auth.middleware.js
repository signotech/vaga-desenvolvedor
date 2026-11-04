'use strict';

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const { errorResponse } = require('../utils/helpers');
const User = require('../models/User');

/**
 * Middleware: autentica requisições usando JWT armazenado em cookie HttpOnly
 * ou no cabeçalho Authorization para clientes de API.
 */
function authenticate(req, res, next) {
  let token = null;
  let decoded;

  try {
    if (req.cookies && req.cookies.authToken) {
      token = req.cookies.authToken;
    }

    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json(errorResponse('Autenticação necessária', null, 'UNAUTHORIZED'));
    }

    decoded = jwt.verify(token, authConfig.jwtSecret);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json(errorResponse('Sessão expirada. Faça login novamente.', null, 'TOKEN_EXPIRED'));
    }
    return res.status(401).json(errorResponse('Token inválido', null, 'INVALID_TOKEN'));
  }

  User.findByPk(decoded.id)
    .then((user) => {
      if (!user) {
        return res.status(401).json(errorResponse('Usuário da sessão não existe mais', null, 'USER_NOT_FOUND'));
      }
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      };
      return next();
    })
    .catch(next);
}

/**
 * Fábrica de middleware: autoriza requisições com base no perfil do usuário.
 * @param {...string} roles - Perfis permitidos (por exemplo, 'ADMIN', 'OPERATOR')
 */
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json(errorResponse('Autenticação necessária', null, 'UNAUTHORIZED'));
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json(errorResponse('Acesso não autorizado para seu perfil', null, 'FORBIDDEN'));
    }
    next();
  };
}

module.exports = { authenticate, authorize };
