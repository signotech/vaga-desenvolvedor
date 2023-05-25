'use client'
import { BUTTON_TYPE, Button } from "@components/atoms/Button"
import { Input } from "@components/atoms/Input"
import { PageTitle } from "@components/atoms/PageTitle"
import { SelectStatus } from "@components/atoms/SelectStatus"
import { DashboardLayout } from "@components/models/DashboardLayout"
import { ClientItem } from "@components/molecules/ClientItem"
import { DeleteItemAlert } from "@components/molecules/DeleteItemAlert"
import { OrderItem } from "@components/molecules/OrderItem"
import { PurchasedProduct } from "@components/molecules/PurchasedProduct"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@utils/api"
import { useParams } from "next/navigation"
import { Calendar, CurrencyDollarSimple, IdentificationCard, Notebook } from "phosphor-react"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import { z } from "zod"
import 'react-toastify/dist/ReactToastify.css';

type Order = {
    id: number
    data: Date
    valor: number
    status: string
    client: {
        id: number
        nome: string
        cpf: string
        email: string
    }
    JoinOrdersProducts: {
        product: {
            quantidade: number
            product: {
                id: number
                titulo: string
                sku: string
                preco: number
                quantidade: number
            }
        }
    }[]
}

const formSchema = z.object({
    id_cliente: z.number().min(1, "O id é obrigatório"),
    data: z.string(),
    desconto: z.number().int().min(0, "Insira um número maior que 0").max(100, "Insira um número menor que 100"),
    status: z.number().int().min(0, "Selecione um status").max(2, "Selecione um status")
})

type FormSchema = z.infer<typeof formSchema>

const Order = () => {

    const params = useParams()

    const [reqError, setReqError] = useState('')
    const [order, setOrder] = useState<Order | undefined>(undefined)
    const [notFound, setNotFound] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id_cliente: 0,
            data: "",
            desconto: 0,
            status: 0
        },
    })

    const getOrderData = async () => {
        try {
            const response = await api.get(`/order/${params.id}`)
            setOrder(response.data)

            const possibleStatus = [
                "ABERTO",
                "PAGO",
                "CANCELADO"
            ]

            reset({
                id_cliente: response.data.id_cliente,
                data: response.data.data,
                desconto: response.data.desconto,
                status: possibleStatus.indexOf(response.data.status)
            })

        } catch (err) {
            setNotFound(true)
        }
    }

    const handleUpdateOrder: SubmitHandler<FormSchema> = async (data) => {
        try {
            await api.put(`/order/${params.id}`, data)
            toast("Pedido atualizado!")
        } catch (err: any) {
            setReqError(err.response.data.message)
        }
    }

    useEffect(() => {
        getOrderData()
    }, [])

    return !notFound ? (
        <DashboardLayout>
            <section className="lg:col-span-10 flex flex-col p-4 lg:p-16 gap-8">
                <ToastContainer />
                <PageTitle text={`Informações do pedido de id ${params.id}`} />
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg lg:text-xl">Dados do pedido:</h2>
                    <span>Produtos comprados:</span>

                    <div className="flex flex-col gap-2">
                        <div className="hidden lg:grid grid-cols-12 gap-4 p-2">
                            <span className="col-span-2">Id</span>
                            <span className="col-span-3">Título</span>
                            <span className="col-span-3">SKU</span>
                            <span className="col-span-2">Preço unitário</span>
                            <span className="col-span-2">Quantidade</span>
                        </div>
                        {order && order.JoinOrdersProducts ? order.JoinOrdersProducts.map(orderProduct => <PurchasedProduct key={orderProduct.product.product.id}
                            titulo={orderProduct.product.product.titulo}
                            sku={orderProduct.product.product.sku}
                            preco={orderProduct.product.product.preco}
                            quantidade={orderProduct.product.quantidade}
                            id={orderProduct.product.product.id} />) : null}
                    </div>

                    <span>Cliente comprador:</span>
                    <div className="flex flex-col gap-2">
                        <div className="hidden lg:grid grid-cols-12 gap-4 p-2">
                            <span className="col-span-3">Id</span>
                            <span className="col-span-3">Nome</span>
                            <span className="col-span-3">Email</span>
                            <span className="col-span-3">CPF</span>
                        </div>

                        {order ? <ClientItem data={order!.client} /> : null}
                    </div>

                </div>
                <h2 className="text-lg lg:text-xl">Dados cadastrados: </h2>
                <form onSubmit={handleSubmit(handleUpdateOrder)} className="flex flex-col gap-2" >
                    <Input register={register} name="id_cliente" id="id_cliente" placeholder="Id do cliente" type="number" ><IdentificationCard className="text-gray-500" size={24} /></Input>
                    {errors.id_cliente?.message ? <span className='text-red-400'>{errors.id_cliente.message}</span> : null}
                    <Input register={register} name="data" id="data" type="date" placeholder="Data" ><Calendar className="text-gray-500" size={24} /></Input>
                    {errors.data?.message ? <span className='text-red-400'>{errors.data.message}</span> : null}
                    <SelectStatus name="status" register={register} />
                    {errors.status?.message ? <span className='text-red-400'>{errors.status.message}</span> : null}
                    <Input register={register} name="desconto" id="desconto" type="number" placeholder="Desconto (em porcentagem)"  ><CurrencyDollarSimple className="text-gray-500" size={24} /></Input>
                    {errors.desconto?.message ? <span className='text-red-400'>{errors.desconto.message}</span> : null}

                    <div className="flex gap-4 max-w-[400px] mt-4">
                        <DeleteItemAlert endpoint={`/order/${params.id}`} entityToDelete='pedido' id={Number(params.id)} button={<Button type="button" text="Deletar" buttonType={BUTTON_TYPE.RED} />
                        } />
                        <Button text="Salvar" />
                    </div>
                    {reqError !== '' ? <span className="text-red-300">{reqError}</span> : null}



                </form>
            </section>
        </DashboardLayout>
    ) : (
        <DashboardLayout>
            <h1 className="text-2xl col-span-10 mx-auto text-center w-full">Pedido não encontrado!</h1>
        </DashboardLayout>
    )

}

export default Order