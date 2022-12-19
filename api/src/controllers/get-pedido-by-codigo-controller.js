const { ok } = require('../util/http');

class GetPedidoByCodigoController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ pathParams }) {
    const pedido = await this.useCase.execute(pathParams);
    return ok(pedido);
  }
}

module.exports = GetPedidoByCodigoController;
