import JobControllers from "@/server/controllers/JobController";
import { mockRequest, mockResponse } from "../config";
import sinon from "sinon";
import JobServices from "@/server/services/JobService";

describe("Controllers Test - JobControllers", () => {
  let req = mockRequest();
  let res = mockResponse();

  afterEach(() => {
    res = mockResponse();
    req = mockRequest({
      body: {},
    });
    sinon.restore();
  });

  it("JobControllers - create - success", async () => {
    req.body = {
      user: { id: 1 },
      title: "Title Job",
      description: "Description Job",
      type: "CLT",
    };
    sinon.stub(JobServices, "create").resolves();
    await JobControllers.create(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe("Vaga criada com sucesso.");
  });

  it("JobControllers - create - error from schema", async () => {
    req.body = {
      user: { id: 1 },
      title: "Title Job",
      description: "Description Job",
    };
    sinon.stub(JobServices, "create").resolves();
    await JobControllers.create(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe(
      "Obrigatório fornecer tipo da vaga, sendo: 'CLT', 'FREELANCER' ou 'PJ'"
    );
  });

  it("JobControllers - getAll - success", async () => {
    req.query = {
      limit: 20,
      page: 1,
    };
    sinon.stub(JobServices, "getAll").resolves();
    await JobControllers.getAll(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe("Lista de vagas.");
  });

  it("JobControllers - getAll - error", async () => {
    req.query = {};
    sinon.stub(JobServices, "getAll").rejects();
    await JobControllers.getAll(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Error");
  });

  it("JobControllers - delete - success", async () => {
    req.body = {
      user: { id: 1 },
      id: 1,
    };

    sinon.stub(JobServices, "delete").resolves();
    await JobControllers.delete(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe(
      "Vaga deletada com sucesso."
    );
  });

  it("JobControllers - delete - error", async () => {
    req.body = {
      user: { id: 1 },
      id: 1,
    };

    sinon.stub(JobServices, "delete").rejects();
    await JobControllers.delete(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe("Error");
  });

  it("JobControllers - update - success", async () => {
    req.body = {
      user: { id: 1 },
      title: "Title Job",
      description: "Description Job",
    };

    sinon.stub(JobServices, "update").resolves();
    await JobControllers.update(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe(
      "Vaga modificada com sucesso."
    );
  });

  it("JobControllers - update - error", async () => {
    req.body = {
      description: "Description Job",
    };

    sinon.stub(JobServices, "update").rejects();
    await JobControllers.update(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe(
      "Cannot read properties of undefined (reading 'id')"
    );
  });

  it("JobControllers - pauseOrPlayJob - success", async () => {
    req.body = {
      user: { id: 1 },
      id: 1,
    };

    sinon.stub(JobServices, "pauseOrPlayJob").resolves();
    await JobControllers.pauseOrPlayJob(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe(
      "Vaga modificada com sucesso."
    );
  });

  it("JobControllers - pauseOrPlayJob - error", async () => {
    req.body = {
      id: 1,
    };

    sinon.stub(JobServices, "pauseOrPlayJob").rejects();
    await JobControllers.pauseOrPlayJob(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe(
      "Cannot read properties of undefined (reading 'id')"
    );
  });
});
