import { SignUpDTO } from "@domain/dto/auth/SignUpDTO";
import { AuthData } from "@domain/entities/AuthData";
import { IManagerRepository } from "@domain/repositories/IManagerRepository";
import { injectable } from "inversify";

export interface ISignUpRequest{
    login:string
    senha:string
    confirmar_senha:string
}

@injectable()
export abstract class AbstractSignUp{

    protected abstract managerRepository:IManagerRepository

    abstract execute(data:ISignUpRequest):Promise<AuthData>

}