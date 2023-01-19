import {type Request, type Response} from 'express';
import {UpdateClientUseCase} from './UpdateClientUseCase';

export class UpdateClientController {
	async handle(request: Request, response: Response) {
		const {id} = request.params;
		const {nome_cliente, email_cliente, cpf_cliente} = request.body;

		const updateClientUseCase = new UpdateClientUseCase();
		const result = await updateClientUseCase.execute({
			id,
			nome_cliente,
			email_cliente,
			cpf_cliente,
		});

		return response.json(result);
	}
}
