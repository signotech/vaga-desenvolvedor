import express from 'express';
import cors from 'cors';
import { routes } from '../http/routes/index'; 

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}));

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
  res.send('Acesse /jobs, /candidates ou /applications.');
});

export { app };
