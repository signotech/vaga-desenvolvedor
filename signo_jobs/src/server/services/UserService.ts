import { User } from "@/interfaces/User";
import UserModel from "../models/UserModel";
import { encrypt } from "@/utils/crypto";
import { UserUpdate } from "@/interfaces/UserUpdate";
import JobsModel from "../models/JobsModel";
import { Op } from "sequelize";
import { UrlJobParamsProps } from "@/interfaces/UrlParamsProps";

class UserService {
  async getAll(page: number, limit: number): Promise<UserModel[]> {
    page = (page - 1) * limit;
    return await UserModel.findAll({
      attributes: { exclude: ["password"] },
      limit,
      offset: page,
    });
  }

  async getByJob(candidates: string[]) {
    return await UserModel.findAll({
      where: {
        id: { [Op.in]: candidates },
      },
      attributes: { exclude: ["password", "jobs"] },
    });
  }

  async createUser(user: User) {
    const checkIfUserExist = await UserModel.findAll({
      where: {
        email: user.email,
      },
    });

    if (checkIfUserExist.length > 0) throw Error("Usuário Já Cadastrado!");

    const password = encrypt(user.password);
    user.password = password;

    return await UserModel.create({
      ...user,
    });
  }

  async delete(id: number) {
    return await UserModel.destroy({
      where: {
        id,
      },
    });
  }

  async update(userInfosToUpdate: UserUpdate) {
    const { user } = userInfosToUpdate;
    const userToUpdate = await UserModel.findOne({
      where: {
        id: user.id,
      },
    });

    userToUpdate?.set({
      ...userInfosToUpdate,
    });
    userToUpdate?.save();

    return userToUpdate;
  }

  async myJobs(user: User, params: Partial<UrlJobParamsProps>) {
    let { page, limit, order, search } = params;
    const { id, role } = user;
    limit = limit || 20;
    search = search || "";
    page = ((page || 1) - 1) * limit;

    const userJobs = (await UserModel.findOne({
      where: {
        id,
      },
    })) as UserModel;

    const qty = await this.countMyJobs(userJobs);

    const jobs = await this.getMyJobs({
      page,
      limit,
      order,
      search,
      userJobs,
      role,
    });

    return { jobs, qty };
  }

  private async countMyJobs(userJobs: UserModel) {
    return await JobsModel.count({
      where: {
        status: "JOB",
        id: {
          [Op.in]: userJobs?.toJSON().jobs,
        },
      },
    });
  }

  private async getMyJobs(
    params: UrlJobParamsProps & { userJobs: UserModel; role: string }
  ) {
    const { search, limit, page, order, userJobs, role } = params;

    const queryOptions: any = {
      where: {
        id: {
          [Op.in]: userJobs?.toJSON().jobs,
        },
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
          { type: { [Op.iLike]: `%${search}%` } },
          { salary: { [Op.iLike]: `%${search}%` } },
        ],
      },
      limit,
      offset: page,
      order: order ? [[order, "ASC"]] : undefined,
    };
    if (role === "USER") {
      queryOptions.where.status = "JOB";
    }

    return await JobsModel.findAll(queryOptions);
  }
}

const UserServices = new UserService();
export default UserServices;
