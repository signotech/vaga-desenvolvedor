import { Request, Response } from 'express';
import { FindAllProductsUseCase } from './FindAllProductsUseCase';


export class FindAllProductsController {
  async handle(request: Request, response: Response) {
    const {skip, name, category, orderBy} = request.query;

    const findAllProductsUseCase = new FindAllProductsUseCase();

    const product = await findAllProductsUseCase.execute(
      {
        name: String(name),
        skip: Number(skip),
        category: String(category),
        orderBy: String(orderBy),
      });

    return response.json(product);
  }
}

