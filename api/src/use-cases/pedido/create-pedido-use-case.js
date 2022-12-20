const { validateCpfCliente } = require('../../entities/cpf-validator');
const Pedido = require('../../entities/pedido');
const ResourceNotFoundError = require('../../errors/resource-not-found-error');
const ValidationError = require('../../errors/validation-error');

class CreatePedidoUseCase {
  constructor(pedidoRepository, clienteRepository, produtoRepository) {
    this.pedidoRepository = pedidoRepository;
    this.clienteRepository = clienteRepository;
    this.produtoRepository = produtoRepository;
  }

  async execute({
    status,
    cpfCliente,
    skuProdutos,
  }) {
    validateCpfCliente(cpfCliente);
    if (skuProdutos === undefined || skuProdutos === null) {
      throw new ValidationError('O campo skuProdutos é obrigatório');
    }
    if (!Array.isArray(skuProdutos)) {
      throw new ValidationError('O campo skuProdutos deve ser um array');
    }

    const cliente = await this.clienteRepository.getByCpf(cpfCliente);
    if (cliente === null) {
      throw new ResourceNotFoundError('Não foi encontrado um cliente com o CPF informado');
    }
    const produtos = await this.produtoRepository.getAllBySku(skuProdutos);
    if (skuProdutos.length !== produtos.length) {
      throw new ResourceNotFoundError('Não foi encontrado um produto com um dos SKUs informados');
    }

    const pedido = new Pedido({ status, cliente, produtos });
    const codigoPedido = await this.pedidoRepository.create(pedido);
    pedido.codigoPedido = codigoPedido;
    return pedido;
  }
}

module.exports = CreatePedidoUseCase;
