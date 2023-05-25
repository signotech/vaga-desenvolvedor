'use client'
import { BUTTON_TYPE, Button } from "@components/atoms/Button"
import { Input } from "@components/atoms/Input"
import { PageTitle } from "@components/atoms/PageTitle"
import { DashboardLayout } from "@components/models/DashboardLayout"
import { DeleteItemAlert } from "@components/molecules/DeleteItemAlert"
import { useParams, useRouter } from "next/navigation"
import { EnvelopeSimple, IdentificationCard, Person } from "phosphor-react"

const Client = () => {

    const params = useParams()

    return (
        <DashboardLayout>
            <section className="lg:col-span-10 flex flex-col p-4 lg:p-16 gap-8">
                <PageTitle text={`Informações do cliente de id ${params.id}`} />
                <h2 className="text-lg lg:text-xl">Dados cadastrados: </h2>
                <form className="flex flex-col gap-2" onSubmit={e => e.preventDefault()}>
                    <Input name="nome" id="nome" placeholder="Nome" defaultValue={"Tomaz Xavier"} type="text" ><Person className="text-gray-500" size={24} /></Input>
                    <Input name="email" id="email" type="email" placeholder="Email" defaultValue={"tomazcx06@gmail.com"} ><EnvelopeSimple className="text-gray-500" size={24} /></Input>
                    <Input name="cpf" id="cpf" type="text" placeholder="CPF" defaultValue={"09290448946"} ><IdentificationCard className="text-gray-500" size={24} /></Input>
                    <div className="flex gap-4 max-w-[400px] mt-4">
                        <DeleteItemAlert entityToDelete='cliente' id={1} button={<Button type="button" text="Deletar" buttonType={BUTTON_TYPE.RED} />
                        } />
                        <Button text="Salvar" />
                    </div>

                </form>
            </section>
        </DashboardLayout>
    )

}

export default Client