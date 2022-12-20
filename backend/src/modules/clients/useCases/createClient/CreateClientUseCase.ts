import { prisma } from '../../../../database/prismaClient';
import { someIsEmpty } from '../../../../utils/someIsEmpty';


interface ICreateClient {
  name: string;
  email: string;
  cpf: string;
}

export class CreateClientUseCase {
  async execute({ name,cpf, email }: ICreateClient) {

    const hasFieldEmpty = someIsEmpty([name,cpf, email]);

    if(hasFieldEmpty) {
      throw new Error('Campos obrigatórios foram esquecidos.');
    }

    const emailInUse = await prisma.clients.findFirst({where: {email}});

    if(emailInUse) {
      throw new Error('E-mail já está em uso.');
    }

    const newClient = await prisma.clients.create({
      data: {
        name,
        cpf,
        email
      }
    });

    return newClient;
  }
}