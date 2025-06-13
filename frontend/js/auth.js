import { apiRequest } from './api.js';

async function handleLogin(event) {
  event.preventDefault();

  const credentials = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  try {
    const response = await apiRequest('login', 'POST', credentials);

    if (response.token) {
      localStorage.setItem('token', response.token);

      const user = await apiRequest('me', 'GET', null, true);

      if (user && user.user_type !== undefined) {
        localStorage.setItem('user_type', user.user_type);
        localStorage.setItem('user_name', user.name || ''); 
      } else {
        localStorage.setItem('user_type', '');
        localStorage.setItem('user_name', '');
      }

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