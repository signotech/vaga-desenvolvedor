const { ok } = require('../util/http');

class GetAllResourcesController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ queryParams }) {
    const resources = await this.useCase.execute(queryParams);
    return ok(resources);
  }
}

module.exports = GetAllResourcesController;
