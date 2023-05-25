'use client'
import { BUTTON_TYPE, Button } from "@components/atoms/Button"
import { Input } from "@components/atoms/Input"
import { PageTitle } from "@components/atoms/PageTitle"
import { DashboardLayout } from "@components/models/DashboardLayout"
import { DeleteItemAlert } from "@components/molecules/DeleteItemAlert"
import { useParams } from "next/navigation"
import { CurrencyDollarSimple, IdentificationCard, Package, ShoppingBag } from "phosphor-react"

const Product = () => {

    const params = useParams()

    return (
        <DashboardLayout>
            <section className="lg:col-span-10 flex flex-col p-4 lg:p-16 gap-8">
                <PageTitle text={`Informações do produto de id ${params.id}`} />
                <h2 className="text-lg lg:text-xl">Dados cadastrados: </h2>
                <form className="flex flex-col gap-2" onSubmit={e => e.preventDefault()}>
                    <Input name="titulo" id="titulo" placeholder="Título" type="text" ><ShoppingBag className="text-gray-500" size={24} /></Input>
                    <Input name="sku" id="sku" type="text" placeholder="SKU" ><IdentificationCard className="text-gray-500" size={24} /></Input>
                    <Input name="preco" id="preco" type="text" placeholder="Preço" ><CurrencyDollarSimple className="text-gray-500" size={24} /></Input>
                    <Input name="estoque" id="estoque" type="text" placeholder="Preço" ><Package className="text-gray-500" size={24} /></Input>

                    <div className="flex gap-4 lg:max-w-[400px] mt-4">
                        <DeleteItemAlert entityToDelete='produto' id={1} button={<Button type="button" text="Deletar" buttonType={BUTTON_TYPE.RED} />
                        } />
                        <Button text="Salvar" />
                    </div>

                </form>
            </section>
        </DashboardLayout>
    )

}

export default Product