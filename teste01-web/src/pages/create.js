import Head from 'next/head';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.mjs';
import { api } from '../services/api';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const createFormSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    username: yup.string().required('Usuário obrigatório'),
    password: yup.string().required('Senha obrigatória'),
});
export default function CreateUser() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(createFormSchema),
    });

    async function handleCreateUser(data) {
        try {
            const r = await api.post('/users', data);
            if (r.data.statusCode == 400) {
                toast.error('Erro ao criar usuário, tente novamente mais tarde.');
                router.push('/');
                return;
            }

            router.push('/');

            toast.success('Usuário criado com sucesso!');
        } catch (err) {
            toast.error('Erro ao criar usuário, tente novamente mais tarde.');
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <Head>
                <title>Criar conta</title>
            </Head>

            <div className='max-w-sm w-full space-y-8'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Criar conta</h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit(handleCreateUser)}>
                    <input type='hidden' name='remember' defaultValue='true' />
                    <div className='rounded-md shadow-sm -space-y-px'>
                        <div>
                            <label htmlFor='username' className='sr-only'>
                                Nome
                            </label>
                            <input
                                {...register('name')}
                                id='name'
                                name='name'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                placeholder='Nome:'
                            />
                        </div>
                        <div>
                            <label htmlFor='username' className='sr-only'>
                                Usuário
                            </label>
                            <input
                                {...register('username')}
                                id='username'
                                name='username'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                placeholder='Nome de usuário:'
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='sr-only'>
                                Senha
                            </label>
                            <input
                                {...register('password')}
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                required
                                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                placeholder='Senha:'
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div />
                        <div className='text-sm'>
                            <a href='/' className='font-medium text-indigo-600 hover:text-indigo-500'>Voltar</a>
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                        >
                            <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                                <PlusIcon className='h-5 w-5 text-green-500 group-hover:text-green-400' aria-hidden='true' />
                            </span>
                            Criar conta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const getServerSideProps = async ctx => {
    const { 'signowebteste01.token': token } = parseCookies(ctx);

    if (token) {
        return {
            redirect: {
                destination: '/clients',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
