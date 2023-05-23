import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { AbstractShowClientById } from "@domain/use-cases/clients/AbstractShowClientById";

export class ShowClientById extends AbstractShowClientById{

    constructor(protected clientRepository:IClientRepository){
        super()
    }

    public async execute(id: number): Promise<Client> {
        const user = this.clientRepository.findById(id)

        if(!user){
            throw new Error('Cliente não encontrado')
        }

        return user
    }

}