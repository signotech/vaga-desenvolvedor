const { created } = require('../util/http');

class CreateResourceController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle({ body }) {
    const resource = await this.useCase.execute(body);
    return created(resource);
  }
}

module.exports = CreateResourceController;
