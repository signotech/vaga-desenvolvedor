const { ok } = require('../util/http');

class UpdateResourceController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ pathParams, body }) {
    const resource = await this.useCase.execute({ ...pathParams, ...body });
    return ok(resource);
  }
}

module.exports = UpdateResourceController;
