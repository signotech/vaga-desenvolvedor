import { Request, Response } from 'express';
import { CreateOrderUseCase } from './CreateOrderUseCase';


export class CreateOrderController {
  async handle(request: Request, response: Response) {
    
    const { productsId, clientsId, quantity } = request.body;

    const createClientUseCase = new CreateOrderUseCase();
    

    const client = await createClientUseCase.execute({
      productsId,clientsId, quantity
    });

    return response.json(client);
  }
}