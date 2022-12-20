import { Request, Response } from 'express';
import { FindAllProductsUseCase } from './FindAllProductsUseCase';


export class FindAllProductsController {
  async handle(request: Request, response: Response) {
    
    const findAllProductsUseCase = new FindAllProductsUseCase();

    const product = await findAllProductsUseCase.execute();

    return response.json(product);
  }
}