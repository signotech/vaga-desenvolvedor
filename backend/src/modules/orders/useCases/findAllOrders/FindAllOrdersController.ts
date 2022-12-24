import { Request, Response } from 'express';
import { FindAllOrdersUseCase } from './FindAllOrdersUseCase';


export class FindAllOrdersController {
  async handle(request: Request, response: Response) {
    const skip = request.query.skip;
    const category = request.query.category;


    const findAllOrdersUseCase = new FindAllOrdersUseCase();

    const orders = await findAllOrdersUseCase.execute(
      {
        skip: Number(skip),
        category: String(category)
      });

    return response.json(orders);
  }
}
