import { LinkButton } from "@components/atoms/LinkButton"

export const MainHome = () => {

    return (
        <section className='lg:col-span-10 flex flex-col items-center h-screen justify-center w-10/12 max-w-[700px] mx-auto gap-4'>
            <h1 className='text-xl text-center lg:text-2xl font-semibold'>Bem vindo ao sistema de gerenciamento de compras.</h1>
            <h2 className='text-lg lg:text-xl text-center'>Aqui, você pode cadastrar e gerenciar clientes, produtos e pedidos</h2>
            <div className='flex gap-4 mt-8'>
                <LinkButton text='Clientes' href={'/clients'} />
                <LinkButton text='Produtos' href={'/clients'} />
                <LinkButton text='Pedidos' href={'/clients'} />
            </div>
        </section>



    )

}