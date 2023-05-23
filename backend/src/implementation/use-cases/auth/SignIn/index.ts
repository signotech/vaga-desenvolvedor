import { SignInDTO } from "@domain/dto/auth/SignInDTO";
import { AuthData } from "@domain/entities/AuthData";
import { IManagerRepository } from "@domain/repositories/IManagerRepository";
import { AbstractSignIn } from "@domain/use-cases/auth/AbstractSignIn";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";
import { registerToken } from "../../../utils/register-token";

@injectable()
export class SignIn extends AbstractSignIn {

    constructor(
        @inject("ManagerRepository")
        protected managerRepository: IManagerRepository
    ){
        super()
    }

    public async execute(data: SignInDTO): Promise<AuthData> {
        
        const manager = await this.managerRepository.findByLogin(data.login)

        if(!manager){
            throw new AppError("Credenciais inválidas", 401)
        }

        if(manager.senha !== data.senha ){
            throw new AppError("Credenciais inválidas", 401)
        }

        const token = registerToken(manager.login)

        return {
            status: "Autenticado",
            token
        }

    }

}