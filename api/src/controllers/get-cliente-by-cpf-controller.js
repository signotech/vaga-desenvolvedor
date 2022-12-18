const { ok } = require('../util/http');

class GetClienteByCpfController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ queryParams }) {
    const cliente = await this.useCase.execute(queryParams);
    return ok(cliente);
  }
}

module.exports = GetClienteByCpfController;
