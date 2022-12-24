import { Router } from 'express';
import { AuthenticateAdminController } from './modules/account/useCases/authenticateAdmin/AuthenticateAdminController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { DeleteClientController } from './modules/clients/useCases/deleteClient/DeleteClientController';
import { FindAllClientsController } from './modules/clients/useCases/findAllClients/FindAllClientsController';
import { UpdateClientController } from './modules/clients/useCases/updateClient/UpdateClientController';
import { CreateOrderController } from './modules/orders/useCases/createOrder/CreateClientController';
import { DeleteOrderController } from './modules/orders/useCases/deleteOrder/DeleteOrderController';
import { FindAllOrdersController } from './modules/orders/useCases/findAllOrders/FindAllOrdersController';
import { UpdateStatusOrderController } from './modules/orders/useCases/updateStatusOrder/UpdateStatusOrderController';
import { CreateProductController } from './modules/products/useCases/createProduct/CreateProductController';
import { DeleteProductController } from './modules/products/useCases/deleteProduct/DeleteProductController';
import { FindAllProductsController } from './modules/products/useCases/findAllProduct/FindAllProductsController';
import { UpdateProductController } from './modules/products/useCases/updateProduct/UpdateProductController';


const routes = Router();


// Products Routes
routes.post('/products', new CreateProductController().handle);
routes.get('/products', new FindAllProductsController().handle);
routes.delete('/products/:id', new DeleteProductController().handle);
routes.put('/products/:id', new UpdateProductController().handle);


// Clients Routes
routes.post('/clients', new CreateClientController().handle);
routes.get('/clients', new FindAllClientsController().handle);
routes.put('/clients/:id', new UpdateClientController().handle);
routes.delete('/clients/:id', new DeleteClientController().handle);


// Orders Routes
routes.post('/orders', new CreateOrderController().handle);
routes.get('/orders', new FindAllOrdersController().handle);
routes.patch('/orders/:id', new UpdateStatusOrderController().handle);
routes.delete('/orders/:id', new DeleteOrderController().handle);


// Authenticated Routes
routes.post('/auth/login', new AuthenticateAdminController().handle);

export {routes};
