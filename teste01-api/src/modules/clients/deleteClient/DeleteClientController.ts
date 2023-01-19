import {type Request, type Response} from 'express';
import {DeleteClientUseCase} from './DeleteClientUseCase';

export class DeleteClientController {
	async handle(request: Request, response: Response) {
		const {id} = request.params;
		const deleteClientUseCase = new DeleteClientUseCase();
		const result = await deleteClientUseCase.execute(id);

		return response.json(result);
	}
}
