import { CreateClientDTO } from "@domain/dto/clients/CreateClientDTO";
import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractCreateClient{

    protected abstract clientRepository:IClientRepository

    abstract execute(data:CreateClientDTO):Promise<Client>

}