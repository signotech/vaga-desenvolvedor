import { Request, Response } from 'express';
import { DeleteOrderUseCase } from './DeleteOrderUseCase';


export class DeleteOrderController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    
    try {
      const deleteClientUseCase = new DeleteOrderUseCase();

      await deleteClientUseCase.execute(id);

      return response.json({ message: 'Pedido deletado.' });
    } catch (error) {
      throw new Error('Cliente nao existe.');
    }
  }
}