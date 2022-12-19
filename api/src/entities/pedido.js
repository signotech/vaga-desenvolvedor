const ValidationError = require('../errors/validation-error');

const VALID_STATUSES = ['em aberto', 'pago', 'cancelado'];

class Pedido {
  constructor({
    codigoPedido,
    status,
    cliente,
    produtos,
    dataPedido = new Date(),
  }) {
    if (status === undefined) {
      throw new ValidationError('O campo status é obrigatório');
    }
    if (typeof status !== 'string') {
      throw new ValidationError('O campo status deve ser uma string');
    }
    const lowerCasedStatus = status.toLowerCase();
    if (!VALID_STATUSES.includes(lowerCasedStatus)) {
      throw new ValidationError(`O campo status deve ser um dos valores: ${VALID_STATUSES}`);
    }
    if (produtos.length === 0) {
      throw new ValidationError('Um pedido deve possuir pelo menos um produto');
    }
    this.codigoPedido = codigoPedido;
    this.status = lowerCasedStatus;
    this.cliente = cliente;
    this.produtos = produtos;
    this.dataPedido = dataPedido;
  }
}

module.exports = Pedido;
