// Cliente da API REST: envia o token e redireciona ao login quando a sessão expira.
const Api = {
  token: () => localStorage.getItem('token'),

  async requisitar(metodo, caminho, corpo) {
    const resposta = await fetch(`/api/${caminho}`, {
      method: metodo,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${Api.token()}` },
      body: corpo === undefined ? undefined : JSON.stringify(corpo)
    });
    if (resposta.status === 401 && caminho !== 'auth/login') return Api.sair();

    const dados = resposta.status === 204 ? null : await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(dados?.mensagem || 'Não foi possível concluir a operação.');
    return dados;
  },

  async entrar(email, senha) {
    const { token } = await Api.requisitar('POST', 'auth/login', { email, senha });
    localStorage.setItem('token', token);
  },

  sair() {
    localStorage.removeItem('token');
    location.replace('/login.html');
    return new Promise(() => {}); // interrompe o fluxo enquanto a página troca
  },

  listar: (recurso, parametros = {}) => Api.requisitar('GET', `${recurso}?${new URLSearchParams(parametros)}`),
  buscar: (recurso, id) => Api.requisitar('GET', `${recurso}/${id}`),
  salvar: (recurso, dados, id) => Api.requisitar(id ? 'PUT' : 'POST', id ? `${recurso}/${id}` : recurso, dados),
  excluir: (recurso, id) => Api.requisitar('DELETE', `${recurso}/${id}`),
  excluirVarios: (recurso, ids) => Api.requisitar('DELETE', recurso, { ids }),

  async listarTodos(recurso, parametros = {}) {
    const registros = [];
    for (let pagina = 1, totalPaginas = 1; pagina <= totalPaginas; pagina++) {
      const resposta = await Api.listar(recurso, { ...parametros, pagina, limite: 100 });
      registros.push(...resposta.dados);
      totalPaginas = resposta.totalPaginas;
    }
    return registros;
  }
};
