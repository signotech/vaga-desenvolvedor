import Head from 'next/head';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { AuthContext } from '../contexts/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.mjs';

import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const signInFormSchema = yup.object().shape({
    username: yup.string().required('Usuário obrigatório'),
    password: yup.string().required('Senha obrigatória'),
});
export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInFormSchema),
    });
    const { signIn } = useContext(AuthContext);

    async function handleSignIn(data) {
        try {
            await signIn(data);
        } catch (err) {
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <Head>
                <title>SignoWeb - Teste01</title>
            </Head>

            <div className='max-w-sm w-full space-y-8'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>SignoWeb - Teste01</h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit(handleSignIn)}>
                    <input type='hidden' name='remember' defaultValue='true' />
                    <div className='rounded-md shadow-sm -space-y-px'>
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
                            <a href='/create' className='font-medium text-indigo-600 hover:text-indigo-500'>Criar conta</a>
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                                <LockClosedIcon className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
                            </span>
                            Entrar
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
