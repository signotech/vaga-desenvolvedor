'use client'
import { BUTTON_TYPE, Button } from "@components/atoms/Button"
import { Input } from "@components/atoms/Input"
import { PageTitle } from "@components/atoms/PageTitle"
import { DashboardLayout } from "@components/models/DashboardLayout"
import { DeleteItemAlert } from "@components/molecules/DeleteItemAlert"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@utils/api"
import { useParams, useRouter } from "next/navigation"
import { EnvelopeSimple, IdentificationCard, Person } from "phosphor-react"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
    nome: z.string().min(3, "O nome é obrigatório"),
    email: z.string().min(3, "O email é obrigatório").email("Insira um email válido."),
    cpf: z.string().length(11, "Insira um cpf válido")
})

type FormSchema = z.infer<typeof formSchema>

type Client = {
    id: number
    nome: string
    email: string
    cpf: string
}

const Client = () => {

    const params = useParams()

    const [reqError, setReqError] = useState('')
    const [client, setClient] = useState<Client | null>(null)
    const [notFound, setNotFound] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: client?.nome,
            email: client?.email,
            cpf: client?.cpf
        }
    })

    const getClientData = async () => {
        try {
            const response = await api.get(`/client/${params.id}`)
            setClient(response.data)
        } catch (err) {
            setNotFound(true)
        }
    }

    useEffect(() => {
        getClientData()
        reset({
            nome: client?.nome,
            email: client?.email,
            cpf: client?.cpf
        })
    })


    const handleUpdateClient: SubmitHandler<FormSchema> = async (data) => {
        try {
            await api.put(`/client/${params.id}`, data)
            toast("Dados atualizados!")
        } catch (err: any) {
            setReqError(err.response.data.message)
        }
    }

    return !notFound ? (
        <DashboardLayout>
            <section className="lg:col-span-10 flex flex-col p-4 lg:p-16 gap-8">
                <ToastContainer />
                <PageTitle text={`Informações do cliente de id ${params.id}`} />
                <h2 className="text-lg lg:text-xl">Dados cadastrados: </h2>
                <form onSubmit={handleSubmit(handleUpdateClient)} className="flex flex-col gap-2" >
                    <Input register={register} name="nome" id="nome" placeholder="Nome" type="text" ><Person className="text-gray-500" size={24} /></Input>
                    {errors?.nome?.message ? <span className="text-red-300">{errors.nome.message}</span> : null}
                    <Input register={register} name="email" id="email" type="email" placeholder="Email" ><EnvelopeSimple className="text-gray-500" size={24} /></Input>
                    {errors?.email?.message ? <span className="text-red-300">{errors.email.message}</span> : null}
                    <Input register={register} name="cpf" id="cpf" type="text" placeholder="CPF"  ><IdentificationCard className="text-gray-500" size={24} /></Input>
                    {errors?.cpf?.message ? <span className="text-red-300">{errors.cpf.message}</span> : null}
                    <div className="flex gap-4 max-w-[400px] mt-4">
                        <DeleteItemAlert entityToDelete='cliente' endpoint={`/client/${client?.id}`} id={Number(params.id)} button={<Button type="button" text="Deletar" buttonType={BUTTON_TYPE.RED} />
                        } />
                        <Button text="Salvar" />
                    </div>
                    {reqError !== '' ? <span className="text-red-300">{reqError}</span> : null}

                </form>
            </section>
        </DashboardLayout>
    ) : (
        <DashboardLayout>
            <h1 className="text-2xl mx-auto text-center w-full">Cliente não encontrado!</h1>
        </DashboardLayout>
    )

}

export default Client