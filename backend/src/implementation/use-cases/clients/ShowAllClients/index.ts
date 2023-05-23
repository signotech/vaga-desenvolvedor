import 'reflect-metadata'
import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { AbstractShowAllClients } from "@domain/use-cases/clients/AbstractShowAllClients";

export class ShowAllClients extends AbstractShowAllClients{

    constructor(protected clientRepository:IClientRepository){
        super()
    }

    public async execute(): Promise<Client[]> {
        const clients = await this.clientRepository.findAll()
        return clients
    }

}