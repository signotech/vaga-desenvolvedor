import { type Request, type Response } from 'express';
import { UpdateProductUseCase } from './UpdateProductUseCase';

export class UpdateProductController {
	async handle(request: Request, response: Response) {
		const { id } = request.params;
		const { sku_produto, titulo_produto, preco, estoque } = request.body;

		const updateProductUseCase = new UpdateProductUseCase();
		const result = await updateProductUseCase.execute({
			id,
			sku_produto,
			titulo_produto,
			preco,
			estoque,
		});

		return response.json(result);
	}
}
