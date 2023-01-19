import { type Request, type Response } from 'express';
import { UpdateOrderUseCase } from './UpdateOrderUseCase';

export class UpdateOrderController {
	async handle(request: Request, response: Response) {
		const { id } = request.params;
		const { status } = request.body;

		const updateOrderUseCase = new UpdateOrderUseCase();
		const result = await updateOrderUseCase.execute({
			id,
			status,
		});

		return response.json(result);
	}
}
