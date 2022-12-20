import { Request, Response } from 'express';
import { UpdateClientUseCase } from './UpdateClientUseCase';


export class UpdateClientController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, cpf, email } = request.body;
    
    const updateClientUseCase = new UpdateClientUseCase();

    const clients = await updateClientUseCase.execute({
      id,
      name,
      cpf, 
      email
    });

    return response.json(clients);
  }
}