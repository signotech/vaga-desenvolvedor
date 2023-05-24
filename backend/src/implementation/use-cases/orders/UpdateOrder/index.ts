import { IClientRepository } from "@domain/repositories/IClientRepository";
import { IOrderProductRepository } from "@domain/repositories/IOrderProductRepository";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { IProductRepository } from "@domain/repositories/IProductRepository";
import { AbstractUpdateOrder, IRequestUpdateOrder } from "@domain/use-cases/orders/AbstractUpdateOrder";
import { AppError } from "@presentation/errors/AppError";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateOrder extends AbstractUpdateOrder {

    constructor(
        @inject("OrderRepository")
        protected orderRepository: IOrderRepository,

        @inject("ClientRepository")
        protected clientRepository: IClientRepository,

        @inject("ProductRepository")
        protected productRepository: IProductRepository,

        @inject("OrderProductRepository")
        protected orderProductRepository: IOrderProductRepository
    ) {
        super()
    }

    public async execute(data: IRequestUpdateOrder, id: number): Promise<void> {

        const orderExists = await this.orderRepository.exists(id)

        if (!orderExists) {
            throw new AppError("Pedido não encontrado", 404)
        }

        if (data.id_cliente) {
            const clientExists = await this.clientRepository.exists(data.id_cliente)

            if (!clientExists) {
                throw new AppError("Cliente não encontrado", 404)
            }

        }

        const orderProductsIds: number[] = []

        if (data.ids_produtos) {
            
            for (const product of data.ids_produtos) {

                const productExists = await this.productRepository.exists(product.id)

                if (!productExists) {
                    throw new AppError(`Produto de id ${product.id} não encontrado`, 404)
                }

                const productData = await this.productRepository.findById(product.id)

                if (productData?.estoque! < product.quantidade) {
                    throw new AppError(`O produto com id ${product.id} não possui estoque o suficiente para esse pedido.`, 422)
                }

                const newQuantity = productData?.estoque! - product.quantidade

                await this.productRepository.update({ estoque: newQuantity }, product.id)

                const createdOrderProduct = await this.orderProductRepository.create({ quantidade: product.quantidade, id_produto: product.id })

                orderProductsIds.push(createdOrderProduct.id)
            }

        }

        const updateOrderDTO = {
            ...data,
            ids_produtos: orderProductsIds.length > 0 ? orderProductsIds : undefined 
        }

        await this.orderRepository.update(updateOrderDTO, id)

    }

}