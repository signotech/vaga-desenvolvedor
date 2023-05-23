import { SignUpDTO } from "@domain/dto/auth/SignUpDTO"
import { Manager } from "@domain/entities/Manager"

export interface IManagerRepository{

    findByLogin(login:string):Promise<Manager | null>
    register(data:SignUpDTO):Promise<Manager>

}