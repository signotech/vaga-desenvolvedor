import { UpdateClientDTO } from "@domain/dto/clients/UpdateClientDTO";
import { Client } from "@domain/entities/Client";
import { IClientRepository } from "@domain/repositories/IClientRepository";

export abstract class AbstractUpdateClient{

    protected abstract clientRepository:IClientRepository

    abstract execute(data:UpdateClientDTO, id:number):Promise<Client>

}