'use client'
import { BUTTON_TYPE, Button } from "@components/atoms/Button"
import { Input } from "@components/atoms/Input"
import { PageTitle } from "@components/atoms/PageTitle"
import { SelectStatus } from "@components/atoms/SelectStatus"
import { DashboardLayout } from "@components/models/DashboardLayout"
import { DeleteItemAlert } from "@components/molecules/DeleteItemAlert"
import { useParams} from "next/navigation"
import { Calendar, CurrencyDollarSimple, IdentificationCard, Notebook } from "phosphor-react"

const Order = () => {

    const params = useParams()

    return (
        <DashboardLayout>
            <section className="lg:col-span-10 flex flex-col p-4 lg:p-16 gap-8">
                <PageTitle text={`Informações do pedido de id ${params.id}`} />
                <h2 className="text-lg lg:text-xl">Dados cadastrados: </h2>
                <form className="flex flex-col gap-2" onSubmit={e => e.preventDefault()}>
                    <Input name="id_cliente" id="id_cliente" placeholder="Id do cliente" type="number" ><IdentificationCard className="text-gray-500" size={24} /></Input>
                    <Input name="data" id="data" type="date" placeholder="Data" ><Calendar className="text-gray-500" size={24} /></Input>
                    <SelectStatus />
                    <Input name="desconto" id="desconto" type="text" placeholder="Desconto (em porcentagem)" ><CurrencyDollarSimple className="text-gray-500" size={24} /></Input>
                    <div className="flex gap-4 max-w-[400px] mt-4">
                        <DeleteItemAlert entityToDelete='pedido' id={1} button={<Button text="Deletar" buttonType={BUTTON_TYPE.RED} />
                        } />
                        <Button text="Salvar" />
                    </div>


                </form>
            </section>
        </DashboardLayout>
    )

}

export default Order