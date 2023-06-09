document.getElementById('loginform').addEventListener('submit', fazerLogin);


function redirecionar() {
  Swal.fire(
    'Tudo certo!',
    'Você será redirecionado em 3 segundos! <br> <br> Seu Token de validação expira em 10 Minutos !',
    'success'
  );

  setTimeout(() => {
    window.location.href = '/frontend/vitrine/index.html';
  }, 3000);
}
function errologin() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Login ou Senha incorretos!',
  })
}


function fazerLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value.trim();

  const dados = {
    email: email,
    senha: senha
  };

  fetch('http://localhost:3333/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
    .then(response => {
      if (response.ok) {
        // Login válido, extrai o token da resposta
        return response.json();
      } else {
        // Login inválido, exibe mensagem de erro
        errologin();
        throw new Error('Erro de login');
      }
    })
    .then(data => {
      // Armazena o token no armazenamento local (localStorage)
      localStorage.setItem('token', data.token);
      // Redireciona para outra página
      redirecionar();

    })
    .catch(error => {
      console.error('Erro na solicitação:', error);
    });
}
