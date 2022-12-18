const { created } = require('../util/http');

class CreateProdutoController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ body }) {
    const produto = await this.useCase.execute(body);
    return created(produto);
  }
}

module.exports = CreateProdutoController;
