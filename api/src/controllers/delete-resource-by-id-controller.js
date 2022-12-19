const { noContent } = require('../util/http');

class DeleteResourceByIdController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ pathParams }) {
    await this.useCase.execute(pathParams);
    return noContent();
  }
}

module.exports = DeleteResourceByIdController;
