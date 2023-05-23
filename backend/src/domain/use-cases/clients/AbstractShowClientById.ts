import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";
import { injectable } from "inversify";

@injectable()
export abstract class AbstractShowClientById{

    protected abstract clientRepository:IClientRepository

    abstract execute(id:number):Promise<Client>

}