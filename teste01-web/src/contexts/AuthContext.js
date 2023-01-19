import { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

import { recoverUserInformation, signInRequest } from '../services/auth';
import { api } from '../services/api';
import { decode } from 'jsonwebtoken';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const isAuthenticated = Boolean(user);

    useEffect(() => {
        const { 'signowebteste01.token': token } = parseCookies();
        if (token) {
            const { exp } = decode(token);
            if (Date.now() >= exp * 1000) {
                destroyCookie({}, 'signowebteste01.token');
                Router.reload();
            }

            recoverUserInformation().then(response => {
                setUser(response.user);
            });
        }
    }, []);

    async function signIn({ username, password }) {
        const user = await signInRequest({
            username,
            password,
        });

        console.log(user.data);

        if (user.data.statusCode == 400) {
            toast.error('Erro ao fazer login');
            return;
        }

        toast.success('Bem vindo(a) ao SignoWeb-Teste01!');

        await setCookie(undefined, 'signowebteste01.token', user.data.token, {
            maxAge: 60 * 60 * 24 * 1, // 5 days
        });

        api.defaults.headers.Authorization = await `Bearer ${user.data.token}`;

        await setUser({
            name: user.data.user.name,
            username: user.data.user.username,
        });

        Router.reload();
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
