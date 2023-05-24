import { SidebarButton } from "@components/atoms/SidebarButton"
import { House, Person, ShoppingBag, ShoppingCartSimple, UserCircle } from "phosphor-react"

export const Sidebar = () => {

    return (
        <aside className='col-span-2 h-screen bg-blue-400 hidden lg:flex flex-col items-center gap-8 text-white pt-12'>
            <div className='flex flex-col items-center gap-4'>
                <UserCircle className='text-white' size={128} />
                <span className='text-2xl font-semibold'>Seja bem vindo!</span>
            </div>
            <div className="flex flex-col w-full">
                <SidebarButton text='Home' href={"/"} icon={<House size={32} className='text-white' />} />
                <SidebarButton text='Clientes' href={"/clients"} icon={<Person size={32} className='text-white' />} />
                <SidebarButton text='Produtos' href={"/products"} icon={<ShoppingBag size={32} className='text-white' />} />
                <SidebarButton text='Pedidos' href={"/orders"} icon={<ShoppingCartSimple size={32} className='text-white' />} />

            </div>
        </aside>

    )

}