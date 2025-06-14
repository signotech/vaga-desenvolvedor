import { Router } from 'express';
import { ApplicationController } from '../controllers/ApplicationController';

const routes = Router();
const controller = new ApplicationController();

routes.post('/', controller.create);
routes.get('/', controller.list);
routes.get('/:id', controller.show);
routes.put('/:id', controller.update);
routes.delete('/:id', controller.delete);

export { routes as applicationRoutes };
