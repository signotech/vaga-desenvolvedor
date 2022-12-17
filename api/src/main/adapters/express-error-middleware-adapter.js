function adaptErrorMiddleware(errorMiddleware) {
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    const httpResponse = errorMiddleware.handle(err);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
}

module.exports = { adaptErrorMiddleware };
