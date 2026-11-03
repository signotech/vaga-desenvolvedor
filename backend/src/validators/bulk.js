const { body } = require('express-validator');

const bulkDelete = [
  body('ids').isArray({ min: 1 }).withMessage('Informe ao menos um id'),
  body('ids.*').isInt({ min: 1 }).withMessage('Ids inválidos'),
];

module.exports = { bulkDelete };
