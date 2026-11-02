'use strict';

const express = require('express');

const clientsRoutes = require('../modules/clients/routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Início' });
});

router.use('/clients', clientsRoutes);

module.exports = router;
