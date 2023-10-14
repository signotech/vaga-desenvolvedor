import AuthControllers from "@/server/controllers/AuthController";
import { mockRequest, mockResponse } from "../config";
import sinon from "sinon";
import AuthServices from "@/server/services/AuthService";

describe("Controllers Test - AuthController", () => {
  let req = mockRequest();
  let res = mockResponse();

  afterEach(() => {
    res = mockResponse();
    req = mockRequest({
      body: {},
    });
    sinon.restore();
  });

  it("AuthControllers - login - success", async () => {
    req.body = {
      email: "teste@live.com",
      password: "senha teste",
    };

    sinon.stub(AuthServices, "login").resolves({ token: "token_do_login" });
    await AuthControllers.login(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe("Logado com sucesso!");
    expect(res.json.mock.calls[0][0].data.token).toBe("token_do_login");
  });

  it("AuthControllers - login - error by schema", async () => {
    req.body = {
      email: "teste@live.com",
    };

    sinon.stub(AuthServices, "login").resolves({ token: "token_do_login" });
    await AuthControllers.login(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Obrigatório fornecer senha.");
  });

  it("AuthControllers - getInfosFromUser - success", async () => {
    req.body = {
      user: {
        id: 1,
      },
    };

    sinon.stub(AuthServices, "getInfosFromToken").resolves();
    await AuthControllers.getInfosFromToken(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe("Informações do usuário!");
  });

  it("AuthControllers - getInfosFromUser - success", async () => {
    sinon.stub(AuthServices, "getInfosFromToken").rejects();
    await AuthControllers.getInfosFromToken(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe(
      "Cannot read properties of undefined (reading 'id')"
    );
  });
});
