const { Router } = require('express');
const CustomerController = require('./app/controllers/CustomerController');
const ProductController = require('./app/controllers/ProductController');
const RequestController = require('./app/controllers/RequestController');

const route = Router();

route.get('/customers', CustomerController.index);
route.get('/customers/:id', CustomerController.show);
route.post('/customers/', CustomerController.store);
route.put('/customers/:id', CustomerController.update);
route.delete('/customers/:id', CustomerController.delete);

route.get('/products', ProductController.index);
route.get('/products/:id', ProductController.show);
route.post('/products', ProductController.store);
route.put('/products/:id', ProductController.update);
route.delete('/products/:id', ProductController.delete);

route.post('/requests', RequestController.create);
route.get('/requests', RequestController.index);

module.exports = route;
