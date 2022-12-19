const { ok } = require('../util/http');

class GetResourceByIdController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ pathParams }) {
    const resource = await this.useCase.execute(pathParams);
    return ok(resource);
  }
}

module.exports = GetResourceByIdController;
