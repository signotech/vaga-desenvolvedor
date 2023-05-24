import 'reflect-metadata'
import { AbstractShowAllOrders } from "@domain/use-cases/orders/AbstractShowAllOrders"
import { ShowAllOrders } from '.'

describe("ShowAllOrders", () => {
    
    let service:AbstractShowAllOrders
    let date: Date

    it("should show all orders", async() => {

        date = new Date()

        const expectedOutput = [{
            id:1,
            data: date,
            valor: 10.50,
            status: "ABERTO",
            JoinOrdersProducts: [{
                product: {}
            }],
            client: {}  
        }]

        const mockOrderRepository = {
            findAll: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        }

        //@ts-expect-error defined part of methods
        service = new ShowAllOrders(mockOrderRepository)

        const request = {
            take:20,
            skip:0
        }

        const result = await service.execute(request)

        expect(result).toStrictEqual(expectedOutput)
        expect(mockOrderRepository.findAll).toBeCalled()
    })

})