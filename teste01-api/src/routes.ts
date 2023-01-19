import { Router } from 'express';

import { ensureAuthenticated } from './middlewares/ensureAthenticated';
import { AuthenticateUserController } from './modules/account/authenticateUser/AuthenticateUserController';
import { CreateUserController } from './modules/users/useCases/createUser/CreateUserController';
import { ListProfileController } from './modules/account/listProfile/ListProfileController';

import { CreateClientController } from './modules/clients/createClient/CreateClientController';
import { UpdateClientController } from './modules/clients/updateClient/UpdateClientController';
import { DeleteClientController } from './modules/clients/deleteClient/DeleteClientController';
import { ListClientsController } from './modules/clients/listClients/ListClientsController';
import { ListClientByIdController } from './modules/clients/listClient/ListClientByIdController';

import { CreateProductController } from './modules/products/createProduct/CreateProductController';
import { UpdateProductController } from './modules/products/updateProduct/UpdateProductController';
import { DeleteProductController } from './modules/products/deleteProduct/DeleteProductController';
import { ListProductsController } from './modules/products/listProducts/ListProductsController';
import { ListProductByIdController } from './modules/products/listProduct/ListProductByIdController';

import { CreateOrderController } from './modules/orders/createOrder/CreateOrderController';
import { UpdateOrderController } from './modules/orders/updateOrder/UpdateOrderController';
import { DeleteOrderController } from './modules/orders/deleteOrder/DeleteOrderController';
import { ListOrdersController } from './modules/orders/listOrders/ListOrdersController';
import { ListOrderByIdController } from './modules/orders/listOrder/ListOrderByIdController';

const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const listProfileController = new ListProfileController();

const createClientController = new CreateClientController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();
const listClientsController = new ListClientsController();
const listClientByIdController = new ListClientByIdController();

const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();
const listProductsController = new ListProductsController();
const listProductByIdController = new ListProductByIdController();

const createOrderController = new CreateOrderController();
const updateOrderController = new UpdateOrderController();
const deleteOrderController = new DeleteOrderController();
const listOrdersController = new ListOrdersController();
const listOrderByIdController = new ListOrderByIdController();

routes.post('/authenticate/', authenticateUserController.handle);
routes.post('/users/', createUserController.handle);

routes.use(ensureAuthenticated);
routes.get('/users/profile', listProfileController.handle);

routes.post('/clients/', createClientController.handle);
routes.put('/clients/:id', updateClientController.handle);
routes.delete('/clients/:id', deleteClientController.handle);
routes.get('/clients/', listClientsController.handle);
routes.get('/clients/:id', listClientByIdController.handle);

routes.post('/products/', createProductController.handle);
routes.put('/products/:id', updateProductController.handle);
routes.delete('/products/:id', deleteProductController.handle);
routes.get('/products/', listProductsController.handle);
routes.get('/products/:id', listProductByIdController.handle);

routes.post('/orders/', createOrderController.handle);
routes.put('/orders/:id', updateOrderController.handle);
routes.delete('/orders/:id', deleteOrderController.handle);
routes.get('/orders/', listOrdersController.handle);
routes.get('/orders/:id', listOrderByIdController.handle);

export { routes };
