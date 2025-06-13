import { Router } from 'express';
import { CandidateController } from '../controllers/CandidateController';

const routes = Router();
const controller = new CandidateController();

routes.post('/', controller.create);
routes.get('/', controller.list);
routes.get('/:id', controller.show);
routes.put('/:id', controller.update);
routes.delete('/:id', controller.delete);

export { routes as candidateRoutes };
