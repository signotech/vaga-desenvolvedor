import 'reflect-metadata'
import { Client } from "@domain/entities/Client"
import { AbstractShowAllClients } from "@domain/use-cases/clients/AbstractShowAllClients"
import { ShowAllClients } from "."

describe("ShowAllClients", () => {

    let service:AbstractShowAllClients

    it("should show all clients", async() => {

        const expectedOutput = [
            {
                nome: "fake-name",
                email: "fake@gmail.com",
                cpf:"11122233345"
            }
        ] as Client[]

        const mockClientRepository = {
            findAll: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        }

        //@ts-expect-error defined part of methods
        service = new ShowAllClients(mockClientRepository)

        const request = {
            take:20,
            skip:0
        }

        const result = await service.execute(request)

        expect(mockClientRepository.findAll).toBeCalled()
        expect(result).toStrictEqual(expectedOutput)
    })





})