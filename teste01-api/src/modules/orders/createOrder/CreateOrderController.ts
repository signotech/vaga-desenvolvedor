import { type Request, type Response } from 'express';
import { CreateOrderUseCase } from './CreateOrderUseCase';

export class CreateOrderController {
	async handle(request: Request, response: Response) {
		const { sku_produto, estoque } = request.body;

		const createOrderUseCase = new CreateOrderUseCase();
		const result = await createOrderUseCase.execute({
			sku_produto,
			estoque,
		});

		return response.json(result);
	}
}
