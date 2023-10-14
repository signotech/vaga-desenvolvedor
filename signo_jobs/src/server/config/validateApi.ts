import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import AuthGuardServices from "../services/AuthGuardService";

type RequestMethods = "GET" | "POST" | "PUT" | "DELETE";
type UserRole = "USER" | "ADMIN" | "BOTH";
export function validateApi(
  handler: NextApiHandler,
  method: RequestMethods,
  userRole?: UserRole
) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body) {
      req.body = JSON.parse(req.body);
    }
    if (req.method != method) {
      return res
        .status(405)
        .json({ error: "Método de requisição não aceito para essa rota!" });
    }

    switch (userRole) {
      case "ADMIN":
        return AuthGuardServices.admin(req, res, handler);
      case "USER":
        return AuthGuardServices.user(req, res, handler);
      case "BOTH":
        return AuthGuardServices.both(req, res, handler);
      default:
        return handler(req, res);
    }
  };
}
