import { Request, Response } from 'express';
import { UpdateProductUseCase } from './UpdateProductUseCase';


export class UpdateProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, category, stock, unitPrice } = request.body;
    
    const updateProductUseCase = new UpdateProductUseCase();

    const product = await updateProductUseCase.execute({
      id,
      name,
      category,
      stock,
      unitPrice
    });

    return response.json(product);
  }
}