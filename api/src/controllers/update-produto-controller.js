const { ok } = require('../util/http');

class UpdateProdutoController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ pathParams, body }) {
    const produto = await this.useCase.execute({ ...pathParams, ...body });
    return ok(produto);
  }
}

module.exports = UpdateProdutoController;
