import { prisma } from '../../../../database/prismaClient';
import { someIsEmpty } from '../../../../utils/someIsEmpty';


interface IUpdateClient {
  id: string;
  name: string;
  cpf: string;
  email: string;
}


export class UpdateClientUseCase {
  async execute({ id, name, cpf, email }: IUpdateClient) {

    const hasFieldEmpty = someIsEmpty([name, cpf, email]);

    if(hasFieldEmpty) {
      throw new Error('Campos obrigatórios foram esquecidos.');
    }

    const updatedClient = await prisma.clients.update({
      where: {
        id
      },
      data: {
        name,
        cpf,
        email
      }
    });
   
    return updatedClient;
  }
}