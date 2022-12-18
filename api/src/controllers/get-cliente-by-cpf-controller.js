const { ok } = require('../util/http');

class GetClienteByCpfController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ pathParams }) {
    const cliente = await this.useCase.execute(pathParams);
    return ok(cliente);
  }
}

module.exports = GetClienteByCpfController;
