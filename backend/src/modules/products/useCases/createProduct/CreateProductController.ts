import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';


export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, category, stock, unitPrice, sku } = request.body;

    const createProductUseCase = new CreateProductUseCase();

    const product = await createProductUseCase.execute({
      category,
      name,
      stock,
      unitPrice,
      sku
    });

    return response.json(product);
  }
}
