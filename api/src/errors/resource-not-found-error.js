class ResourceNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ResourceNotFoundError';
  }
}

module.exports = ResourceNotFoundError;
