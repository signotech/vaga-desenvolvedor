import { NextApiRequest, NextApiResponse } from "next";

/**
 * Controller Request Mock for controllers test
 * @author Hernande Monteiro <monteiro1998@live.com>
 *
 * @param {object} args
 * @returns an api request mocked
 */
function mockRequest(args?: object) {
  const req: any = { ...args };
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  req.query = jest.fn().mockReturnValue(req);
  return req;
}

/**
 * Controller Response Mock for controllers test
 * @author Hernande Monteiro <monteiro1998@live.com>
 *
 * @param {object} args
 * @returns an api response mocked
 */
function mockResponse(args?: object) {
  const res: any = { ...args };
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

/**
 * Controller Fake to test controllers handler;
 * @author Hernande Monteiro <monteiro1998@live.com>
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
function controllerToMockTest(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Teste Aqui" });
}

export { mockResponse, mockRequest, controllerToMockTest };