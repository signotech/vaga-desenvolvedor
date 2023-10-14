import { validateApi } from "@/server/config/validateApi";
import AuthGuardServices from "@/server/services/AuthGuardService";
import { controllerToMockTest, mockRequest, mockResponse } from "../config";
import sinon from "sinon";
import jwt from "jsonwebtoken";

describe("validateApi", () => {
  let req = mockRequest();
  let res = mockResponse();

  beforeEach(() => {
    jest.clearAllMocks();
    res = mockResponse();
    req = mockRequest({
      body: {},
    });
    req.method = "GET";
    sinon.restore();
    sinon.stub(JSON, "parse").resolves({});
  });

  it("validateApi - GET", () => {
    req.method = "GET";
    const validatedApi = validateApi(controllerToMockTest, "GET");
    validatedApi(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe("Teste Aqui");
  });

  it("validateApi - GET - USER", async () => {
    req.method = "GET";
    req.headers = {
      authorization: "token",
    };
    const validatedApi = validateApi(controllerToMockTest, "GET", "USER");
    await validatedApi(req, res);
    sinon.stub(jwt, "verify").resolves({ data: { id: 1 } });

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Token Inválido.");
  });

  it("validateApi - GET - ADMIN", async () => {
    req.method = "GET";
    req.headers = {
      authorization: "token",
    };
    const validatedApi = validateApi(controllerToMockTest, "GET", "ADMIN");
    await validatedApi(req, res);
    sinon.stub(jwt, "verify").resolves({ data: { id: 1 } });

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Token Inválido.");
  });

  it("validateApi - GET - BOTH", async () => {
    req.method = "GET";
    req.headers = {
      authorization: "token",
    };
    const validatedApi = validateApi(controllerToMockTest, "GET", "BOTH");
    await validatedApi(req, res);
    sinon.stub(jwt, "verify").resolves({ data: { id: 1 } });

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Token Inválido.");
  });

  it("validateApi - Request not match", () => {
    const validatedApi = validateApi(controllerToMockTest, "POST");
    const result = validatedApi(req, res) as {
      status: 405;
      json: {
        error: string;
      };
    };
    expect(result.status).toBeCalledWith(405);
    expect(result.json).toHaveBeenCalledWith({
      error: "Método de requisição não aceito para essa rota!",
    });
  });
});
