new CrudPage({
  recurso: 'clientes',
  titulo: 'Clientes',
  singular: 'cliente',
  colunas: [
    { campo: 'id', titulo: 'ID', classe: 'id', formatar: id => `#${id}` },
    { campo: 'nome', titulo: 'Nome', classe: 'destaque', formatar: nome => Dom.comAvatar(nome) },
    { campo: 'cpf', titulo: 'CPF', classe: 'tabular', formatar: Formatar.cpf },
    { campo: 'email', titulo: 'E-mail' }
  ],
  acoes: cliente => [Dom.linkIcone('receipt_long', 'Ver pedidos do cliente', `/pages/pedidos.html?cliente_id=${cliente.id}`)],

  async detalhe(cliente) {
    const pedidos = await Api.listar('pedidos', { cliente_id: cliente.id, ordenarPor: 'data_pedido', ordem: 'DESC', limite: 5 });
    const linkPedidos = `/pages/pedidos.html?cliente_id=${cliente.id}`;

    return {
      titulo: cliente.nome,
      conteudo: [
        Dom.secao('Dados do cliente', Dom.dados([
          ['CPF', Formatar.cpf(cliente.cpf)],
          ['E-mail', cliente.email],
          ['Cliente desde', Formatar.data(cliente.createdAt)]
        ])),
        Dom.secao(`Últimos pedidos (${pedidos.total})`,
          Dom.lista(pedidos.dados.map(pedido => Dom.itemPedido(pedido)), 'Este cliente ainda não fez pedidos.'))
      ],
      acoes: pedidos.total ? [Dom.criar('a', { className: 'botao botao-secundario', href: linkPedidos }, Dom.icone('receipt_long'), 'Todos os pedidos')] : []
    };
  }
}).iniciar();
