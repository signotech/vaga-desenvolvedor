import { ButtonHTMLAttributes } from "react"

type Button = {
    text:string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button:React.FC<Button> = ({text, ...rest}) => {

    return (
        <button className="bg-blue-400 w-full rounded-lg font-semi-bold p-4 text-lg text-white" {...rest}>{text}</button>
    )

}