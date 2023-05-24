import className from "classnames"
import { ButtonHTMLAttributes } from "react"

type Button = {
    text:string,
    buttonType?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export enum BUTTON_TYPE {
    DEFAULT ="NORMAL",
    RED = "RED",
    GRAY = "GRAY"
}

export const Button:React.FC<Button> = ({text, buttonType, ...rest}) => {

    return (
        <button className={className("bg-blue-400 w-full rounded-lg font-semi-bold px-4 text-sm lg:text-md py-3 text-white hover:bg-blue-500 transition-colors", {
            "bg-blue-400 hover:bg-blue-500": buttonType === BUTTON_TYPE.DEFAULT || buttonType === undefined,
            "bg-red-400 hover:bg-red-500": buttonType === BUTTON_TYPE.RED,
            "bg-gray-400 hover:bg-gray-500":buttonType === BUTTON_TYPE.GRAY

        })} {...rest}>{text}</button>
    )

}