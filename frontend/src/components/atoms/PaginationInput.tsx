import { zodResolver } from "@hookform/resolvers/zod"
import { InputHTMLAttributes } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

type PaginationInput = {
    setQuantityFun:(quantity:number) => void
}

const formSchema = z.object({
    quantity: z.number().int().min(1)
})

type FormSchema = z.infer<typeof formSchema>

export const PaginationInput: React.FC<PaginationInput> = ({ setQuantityFun }) => {

    const {register, handleSubmit} = useForm<FormSchema>({
        resolver:zodResolver(formSchema)
    })

    const setQuantity:SubmitHandler<FormSchema> = (data) => {
        setQuantityFun(data.quantity)
    }

    return (
        <form onSubmit={handleSubmit(setQuantity)} className="flex gap-4 flex-col lg:flex-row">
            <div className="flex items-center">
                <span className="bg-gray-300 p-2 rounded-l-lg whitespace-nowrap">Exibir por página:</span>
                <input defaultValue={20} {...register('quantity', {valueAsNumber:true})} name="quantity" type="number" className="outline-none bg-gray-200 p-2 rounded-r-lg " />
            </div>

            <button className="bg-blue-400 hover:bg-blue-500 text-white rounded-lg  px-4 py-2 lg:py-0 transition-colors">Exibir</button>
        </form>
    )

}