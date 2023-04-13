const router = require('express').Router();
const orderController = require('../controllers/orderController');

router.route('/pedidos')
    .get(orderController.getSome)
    .post(orderController.store);

router.route('/pedidos/:id')
    .get(orderController.getOne)
    .delete(orderController.deleteOne);

module.exports = router;