const { Router } = require('express');
const validar = require('../middlewares/validar');
const regrasIds = require('../validators/ids');

// Rotas REST padrão de um recurso.
module.exports = (controller, regras) => Router()
  .get('/', controller.listar)
  .post('/', validar(regras), controller.criar)
  .delete('/', validar(regrasIds), controller.excluirVarios)
  .get('/:id', controller.buscar)
  .put('/:id', validar(regras), controller.atualizar)
  .delete('/:id', controller.excluir);
