'use client'
import { RecentSelect } from "@components/atoms/RecentSelect";
import { SearchInput } from "@components/atoms/SearchInput";
import { StatusSelect } from "@components/atoms/StatusSelect";
import { DashboardLayout } from "@components/models/DashboardLayout";

export default function Orders(){

    return (
        <DashboardLayout>
            <section className="lg:col-span-10 flex flex-col p-8 gap-12">
                <h1 className=" text-xl lg:text-2xl">Pedidos</h1>
                <div className="w-full flex lg:flex-row flex-col gap-4">
                    <RecentSelect />
                    <StatusSelect />
                    <SearchInput placeholder="Pesquisar por nome do cliente ou título do produto"  />
                </div>
            </section>

        </DashboardLayout>

    )

}