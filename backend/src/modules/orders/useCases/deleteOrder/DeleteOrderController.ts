import { Request, Response } from 'express';
import { DeleteOrderUseCase } from './DeleteOrderUseCase';


export class DeleteOrderController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const deleteOrderUseCase = new DeleteOrderUseCase();

      const deletedOrder =  await deleteOrderUseCase.execute(id);

      return response.json(deletedOrder);
    } catch (error) {
      throw new Error('Pedido nao existe.');
    }
  }
}
