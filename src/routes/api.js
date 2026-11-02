'use strict';

const express = require('express');

const clientsRoutes = require('../modules/clients/apiRoutes');
const productsRoutes = require('../modules/products/apiRoutes');
const ordersRoutes = require('../modules/orders/apiRoutes');

const router = express.Router();

// Aceita `perPage` como apelido de `per_page` na query string.
router.use((req, res, next) => {
  if (req.query.perPage && !req.query.per_page) {
    req.query.per_page = req.query.perPage;
  }

  next();
});

router.get('/', (req, res) => {
  res.json({
    message: 'API de Pedidos de Compra',
    version: '1.0.0',
    endpoints: {
      clients: '/api/v1/clients',
      products: '/api/v1/products',
      orders: '/api/v1/orders',
    },
  });
});

router.use('/clients', clientsRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;
