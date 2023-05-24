import Link, { LinkProps } from "next/link"

type MobileSidebarButton = {
    text:string
} &  LinkProps

export const MobileSidebarButton:React.FC<MobileSidebarButton> = ({text, ...rest}) => {

    return (
         <Link className='w-full border-b border-black pb-2 hover:bg-gray-300 transition-colors' {...rest}>{text}</Link>
    )

}