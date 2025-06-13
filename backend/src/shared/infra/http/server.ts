import express from 'express';
import { routes } from '../http/routes/index'; 

const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
  res.send('Acesse /jobs ou /candidates.');
});

export { app };
