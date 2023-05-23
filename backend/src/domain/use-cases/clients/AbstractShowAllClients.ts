import { ShowAllDTO } from "@domain/dto/clients/ShowAllDTO";
import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractShowAllClients{

    protected abstract clientRepository:IClientRepository

    abstract execute(data:ShowAllDTO):Promise<Client[]>

}