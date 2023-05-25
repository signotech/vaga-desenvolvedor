import { InputHTMLAttributes } from "react"

type AddOrderProductInput = {
    register:any
} & InputHTMLAttributes<HTMLInputElement>

export const AddProductInput:React.FC<AddOrderProductInput> = ({register, ...rest}) => {

    return(
        <input {...register(rest.name, {valueAsNumber: true})} {...rest} className="rounded-lg p-2 text-gray-800 bg-gray-200" />
    )

}