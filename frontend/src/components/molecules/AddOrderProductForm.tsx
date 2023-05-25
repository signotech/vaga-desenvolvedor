import { AddProductInput } from "@components/atoms/AddProductInput"
import { Button } from "@components/atoms/Button"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { OrderProduct } from "./OrderProduct"

const formOrderProductSchema = z.object({
    id: z.number().min(0, "Insira no mínimo 0.").int("Insira um número inteiro."),
    quantidade: z.number().min(1, "Insira no mínimo um produto.").int("Insira um número inteiro.")
})

type FormOrderProduct = z.infer<typeof formOrderProductSchema>

type OrderProduct = {
    id: number
    quantidade: number
}

type AddOrderProductsForm = {
    orderProducts: OrderProduct[],
    setOrderProducts: any
}

    export const AddOrderProductForm:React.FC<AddOrderProductsForm> = ({orderProducts, setOrderProducts}) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormOrderProduct>({
        resolver: zodResolver(formOrderProductSchema)
    })

    const createOrderProduct: SubmitHandler<FormOrderProduct> = (data, e) => {
        const productAlreadyInsert = orderProducts.find(product => product.id === data.id)
        if(productAlreadyInsert){
            alert("Produto já inserido.")
            return
        }
        setOrderProducts((prevState:OrderProduct[]) => ([...prevState, data])) 
    }

    const remover = (id:number) => {

        const newOrderProducts = orderProducts.filter(product => product.id !== id)
        setOrderProducts(newOrderProducts)

    }

    return (
        <>
            <span>Produtos:</span>
            <form onSubmit={handleSubmit(createOrderProduct)} className="flex gap-4 flex-col lg:flex-row lg:items-start">
                <div className="flex flex-col">
                    <AddProductInput placeholder='Id do produto' register={register} name="id" id="id" type="number" />
                    {errors.id ? <span className="text-red-300">{errors.id.message}</span> : null}
                </div>

                <div className="flex flex-col">
                    <AddProductInput placeholder='Quantidade' register={register} name="quantidade" id="quantidade" type="number" />
                    {errors.quantidade ? <span className="text-red-300">{errors.quantidade.message}</span> : null}
                </div>

                <Button text='adicionar' />
            </form>
            {orderProducts.length > 0 ?
                <div className='grid grid-cols-3'>
                    <span className='col-span-1'>Id</span>
                    <span className='col-span-1'>Quantidade</span>
                </div>
                : null
            }
            <div className="flex flex-col gap-2">
                {orderProducts.map(orderProduct => <OrderProduct remover={remover} key={orderProduct.id} id={orderProduct.id} quantidade={orderProduct.quantidade} />)}
            </div>

        </>

    )

}