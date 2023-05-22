import { IClientRepository } from "@domain/repositories/IClientRepository";
import { Sequelize } from "sequelize";
import { Client } from "@domain/entities/Client";
import { CreateClientDTO } from "@domain/dto/clients/CreateClientDTO";
import { UpdateClientDTO } from "@domain/dto/clients/UpdateClientDTO";

export class ClientRepository implements IClientRepository{

    protected clientModel: any

    public async findById(id: number): Promise<Client | null> {
        const client = await this.clientModel.findOne({raw:true,  where:{id}})      
        return client
    }

    public async findAll():Promise<Client[]>{
        const clients = await this.clientModel.findAll({raw:true})
        return clients
    }

    public async emailIsRegistered(email: string): Promise<boolean> {
        const client = await this.clientModel.findOne({raw:true, where:{email}})

        return !!client
    }

    public async create(data:CreateClientDTO):Promise<Client>{
        const client = await this.clientModel.create(data)

        return client
    }

    public async update(data: UpdateClientDTO, id: number): Promise<Client> {
        const client = await this.clientModel.update(data, {where:{id}}) 

        return client
    }

    public async delete(id: number): Promise<void> {
        await this.clientModel.destroy({where:{id}}) 
    }
    

}