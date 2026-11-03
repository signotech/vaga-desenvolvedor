
const express = require('express');

const router = express.Router();

const clienteController = require('../controllers/clienteController');

// CADASTRAR CLIENTE
router.post('/', clienteController.criarCliente);

// LISTAR TODOS OS CLIENTES
router.get('/', clienteController.listarClientes);

// BUSCAR CLIENTE POR ID
router.get('/:id', clienteController.buscarClientePorId);

// ATUALIZAR CLIENTE
router.put('/:id', clienteController.atualizarCliente);

// EXCLUIR CLIENTE
router.delete('/:id', clienteController.excluirCliente);

module.exports = router;
