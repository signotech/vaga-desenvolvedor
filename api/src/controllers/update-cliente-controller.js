const { ok } = require('../util/http');

class UpdateClienteController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ pathParams, body }) {
    const cliente = await this.useCase.execute({ ...pathParams, ...body });
    return ok(cliente);
  }
}

module.exports = UpdateClienteController;
