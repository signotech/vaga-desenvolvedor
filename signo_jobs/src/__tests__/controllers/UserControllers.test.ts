import sinon from "sinon";
import { mockRequest, mockResponse } from "../config";
import UserControllers from "@/server/controllers/UserController";
import UserServices from "@/server/services/UserService";

describe("Controllers Test - UserControllers", () => {
  let req = mockRequest();
  let res = mockResponse();

  afterEach(() => {
    res = mockResponse();
    req = mockRequest({
      body: {},
    });
    sinon.restore();
  });

  it("UserControllers - getAll - success", async () => {
    sinon.stub(UserServices, "getAll").resolves();
    await UserControllers.getAll(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe("Lista de usuários.");
  });

  it("UserControllers - getAll - error", async () => {
    sinon.stub(UserServices, "getAll").rejects();
    await UserControllers.getAll(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Error");
  });

  it("UserControllers - getByJob - success", async () => {
    req.body = {
      candidates: [],
    };
    sinon.stub(UserServices, "getByJob").resolves();
    await UserControllers.getByJob(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe(
      "Lista de usuários para a vaga."
    );
  });

  it("UserControllers - getByJob - error", async () => {
    sinon.stub(UserServices, "getByJob").rejects();
    await UserControllers.getByJob(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Error");
  });

  it("UserControllers - create - success", async () => {
    req.body = {
      name: "Name of User",
      email: "email@test.com",
      password: "password",
      role: "ADMIN",
    };
    sinon.stub(UserServices, "createUser").resolves();
    await UserControllers.create(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe(
      "Usuário criado com sucesso!"
    );
  });

  it("UserControllers - create - error", async () => {
    req.body = {
      name: "Name of User",
      password: "password",
      role: "ADMIN",
    };
    sinon.stub(UserServices, "createUser").rejects();
    await UserControllers.create(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Required");
  });

  it("UserControllers - delete - success", async () => {
    req.body = {
      user: { id: 1 },
    };
    sinon.stub(UserServices, "delete").resolves();
    await UserControllers.delete(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe(
      "Usuário deletado com sucesso!"
    );
  });

  it("UserControllers - delete - error", async () => {
    req.body = {
      user: { id: 1 },
    };
    sinon.stub(UserServices, "delete").rejects();
    await UserControllers.delete(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Error");
  });

  it("UserControllers - update - success", async () => {
    req.body = {
      user: { id: 1 },
      name: "Name of User",
      password: "password",
      role: "ADMIN",
    };
    sinon.stub(UserServices, "update").resolves();
    await UserControllers.update(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe(
      "Usuário modificado com sucesso!"
    );
  });

  it("UserControllers - update - error", async () => {
    req.body = {
      user: { id: 1 },
      name: "Name of User",
      password: "password",
      role: "ADMIN",
    };
    sinon.stub(UserServices, "update").rejects();
    await UserControllers.update(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Error");
  });

  it("UserControllers - myJobs - success", async () => {
    req.body = {
      user: { id: 1 },
    };
    req.query = {
      limit: 20,
      page: 1,
    };
    sinon.stub(UserServices, "myJobs").resolves();
    await UserControllers.myJobs(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe(
      "Lista de vagas do usuário!"
    );
  });

  it("UserControllers - myJobs - error", async () => {
    req.body = {
      user: { id: 1 },
    };
    req.query = {
      limit: 20,
      page: 1,
    };
    sinon.stub(UserServices, "myJobs").rejects();
    await UserControllers.myJobs(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Error");
  });
});
