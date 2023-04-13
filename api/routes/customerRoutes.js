const router = require('express').Router();
const customerController = require('../controllers/customerController');

router.post('/cliente', customerController.store);

module.exports = router;