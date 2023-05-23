import 'reflect-metadata'
import { AbstractCreateProduct } from "@domain/use-cases/products/AbstractCreateProduct"
import { AppError } from "@presentation/errors/AppError"
import { Decimal } from "@prisma/client/runtime/binary"
import { CreateProduct } from '.'

describe("CreateProduct", () => {

    let service: AbstractCreateProduct
    let date: Date

    it("should create a new product", async () => {
        date = new Date()

        const expectedOutput = {
            id: 1,
            titulo: "fake-titulo",
            sku: "fake-sku",
            preco: new Decimal(10.99),
            estoque: 30,
            created_at: date,
            updated_at: date
        }

        const mockProductRepository = {
            skuIsRegistered: jest.fn().mockReturnValue(Promise.resolve(null)),
            create: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        }

        //@ts-expect-error defined part of methods
        service = new CreateProduct(mockProductRepository)

        const request = {
            titulo: "fake-titulo",
            sku: "fake-sku",
            preco: new Decimal(10.99),
            estoque: 30,
        }

        const product = await service.execute(request)

        expect(mockProductRepository.create).toBeCalled()
        expect(mockProductRepository.skuIsRegistered).toBeCalled()
        expect(product).toStrictEqual(expectedOutput) 

    })

    it("should fail due to already registered sku", async() => {
        const registeredSku = {
            id: 1,
            titulo: "fake-titulo",
            sku: "fake-sku",
            preco: new Decimal(10.99),
            estoque: 30,
            created_at: new Date(),
            updated_at: new Date()
        }

        const mockProductRepository = {
            skuIsRegistered: jest.fn().mockReturnValue(Promise.resolve(registeredSku)),
        }

        //@ts-expect-error defined part of methods
        service = new CreateProduct(mockProductRepository)

        const request = {
            titulo: "fake-titulo-2",
            sku: "fake-sku",
            preco: new Decimal(10.99),
            estoque: 30,
        }

        await expect(service.execute(request)).rejects.toBeInstanceOf(AppError)

    })

})