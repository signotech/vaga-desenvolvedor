// Estrutura comum das páginas autenticadas: menu, rodapé, confirmação, painel de detalhes e notificações.
const Layout = (() => {
  if (!Api.token()) location.replace('/login.html');

  const MENU = [
    { pagina: 'inicio', href: '/index.html', icone: 'home', rotulo: 'Início' },
    { pagina: 'clientes', href: '/pages/clientes.html', icone: 'people', rotulo: 'Clientes' },
    { pagina: 'produtos', href: '/pages/produtos.html', icone: 'inventory_2', rotulo: 'Produtos' },
    { pagina: 'pedidos', href: '/pages/pedidos.html', icone: 'receipt_long', rotulo: 'Pedidos' }
  ];
  const paginaAtual = document.body.dataset.pagina;

  document.body.insertAdjacentHTML('afterbegin', `
    <header class="cabecalho">
      <div class="container">
        <a class="marca" href="/index.html"><img src="/img/logo.png" alt="">Sistema de Pedidos</a>
        <nav class="navegacao" aria-label="Navegação principal">
          ${MENU.map(item => `
            <a href="${item.href}" ${item.pagina === paginaAtual ? 'class="ativo" aria-current="page"' : ''}>
              <span class="material-icons" aria-hidden="true">${item.icone}</span>${item.rotulo}
            </a>`).join('')}
        </nav>
        <div class="usuario">
          <span class="usuario-dados"><strong data-usuario-nome></strong><span data-usuario-email></span></span>
          <button type="button" class="botao-icone" data-sair title="Sair" aria-label="Sair">
            <span class="material-icons" aria-hidden="true">logout</span>
          </button>
        </div>
      </div>
    </header>`);

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="rodape">© 2026 · Sistema de Gerenciamento de Pedidos</footer>

    <div id="modalConfirmacao" class="modal" role="dialog" aria-labelledby="tituloConfirmacao">
      <div class="modal-content">
        <h4 id="tituloConfirmacao">Confirmar exclusão</h4>
        <p data-texto-confirmacao></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="botao botao-secundario modal-close">Cancelar</button>
        <button type="button" class="botao botao-perigo" data-confirmar>
          <span class="material-icons" aria-hidden="true">delete</span>Excluir
        </button>
      </div>
    </div>

    <div class="painel-fundo" data-painel-fundo hidden></div>
    <aside class="painel" role="dialog" aria-modal="true" aria-labelledby="painelTitulo">
      <header class="painel-cabecalho">
        <div><span class="painel-sobretitulo" data-painel-sobretitulo></span><h3 id="painelTitulo"></h3></div>
        <button type="button" class="botao-icone" data-painel-fechar title="Fechar" aria-label="Fechar">
          <span class="material-icons" aria-hidden="true">close</span>
        </button>
      </header>
      <div class="painel-corpo" data-painel-corpo></div>
      <footer class="painel-rodape" data-painel-rodape></footer>
    </aside>`);

  const $ = seletor => document.querySelector(seletor);

  // Usuário logado (lido do payload do JWT)
  let usuario = {};
  try {
    usuario = JSON.parse(atob(Api.token().split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
  } catch { /* token ausente ou malformado: a API redireciona ao login */ }
  $('[data-usuario-nome]').textContent = usuario.nome ?? '';
  $('[data-usuario-email]').textContent = usuario.email ?? '';
  $('[data-sair]').addEventListener('click', Api.sair);

  // Confirmação
  let responder = () => {};
  const modal = M.Modal.init($('#modalConfirmacao'), { onCloseEnd: () => responder(false) });
  $('[data-confirmar]').addEventListener('click', () => {
    responder(true);
    modal.close();
  });

  // Painel lateral de detalhes
  const painel = $('.painel');
  const fundoPainel = $('[data-painel-fundo]');
  let aoFecharPainel = () => {};

  function fecharPainel() {
    if (!painel.classList.contains('aberto')) return;
    painel.classList.remove('aberto');
    fundoPainel.hidden = true;
    aoFecharPainel();
  }

  $('[data-painel-fechar]').addEventListener('click', fecharPainel);
  fundoPainel.addEventListener('click', fecharPainel);
  document.addEventListener('keydown', evento => {
    if (evento.key === 'Escape' && !document.querySelector('.modal.open')) fecharPainel();
  });

  return {
    usuario,

    confirmar(texto) {
      $('[data-texto-confirmacao]').textContent = `${texto} Esta ação não pode ser desfeita.`;
      modal.open();
      return new Promise(resolve => { responder = resolve; });
    },

    notificar(texto, erro = false) {
      M.toast({ html: Dom.escapar(texto), classes: erro ? 'toast-erro' : '', displayLength: erro ? 6000 : 3500 });
    },

    abrirPainel({ sobretitulo, titulo, conteudo, acoes = [], aoFechar = () => {} }) {
      $('[data-painel-sobretitulo]').textContent = sobretitulo;
      $('#painelTitulo').textContent = titulo;
      $('[data-painel-corpo]').replaceChildren(...conteudo);
      $('[data-painel-rodape]').replaceChildren(...acoes);
      aoFecharPainel = aoFechar;
      fundoPainel.hidden = false;
      painel.classList.add('aberto');
      $('[data-painel-fechar]').focus();
    },

    fecharPainel
  };
})();
