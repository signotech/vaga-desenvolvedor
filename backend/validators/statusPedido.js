const { body } = require('express-validator');
const { STATUS_PEDIDO } = require('../constants');

module.exports = [
  body('status').isIn(Object.values(STATUS_PEDIDO)).withMessage('Status inválido.')
];
