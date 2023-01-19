import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx) {
    const { 'signowebteste01.token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3000',
    });

    api.interceptors.request.use(config => config);

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    return api;
}
