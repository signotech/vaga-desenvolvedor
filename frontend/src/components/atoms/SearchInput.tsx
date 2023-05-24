import { MagnifyingGlass } from "phosphor-react"
import { InputHTMLAttributes } from "react"

type SearchInput = {
    text?:string
} & InputHTMLAttributes<HTMLInputElement>

export const SearchInput:React.FC<SearchInput> = ({...rest}) => {

    return (
        <div className="bg-gray-200 p-2 rounded-lg flex gap-2 flex-1 w-full items-center">
            <MagnifyingGlass className="text-gray-800" size={24} />
            <input {...rest} className="flex-1 outline-none bg-transparent" />
        </div>
    )

}