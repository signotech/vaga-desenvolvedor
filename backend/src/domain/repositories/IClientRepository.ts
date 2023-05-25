import { ShowAllDTO } from "@domain/dto/ShowAllDTO";
import { CreateClientDTO } from "@domain/dto/clients/CreateClientDTO";
import { UpdateClientDTO } from "@domain/dto/clients/UpdateClientDTO";
import { Client } from "@domain/entities/Client";

export interface IClientRepository{
    findById(id:number):Promise<Client>
    emailIsRegistered(email:string):Promise<Client | null> 
    exists(id:number):Promise<boolean>
    findAll(data:ShowAllDTO):Promise<Client[]>
    create(data:CreateClientDTO):Promise<Client>
    update(data:UpdateClientDTO, id:number):Promise<void>
    delete(id:number):Promise<void>
    deleteAll():Promise<void>
}