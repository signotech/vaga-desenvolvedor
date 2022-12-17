function adaptErrorMiddleware(errorMiddleware) {
  return (err, req, res, next) => {
    const httpResponse = errorMiddleware.handle(err);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
}

module.exports = { adaptErrorMiddleware };
