import { type Request, type Response } from 'express';
import { ListProductsUseCase } from './ListProductsUseCase';

export class ListProductsController {
    async handle(request: Request, response: Response) {
        const listProductsUseCase = new ListProductsUseCase();
        const result = await listProductsUseCase.execute();

        return response.json(result);
    }
}
