import { Router } from 'express';
import { jobRoutes } from '../../../../modules/jobs/routes/job.routes';
import { candidateRoutes } from '../../../../modules/jobs/routes/candidates.routes';
import { applicationRoutes } from '../../../../modules/jobs/routes/application.routes';

const routes = Router();

routes.use('/jobs', jobRoutes);
routes.use('/candidates', candidateRoutes);
routes.use('/applications', applicationRoutes);

export { routes };
