import { type Request, type Response } from 'express';
import { ListOrdersUseCase } from './ListOrdersUseCase';

export class ListOrdersController {
    async handle(request: Request, response: Response) {
        const listOrdersUseCase = new ListOrdersUseCase();
        const result = await listOrdersUseCase.execute();

        return response.json(result);
    }
}
