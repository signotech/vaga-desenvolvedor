import Link from "next/link"

export const OrderItem = () => {

    return (
        <Link href={`/orders/${2}`} className="flex flex-col lg:grid grid-cols-12 gap-4 rounded-lg bg-gray-200 p-2 cursor-pointer transition-colors hover:bg-gray-300">
            <span className="col-span-2 text-left"><span className="lg:hidden">Id:</span> 1</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">Cliente:</span> Tomaz Xavier</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">Data:</span> 22/04/2023</span>
            <span className="col-span-2 text-left"><span className="lg:hidden">Valor:</span>R$30,00 </span>
            <span className="col-span-2 text-left"><span className="lg:hidden">Status:</span>ABERTO </span>
        </Link>
    )

}