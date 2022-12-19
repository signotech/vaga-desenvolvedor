const { created } = require('../util/http');

class CreatePedidoController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ body }) {
    const pedido = await this.useCase.execute(body);
    return created(pedido);
  }
}

module.exports = CreatePedidoController;
