import { IClientRepository } from "@domain/repositories/IClientRepository";

export abstract class AbstractDeleteAllClients{

    abstract clientRepository:IClientRepository

    abstract execute():Promise<void>

}