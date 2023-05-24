import { InputHTMLAttributes } from "react"

type Input = {
    children: React.ReactNode
} & InputHTMLAttributes<HTMLInputElement>

export const Input:React.FC<Input> = ({children, ...rest}) => {

    return (
        <div className="flex bg-gray-200 rounded-lg p-2 items-center lg:gap-2 w-full">
            {children}
            <input {...rest} className="p-2 flex-1 bg-transparent text-gray-800 outline-none" />
        </div>
    )

}