import { AuthLoginSchema } from "@/schemas/AuthSchemas";
import { controllerCall } from "@/utils/controllerCall";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import AuthServices from "../services/AuthService";

class AuthController {
  login(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    const params = {
      service: () => AuthServices.login(email, password),
      message: "Logado com sucesso!",
      schema: AuthLoginSchema,
      schemaData: { ...req.body },
    };

    controllerCall(res, params);
  }

  getInfosFromToken(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.body;
    const params = {
      service: () => AuthServices.getInfosFromToken(user.id),
      message: "Informações do usuário!",
    };

    controllerCall(res, params);
  }
}

const AuthControllers = new AuthController();
export default AuthControllers;
