const { ok } = require('../util/http');

class GetProdutoBySkuController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ pathParams }) {
    const produto = await this.useCase.execute(pathParams);
    return ok(produto);
  }
}

module.exports = GetProdutoBySkuController;
