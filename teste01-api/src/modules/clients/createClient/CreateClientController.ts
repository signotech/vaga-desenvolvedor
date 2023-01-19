import {type Request, type Response} from 'express';
import {CreateClientUseCase} from './CreateClientUseCase';

export class CreateClientController {
	async handle(request: Request, response: Response) {
		const {nome_cliente, cpf_cliente, email_cliente} = request.body;

		const createClientUseCase = new CreateClientUseCase();
		const result = await createClientUseCase.execute({
			nome_cliente,
			cpf_cliente,
			email_cliente,
		});

		return response.json(result);
	}
}
