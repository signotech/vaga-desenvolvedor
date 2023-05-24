import Link, { LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"

type SidebarButton = {
    text:string
    icon:React.ReactNode
} & LinkProps

export const SidebarButton:React.FC<SidebarButton> = ({text, icon, ...rest}) => {

    const pathname = usePathname()

    return (
        <Link {...rest} className={`p-4 w-full flex items-center gap-2 justify-start text-white ${pathname === rest.href ? "bg-blue-500" : null} hover:bg-blue-500 transition-colors`}>
            {icon}
            <span className='text-lg font-semibold'>{text}</span>
        </Link>

    )

}