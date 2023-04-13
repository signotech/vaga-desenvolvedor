const router = require('express').Router();
const customerController = require('../controllers/customerController');

router.route('/clientes')
    .get(customerController.getSome)
    .post(customerController.store);

router.route('/clientes/:id')
    .get(customerController.getOne)
    .delete(customerController.deleteOne)

module.exports = router;