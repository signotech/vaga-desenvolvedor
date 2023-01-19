import { type Request, type Response } from 'express';
import { DeleteOrderUseCase } from './DeleteOrderUseCase';

export class DeleteOrderController {
	async handle(request: Request, response: Response) {
		const { id } = request.params;
		const deleteOrderUseCase = new DeleteOrderUseCase();
		const result = await deleteOrderUseCase.execute(id);

		return response.json(result);
	}
}
