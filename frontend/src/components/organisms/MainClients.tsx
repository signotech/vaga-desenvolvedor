import { BUTTON_TYPE, Button } from "@components/atoms/Button"
import { PaginationInput } from "@components/atoms/PaginationInput"
import { RecentSelect } from "@components/atoms/RecentSelect"
import { SearchInput } from "@components/atoms/SearchInput"
import { ClientItem } from "@components/molecules/ClientItem"
import { CreateClientDialog } from "@components/molecules/CreateClientDialog"
import { DeleteAllAlert } from "@components/molecules/DeleteAllAlert"
import { CaretLeft, CaretRight } from "phosphor-react"

export const MainClients = () => {

    return (
        <section className="lg:col-span-10 flex flex-col p-4 lg:p-16 gap-12">
            <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
                <h1 className=" text-xl lg:text-2xl text-left w-full">Clientes</h1>
                <div className="flex gap-4 w-[600px] max-w-full">
                    <DeleteAllAlert button={<Button text="Deletar todos" buttonType={BUTTON_TYPE.RED} />} entityToDelete="clientes" />
                    <CreateClientDialog />
                </div>
            </div>
            <div className="w-full flex lg:flex-row flex-col gap-4">
                <RecentSelect />
                <SearchInput placeholder="Pesquisar por nome..." />
                <PaginationInput />
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
                    <ClientItem />
                    <ClientItem />
                    <ClientItem />
                </div>
                <div className="w-full flex items-center justify-center gap-4 mt-12">
                    <CaretLeft className="text-blue-400 cursor-pointer hover:text-blue-500 transition-colors" size={18} />
                    <span className="text-blue-500 cursor-pointer hover:text-blue-500">1</span>
                    <span className="hover:text-blue-500 cursor-pointer transition-colors">2</span>
                    <span className="hover:text-blue-500 cursor-pointer transition-colors">3</span>
                    <CaretRight className="text-blue-400 cursor-pointer hover:text-blue-500 transition-colors" size={18} />

                </div>
            </div>
        </section>

    )

}