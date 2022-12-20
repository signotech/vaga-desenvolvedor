import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';


export class CreateProductController {
  async handle(request: Request, response: Response) {
    const { name, category, stock, unitPrice } = request.body;

    const createProductUseCase = new CreateProductUseCase();

    const product = await createProductUseCase.execute({
      category,
      name,
      stock,
      unitPrice
    });

    return response.json(product);
  }
}