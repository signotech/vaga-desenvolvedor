import 'reflect-metadata'
import { Client } from "@domain/entities/Client";
import { AbstractShowClientById } from "@domain/use-cases/clients/AbstractShowClientById";
import { ShowClientById } from ".";
import { AppError } from "@presentation/errors/AppError";

describe("ShowClientById", () => {

    let service:AbstractShowClientById
    let id:number

    it("should show the client with the informed id", async() => {

        id = 1

        const expectedOutput = {
            id,
            nome: "fake-name",
            email: "fake@gmail.com",
            cpf:"11122233345"
        } as Client

        const mockClientRepository = {
            findById: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        }

        //@ts-expect-error defined part of methods
        service = new ShowClientById(mockClientRepository)

        const result = await service.execute(id)

        expect(mockClientRepository.findById).toBeCalled()
        expect(result).toStrictEqual(expectedOutput)
    })

    it('should fail due to not found client', async() => {
        const mockClientRepository = {
            findById: jest.fn().mockReturnValue(Promise.resolve(undefined))
        }

        //@ts-expect-error defined part of methods
        service = new ShowClientById(mockClientRepository)

        await expect(service.execute(0)).rejects.toBeInstanceOf(AppError)

        expect(mockClientRepository.findById).toBeCalled()
    })

})