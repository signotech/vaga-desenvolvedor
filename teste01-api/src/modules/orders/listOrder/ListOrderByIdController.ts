import { type Request, type Response } from 'express';
import { ListOrdeByIdUseCase } from './ListOrdeByIdUseCase';

export class ListOrderByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params
        const listOrdeByIdUseCase = new ListOrdeByIdUseCase();
        const result = await listOrdeByIdUseCase.execute(id);

        return response.json(result);
    }
}
