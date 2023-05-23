import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";

export abstract class AbstractShowClientById{

    protected abstract clientRepository:IClientRepository

    abstract execute(id:number):Promise<Client>

}