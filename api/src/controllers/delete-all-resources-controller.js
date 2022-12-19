const { noContent } = require('../util/http');

class DeleteAllResourcesController {
  constructor(useCase) {
    this.useCase = useCase;
  }

  async handle() {
    await this.useCase.execute();
    return noContent();
  }
}

module.exports = DeleteAllResourcesController;
