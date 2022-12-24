import { Request, Response } from 'express';
import { DeleteClientUseCase } from './DeleteClientUseCase';


export class DeleteClientController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const deleteClientUseCase = new DeleteClientUseCase();

      const client =  await deleteClientUseCase.execute(id);

      return response.json(client);
    } catch (error) {
      throw new Error('Cliente nao existe.');
    }
  }
}
