import { type Request, type Response } from 'express';
import { ListProfileUseCase } from './ListProfileUseCase';

export class ListProfileController {
	async handle(request: Request, response: Response) {
		const { id } = request.user;

		const listProfileUseCase = new ListProfileUseCase();
		const result = await listProfileUseCase.execute({ id });

		return response.json(result);
	}
}
