import jwt from "jsonwebtoken";
import AuthServices from "@/server/services/AuthService";
import * as crypto from "@/utils/crypto";
import sinon from "sinon";
import dotenv from "dotenv";
import UserModel from "@/server/models/UserModel";
dotenv.configDotenv({ path: "../../../.env" });

describe("Services Test - AuthService", () => {
  const userModelMock = {
    findOne: jest.fn(),
  };

  jest.mock("../../server/models/UserModel", () => ({
    UserModel: userModelMock,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
    sinon.restore();
  });

//   it("AuthService - login", async () => {
//     sinon.stub(UserModel, "findOne").resolves(null);
//     sinon.stub(crypto, "decrypt").resolves("password");
//     await AuthServices.login("test@example.com", "password");
//   });

  it("AuthService - getInfosFromToken", async () => {
    sinon.stub(UserModel, "findOne").resolves();
    await AuthServices.getInfosFromToken(1);
  });
});
