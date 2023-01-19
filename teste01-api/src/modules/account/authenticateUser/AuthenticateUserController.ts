import {type Request, type Response} from 'express';
import {AuthenticateUserUseCase} from './AuthenticateUserUseCase';

export class AuthenticateUserController {
	async handle(request: Request, response: Response) {
		const {username, password} = request.body;

		const authenticateUserUseCase = new AuthenticateUserUseCase();
		const result = await authenticateUserUseCase.execute({
			username,
			password,
		});

		return response.json(result);
	}
}
