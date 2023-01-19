import Head from 'next/head';
import Header from '../../components/header';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Popover, Transition, Dialog } from '@headlessui/react';
import { Input } from '../../components/Input';
import { Box } from '@chakra-ui/react';
import { parseCookies } from 'nookies';
import { getAPIproduct } from '../../services/axios';
import { useRouter } from 'next/router';
import MaterialReactTable from 'material-react-table';
import { api } from '@/services/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.mjs';
import { useForm } from 'react-hook-form';
import {
    IconButton,
    Tooltip,
} from '@mui/material';
import { RiAddLine, RiLink } from 'react-icons/ri';
import { toast } from 'react-toastify';

const createProductFormSchema = yup.object().shape({
    sku_produto: yup.string().required('SKU Produto é obrigatório'),
    titulo_produto: yup.string().required('Titulo é obrigatório'),
    preco: yup.number().typeError('Precisa ser um número').required('Preço é obrigatório'),
    estoque: yup.number().typeError('Precisa ser um número').required('Estoque é obrigatório'),
});
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Products() {
    const router = useRouter();
    const [product, setProdcut] = useState();
    const [products, setProdcuts] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);

    useEffect(() => {
        api.get('/products').then(r => {
            console.log(r?.data);
            setProdcuts(r?.data);
        });
    }, []);

    const { register: registerCreate, handleSubmit: handleSubmitCreate, formState: { errors: errorsCreate } } = useForm({
        resolver: yupResolver(createProductFormSchema),
    });

    const cancelButtonRef = useRef(null);
    const cancelEditButtonRef = useRef(null);
    const cancelCreateButtonRef = useRef(null);

    // Const [data, setData] = useState();

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'id',
                filterVariant: 'text',
            },
            {
                accessorKey: 'sku_produto',
                header: 'SKU Produto',
                filterVariant: 'text',
            },
            {
                accessorKey: 'titulo_produto',
                header: 'Nome',
                filterVariant: 'text',
            },
            {
                accessorKey: 'preco',
                header: 'Preço',
                filterVariant: 'number',
            },
            {
                accessorKey: 'estoque',
                header: 'Estoque',
                filterVariant: 'number',
            },

        ],
        [],
    );

    const data = useMemo(
        () => products,
        [products, product],
    );

    const handleCreateProduct = useCallback(async values => {
        try {
            const r = await api.post('/products/', {
                sku_produto: values?.sku_produto,
                titulo_produto: values?.titulo_produto,
                preco: values?.preco,
                estoque: values?.estoque,
            });
            if (r.data.statusCode == 400) {
                toast.error('Erro ao criar produto, tente novamente mais tarde');
                return;
            }

            api.get('/products').then(r => {
                console.log(r?.data);
                setProdcuts(r?.data);
            });

            toast.success('Produto criado com sucesso!');
            router.push('/products/');
            setOpenCreate(false);
        } catch (err) {
            toast.error('Erro ao criar produto, tente novamente mais tarde');
            setOpenCreate(false);
        }
    }, [product]);

    return (
        <>
            <Head>
                <title>Produtos</title>
            </Head>

            <Header />
            <Popover className='relative bg-white'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6'>
                </div>
            </Popover>
            <Box>
                <div style={{ marginBottom: '18px' }} className='mx-auto max-w-7xl px-4 sm:px-6 overflow-hidden bg-white shadow sm:rounded-lg'>
                    <MaterialReactTable
                        columns={columns}
                        data={data}
                        enableRowActions={true}
                        enableEditing={true}
                        renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Tooltip arrow placement='left' title=''>
                                    <IconButton style={{ color: 'blue' }} onClick={() => router.push(`/products/${row?.getValue('id')}`)}>
                                        <RiLink />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                        enableColumnActions={false}
                        positionActionsColumn='last'
                        localization={{
                            rowsPerPage: 'Linhas por página',
                            filterByColumn: 'Buscar',
                            search: 'Buscar',
                            clearFilter: 'Limpar filtros',
                            clearSearch: 'Limpar busca',
                            showHideSearch: '',
                            showHideFilters: 'Esconder/Mostrar filtros',
                            goToNextPage: 'Próxima página',
                            goToPreviousPage: 'Voltar',
                            goToFirstPage: 'Primeira página',
                            of: 'de',
                            unsorted: '',
                            actions: '',
                            noRecordsToDisplay: 'Nenhum produto encontrado',
                            noResultsFound: 'Nenhum produto encontrado',
                        }}
                        renderTopToolbarCustomActions={() => (
                            <button onClick={() => setOpenCreate(true)} className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700'>
                                Adicionar produto
                            </button>
                        )}
                        enableFullScreenToggle={false}
                        enableDensityToggle={false}
                        enableHiding={false}
                        initialState={{
                            showColumnFilters: true, columnVisibility: {
                                id: false,
                            },
                        }}
                    />
                </div>

            </Box>

            <Transition.Root show={openCreate} as={Fragment}>
                <Dialog as='div' className='relative z-10' initialFocus={cancelCreateButtonRef} onClose={setOpenCreate}>
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
                                    <form onSubmit={handleSubmitCreate(handleCreateProduct)}>
                                        <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                                            <div className='sm:flex sm:items-start'>
                                                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
                                                    <RiAddLine className='h-6 w-6 text-blue-600' aria-hidden='true' />
                                                </div>
                                                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                                    <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                                                        Criar produto
                                                    </Dialog.Title>

                                                    <div className='mt-2'>
                                                        <p className='text-sm text-gray-500'>
                                                            Criar produto
                                                        </p>
                                                    </div>

                                                    <div className='mt-2' style={{ width: '100%' }}>
                                                        <Input
                                                            {...registerCreate('sku_produto')}
                                                            error={errorsCreate?.sku_produto}
                                                            placeholder='SKU Produto:'
                                                            style={{ border: '1px solid', width: '100%', paddingLeft: '8px', paddingRight: '8px', borderRadius: '4px' }}
                                                            name='sku_produto'
                                                            id='sku_produto' />
                                                    </div>

                                                    <div className='mt-2' style={{ width: '100%' }}>
                                                        <Input
                                                            {...registerCreate('titulo_produto')}
                                                            error={errorsCreate?.titulo_produto}
                                                            placeholder='Nome:'
                                                            style={{ border: '1px solid', width: '100%', paddingLeft: '8px', paddingRight: '8px', borderRadius: '4px' }}
                                                            name='titulo_produto'
                                                            id='titulo_produto' />
                                                    </div>

                                                    <div className='mt-2' style={{ width: '100%' }}>
                                                        <Input
                                                            placeholder='Preço:'
                                                            error={errorsCreate?.preco}
                                                            {...registerCreate('preco')}
                                                            style={{ border: '1px solid', width: '100%', paddingLeft: '8px', paddingRight: '8px', borderRadius: '4px' }}
                                                            name='preco'
                                                            type='number'
                                                            min='0.00'
                                                            max='10000.00'
                                                            step='0.01'
                                                            id='preco' />
                                                    </div>
                                                    <div className='mt-2' style={{ width: '100%' }}>
                                                        <Input
                                                            placeholder='Estoque:'
                                                            {...registerCreate('estoque')}
                                                            error={errorsCreate?.estoque}
                                                            style={{ border: '1px solid', width: '100%', paddingLeft: '8px', paddingRight: '8px', borderRadius: '4px' }}
                                                            type='number'
                                                            name='estoque'
                                                            id='estoque' />
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                            <button
                                                type='submit'
                                                className='inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                                            >
                                                Criar
                                            </button>
                                            <button
                                                type='button'
                                                className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                                                onClick={() => setOpenCreate(false)}
                                                ref={cancelCreateButtonRef}
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
