'use strict';

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Início' });
});

module.exports = router;
