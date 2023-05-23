import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";

export abstract class AbstractShowAllClients{

    protected abstract clientRepository:IClientRepository

    abstract execute():Promise<Client[]>

}