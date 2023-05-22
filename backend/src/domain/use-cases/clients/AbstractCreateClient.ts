import { CreateClientDTO } from "@domain/dto/clients/CreateClientDTO";
import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";

export abstract class AbstractCreateClient{

    abstract clientRepository:IClientRepository

    abstract execute(data:CreateClientDTO):Promise<Client>

}