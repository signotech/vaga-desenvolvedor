const { ok } = require('../util/http');

class GetAllClientesController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ queryParams }) {
    const clientes = await this.useCase.execute(queryParams);
    return ok(clientes);
  }
}

module.exports = GetAllClientesController;
