import 'reflect-metadata'
import { AbstractDeleteProduct } from "@domain/use-cases/products/AbstractDeleteProduct"
import { AppError } from "@presentation/errors/AppError"
import { DeleteProduct } from '.'

describe("DeleteProduct", () => {

    let service: AbstractDeleteProduct

    it("should delete the product with the informed id", async () => {

        const mockProductRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(true)),
            delete: jest.fn().mockReturnValue(Promise.resolve())
        }

        //@ts-expect-error defined part of methods
        service = new DeleteProduct(mockProductRepository)

        await service.execute(1)

        expect(mockProductRepository.delete).toBeCalled()
        expect(mockProductRepository.exists).toBeCalled()

    })

    it("should fail due to not found produt", async () => {

        const mockProductRepository = {
            exists: jest.fn().mockReturnValue(Promise.resolve(false)),
            delete: jest.fn().mockReturnValue(Promise.resolve())
        }

        //@ts-expect-error defined part of methods
        service = new DeleteProduct(mockProductRepository)


        await expect(service.execute(2)).rejects.toBeInstanceOf(AppError)
        expect(mockProductRepository.delete).not.toBeCalled()
        expect(mockProductRepository.exists).toBeCalled()

    })


})