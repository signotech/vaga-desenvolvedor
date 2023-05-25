import { InputHTMLAttributes } from "react"

type PaginationInput = {
    text?:string
} & InputHTMLAttributes<HTMLInputElement>

export const PaginationInput:React.FC<PaginationInput> = ({...rest}) => {

    return (
        <div className="flex flex-1 w-full lg:max-w-[200px] items-center">
            <span className="bg-gray-300 p-2 rounded-l-lg">Exibir:</span>
            <input defaultValue={20} {...rest} className="flex-1 outline-none bg-gray-200 p-2 rounded-r-lg" />
        </div>
    )

}