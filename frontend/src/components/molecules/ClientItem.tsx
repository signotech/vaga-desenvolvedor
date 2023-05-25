import Link from "next/link"

type ClientItem = {
    data: {
        id: number
        nome: string
        email: string
        cpf: string
    }
}

export const ClientItem:React.FC<ClientItem> = ({data}) => {

    return (
        <Link href={`/clients/${data.id}`} className="flex flex-col lg:grid grid-cols-12 gap-4 rounded-lg bg-gray-200 p-2 cursor-pointer transition-colors hover:bg-gray-300">
            <span className="col-span-3 text-left"><span className="lg:hidden">Id:</span> {data.id}</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">Nome:</span> {data.nome}</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">Email:</span> {data.email}</span>
            <span className="col-span-3 text-left"><span className="lg:hidden">CPF:</span>{data.cpf}</span>
        </Link>
    )

}