import 'reflect-metadata'
import { AbstractShowProductById } from "@domain/use-cases/products/AbstractShowProductById"
import { AppError } from "@presentation/errors/AppError"
import { Decimal } from "@prisma/client/runtime/binary"
import { ShowProductById } from '.'

describe("ShowProductById", () => {

    let service: AbstractShowProductById
    let date:Date

    it("should show the product with the informed id", async () => {

        const expectedOutput = {
            id: 1,
            titulo: "fake-titulo",
            sku: "fake-sku",
            preco: new Decimal(10.99),
            estoque: 30,
            created_at:date,
            updated_at:date
        }

        const mockProductRepository = {
            findById: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        }

        //@ts-expect-error defined part of methods
        service = new ShowProductById(mockProductRepository)

        const result = await service.execute(1)

        expect(mockProductRepository.findById).toBeCalled()
        expect(result).toStrictEqual(expectedOutput)

    })

    it("should fail due to not found product", async () => {
        const mockProductRepository = {
            findById: jest.fn().mockReturnValue(Promise.resolve(null))
        }
        //@ts-expect-error defined part of methods
        service = new ShowProductById(mockProductRepository)

        await expect(service.execute(1)).rejects.toBeInstanceOf(AppError)

    })

})