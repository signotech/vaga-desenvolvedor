import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { AbstractShowClientById } from "@domain/use-cases/clients/AbstractShowClientById";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class ShowClientById extends AbstractShowClientById{

    constructor(
        @inject("ClientRepository") protected clientRepository:IClientRepository
        ){
        super()
    }

    public async execute(id: number): Promise<Client> {
        const client = await this.clientRepository.findById(id)

        if(!client){
            throw new AppError('Cliente não encontrado', 404)
        }


        return client
    }

}