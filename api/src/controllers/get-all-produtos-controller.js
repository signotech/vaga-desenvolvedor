const { ok } = require('../util/http');

class GetAllProdutosController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ queryParams }) {
    const produtos = await this.useCase.execute(queryParams);
    return ok(produtos);
  }
}

module.exports = GetAllProdutosController;
