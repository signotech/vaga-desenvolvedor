'use client'
import { RecentSelect } from "@components/atoms/RecentSelect"
import { SearchInput } from "@components/atoms/SearchInput"
import { DashboardLayout } from "@components/models/DashboardLayout"
import { ClientItem } from "@components/molecules/ClientItem"

const Clients = () => {

    return (
        <DashboardLayout>
            <section className="lg:col-span-10 flex flex-col p-8 gap-12">
                <h1 className=" text-xl lg:text-2xl">Clientes</h1>
                <div className="w-full flex lg:flex-row flex-col gap-4">
                    <RecentSelect />
                    <SearchInput placeholder="Pesquisar por nome..." />
                </div>
                <div className="flex-col gap-8">
                    <div className="grid grid-cols-12 gap-4 p-2">
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


                </div>
            </section>
        </DashboardLayout>

    )

}

export default Clients