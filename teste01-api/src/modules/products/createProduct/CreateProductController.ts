import { type Request, type Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';

export class CreateProductController {
	async handle(request: Request, response: Response) {
		const { sku_produto, titulo_produto, preco, estoque } = request.body;

		const createProductUseCase = new CreateProductUseCase();
		const result = await createProductUseCase.execute({
			sku_produto,
			titulo_produto,
			preco,
			estoque,
		});

		return response.json(result);
	}
}
