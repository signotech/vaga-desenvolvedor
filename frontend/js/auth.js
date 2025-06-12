import { apiRequest } from './api.js';

async function handleLogin(event) {
  event.preventDefault();

  const credentials = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  try {
    console.log("Dados enviados para o login:", credentials);

    const response = await apiRequest('login', 'POST', credentials);
    console.log("Resposta do servidor:", response);
    if (response.token) {
      localStorage.setItem('token', response.token);
      alert('Login realizado com sucesso!');
      window.location.href = '/pages/dashboard.html';
    } else {
      alert('Erro no login: ' + (response.message || 'Verifique suas credenciais.'));
    }
  } catch (err) {
    console.error(err);
    alert('Erro inesperado no login.');
  }
}

document.getElementById('login-form').addEventListener('submit', handleLogin);