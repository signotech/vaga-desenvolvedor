import { IClientRepository } from "@domain/repositories/IClientRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractDeleteAllClients{

    protected abstract clientRepository:IClientRepository

    abstract execute():Promise<void>

}