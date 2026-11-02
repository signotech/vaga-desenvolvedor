'use strict';

const express = require('express');

const clientsRoutes = require('../modules/clients/routes');
const productsRoutes = require('../modules/products/routes');
const ordersRoutes = require('../modules/orders/routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Início' });
});

router.use('/clients', clientsRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;
