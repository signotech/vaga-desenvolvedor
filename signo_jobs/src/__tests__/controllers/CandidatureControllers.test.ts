import CandidatureControllers from "@/server/controllers/CandidatureController";
import { mockRequest, mockResponse } from "../config";
import sinon from "sinon";
import CandidatureServices from "@/server/services/CandidatureService";

describe("Controllers Test - CandidatureControllers", () => {
  let req = mockRequest();
  let res = mockResponse();

  afterEach(() => {
    res = mockResponse();
    req = mockRequest({
      body: {},
    });
    sinon.restore();
  });

  it("CandidatureControllers - candidature - success", async () => {
    req.body = {
      id: 1,
      user: {
        id: 1,
      },
    };

    sinon
      .stub(CandidatureServices, "candidature")
      .resolves({ user: null, job: null });
    await CandidatureControllers.candidature(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe(
      "Faz parte da concorrência da vaga."
    );
  });

  it("CandidatureControllers - candidature - error", async () => {
    sinon.stub(CandidatureServices, "candidature").rejects();
    await CandidatureControllers.candidature(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe(
      "Cannot read properties of undefined (reading 'id')"
    );
  });

  it("CandidatureControllers - removeCandidature - success", async () => {
    req.body = {
      id: 1,
      user: {
        id: 1,
      },
    };

    sinon.stub(CandidatureServices, "removeCandidature").resolves();
    await CandidatureControllers.removeCandidature(req, res);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.json.mock.calls[0][0].message).toBe(
      "Não faz mais parte da concorrência da vaga."
    );
  });

  it("CandidatureControllers - removeCandidature - error", async () => {
    sinon.stub(CandidatureServices, "removeCandidature").rejects();
    await CandidatureControllers.removeCandidature(req, res);

    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.json.mock.calls[0][0].error).toBe(
      "Cannot read properties of undefined (reading 'id')"
    );
  });
});
