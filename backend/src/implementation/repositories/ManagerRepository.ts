import { SignUpDTO } from "@domain/dto/auth/SignUpDTO";
import { Manager } from "@domain/entities/Manager";
import { IManagerRepository } from "@domain/repositories/IManagerRepository";
import { prismaClient } from "@infra/db/client";
import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";


@injectable()
export class ManagerRepository implements IManagerRepository {
    protected managerModel: PrismaClient['manager']

    constructor() {
        this.managerModel = prismaClient.manager
    }

    public async findByLogin(login: string): Promise<Manager | null> {
        const manager = await this.managerModel.findFirst({
            where: { login }
        })

        return manager
    }

    public async register(data: SignUpDTO): Promise<Manager> {
        const manager = await this.managerModel.create({
            data
        })

        return manager
    }

}