'use client'
import { BUTTON_TYPE, Button } from "@components/atoms/Button"
import { Input } from "@components/atoms/Input"
import { PageTitle } from "@components/atoms/PageTitle"
import { DashboardLayout } from "@components/models/DashboardLayout"
import { DeleteItemAlert } from "@components/molecules/DeleteItemAlert"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@utils/api"
import { useParams } from "next/navigation"
import { CurrencyDollarSimple, IdentificationCard, Package, ShoppingBag } from "phosphor-react"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import { z } from "zod"
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
    titulo: z.string().min(3, "O título é obrigatório"),
    sku: z.string().min(6, "Insira um SKU válido"),
    preco: z.string().min(0),
    estoque: z.number()
})

type FormSchema = z.infer<typeof formSchema>

type Product = {
    id: number
    titulo: string
    estoque: number
    preco: string
    sku: string
}

const Product = () => {

    const params = useParams()
    const [reqError, setReqError] = useState('')
    const [product, setProduct] = useState<Product | null>(null)
    const [notFound, setNotFound] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titulo: "",
            sku: "",
            preco: "",
            estoque: 0
        },
    })

    const getProductData = async () => {
        try {
            const response = await api.get(`/product/${params.id}`)
            setProduct(response.data)
            reset({
                titulo: response.data.titulo,
                sku: response.data.sku,
                preco: response.data.preco,
                estoque: response.data.estoque
            })

        } catch (err) {
            setNotFound(true)
        }
    }

    useEffect(() => {
        getProductData()
    }, [])

    const handleUpdateProduct:SubmitHandler<FormSchema> = async(data) => {
        try{
            await api.put(`/product/${product?.id}`, data)
            toast("Dados atualizados!")
        }catch(err:any){
            setReqError(err.response.data.message)
        }
    }


    return !notFound ? (
        <DashboardLayout>
            <section className="lg:col-span-10 flex flex-col p-4 lg:p-16 gap-8">
                <ToastContainer />
                <PageTitle text={`Informações do produto de id ${params.id}`} />
                <h2 className="text-lg lg:text-xl">Dados cadastrados: </h2>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleUpdateProduct)}>
                    <Input register={register} name="titulo" id="titulo" placeholder="Título" type="text" ><ShoppingBag className="text-gray-500" size={24} /></Input>
                    {errors.titulo?.message ? <span className="text-red-300">{errors.titulo.message}</span> : null}
                    <Input register={register} name="sku" id="sku" type="text" placeholder="SKU" ><IdentificationCard className="text-gray-500" size={24} /></Input>
                    {errors.sku?.message ? <span className="text-red-300">{errors.sku.message}</span> : null}
                    <Input register={register} name="preco" id="preco" type="text" placeholder="Preço" ><CurrencyDollarSimple className="text-gray-500" size={24} /></Input>
                    {errors.preco?.message ? <span className="text-red-300">{errors.preco.message}</span> : null}
                    <Input register={register} name="estoque" id="estoque" type="number" placeholder="Estoque" ><Package className="text-gray-500" size={24} /></Input>
                    {errors.estoque?.message ? <span className="text-red-300">{errors.estoque.message}</span> : null}

                    <div className="flex gap-4 lg:max-w-[400px] mt-4">
                        <DeleteItemAlert endpoint={`/product/${product?.id}`} entityToDelete='produto' id={Number(params.id)} button={<Button type="button" text="Deletar" buttonType={BUTTON_TYPE.RED} />
                        } />
                        <Button text="Salvar" />
                    </div>
                     {reqError !== '' ? <span className="text-red-300">{reqError}</span> : null}

                </form>
            </section>
        </DashboardLayout>
    ) : (
        <DashboardLayout>
            <h1 className="text-2xl mx-auto col-span-10 text-center w-full">Cliente não encontrado!</h1>
        </DashboardLayout>

    )

}

export default Product