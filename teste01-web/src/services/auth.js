import { api } from './api';

export async function signInRequest(data) {
    const response = await api.post('/authenticate', {
        username: data.username,
        password: data.password,
    });

    return response;
}

export async function recoverUserInformation() {
    const response = await api.get('/users/profile');
    return {
        user: {
            name: response.data.name,
            username: response.data.username,
        },
    };
}
