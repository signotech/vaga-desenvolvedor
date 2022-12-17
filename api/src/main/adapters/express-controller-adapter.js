function adaptController(controller) {
  return async (req, res, next) => {
    try {
      const httpResponse = await controller.handle({
        pathParams: req.params,
        queryParams: req.query,
        body: req.body,
      });
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { adaptController };
