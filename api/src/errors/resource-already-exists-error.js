class ResourceAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ResourceAlreadyExistsError';
  }
}

module.exports = ResourceAlreadyExistsError;
