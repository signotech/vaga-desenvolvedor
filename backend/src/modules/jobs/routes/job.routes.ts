import { Router } from 'express';
import { JobController } from '../controllers/JobController';

const routes = Router();
const controller = new JobController();

routes.post('/', controller.create);
routes.get('/', controller.list);
routes.get('/:id', controller.show);
routes.put('/:id', controller.update);
routes.delete('/:id', controller.delete);

export { routes as jobRoutes };
