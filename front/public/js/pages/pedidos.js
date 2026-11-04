// Estende o CRUD genérico com itens, desconto, resumo de valores e troca rápida de status.
class PedidoPage extends CrudPage {
  constructor() {
    super({
      recurso: 'pedidos',
      titulo: 'Pedidos',
      singular: 'pedido',
      colunas: [
        { campo: 'id', titulo: 'ID', classe: 'id', formatar: id => `#${id}` },
        { campo: 'codigo_pedido', titulo: 'Código', classe: 'destaque tabular' },
        { campo: 'cliente', titulo: 'Cliente', formatar: cliente => Dom.comAvatar(cliente.nome, Dom.link(cliente.nome, `/pages/clientes.html?id=${cliente.id}`)) },
        { campo: 'data_pedido', titulo: 'Data', classe: 'tabular', formatar: Formatar.data },
        { campo: 'status', titulo: 'Status', formatar: Dom.status },
        { campo: 'desconto', titulo: 'Desconto', numero: true, formatar: (valor, pedido) => Formatar.desconto(pedido) },
        { campo: 'total', titulo: 'Total', numero: true, classe: 'destaque', formatar: Formatar.moeda }
      ],
      detalhe: pedido => this.conteudoDetalhe(pedido)
    });

    this.itens = document.getElementById('itens');
    this.modeloItem = document.getElementById('modeloItem');
    this.produtos = new Map();
    this.clientes = [];
    this.precosVenda = new Map();
    this.reservado = new Map(); // quantidades que voltam ao estoque se o pedido em edição já estava pago

    document.getElementById('adicionarItem').addEventListener('click', () => this.adicionarItem());
    this.itens.addEventListener('click', evento => evento.target.closest('[data-remover]') && this.removerItem(evento.target.closest('.item-pedido')));
    this.itens.addEventListener('change', () => this.bloquearProdutosRepetidos());
    this.form.addEventListener('input', () => this.atualizarResumo());
  }

  async iniciar() {
    try {
      const [clientes] = await Promise.all([Api.listarTodos('clientes', { ordenarPor: 'nome' }), this.carregarProdutos()]);
      this.clientes = clientes;
      this.form.elements.cliente_id.append(...clientes.map(cliente => new Option(`${cliente.nome} (${cliente.email})`, cliente.id)));
      this.exibirFiltroFixo();
    } catch (erro) {
      Layout.notificar(erro.message, true);
    }
    await super.iniciar();
  }

  async carregarProdutos() {
    const produtos = await Api.listarTodos('produtos', { ordenarPor: 'titulo' });
    this.produtos = new Map(produtos.map(produto => [String(produto.id), produto]));
  }

  async aoAlterar() {
    await Promise.all([super.aoAlterar(), this.carregarProdutos()]);
  }

  rotuloFiltro(campo, valor) {
    const cliente = this.clientes.find(({ id }) => String(id) === valor);
    return campo === 'cliente_id' && cliente ? `Cliente: ${cliente.nome}` : super.rotuloFiltro(campo, valor);
  }

  // ---------- Detalhe ----------

  conteudoDetalhe(pedido) {
    const subtotal = Number(pedido.subtotal);
    const outrosStatus = Object.keys(STATUS).filter(status => status !== pedido.status);

    return {
      titulo: `Pedido ${pedido.codigo_pedido}`,
      conteudo: [
        Dom.secao('Resumo', Dom.dados([
          ['Cliente', Dom.link(pedido.cliente.nome, `/pages/clientes.html?id=${pedido.cliente.id}`)],
          ['Data', Formatar.data(pedido.data_pedido)],
          ['Status', Dom.status(pedido.status)],
          ['Atualizado em', Formatar.dataHora(pedido.updatedAt)]
        ])),
        Dom.secao(`Itens (${pedido.itens.length})`, Dom.lista(pedido.itens.map(item => [
          Dom.criar('span', { className: 'principal' },
            Dom.link(item.produto.titulo, `/pages/produtos.html?id=${item.produto_id}`),
            Dom.criar('small', { textContent: `${item.quantidade} × ${Formatar.moeda(item.preco_unitario)}` })),
          Dom.criar('span', { className: 'valor', textContent: Formatar.moeda(item.subtotal) })
        ]), 'Sem itens.')),
        Dom.criar('div', { className: 'totais' },
          Dom.criar('p', {}, 'Subtotal', Dom.criar('strong', { textContent: Formatar.moeda(subtotal) })),
          Dom.criar('p', {}, `Desconto ${pedido.tipo_desconto === 'PERCENTUAL' ? `(${Number(pedido.desconto)}%)` : ''}`,
            Dom.criar('strong', { textContent: `− ${Formatar.moeda(subtotal - pedido.total)}` })),
          Dom.criar('p', {}, 'Total', Dom.criar('span', { textContent: Formatar.moeda(pedido.total) }))),
        Dom.secao('Alterar status', Dom.criar('div', { className: 'acoes-formulario' },
          outrosStatus.map(status => Dom.botao(STATUS[status].icone, ACAO_STATUS[status], () => this.alterarStatus(pedido.id, status), 'botao-secundario botao-pequeno'))))
      ]
    };
  }

  async alterarStatus(id, status) {
    try {
      await Api.requisitar('PATCH', `pedidos/${id}/status`, { status });
      Layout.notificar(`Status alterado para "${status}".`);
      await this.aoAlterar();
      await this.detalhar(id);
    } catch (erro) {
      Layout.notificar(erro.message, true);
    }
  }

  // ---------- Itens do formulário ----------

  adicionarItem(item = {}) {
    const linha = this.modeloItem.content.firstElementChild.cloneNode(true);
    const produto = linha.querySelector('[data-produto]');
    produto.append(...[...this.produtos.values()].map(({ id, titulo }) => new Option(titulo, id)));
    produto.value = item.produto_id ?? '';
    linha.querySelector('[data-quantidade]').value = item.quantidade ?? 1;
    this.itens.append(linha);
    this.bloquearProdutosRepetidos();
    this.atualizarResumo();
  }

  removerItem(linha) {
    if (this.itens.children.length === 1) return Layout.notificar('O pedido deve ter ao menos um produto.', true);
    linha.remove();
    this.bloquearProdutosRepetidos();
    this.atualizarResumo();
  }

  bloquearProdutosRepetidos() {
    const selects = [...this.itens.querySelectorAll('[data-produto]')];
    const usados = selects.map(select => select.value);
    selects.forEach(select => [...select.options].forEach(opcao => {
      opcao.disabled = opcao.value !== '' && opcao.value !== select.value && usados.includes(opcao.value);
    }));
  }

  // Mesmo critério da API: itens já vendidos mantêm o preço da venda.
  precoDe(produtoId) {
    return Number(this.precosVenda.get(produtoId) ?? this.produtos.get(produtoId)?.preco ?? 0);
  }

  atualizarResumo() {
    const pago = this.form.elements.status.value === 'Pago';
    let subtotal = 0;

    for (const linha of this.itens.children) {
      const produtoId = linha.querySelector('[data-produto]').value;
      const preco = this.precoDe(produtoId);
      const quantidade = Number(linha.querySelector('[data-quantidade]').value) || 0;
      const disponivel = (this.produtos.get(produtoId)?.estoque ?? 0) + (this.reservado.get(produtoId) ?? 0);
      const semEstoque = pago && produtoId !== '' && quantidade > disponivel;

      linha.querySelector('[data-preco]').textContent = Formatar.moeda(preco);
      linha.querySelector('[data-subtotal]').textContent = Formatar.moeda(preco * quantidade);
      linha.classList.toggle('sem-estoque', semEstoque);
      linha.querySelector('[data-aviso]').hidden = !semEstoque;
      linha.querySelector('[data-aviso]').textContent = `Estoque insuficiente: ${disponivel} disponível(is).`;
      subtotal += preco * quantidade;
    }

    const { tipo_desconto: tipo, desconto } = this.form.elements;
    const valor = Math.max(Number(desconto.value) || 0, 0);
    const valorDesconto = { PERCENTUAL: subtotal * Math.min(valor, 100) / 100, VALOR: Math.min(valor, subtotal) }[tipo.value] ?? 0;
    desconto.closest('.campo').hidden = tipo.value === 'NENHUM';

    document.getElementById('resumoSubtotal').textContent = Formatar.moeda(subtotal);
    document.getElementById('resumoDesconto').textContent = `− ${Formatar.moeda(valorDesconto)}`;
    document.getElementById('resumoTotal').textContent = Formatar.moeda(subtotal - valorDesconto);
  }

  // ---------- Formulário ----------

  lerFormulario() {
    return {
      ...super.lerFormulario(),
      itens: [...this.itens.children].map(linha => ({
        produto_id: Number(linha.querySelector('[data-produto]').value),
        quantidade: Number(linha.querySelector('[data-quantidade]').value)
      }))
    };
  }

  preencherFormulario(pedido) {
    super.preencherFormulario(pedido);
    this.precosVenda = new Map(pedido.itens.map(item => [String(item.produto_id), item.preco_unitario]));
    this.reservado = new Map(pedido.status === 'Pago' ? pedido.itens.map(item => [String(item.produto_id), item.quantidade]) : []);
    this.itens.replaceChildren();
    pedido.itens.forEach(item => this.adicionarItem(item));
  }

  limparFormulario() {
    super.limparFormulario();
    this.precosVenda = new Map();
    this.reservado = new Map();
    this.itens.replaceChildren();
    this.adicionarItem();
  }

  // Novo pedido já vem com a data de hoje e o próximo código.
  async novo() {
    super.novo();
    this.form.elements.data_pedido.value = new Date().toLocaleDateString('sv-SE');
    try {
      const { dados: [ultimo] } = await Api.listar('pedidos', { ordenarPor: 'codigo_pedido', ordem: 'DESC', limite: 1 });
      this.form.elements.codigo_pedido.value = (ultimo?.codigo_pedido ?? 0) + 1;
    } catch { /* o usuário pode informar o código manualmente */ }
  }
}

const ACAO_STATUS = { 'Em Aberto': 'Reabrir', Pago: 'Marcar como pago', Cancelado: 'Cancelar pedido' };

new PedidoPage().iniciar();
