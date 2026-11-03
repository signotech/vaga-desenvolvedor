
const express = require('express');

const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

// Cadastrar pedido
router.post('/', pedidoController.criarPedido);

// Listar pedidos
router.get('/', pedidoController.listarPedidos);

// Consultar pedido por ID
router.get('/:id', pedidoController.buscarPedidoPorId);

// Atualizar pedido
router.put('/:id', pedidoController.atualizarPedido);

// Excluir pedido
router.delete('/:id', pedidoController.excluirPedido);

module.exports = router;
