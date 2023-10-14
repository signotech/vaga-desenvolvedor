import { catchErrorController } from "@/utils/controllerCall";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

class AuthGuardService {
  async admin(
    req: NextApiRequest,
    res: NextApiResponse,
    handler: NextApiHandler
  ) {
    return await this.authGuardCall(req, res, {
      role: "ADMIN",
      handler: handler,
    });
  }

  async user(
    req: NextApiRequest,
    res: NextApiResponse,
    handler: NextApiHandler
  ) {
    return await this.authGuardCall(req, res, {
      role: "USER",
      handler: handler,
    });
  }

  async both(
    req: NextApiRequest,
    res: NextApiResponse,
    handler: NextApiHandler
  ) {
    return await this.authGuardCall(req, res, {
      role: "BOTH",
      handler: handler,
    });
  }

  private async verifyTokenAndRole(token: string, role: string) {
    return await jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_PASS as string,
      function (error, decodedUser: any) {
        if (error) throw Error("Token Inválido.");
        const user = JSON.parse(decodedUser.data as string);

        if (role != "BOTH" && user.role != role) {
          throw Error("Usuário não tem acesso a requisição solicitada.");
        }
        return user;
      }
    );
  }

  private async authGuardCall(
    req: NextApiRequest,
    res: NextApiResponse,
    params: { role: string; handler: NextApiHandler }
  ) {
    const { role, handler } = params;
    try {
      const { authorization } = req.headers;
      const user = await this.verifyTokenAndRole(authorization as string, role);

      req.body = {
        user,
        ...req.body,
      };

      return handler(req, res);
    } catch (error) {
      catchErrorController(res, error);
    }
  }
}

const AuthGuardServices = new AuthGuardService();
export default AuthGuardServices;
