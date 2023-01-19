import { type Request, type Response } from 'express';
import { ListProductByIdUseCase } from './ListProductByIdUseCase';

export class ListProductByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params
        const listProductByIdUseCase = new ListProductByIdUseCase();
        const result = await listProductByIdUseCase.execute(id);

        return response.json(result);
    }
}
