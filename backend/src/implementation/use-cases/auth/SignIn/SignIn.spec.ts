import 'reflect-metadata'
import 'dotenv/config'
import { AbstractSignIn } from "@domain/use-cases/auth/AbstractSignIn"
import { validateToken } from "../../../utils/validate-token"
import { AppError } from "@presentation/errors/AppError"
import { SignIn } from "."

describe("SignIn", () => {

    let service: AbstractSignIn

    it("should sign in the manager", async () => {

        const manager = {
            login: 'fake-login',
            senha: '123'
        }

        const mockManagerRepository = {
            findByLogin: jest.fn().mockReturnValue(Promise.resolve(manager))
        }

        //@ts-expect-error defined part of methods
        service = new SignIn(mockManagerRepository)

        const request = {
            login: 'fake-login',
            senha: '123'
        }

        const result = await service.execute(request)

        expect(mockManagerRepository.findByLogin).toBeCalled()
        expect(validateToken(result.token)).toBe(true)

    })

    it("should fail due to wrong login", async () => {
        const mockManagerRepository = {
            findByLogin: jest.fn().mockReturnValue(Promise.resolve(null))
        }

        //@ts-expect-error defined part of methods
        service = new SignIn(mockManagerRepository)

        const request = {
            login: 'wrong-login',
            senha: '123'
        }

        await expect(service.execute(request)).rejects.toBeInstanceOf(AppError)
        expect(mockManagerRepository.findByLogin).toBeCalled()

    })

    it("should fail due to wrong password", async () => {
        const manager = {
            login: "fake-login",
            password: "123"
        }

        const mockManagerRepository = {
            findByLogin: jest.fn().mockReturnValue(Promise.resolve(manager))
        }

        //@ts-expect-error defined part of methods
        service = new SignIn(mockManagerRepository)

        const request = {
            login: 'fake-login',
            senha: '1234'
        }

        await expect(service.execute(request)).rejects.toBeInstanceOf(AppError)
        expect(mockManagerRepository.findByLogin).toBeCalled()

    })

})