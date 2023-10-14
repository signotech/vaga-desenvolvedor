import { NextApiRequest, NextApiResponse } from "next";
import UserServices from "../services/UserService";
import { User } from "@/interfaces/User";
import { controllerCall } from "@/utils/controllerCall";
import { UserCreateSchema } from "@/schemas/UserSchemas";
import { UrlJobParamsProps } from "@/interfaces/UrlParamsProps";

class UserController {
  async getAll(req: NextApiRequest, res: NextApiResponse) {
    const { page, limit } = req.query;
    const params = {
      service: () =>
        UserServices.getAll(
          parseInt(page as string) || 1,
          parseInt(limit as string) || 20
        ),
      message: "Lista de usuários.",
    };

    controllerCall(res, params);
  }

  async getByJob(req: NextApiRequest, res: NextApiResponse) {
    const { candidates } = req.body;
    const params = {
      service: () => UserServices.getByJob(candidates),
      message: "Lista de usuários para a vaga.",
    };

    controllerCall(res, params);
  }

  async create(req: NextApiRequest, res: NextApiResponse) {
    const newUserInfos = req.body as User;
    const params = {
      service: () => UserServices.createUser(newUserInfos),
      message: "Usuário criado com sucesso!",
      schema: UserCreateSchema,
      schemaData: newUserInfos,
    };

    controllerCall(res, params);
  }

  async delete(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.body;
    const params = {
      service: () => UserServices.delete(user.id),
      message: "Usuário deletado com sucesso!",
    };

    controllerCall(res, params);
  }

  async update(req: NextApiRequest, res: NextApiResponse) {
    const user = req.body;
    const params = {
      service: () => UserServices.update(user),
      message: "Usuário modificado com sucesso!",
    };

    controllerCall(res, params);
  }

  myJobs(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.body;
    const urlParams = req.query;

    const params = {
      service: () => UserServices.myJobs(user, urlParams),
      message: "Lista de vagas do usuário!",
    };

    controllerCall(res, params);
  }
}

const UserControllers = new UserController();
export default UserControllers;
