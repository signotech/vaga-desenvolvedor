import {type Request, type Response} from 'express';
import {DeleteProductUseCase} from './DeleteProductUseCase';

export class DeleteProductController {
	async handle(request: Request, response: Response) {
		const {id} = request.params;
		const deleteProductUseCase = new DeleteProductUseCase();
		const result = await deleteProductUseCase.execute(id);

		return response.json(result);
	}
}
