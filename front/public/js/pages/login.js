document.getElementById('formLogin').addEventListener('submit', async evento => {
  evento.preventDefault();
  const { email, senha } = evento.target.elements;
  const mensagem = document.getElementById('loginMensagem');
  mensagem.className = '';
  mensagem.textContent = 'Entrando...';

  try {
    await Api.entrar(email.value.trim(), senha.value);
    location.assign('/');
  } catch (erro) {
    mensagem.className = 'erro';
    mensagem.textContent = erro.message;
  }
});
