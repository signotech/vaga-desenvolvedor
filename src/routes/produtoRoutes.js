
const express = require('express');

const router = express.Router();

const produtoController = require('../controllers/produtoController');

// CADASTRAR PRODUTO
router.post('/', produtoController.criarProduto);

// LISTAR PRODUTOS
router.get('/', produtoController.listarProdutos);

// BUSCAR PRODUTO POR ID
router.get('/:id', produtoController.buscarProdutoPorId);

// ATUALIZAR PRODUTO
router.put('/:id', produtoController.atualizarProduto);

// EXCLUIR PRODUTO
router.delete('/:id', produtoController.excluirProduto);

module.exports = router;
