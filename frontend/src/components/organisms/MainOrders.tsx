import { BUTTON_TYPE, Button } from "@components/atoms/Button"
import { PageTitle } from "@components/atoms/PageTitle"
import { PaginationInput } from "@components/atoms/PaginationInput"
import { RecentSelect } from "@components/atoms/RecentSelect"
import { StatusSelect } from "@components/atoms/StatusSelect"
import { CreateOrderDialog } from "@components/molecules/CreateOrderDialog"
import { DeleteAllAlert } from "@components/molecules/DeleteAllAlert"
import { OrderItem } from "@components/molecules/OrderItem"
import { api } from "@utils/api"
import { CaretLeft, CaretRight } from "phosphor-react"
import { useCallback, useEffect, useState } from "react"

type Order = {
    id: number
    data: Date
    valor: number
    status: string
    client: {
        nome: string
    }
}

type Page = {
    id: number
}

export const MainOrders = () => {

    const [orders, setOrders] = useState<Order[]>([])
    const [page, setPage] = useState(1)
    const [pagesArray, setPagesArray] = useState<Page[]>([])
    const [quantity, setQuantity] = useState(20)
    const [status, setStatus] = useState("")

    const getAllOrders = async () => {
        const response = await api.get(`/order?take=${100}&skip=${0}`)
        const numberOfPages = Math.ceil(response.data.length / quantity)
        let newArrayOfPages = []
        for (let i = 0; i < numberOfPages; i++) {
            newArrayOfPages.push({ id: i + 1 })
        }
        setPagesArray(newArrayOfPages)
    }

    const getOrdersWithPagination = useCallback(async () => {
        const numToSkip = (page - 1) * quantity
        const response = await api.get(`/order?take=${quantity}&skip=${numToSkip}`)
        setOrders(response.data)
    }, [page, quantity])

    useEffect(() => {
        getAllOrders()
    },[quantity])

    useEffect(() => {
        getOrdersWithPagination()
    }, [page, quantity, getOrdersWithPagination])

    const nextPage = () => {
        if (page + 1 <= pagesArray.length) {
            setPage(prevState => prevState + 1)
        }
    }

    const previousPage = () => {
        if (page - 1 >= 1) {
            setPage(prevState => prevState - 1)
        }
    }

    const ordersToRender = status !== "" ? orders.filter(order => order.status.toLocaleLowerCase().includes(status.toLowerCase())) : []

    return (
        <section className="lg:col-span-10 flex flex-col p-4 lg:p-16 gap-12">
            <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
                <PageTitle text="Pedidos" />
                <div className="flex gap-4 w-[600px] max-w-full">
                    <DeleteAllAlert refetch={getOrdersWithPagination} endpointApi="/order" button={<Button text="Deletar todos" buttonType={BUTTON_TYPE.RED} />} entityToDelete="pedidos" />
                    <CreateOrderDialog refetch={getOrdersWithPagination} />
                </div>
            </div>
            <div className="w-full flex lg:flex-row flex-col gap-4">
                <StatusSelect onChange={(e) => setStatus(e.target.value)} />
                <PaginationInput setQuantityFun={setQuantity} setPage={setPage} />
            </div>
            <span>Clique no pedido para editar ou deletar.</span>
            <div className="flex-col gap-8">
                <div className="hidden lg:grid grid-cols-12 gap-4 p-2">
                    <span className="col-span-2">Id</span>
                    <span className="col-span-3">Cliente</span>
                    <span className="col-span-3">Data</span>
                    <span className="col-span-2">Valor</span>
                    <span className="col-span-2">Status</span>
                </div>

                <div className="flex flex-col gap-2">
                    {status !== '' ? ordersToRender.map(order => <OrderItem key={order.id} data={order} />) : orders.map(order => <OrderItem key={order.id} data={order} />)}


                </div>
                <div className="w-full flex items-center justify-center gap-4 mt-12">
                    <CaretLeft size={18} className="text-blue-400 hover:text-blue-500 cursor-pointer transition-colors" onClick={() => previousPage()} />
                    {pagesArray.map(pageToRender => (
                        <span key={pageToRender.id} onClick={() => setPage(pageToRender.id)} className={`${page === pageToRender.id && "text-blue-500"} hover:text-blue-500 cursor-pointer transition-colors`}>{pageToRender.id}</span>

                    ))}
                    <CaretRight size={18} className="text-blue-400 cursor-pointer hover:text-blue-500 transition-colors" onClick={() => nextPage()} />

                </div>
            </div>
        </section>


    )

}