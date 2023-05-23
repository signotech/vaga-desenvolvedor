import { SignUpDTO } from "@domain/dto/auth/SignUpDTO";
import { AuthData } from "@domain/entities/AuthData";
import { IManagerRepository } from "@domain/repositories/IManagerRepository";
import { AbstractSignUp, ISignUpRequest } from "@domain/use-cases/auth/AbstractSignUp";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";
import { registerToken } from "../../../utils/register-token";

@injectable()
export class SignUp extends AbstractSignUp{

    constructor(
        @inject("ManagerRepository")
        protected managerRepository:IManagerRepository
    ){
        super()
    }

    public async execute(data: ISignUpRequest): Promise<AuthData> {

        if(data.senha !== data.confirmar_senha){
            throw new AppError("As senhas não coincidem.", 422)
        }
       
        const loginIsRegistered = await this.managerRepository.findByLogin(data.login)        

        if(loginIsRegistered){
            throw new AppError("O login já está registrado", 422)
        }

        const manager = await this.managerRepository.register({login:data.login, senha:data.senha})

        const token = registerToken(manager.login)

        return {
            status: "Registrado",
            token
        }

    }

}