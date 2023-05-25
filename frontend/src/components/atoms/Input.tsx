import { InputHTMLAttributes } from "react"
import { RegisterOptions } from "react-hook-form"

type Input = {
    children: React.ReactNode,
    register: any
} & InputHTMLAttributes<HTMLInputElement>

export const Input:React.FC<Input> = ({children,register, ...rest}) => {

    return (
        <div className="flex bg-gray-200 rounded-lg p-2 items-center lg:gap-2 w-full focus-within:outline outline-gray-400">
            {children}
            <input {...register(rest.name, { valueAsNumber: rest.type === "number"})}  {...rest} className="p-2 flex-1 bg-transparent text-gray-800 outline-none foc" />
        </div>
    )

}