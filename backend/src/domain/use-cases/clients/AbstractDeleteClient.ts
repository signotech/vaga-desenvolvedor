import { IClientRepository } from "@domain/repositories/IClientRepository";

export abstract class AbstractDeleteClient{

    abstract clientRepository:IClientRepository

    abstract execute(id:number):Promise<void>

}