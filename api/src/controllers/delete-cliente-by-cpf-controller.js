const { noContent } = require('../util/http');

class DeleteClienteByCpfController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ pathParams }) {
    await this.useCase.execute(pathParams);
    return noContent();
  }
}

module.exports = DeleteClienteByCpfController;
