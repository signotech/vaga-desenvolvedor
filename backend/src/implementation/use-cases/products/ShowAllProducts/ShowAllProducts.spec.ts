import 'reflect-metadata'
import { AbstractShowAllProducts } from "@domain/use-cases/products/AbstractShowAllProducts"
import { ShowAllProducts } from "."
import { Product } from '@domain/entities/Product'
import { Decimal } from '@prisma/client/runtime/binary'

describe("ShowAllProducts", () => {

    let service:AbstractShowAllProducts
    let date:Date

    it("should show all products", async() => {

        date = new Date()

        const expectedOutput = [
            {
                id:1,
                titulo: "fake-titulo",
                sku: "fake-sku",
                preco: new Decimal(10.99),
                estoque: 30,
                created_at: date,
                updated_at: date
            }
        ] as Product[]

        const mockProductRepository = {
            findAll: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        }

        //@ts-expect-error defined part of methods
        service = new ShowAllProducts(mockProductRepository)

        const request = {
            take:20,
            skip:0
        }

        const result = await service.execute(request)

        expect(mockProductRepository.findAll).toBeCalled()
        expect(result).toStrictEqual(expectedOutput)
    })





})