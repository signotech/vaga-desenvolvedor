import { CreateClientDTO } from "@domain/dto/clients/CreateClientDTO";
import { UpdateClientDTO } from "@domain/dto/clients/UpdateClientDTO";
import { Client } from "@domain/entities/Client";

export interface IClientRepository{
    findById(id:number):Promise<Client | null>
    emailIsRegistered(email:string):Promise<boolean>
    findAll():Promise<Client[]>
    create(data:CreateClientDTO):Promise<Client>
    update(data:UpdateClientDTO, id:number):Promise<Client>
    delete(id:number):Promise<void>
}