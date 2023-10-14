import JobsModel from "@/server/models/JobsModel";
import UserModel from "@/server/models/UserModel";
import CandidatureServices from "@/server/services/CandidatureService";
import sinon from "sinon";

describe("Services Test - CandidatureService", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("CandidatureServices - candidature", async () => {
    sinon.stub(JobsModel, "findOne").resolves();
    sinon.stub(UserModel, "findOne").resolves();
    await CandidatureServices.candidature("1", "1");
  });

//   it("CandidatureServices - removeCandidature", async () => {
//     sinon.stub(JobsModel, "findOne").resolves({ candidates: ["1"] });
//     sinon.stub(UserModel, "findOne").resolves();
//     await CandidatureServices.removeCandidature("1", "1");
//   });
});
