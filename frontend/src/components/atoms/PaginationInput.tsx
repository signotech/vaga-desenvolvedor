import { InputHTMLAttributes } from "react"

type PaginationInput = {
    text?:string
} & InputHTMLAttributes<HTMLInputElement>

export const PaginationInput:React.FC<PaginationInput> = ({...rest}) => {

    return (
        <div className="bg-gray-200 p-2 rounded-lg flex gap-2 flex-1 w-full lg:max-w-[200px] items-center">
            <label>Exibir:</label>
            <input defaultValue={20} {...rest} className="flex-1 outline-none bg-transparent" />
        </div>
    )

}