import { CreateClientDTO } from "@domain/dto/clients/CreateClientDTO";
import { Client } from "@domain/entities/Client";
import { AbstractCreateClient } from "@domain/use-cases/clients/AbstractCreateClient";
import { ClientRepository } from "@implementation/repositories/ClientRepository";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class CreateClient extends AbstractCreateClient{

    constructor(
        @inject("ClientRepository")
        protected clientRepository:ClientRepository
    ){
        super()
    }

    async execute(data: CreateClientDTO): Promise<Client> {
        const emailIsRegistered = await this.clientRepository.emailIsRegistered(data.email) 

        if(emailIsRegistered){
            throw new AppError('Email já registrado', 422)
        }

        const client = await this.clientRepository.create(data)

        return client
    }

}