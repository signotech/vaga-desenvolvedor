import { IClientRepository } from "@domain/repositories/IClientRepository";
import { Client } from "@domain/entities/Client";
import { CreateClientDTO } from "@domain/dto/clients/CreateClientDTO";
import { UpdateClientDTO } from "@domain/dto/clients/UpdateClientDTO";
import { PrismaClient } from "@prisma/client";
import { prismClient } from "@infra/db/client";
import { injectable } from "inversify";
import { ShowAllDTO } from "@domain/dto/clients/ShowAllDTO";

@injectable()
export class ClientRepository implements IClientRepository{

    protected clientModel: PrismaClient['client']

    constructor(){
        this.clientModel = prismClient.client
    }

    public async findById(id: number): Promise<Client> {
        const client = await this.clientModel.findFirst({where:{id}})      
        return client!
    }

    public async findAll({skip,take}:ShowAllDTO):Promise<Client[]>{
        const clients = await this.clientModel.findMany({
            skip,
            take
        })
        return clients
    }

    public async exists(id:number):Promise<boolean>{
        const client = await this.clientModel.findFirst({where:{id}})

        return !!client
    }

    public async emailIsRegistered(email: string): Promise<Client | null> {
        const client = await this.clientModel.findFirst({where:{email}})

        return client
    }

    public async create(data:CreateClientDTO):Promise<Client>{
        const client = await this.clientModel.create({data})

        return client
    }

    public async update(data: UpdateClientDTO, id: number): Promise<Client> {
        const client = await this.clientModel.update({where:{id}, data}) 

        return client
    }

    public async delete(id: number): Promise<void> {
        await this.clientModel.delete({where:{id}}) 
    }

    public async deleteAll():Promise<void>{
        await this.clientModel.deleteMany()
    }
    

}