'use strict';

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API de Pedidos de Compra',
    version: '1.0.0',
  });
});

module.exports = router;
