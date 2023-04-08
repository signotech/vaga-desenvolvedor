const express = require('express');

const router = express.Router();

const clientesController = require('./controllers/clientesController');
const clientesMiddleware = require('./middlewares/clientesMiddleware');


const produtosController = require('./controllers/produtosController');
const produtosMiddleware = require('./middlewares/produtosMiddleware');

const pedidosController = require('./controllers/pedidosController');
const pedidosMiddleware = require('./middlewares/pedidosMiddleware');


router.get('/clientes',  clientesController.getAllClientes);
router.post('/clientes', clientesMiddleware .validateFieldTitle,  clientesController.createCliente);
router.delete('/clientes/:id',  clientesController.deleteCliente);
router.put('/clientes/:id',
  clientesMiddleware .validateFieldTitle,
  clientesMiddleware .validateFieldStatus,
  clientesController.updateCliente
);  

router.get('/produtos', produtosController.getAllProdutos);
router.post('/produtos', produtosMiddleware.validateFieldTitle,  produtosController.createProduto);
router.delete('/produtos/:id',  produtosController.deleteProduto);
router.put('/produtos/:id',
  produtosMiddleware.validateFieldTitle,
  produtosMiddleware.validateFieldStatus,
  produtosController.updateProduto
);
 
router.get('/pedidos', pedidosController.getAllPedidos);
router.post('/pedidos', pedidosMiddleware.validateFieldTitle,  pedidosController.createPedido);
router.delete('/pedidos/:id',  pedidosController.deletePedido);
router.put('/pedidos/:id',
  pedidosMiddleware.validateFieldTitle,
  pedidosMiddleware.validateFieldStatus,
  pedidosController.updatePedido
);


module.exports = router;   