import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";

export abstract class AbstractShowAllClients{

    abstract clientRepository:IClientRepository

    abstract execute():Promise<Client[]>

}