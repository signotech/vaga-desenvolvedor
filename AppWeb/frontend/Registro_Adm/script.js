document.getElementById('cadastroform').addEventListener('submit', cadastrarAdmin);

function redirecionar() {
  Swal.fire(
    'Cadastro Realizado!',
    'Você será redirecionado em 3 segundos!',
    'success'
  );

  setTimeout(() => {
    window.location.href = '/frontend/index.html';
  }, 3000);
}

async function cadastrarAdmin(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value.trim();
  const confirmarsenha = document.getElementById('confirmarsenha').value.trim();

  const dados = {
    nome: nome,
    email: email,
    senha: senha,
    confirmarsenha: confirmarsenha
  };

  try {
    const response = await fetch('http://localhost:3333/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (response.ok) {
      redirecionar();
    } else {
      const errorData = await response.json();
      let errorMessage = '';
    
      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }
      Swal.fire({
        icon: 'error',
        title: 'Erro ao realizar o cadastro: ',
        text:  errorMessage,
      });
      //console.error('Erro ao cadastrar o cliente:', errorData);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}
