import express from 'express';
import { jobRoutes } from '../../../modules/jobs/routes/job.routes';

const app = express();

app.use(express.json());
app.use('/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.send('Acesse /jobs para ver as vagas.');
});

export { app };
