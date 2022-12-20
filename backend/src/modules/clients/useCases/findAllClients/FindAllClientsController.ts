import { Request, Response } from 'express';
import { FindAllClientsUseCase } from './FindAllClientsUseCase';


export class FindAllClientsController {
  async handle(request: Request, response: Response) {
    
    const findAllClientsUseCase = new FindAllClientsUseCase();

    const product = await findAllClientsUseCase.execute();

    return response.json(product);
  }
}