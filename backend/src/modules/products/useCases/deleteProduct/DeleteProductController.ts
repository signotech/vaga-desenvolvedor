import { Request, Response } from 'express';
import { DeleteProductUseCase } from './DeleteProductUseCase';


export class DeleteProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    
    try {
      const deleteProductUseCase = new DeleteProductUseCase();

      await deleteProductUseCase.execute(id);

      return response.json({ message: 'Produto deletado' });
    } catch (error) {
      throw new Error('Produto nao existe.');
    }
  }
}