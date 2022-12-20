import { Request, Response } from 'express';
import { FindAllOrdersUseCase } from './FindAllOrdersUseCase';


export class FindAllOrdersController {
  async handle(request: Request, response: Response) {
    
    const findAllOrdersUseCase = new FindAllOrdersUseCase();

    const orders = await findAllOrdersUseCase.execute();

    return response.json(orders);
  }
}