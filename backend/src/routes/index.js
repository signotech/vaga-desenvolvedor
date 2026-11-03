const { Router } = require('express');
const auth = require('./auth');
const clientes = require('./clientes');
const produtos = require('./produtos');
const pedidos = require('./pedidos');

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/auth', auth);
router.use('/clientes', clientes);
router.use('/produtos', produtos);
router.use('/pedidos', pedidos);

module.exports = router;
