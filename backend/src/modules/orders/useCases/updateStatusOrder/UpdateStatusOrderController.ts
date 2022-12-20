import { Request, Response } from 'express';
import { UpdateStatusOrderUseCase } from './UpdateStatusOrderUseCase';


export class UpdateStatusOrderController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { status } = request.body;
    
    const updateStatusOrderUseCase = new UpdateStatusOrderUseCase();

    const updateStatus = await updateStatusOrderUseCase.execute({ id,status});
  
    return response.json(updateStatus);
  }
}