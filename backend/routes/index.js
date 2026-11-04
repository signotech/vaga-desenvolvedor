const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const services = require('../services');
const CrudController = require('../controllers/CrudController');
const AuthController = require('../controllers/AuthController');
const PedidoController = require('../controllers/PedidoController');
const autenticar = require('../middlewares/autenticar');
const validar = require('../middlewares/validar');
const { NaoEncontradoError } = require('../errors');
const crud = require('./crud');

const limiteLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { mensagem: 'Muitas tentativas de login. Tente novamente em alguns minutos.' }
});

const pedidos = new PedidoController(services.pedidos);

module.exports = Router()
  .post('/auth/login', limiteLogin, validar(require('../validators/login')), new AuthController(services.auth).login)
  .use(autenticar)
  .use('/clientes', crud(new CrudController(services.clientes), require('../validators/cliente')))
  .use('/produtos', crud(new CrudController(services.produtos), require('../validators/produto')))
  .use('/pedidos', crud(pedidos, require('../validators/pedido'))
    .patch('/:id/status', validar(require('../validators/statusPedido')), pedidos.alterarStatus))
  .use((req, res, next) => next(new NaoEncontradoError('Rota não encontrada.')));
