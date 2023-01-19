import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';

import 'dotenv';

import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if (err) {
		console.log('Server Error!');
	}

	console.log('Server Error!');
});

app.listen(3000, () => {
	console.log('server is started on port 3000');
});
