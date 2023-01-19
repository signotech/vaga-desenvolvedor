import Head from 'next/head';
import Header from '../../components/header';
import { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box } from '@chakra-ui/react';
import { api } from '../../services/api';

import * as yup from 'yup';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.mjs';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { RiEditLine } from 'react-icons/ri';
import { Input } from '../../components/Input';
import { parseCookies } from 'nookies';

const updateClientFormSchema = yup.object().shape({
    nome_cliente: yup.string().required('Nome é obrigatório'),
    email_cliente: yup.string().email('Email inválido').required('Email é obrigatório'),
    cpf_cliente: yup.string().required('CPF é obrigatório'),
});

export default function Client() {
    const router = useRouter();
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const cancelButtonRef = useRef(null);
    const cancelEditButtonRef = useRef(null);

    const { id } = router.query;
    const [client, setClient] = useState();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateClientFormSchema),
    });

    const handleDeleteRow = useCallback(
        async () => {
            const r = await api.delete(`/clients/${id}`);
            if (r.data.statusCode == 400) {
                toast.error('Erro ao deletar cliente, tente novamente mais tarde');
                return;
            }

            toast.success('Cliente excluído com sucesso!');
            router.push('/clients/');
            setOpenDelete(false);
        },
        [],
    );

    const handleUpdateClient = useCallback(async values => {
        try {
            const r = await api.put(`/clients/${id}`, {
                nome_cliente: values?.nome_cliente,
                email_cliente: values?.email_cliente,
                cpf_cliente: values?.cpf_cliente,
            });
            if (r.data.statusCode == 400) {
                toast.error('Erro ao editar cliente, tente novamente mais tarde');
                return;
            }

            api.get(`/clients/${id}`).then(response => {
                setClient(response.data);
            });

            toast.success('Cliente editado com sucesso!');
            setOpenEdit(false);
        } catch (err) {
            toast.error('Erro ao editar cliente, tente novamente mais tarde');
            setOpenEdit(false);
        }
    }, []);

    useEffect(() => {
        api.get(`/clients/${id}`).then(response => {
            setClient(response.data);
        });
    }, [id]);
    return (
        <>
            <Head>
                <title>Cliente</title>
            </Head>

            <Header />
            <Popover className='relative bg-white'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6'>
                </div>
            </Popover>
            <Box>
                <div style={{ marginBottom: '32px' }} className='mx-auto max-w-7xl px-4 sm:px-6 overflow-hidden bg-white shadow sm:rounded-lg'>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className='px-4 py-5 sm:px-6'>
                            <h3 className='text-lg font-medium leading-6 text-gray-900'>Nome: {client?.nome_cliente}</h3>
                        </div>
                        <div style={{ display: 'flex' }} className='px-4 py-8 sm:px-6'>
                            <button onClick={() => setOpenEdit(true)} className='bg-indigo-600 rounded-md mx-2 px-4' >
                                <span style={{ fontWeight: 600, fontSize: 14, color: 'white' }}>Editar</span>
                            </button>
                            <button style={{ padding: '20px' }} onClick={() => setOpenDelete(true)} className='bg-red-600 rounded-md px-4' >
                                <span style={{ fontWeight: 600, fontSize: 14, color: 'white' }}>Excluir</span>
                            </button>

                        </div>

                    </div>

                    <div className='border-t border-gray-200 py-4'>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 className='px-4 py-2 text-md font-medium text-gray-900'>Cliente: </h3>
                            </div>

                        </div>

                        <div className='border-t border-gray-200 py-4'>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <dl style={{ width: '100%' }}>
                                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className='text-sm font-medium text-gray-500'>Nome</dt>
                                        <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                                            {
                                                client?.nome_cliente
                                            }
                                        </dd>
                                    </div>
                                    <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <dt className='text-sm font-medium text-gray-500'>Email</dt>
                                        </div>
                                        <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{
                                            client?.email_cliente
                                        }</dd>
                                    </div>
                                    <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                                        <dt className='text-sm font-medium text-gray-500'>CPF</dt>
                                        <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                                            {client?.cpf_cliente}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

            </Box>

            <Transition.Root show={openDelete} as={Fragment}>
                <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpenDelete}>
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
                                                <TrashIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                                            </div>
                                            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                                <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                                                    Excluir Cliente: {client?.nome_cliente}
                                                </Dialog.Title>
                                                <div className='mt-2'>
                                                    <p className='text-sm text-gray-500'>
                                                        Tem certeza que deseja excluir este cliente?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                        <button
                                            type='button'
                                            className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                                            onClick={handleDeleteRow}
                                        >
                                            Excluir
                                        </button>
                                        <button
                                            type='button'
                                            className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                                            onClick={() => setOpenDelete(false)}
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

            <Transition.Root show={openEdit} as={Fragment}>
                <Dialog as='div' className='relative z-10' initialFocus={cancelEditButtonRef} onClose={setOpenEdit}>
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
                                    <form onSubmit={handleSubmit(handleUpdateClient)}>
                                        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                            <div className='sm:flex sm:items-start'>
                                                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
                                                    <RiEditLine className='h-6 w-6 text-blue-600' aria-hidden='true' />
                                                </div>
                                                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                                    <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                                                        Editar Cliente: {client?.nome_cliente}
                                                    </Dialog.Title>

                                                    <div className='mt-2'>
                                                        <p className='text-sm text-gray-500'>
                                                            Editar Cliente
                                                        </p>
                                                    </div>

                                                    <div className='mt-2' style={{ width: '100%' }}>
                                                        <Input
                                                            {...register('nome_cliente')}
                                                            error={errors?.nome_cliente}
                                                            defaultValue={client?.nome_cliente}
                                                            placeholder='Nome:'
                                                            style={{ border: '1px solid', width: '100%', paddingLeft: '8px', paddingRight: '8px', borderRadius: '4px' }}
                                                            name='nome_cliente'
                                                            id='nome_cliente' />
                                                    </div>

                                                    <div className='mt-2' style={{ width: '100%' }}>
                                                        <Input
                                                            placeholder='Email:'
                                                            error={errors?.email_cliente}
                                                            {...register('email_cliente')}
                                                            defaultValue={client?.email_cliente}
                                                            style={{ border: '1px solid', width: '100%', paddingLeft: '8px', paddingRight: '8px', borderRadius: '4px' }}
                                                            type='email'
                                                            name='email_cliente'
                                                            id='email_cliente' />
                                                    </div>
                                                    <div className='mt-2' style={{ width: '100%' }}>
                                                        <Input
                                                            placeholder='CPF:'
                                                            {...register('cpf_cliente')}
                                                            error={errors?.cpf_cliente}
                                                            defaultValue={client?.cpf_cliente}
                                                            style={{ border: '1px solid', width: '100%', paddingLeft: '8px', paddingRight: '8px', borderRadius: '4px' }}

                                                            type='text'
                                                            name='cpf_cliente'
                                                            id='cpf_cliente' />
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                            <button
                                                type='submit'
                                                className='inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type='button'
                                                className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                                                onClick={() => setOpenEdit(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Fechar
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export const getServerSideProps = async ctx => {
    const { 'signowebteste01.token': token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

