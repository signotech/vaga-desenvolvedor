import { prisma } from '../../../../database/prismaClient';


export class DeleteClientUseCase {
  async execute( id: string) {

    if (!id) {
      throw new Error('O ID do Cliente precisa ser informado para sua deleção.');
    }

    const client =  await prisma.clients.delete({where: {id}});

    return client;
  }
}
