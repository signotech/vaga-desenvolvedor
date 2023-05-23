import { IClientRepository } from "@domain/repositories/IClientRepository";

export abstract class AbstractDeleteAllClients{

    protected abstract clientRepository:IClientRepository

    abstract execute():Promise<void>

}