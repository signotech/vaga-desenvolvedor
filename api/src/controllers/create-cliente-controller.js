const { created } = require('../util/http');

class CreateClienteController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ body }) {
    const cliente = await this.useCase.execute(body);
    return created(cliente);
  }
}

module.exports = CreateClienteController;
