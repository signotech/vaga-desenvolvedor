const router = require('express').Router();
const orderController = require('../controllers/orderController');

router.route('/pedidos')
    .post(orderController.store);

router.route('/pedidos/:id')
    .get(orderController.getSome)
    .get(orderController.getOne)
    .delete(orderController.deleteOne);

module.exports = router;