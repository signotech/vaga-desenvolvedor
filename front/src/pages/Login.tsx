import React, { useState } from 'react';
import LoginInput from '../components/LoginInput';
import '../components/scss/loginInput.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';



interface LoginProps {
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handleUsernameChange = (value: string) => {
        setUsername(value);
    };

    const handleLogin = async () => {
        const options = {
            method: 'POST',
            url: 'http://localhost:3001/auth/login',
            data: { email, password },
        };

        try {
            const response = await axios(options);
            if (response.status === 201) {
                const token = response.data.token
                if (token) {
                    const decodedToken: any = jwt_decode(token);
                    localStorage.setItem('userId', decodedToken.sub)
                }
                setAuthenticated(true);
                localStorage.setItem('token', response.data.token);
                onLoginSuccess();
                navigate('/vagas');
            }
        } catch (error) {
        }
    };

    return (
        <div className="container-login">
            <h2>Login</h2>
            <LoginInput value={email} type="text" onChange={handleUsernameChange} placeholder="Email" />
            <LoginInput value={password} type="password" onChange={handlePasswordChange} placeholder="Senha" />
            <button className="button-login" onClick={handleLogin}>
                Entrar
            </button>
        </div>
    );
};

export default Login;
