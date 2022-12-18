module.exports = {
  ok: (data) => ({
    statusCode: 200,
    body: data,
  }),

  created: (data) => ({
    statusCode: 201,
    body: data,
  }),

  noContent: () => ({
    statusCode: 204,
  }),

  badRequest: (error) => ({
    statusCode: 400,
    body: error,
  }),

  notFound: (error) => ({
    statusCode: 404,
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
