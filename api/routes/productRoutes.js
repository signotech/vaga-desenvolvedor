const router = require('express').Router();
const productController = require('../controllers/productController');

router.route('/produtos')
    .get(productController.getSome)
    .post(productController.store);

router.route('/produtos/:id')
    .get(productController.getOne)
    .put(productController.updateOne)
    .delete(productController.deleteOne)

module.exports = router;