const { ok } = require('../util/http');

class GetAllPedidosController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ queryParams }) {
    const pedidos = await this.useCase.execute(queryParams);
    return ok(pedidos);
  }
}

module.exports = GetAllPedidosController;
