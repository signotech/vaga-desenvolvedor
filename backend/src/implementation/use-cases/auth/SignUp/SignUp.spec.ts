import 'reflect-metadata'
import { AbstractSignUp } from "@domain/use-cases/auth/AbstractSignUp"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { AuthData } from "@domain/entities/AuthData"
import { AppError } from "@presentation/errors/AppError"
import { SignUp } from "."
import { validateToken } from '../../../utils/validate-token'


describe("SignUp", () => {

    let service: AbstractSignUp

    it("should sign up the manager", async () => {

        const expectedManager = {
            login: "fake-login"
        }

        const mockManagerRepository = {
            findByLogin: jest.fn().mockReturnValue(Promise.resolve(undefined)),
            register: jest.fn().mockReturnValue(Promise.resolve(expectedManager))
        }

        service = new SignUp(mockManagerRepository)

        const request = {
            login: "fake-login",
            senha: "123",
            confirmar_senha: "123"
        }

        const result: AuthData = await service.execute(request)


        expect(mockManagerRepository.findByLogin).toBeCalled()
        expect(mockManagerRepository.register).toBeCalled()
        expect(validateToken(result.token)).toBe(true)

    })

    it("should fail due to login already beign registered", async () => {

        const registeredManager = {
            login: "registered-login"
        }

        const mockManagerRepository = {
            findByLogin: jest.fn().mockReturnValue(Promise.resolve(registeredManager))
        }

        //@ts-expect-error defined part of methods
        service = new SignUp(mockManagerRepository)

        const request = {
            login: "registered-login",
            senha: "123",
            confirmar_senha: "123"
        }

        await expect(service.execute(request)).rejects.toBeInstanceOf(AppError)
        expect(mockManagerRepository.findByLogin).toBeCalled()
    })

    it("should fail due to passwords beign different", async () => {
        //@ts-expect-error defined part of methods
        service = new SignUp({})

        const request = {
            login: "fake-login",
            senha: "1234",
            confirmar_senha: "123"
        }

        await expect(service.execute(request)).rejects.toBeInstanceOf(AppError)
    })
})