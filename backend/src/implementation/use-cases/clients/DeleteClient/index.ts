import { AbstractDeleteClient } from "@domain/use-cases/clients/AbstractDeleteClient";
import { ClientRepository } from "@implementation/repositories/ClientRepository";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteClient extends AbstractDeleteClient{

    constructor(
        @inject("ClientRepository")
        protected clientRepository:ClientRepository
    ){
        super()
    }

    async execute(id: number): Promise<void> { 
        const clientExists = await this.clientRepository.exists(id)        

        if(!clientExists){
            throw new AppError("Cliente não encontrado", 404)
        }

        await this.clientRepository.delete(id)
    }

}