'use client'
import { RecentSelect } from "@components/atoms/RecentSelect";
import { SearchInput } from "@components/atoms/SearchInput";
import { StatusSelect } from "@components/atoms/StatusSelect";
import { DashboardLayout } from "@components/models/DashboardLayout";
import { ProductItem } from "@components/molecules/ProductItem";

export default function Products() {

    return (
        <DashboardLayout>
            <section className="lg:col-span-10 flex flex-col p-8 gap-12">
                <h1 className=" text-xl lg:text-2xl">Produtos</h1>
                <div className="w-full flex lg:flex-row flex-col gap-4">
                    <RecentSelect />
                    <StatusSelect />
                    <SearchInput placeholder="Pesquisar por nome ou por SKU..." />
                </div>
                <div className="flex-col gap-8">
                    <span>Clique em um produto para editá-lo.</span>

                    <div className="grid grid-cols-12 gap-4 p-2">
                        <span className="col-span-2">Id</span>
                        <span className="col-span-3">Títuto</span>
                        <span className="col-span-3">SKU</span>
                        <span className="col-span-2">Estoque</span>
                        <span className="col-span-2">Preço</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <ProductItem />
                    </div>


                </div>

            </section>

        </DashboardLayout>
    )

}