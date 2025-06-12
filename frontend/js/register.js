import { apiRequest } from './api.js';

async function handleRegister(event) {
  event.preventDefault();

  const user = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    password_confirmation: document.getElementById('password_confirmation').value,
  };

  try {
    const response = await apiRequest('users', 'POST', user);
    if (response.token) {
      localStorage.setItem('token', response.token);
      alert('Cadastro realizado com sucesso!');
      window.location.href = '/pages/dashboard.html';
    } else {
      alert('Erro no cadastro: ' + JSON.stringify(response));
    }
  } catch (err) {
    console.error(err);
    alert('Erro inesperado no cadastro.');
  }
}

document.getElementById('register-form').addEventListener('submit', handleRegister);
