import { SidebarMobile } from "@components/atoms/SidebarMobile"

export const Header = () => {

    return (
        <header className='flex lg:hidden bg-blue-400 justify-between px-6 py-4 items-center text-white'>
            <h1 className='font-semibold'>Dashboard</h1>
            <SidebarMobile />
        </header>

    )

}