import { IClientRepository } from "@domain/repositories/IClientRepository";
import { injectable } from "inversify";


@injectable()
export abstract class AbstractDeleteClient{

    protected abstract clientRepository:IClientRepository

    abstract execute(id:number):Promise<void>

}