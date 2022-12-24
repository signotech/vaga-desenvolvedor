import { Request, Response } from 'express';
import { FindAllClientsUseCase } from './FindAllClientsUseCase';


export class FindAllClientsController {
  async handle(request: Request, response: Response) {
    const skip = request.query.skip;
    const name = request.query.name;
    const orderBy = request.query.orderBy;

    const findAllClientsUseCase = new FindAllClientsUseCase();

    const product = await findAllClientsUseCase.execute(
      {
        name: String(name),
        skip: Number(skip),
        orderBy: String(orderBy),
      });

    return response.json(product);
  }
}
