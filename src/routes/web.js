'use strict';

const express = require('express');

const authRoutes = require('../modules/auth/routes');
const clientsRoutes = require('../modules/clients/routes');
const productsRoutes = require('../modules/products/routes');
const ordersRoutes = require('../modules/orders/routes');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

router.use(authRoutes);

router.get('/', requireAuth, (req, res) => {
  res.render('home', { title: 'Início' });
});

router.use('/clients', requireAuth, clientsRoutes);
router.use('/products', requireAuth, productsRoutes);
router.use('/orders', requireAuth, ordersRoutes);

module.exports = router;
