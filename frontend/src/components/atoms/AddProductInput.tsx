import { InputHTMLAttributes } from "react"

export const AddProductInput:React.FC<InputHTMLAttributes<HTMLInputElement>> = ({...rest}) => {

    return(
        <input {...rest} className="rounded-lg p-2 text-gray-300 bg-gray-200" />
    )

}