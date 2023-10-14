import { decrypt, encrypt } from "@/utils/crypto";
import UserModel from "../models/UserModel";

class AuthService {
  async login(email: string, password: string) {
    const userRequested = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (!userRequested) throw Error("Usuário não cadastrado!");

    const user: any = userRequested?.toJSON();
    const userPasswordDecrypted = await decrypt(user?.password as string);
    if (userPasswordDecrypted != password) throw Error("Senha inválida!");

    const token = encrypt(
      JSON.stringify({
        id: user.id,
        role: user.role,
        jobs: user.jobs,
        email,
      }),
      "8h"
    );

    return { token };
  }

  async getInfosFromToken(user_id: number) {
    return await UserModel.findOne({
      where: {
        id: user_id,
      },
      attributes: {
        exclude: ["password"],
      },
    });
  }
}

const AuthServices = new AuthService();
export default AuthServices;
