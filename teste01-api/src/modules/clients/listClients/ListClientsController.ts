import { type Request, type Response } from 'express';
import { ListClientsUseCase } from './ListClientsUseCase';

export class ListClientsController {
    async handle(request: Request, response: Response) {
        const listClientsUseCase = new ListClientsUseCase();
        const result = await listClientsUseCase.execute();

        return response.json(result);
    }
}
