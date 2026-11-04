new CrudPage({
  recurso: 'produtos',
  titulo: 'Produtos',
  singular: 'produto',
  colunas: [
    { campo: 'id', titulo: 'ID', classe: 'id', formatar: id => `#${id}` },
    { campo: 'sku', titulo: 'SKU', classe: 'tabular' },
    { campo: 'titulo', titulo: 'Produto', classe: 'destaque' },
    { campo: 'preco', titulo: 'Preço', numero: true, formatar: Formatar.moeda },
    { campo: 'estoque', titulo: 'Estoque', numero: true, formatar: Dom.estoque }
  ],

  async detalhe(produto) {
    return {
      titulo: produto.titulo,
      conteudo: [
        Dom.secao('Dados do produto', Dom.dados([
          ['SKU', produto.sku],
          ['Preço', Formatar.moeda(produto.preco)],
          ['Estoque', Dom.estoque(produto.estoque)],
          ['Cadastrado em', Formatar.data(produto.createdAt)],
          ['Atualizado em', Formatar.dataHora(produto.updatedAt)]
        ]))
      ]
    };
  }
}).iniciar();
