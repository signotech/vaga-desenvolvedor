import { BUTTON_TYPE, Button } from "@components/atoms/Button"
import { PageTitle } from "@components/atoms/PageTitle"
import { PaginationInput } from "@components/atoms/PaginationInput"
import { RecentSelect } from "@components/atoms/RecentSelect"
import { SearchInput } from "@components/atoms/SearchInput"
import { ClientItem } from "@components/molecules/ClientItem"
import { CreateClientDialog } from "@components/molecules/CreateClientDialog"
import { DeleteAllAlert } from "@components/molecules/DeleteAllAlert"
import { api } from "@utils/api"
import { CaretLeft, CaretRight } from "phosphor-react"
import { useAppSelector } from "../../hooks/useAppSelector"
import { useCallback, useEffect, useState } from "react"

type Client = {
    id: number
    nome: string
    email: string
    cpf: string
    created_at: Date
}

type Page = {
    id: number
}

export const MainClients = () => {

    const [clients, setClients] = useState<Client[]>([])
    const [page, setPage] = useState(1)
    const [pagesArray, setPagesArray] = useState<Page[]>([])
    const [quantity, setQuantity] = useState(20)
    const [nameFilter, setNameFilter] = useState('')

    const getAllClients = async () => {
        const response = await api.get(`/client?take=${100}&skip=${0}`)
        const numberOfPages = Math.ceil(response.data.length / quantity)
        let newArrayOfPages = []
        for (let i = 0; i < numberOfPages; i++) {
            newArrayOfPages.push({ id: i + 1 })
        }
        setPagesArray(newArrayOfPages)
    }


    const getClientsWithPagination = useCallback(async () => {
        const numToSkip = (page - 1) * quantity
        const response = await api.get(`/client?take=${quantity}&skip=${numToSkip}`)

        setClients(response.data)
    }, [page, quantity])

    useEffect(() => {
        getAllClients()
    }, [quantity])

    useEffect(() => {
        getClientsWithPagination()
    }, [page, quantity, getClientsWithPagination])

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

    const clientsArray = nameFilter !== "" ? clients.filter(client => client.nome.toLowerCase().includes(nameFilter.toLowerCase())) : []


    return (
        <section className="lg:col-span-10 flex flex-col p-4 lg:p-16 gap-12">
            <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
                <PageTitle text="Clientes" />
                <div className="flex gap-4 w-[600px] max-w-full">
                    <DeleteAllAlert refetch={getClientsWithPagination}  endpointApi="/client" button={<Button text="Deletar todos" buttonType={BUTTON_TYPE.RED} />} entityToDelete="clientes" />
                    <CreateClientDialog refetch={getClientsWithPagination} />
                </div>
            </div>
            <div className="w-full flex lg:flex-row flex-col gap-4">
                <SearchInput onChange={e => setNameFilter(e.target.value)} placeholder="Pesquisar por nome..." />
                <PaginationInput setPage={setPage} setQuantityFun={setQuantity} />

            </div>

            <span>Clique no cliente para editar ou deletar.</span>
            <div className="flex-col gap-8">
                <div className="hidden lg:grid grid-cols-12 gap-4 p-2">
                    <span className="col-span-3">Id</span>
                    <span className="col-span-3">Nome</span>
                    <span className="col-span-3">Email</span>
                    <span className="col-span-3">CPF</span>
                </div>

                <div className="flex flex-col gap-2">
                    {nameFilter !== '' ? clientsArray.map(client => <ClientItem key={client.id} data={client} />) : clients.map(client => <ClientItem key={client.id} data={client} />)}
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