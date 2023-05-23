import 'reflect-metadata'
import { AbstractUpdateProduct } from "@domain/use-cases/products/AbstractUpdateProduct"
import { Decimal } from "@prisma/client/runtime/binary"
import { AppError } from '@presentation/errors/AppError'
import { UpdateProduct } from '.'

describe("UpdateProduct", () => {

    let service:AbstractUpdateProduct
    let date:Date

    it("should update the product data", async() => {

        date = new Date()

        const mockProductRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            skuIsRegistered: jest.fn().mockReturnValue(null),
            update: jest.fn().mockReturnValue(Promise.resolve())
        }

        //@ts-expect-error defined part of methods
        service = new UpdateProduct(mockProductRepository)

        const request = {
            titulo: "fake-titulo",
            sku: "fake-sku",
            preco: new Decimal(10.99),
            estoque: 30
        }

        await service.execute(request, 1)

        expect(mockProductRepository.exists).toBeCalled()
        expect(mockProductRepository.update).toBeCalled()
        expect(mockProductRepository.skuIsRegistered).toBeCalled()

    })

    it("should fail due to not found product", async() => {
        const mockProductRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false)),
            skuIsRegistered:jest.fn().mockReturnValue(null),
            update: jest.fn().mockReturnValue(Promise.resolve())
        }

        //@ts-expect-error defined part of methods
        service = new UpdateProduct(mockProductRepository)

        const request = {
            titulo: "fake-titulo",
            sku: "fake-sku",
            preco: new Decimal(10.99),
            estoque: 30
        }


        await expect(service.execute(request, 2)).rejects.toBeInstanceOf(AppError)
        expect(mockProductRepository.exists).toBeCalled()
        expect(mockProductRepository.update).not.toBeCalled()

    })

    it("should fail due to sku already registered in another project", async() => {

        const registeredSku = {
            id: 1,
            titulo: "fake-titulo",
            sku: "fake-sku",
            preco: new Decimal(10.99),
            estoque: 30,
            created_at: date,
            updated_at: date
        }

        const mockProductRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            skuIsRegistered:jest.fn().mockReturnValue(registeredSku),
            update: jest.fn().mockReturnValue(Promise.resolve())
        }

        //@ts-expect-error defined part of methods
        service = new UpdateProduct(mockProductRepository)

        const request = {
            titulo: "fake-titulo",
            sku: "fake-sku",
            preco: new Decimal(10.99),
            estoque: 30
        }

        await expect(service.execute(request, 2)).rejects.toBeInstanceOf(AppError)
        expect(mockProductRepository.exists).toBeCalled()
        expect(mockProductRepository.skuIsRegistered).toBeCalled()
        expect(mockProductRepository.update).not.toBeCalled()

    })

})