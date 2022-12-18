const { noContent } = require('../util/http');

class DeleteAllProdutosController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle() {
    await this.useCase.execute();
    return noContent();
  }
}

module.exports = DeleteAllProdutosController;
