const CrudService = require('./CrudService');
const { ErroAplicacao } = require('../errors');
const { STATUS_PEDIDO, TIPOS_DESCONTO } = require('../constants');

// Pedidos "Pago" baixam o estoque; ao editar ou excluir, o estoque é devolvido antes.
class PedidoService extends CrudService {
  constructor({ pedidos, produtos, itens }, opcoes) {
    super(pedidos, opcoes);
    this.produtos = produtos;
    this.itens = itens;
  }

  criar(dados) {
    return this.repository.transacao(async transaction => {
      const itens = await this.prepararItens(dados, [], transaction);
      const pedido = await this.repository.criar(this.cabecalho(dados), { transaction });
      await this.gravarItens(pedido, itens, transaction);
      return this.buscarPorId(pedido.id, { transaction });
    });
  }

  atualizar(id, dados) {
    return this.repository.transacao(async transaction => {
      const pedido = await this.buscarPorId(id, { transaction });
      await this.devolverEstoque(pedido, transaction);
      const itens = await this.prepararItens(dados, pedido.itens, transaction);
      await pedido.update(this.cabecalho(dados), { transaction });
      await this.itens.excluirOnde({ pedido_id: pedido.id }, { transaction });
      await this.gravarItens(pedido, itens, transaction);
      return this.buscarPorId(pedido.id, { transaction });
    });
  }

  // Troca só o status, reaproveitando as regras de estoque do atualizar().
  async alterarStatus(id, status) {
    const { codigo_pedido, cliente_id, data_pedido, tipo_desconto, desconto, itens } = await this.buscarPorId(id);
    return this.atualizar(id, {
      codigo_pedido, cliente_id, data_pedido, tipo_desconto, status,
      desconto: Number(desconto),
      itens: itens.map(({ produto_id, quantidade }) => ({ produto_id, quantidade }))
    });
  }

  async excluir(id, transaction) {
    if (!transaction) return this.repository.transacao(nova => this.excluir(id, nova));
    const pedido = await this.buscarPorId(id, { transaction });
    await this.devolverEstoque(pedido, transaction);
    await pedido.destroy({ transaction });
  }

  cabecalho({ itens, ...dados }) {
    return dados.tipo_desconto === TIPOS_DESCONTO.NENHUM ? { ...dados, desconto: 0 } : dados;
  }

  // Itens que já estavam no pedido mantêm o preço da venda; itens novos usam o preço atual.
  async prepararItens({ itens, tipo_desconto, desconto }, itensAtuais, transaction) {
    const produtos = await this.produtos.buscarPorIds(itens.map(item => item.produto_id), { transaction });
    const precosAnteriores = new Map(itensAtuais.map(item => [item.produto_id, item.preco_unitario]));

    const preparados = itens.map(({ produto_id, quantidade }) => {
      const produto = produtos.find(({ id }) => id === produto_id);
      if (!produto) throw new ErroAplicacao(`Produto #${produto_id} não encontrado.`, 422);
      return { produto_id, quantidade, preco_unitario: Number(precosAnteriores.get(produto_id) ?? produto.preco) };
    });

    const subtotal = preparados.reduce((soma, item) => soma + item.quantidade * item.preco_unitario, 0);
    if (tipo_desconto === TIPOS_DESCONTO.VALOR && desconto > subtotal) {
      throw new ErroAplicacao('O desconto não pode ser maior que o subtotal do pedido.', 422);
    }
    return preparados;
  }

  async gravarItens(pedido, itens, transaction) {
    await this.itens.criarVarios(itens.map(item => ({ ...item, pedido_id: pedido.id })), { transaction });
    if (pedido.status === STATUS_PEDIDO.PAGO) await this.movimentarEstoque(itens, -1, transaction);
  }

  async devolverEstoque(pedido, transaction) {
    if (pedido.status === STATUS_PEDIDO.PAGO) await this.movimentarEstoque(pedido.itens, 1, transaction);
  }

  async movimentarEstoque(itens, sentido, transaction) {
    for (const { produto_id, quantidade } of itens) {
      const produto = await this.produtos.buscarPorId(produto_id, { transaction });
      const estoque = produto.estoque + sentido * quantidade;
      if (estoque < 0) {
        throw new ErroAplicacao(`Estoque insuficiente para "${produto.titulo}" (disponível: ${produto.estoque}).`, 422);
      }
      await produto.update({ estoque }, { transaction });
    }
  }
}

module.exports = PedidoService;
