import { Request, Response } from 'express';
import { CreateClientUseCase } from './CreateClientUseCase';


export class CreateClientController {
  async handle(request: Request, response: Response) {
    const { name, email, cpf } = request.body;

    const createClientUseCase = new CreateClientUseCase();

    const client = await createClientUseCase.execute({
      name,
      email, 
      cpf
    });

    return response.json(client);
  }
}