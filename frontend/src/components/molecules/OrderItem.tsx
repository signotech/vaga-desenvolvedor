import { format } from "date-fns"
import Link from "next/link"

type OrderItem = {
    data: {
        id: number
        data: Date
        valor: number
        status: string
        desconto?:number
        client: {
            nome: string
        }
    }
}

export const OrderItem: React.FC<OrderItem> = ({data}) => {
    console.log(data.valor)
    return (
        <Link href={`/orders/${data.id}`} className="flex flex-col lg:grid grid-cols-12 gap-4 rounded-lg bg-gray-200 p-2 cursor-pointer transition-colors hover:bg-gray-300">
            <span className="col-span-2 text-left"><span className="lg:hidden">Id:</span> {data.id}</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">Cliente:</span> {data.client.nome}</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">Data:</span> {format(new Date(data.data), "dd/MM/yyyy")}</span>
            <span className="col-span-2 text-left"><span className="lg:hidden">Valor:</span>R${data.desconto ? Math.round(data.valor * (100 - data.desconto) / 100) : data.valor} </span>
            <span className="col-span-2 text-left"><span className="lg:hidden">Status:</span>{data.status} </span>
        </Link>
    )

}