import Link, { LinkProps } from "next/link"

type LinkButton = {
    text:string
} & LinkProps

export const LinkButton:React.FC<LinkButton> = ({text, ...rest}) => {

    return (
        <Link className="bg-blue-400 w-24 lg:w-32 text-center rounded-lg font-semi-bold p-4 lg:text-lg text-white hover:bg-blue-500 transition-colors" {...rest}>{text}</Link>
    )

}