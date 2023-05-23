import { UpdateClientDTO } from "@domain/dto/clients/UpdateClientDTO";
import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { AbstractUpdateClient } from "@domain/use-cases/clients/AbstractUpdateClient";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateClient extends AbstractUpdateClient{

    constructor(
        @inject("ClientRepository")
        protected clientRepository:IClientRepository
    ){
        super()
    }

    public async execute(data: UpdateClientDTO, id: number): Promise<void> {

        const clientExists = await this.clientRepository.exists(id)

        if(!clientExists){
            throw new AppError("Cliente não encontrado.", 404)
        }

        if(data.email){
            const clientWithEmail = await this.clientRepository.emailIsRegistered(data.email)

            if(clientWithEmail && clientWithEmail?.id !== id){
                throw new AppError("Não é possível utilizar o email de outro cliente.", 422)
            }
        }

        await this.clientRepository.update(data, id)




    }

}