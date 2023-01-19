import { Fragment, useState, useRef, useContext, useEffect } from 'react';
import { Popover, Transition, Dialog } from '@headlessui/react';
import {
    Bars3Icon,
    LifebuoyIcon,
    ExclamationTriangleIcon,
    SignalIcon,
    XMarkIcon,

} from '@heroicons/react/24/outline';
import { AuthContext } from '../../contexts/AuthContext';
import { destroyCookie } from 'nookies';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
const resources = [
    {
        name: 'Clientes',
        description: 'Clientes.',
        href: '/clients',
    },
    {
        name: 'Produtos',
        description: 'Produtos.',
        href: '/products',
    },
    {
        name: 'Pedidos',
        description: 'Pedidos.',
        href: '/orders',
    },
];

export default function Header() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { user } = useContext(AuthContext);

    async function handleSignOut() {
        destroyCookie({}, 'signowebteste01.token');
        router.reload();
    }

    const cancelButtonRef = useRef(null);
    return (
        <>
            <Popover className='relative bg-white' style={{ zIndex: 2 }}>
                <div className='mx-auto max-w-7xl px-4 sm:px-6'>
                    <div className='flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
                        <div className='flex justify-start lg:w-0 lg:flex-1'>
                            <a onClick={() => router.push('/clients')}>
                                <span className='sr-only'>SignoWeb</span>
                                <h1 className='text-lg'>SignoWeb</h1>
                            </a>
                        </div>
                        <div className='-my-2 -mr-2 md:hidden'>
                            <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                                <span className='sr-only'>Open menu</span>
                                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                            </Popover.Button>
                        </div>
                        <Popover.Group as='nav' className='hidden space-x-10 md:flex'>
                            <a href='/clients' className='text-base font-medium text-gray-500 hover:text-gray-900'>
                                Clientes
                            </a>
                            <a href='/products' className='text-base font-medium text-gray-500 hover:text-gray-900'>
                                Produtos
                            </a>
                            <a href='/orders' className='text-base font-medium text-gray-500 hover:text-gray-900'>
                                Pedidos
                            </a>
                        </Popover.Group>
                        <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
                            <a href='#' className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'>
                                {user?.name}
                            </a>
                            <button onClick={() => setOpen(true)} className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700'>
                                Sair do sistema
                            </button>
                        </div>

                    </div>
                </div>

                <Transition
                    as={Fragment}
                    enter='duration-200 ease-out'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='duration-100 ease-in'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                >
                    <Popover.Panel focus className='absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden'>
                        <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                            <div className='px-5 pt-5 pb-6'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <h1 className='text-lg'>SignoWeb</h1>
                                    </div>
                                    <div className='-mr-2'>
                                        <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                                            <span className='sr-only'>Fechar menu</span>
                                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className='mt-6'>
                                    <nav className='grid gap-y-8'>
                                        {resources.map(item => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className='-m-3 flex items-center rounded-md p-3 hover:bg-gray-50'
                                            >
                                                <span className='ml-3 text-base font-medium text-gray-900'>{item.name}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                            <div className='space-y-6 py-6 px-5'>

                                <Flex align='center' justifyContent='center' w='100%'>
                                    <button style={{ width: '100%' }} onClick={() => setOpen(true)} className='items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700'>
                                        Sair do sistema
                                    </button>
                                </Flex>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                    </Transition.Child>

                    <div className='fixed inset-0 z-10 overflow-y-auto'>
                        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                                enterTo='opacity-100 translate-y-0 sm:scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            >
                                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                        <div className='sm:flex sm:items-start'>
                                            <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                                                <ExclamationTriangleIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                                            </div>
                                            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                                <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                                                    Sair do Sistema
                                                </Dialog.Title>
                                                <div className='mt-2'>
                                                    <p className='text-sm text-gray-500'>
                                                        Tem certeza que deseja, sair do sitema?

                                                        ao clicar em sair, você irá sair da sua conta e terá que fazer login de novo para entrar.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                        <button
                                            type='button'
                                            className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                                            onClick={() => handleSignOut()}
                                        >
                                            Sair
                                        </button>
                                        <button
                                            type='button'
                                            className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Fechar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </>
    );
}
