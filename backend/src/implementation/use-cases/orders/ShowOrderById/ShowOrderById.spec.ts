import 'reflect-metadata'
import { AbstractShowOrderById } from "@domain/use-cases/orders/AbstractShowOrderById"
import { ShowOrderById } from "."
import { AppError } from "@presentation/errors/AppError"

describe("ShowOrderById", () => {

    let service: AbstractShowOrderById
    let date:Date

    it("show the order with the informed id and status ABERTO for status equal to 0", async() => {

        date = new Date()

        const orderFound = {
            id:1,
            data: date,
            valor: 10.50,
            status: 0,
            JoinOrdersProducts: [{
                product: {}
            }],
            client: {}  

        }

        const expectedOutput = {
            id:1,
            data: date,
            valor: 10.50,
            status: "ABERTO",
            JoinOrdersProducts: [{
                product: {}
            }],
            client: {}  
        }

        const mockOrderRepository = {
            findById: jest.fn().mockReturnValue(orderFound)
        }

        //@ts-expect-error defined part of methods
        service = new ShowOrderById(mockOrderRepository)

        const result = await service.execute(1)

        expect(result).toStrictEqual(expectedOutput)
        expect(mockOrderRepository.findById).toBeCalled()

    })

    it("show the order with the informed id and status PAGO for status equal to 1", async() => {

        date = new Date()

        const orderFound = {
            id:1,
            data: date,
            valor: 10.50,
            status: 1,
            JoinOrdersProducts: [{
                product: {}
            }],
            client: {}  

        }

        const expectedOutput = {
            id:1,
            data: date,
            valor: 10.50,
            status: "PAGO",
            JoinOrdersProducts: [{
                product: {}
            }],
            client: {}  
        }

        const mockOrderRepository = {
            findById: jest.fn().mockReturnValue(orderFound)
        }

        //@ts-expect-error defined part of methods
        service = new ShowOrderById(mockOrderRepository)

        const result = await service.execute(1)

        expect(result).toStrictEqual(expectedOutput)
        expect(mockOrderRepository.findById).toBeCalled()

    })

    it("show the order with the informed id and status CANCELADO for status equal to 2", async() => {

        date = new Date()

        const orderFound = {
            id:1,
            data: date,
            valor: 10.50,
            status: 2,
            JoinOrdersProducts: [{
                product: {}
            }],
            client: {}  

        }

        const expectedOutput = {
            id:1,
            data: date,
            valor: 10.50,
            status: "CANCELADO",
            JoinOrdersProducts: [{
                product: {}
            }],
            client: {}  
        }

        const mockOrderRepository = {
            findById: jest.fn().mockReturnValue(orderFound)
        }

        //@ts-expect-error defined part of methods
        service = new ShowOrderById(mockOrderRepository)

        const result = await service.execute(1)

        expect(result).toStrictEqual(expectedOutput)
        expect(mockOrderRepository.findById).toBeCalled()

    })


    it("should fail due to not found order", async () => {

        const mockOrderRepository = {
            findById: jest.fn().mockReturnValue(null)
        }

        //@ts-expect-error defined part of methods
        service = new ShowOrderById(mockOrderRepository)

        await expect(service.execute(2)).rejects.toBeInstanceOf(AppError)
        expect(mockOrderRepository.findById).toBeCalled()

    })

})