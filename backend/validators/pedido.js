const { body } = require('express-validator');
const { STATUS_PEDIDO, TIPOS_DESCONTO } = require('../constants');

module.exports = [
  body('codigo_pedido').isInt({ min: 1 }).withMessage('Informe um código de pedido válido.').toInt(),
  body('cliente_id').isInt({ min: 1 }).withMessage('Selecione o cliente.').toInt(),
  body('data_pedido').optional({ values: 'falsy' }).isISO8601().withMessage('Data do pedido inválida.'),
  body('status').isIn(Object.values(STATUS_PEDIDO)).withMessage('Status inválido.'),
  body('tipo_desconto').default(TIPOS_DESCONTO.NENHUM)
    .isIn(Object.values(TIPOS_DESCONTO)).withMessage('Tipo de desconto inválido.'),
  body('desconto').default(0).isFloat({ min: 0 }).withMessage('Desconto inválido.').toFloat()
    .custom((desconto, { req }) => req.body.tipo_desconto !== TIPOS_DESCONTO.PERCENTUAL || desconto <= 100)
    .withMessage('O desconto percentual deve ser de até 100%.'),
  body('itens').isArray({ min: 1 }).withMessage('Adicione ao menos um produto.').bail()
    .custom(itens => new Set(itens.map(item => Number(item?.produto_id))).size === itens.length)
    .withMessage('Não repita o mesmo produto no pedido.'),
  body('itens.*.produto_id').isInt({ min: 1 }).withMessage('Selecione o produto.').toInt(),
  body('itens.*.quantidade').isInt({ min: 1 }).withMessage('Informe uma quantidade válida.').toInt()
];
