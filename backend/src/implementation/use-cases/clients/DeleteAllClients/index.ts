import { IClientRepository } from "@domain/repositories/IClientRepository";
import { AbstractDeleteAllClients } from "@domain/use-cases/clients/AbstractDeleteAllClients";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteAllClients extends AbstractDeleteAllClients{

    constructor(
        @inject("ClientRepository")
        protected clientRepository:IClientRepository
    ){
        super()
    }

    async execute(): Promise<void> {
       await this.clientRepository.deleteAll() 
    }

}