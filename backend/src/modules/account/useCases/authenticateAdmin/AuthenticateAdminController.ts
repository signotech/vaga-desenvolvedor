import { Request, Response } from 'express';

export class AuthenticateAdminController {
  async handle(request: Request, response: Response) {
    const { accessKey } = request.body;

    const isCorrect = accessKey === process.env.ACCESS_KEY;


    if (!isCorrect) {
      return response.status(401).json({
        message: 'Chave de acesso inválida',
        isAuthorized: false,
      });
    }

    response.json({
      message: 'Autorizado',
      isAuthorized: true,
    });
  }
}
