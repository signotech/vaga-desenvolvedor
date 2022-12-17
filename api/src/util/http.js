module.exports = {
  ok: (data) => ({
    statusCode: 200,
    body: data,
  }),

  created: (data) => ({
    statusCode: 201,
    body: data,
  }),

  badRequest: (error) => ({
    statusCode: 400,
    body: error,
  }),

  conflict: (error) => ({
    statusCode: 409,
    body: error,
  }),

  serverError: (error) => ({
    statusCode: 500,
    body: error,
  }),
};
