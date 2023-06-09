const express = require('express');
//import controller
const produtoController = require('./controllers/produtoController');
const clienteController = require('./controllers/clienteController');
const pedidoController = require('./controllers/pedidoController');
const adminController = require('./controllers/adminController');

//importando as validações
const produtoMiddleware = require('./middlewares/produtoMiddleware');
const clienteMiddleware = require('./middlewares/clienteMiddleware');
const pedidoMiddleware = require('./middlewares/pedidoMiddleware');
const adminMiddleware = require('./middlewares/adminMiddlewere');

const router = express.Router();

//Rotas 2 parametros, endpoint e uma call back, função etc
//primeiro valida com middleware depois ele vai pra proxima funcao ex: addprod
//-------------------------Produto---------------------
router.get('/produto/:id', adminMiddleware.auth, produtoController.getProdById);
router.get('/produtos',adminMiddleware.auth, produtoController.getAll);
router.post('/produto',adminMiddleware.auth, produtoMiddleware.validateBody, produtoController.addProd);
router.delete('/produto/:id',adminMiddleware.auth,  produtoController.deleteProd);
router.put('/produto/:id',adminMiddleware.auth, produtoMiddleware.validateBody, produtoController.updateProd);

//-------------------------Cliente---------------------
router.get('/cliente/:id',adminMiddleware.auth, clienteController.getCliById);
router.get('/clientes',adminMiddleware.auth, clienteController.getAll);
router.post('/cliente', adminMiddleware.auth, clienteMiddleware.validateBody, clienteController.addCli);
router.delete('/cliente/:id',adminMiddleware.auth,  clienteController.deleteCli);
router.put('/cliente/:id',adminMiddleware.auth, clienteMiddleware.validateBody, clienteController.updateCli);

//-------------------------Pedido---------------------
router.get('/pedido/:id',adminMiddleware.auth, pedidoController.getPedById);
router.get('/pedidos',adminMiddleware.auth, pedidoController.getAll);
router.post('/pedido',adminMiddleware.auth, pedidoMiddleware.validateBody, pedidoController.addPed);
router.delete('/pedido/:id',adminMiddleware.auth, pedidoController.deletePed);
router.put('/pedido/:id',adminMiddleware.auth, pedidoMiddleware.validateBody, pedidoController.updatePed);

//----------------------Adm---------------------------
router.post('/login', adminController.login);
router.post('/admin', adminMiddleware.validateBody, adminController.addAdm);
router.get('/admin/:id', adminMiddleware.auth, adminController.getAdmById);

module.exports = router;