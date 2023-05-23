import 'reflect-metadata'
import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { AbstractShowAllClients } from "@domain/use-cases/clients/AbstractShowAllClients";
import { inject, injectable } from 'inversify';
import { ShowAllDTO } from '@domain/dto/ShowAllDTO';

@injectable()
export class ShowAllClients extends AbstractShowAllClients {

    constructor(
        @inject("ClientRepository")
        protected clientRepository: IClientRepository
    ) {
        super()
    }

    public async execute(data:ShowAllDTO): Promise<Client[]> {
        const clients = await this.clientRepository.findAll(data)
        return clients
    }

}