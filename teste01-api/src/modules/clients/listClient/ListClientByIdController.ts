import { type Request, type Response } from 'express';
import { ListClientByIdUseCase } from './ListClientByIdUseCase';

export class ListClientByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params
        const listClientByIdUseCase = new ListClientByIdUseCase();
        const result = await listClientByIdUseCase.execute(id);

        return response.json(result);
    }
}
