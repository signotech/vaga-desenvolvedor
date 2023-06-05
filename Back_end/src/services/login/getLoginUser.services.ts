import Admin from "../../../models/adminModel";
import { TloginResponse } from "../../interfaces/login/login.interfaces";
import { adminResponse } from "../../schemas/login/login.schemas";

const getLoginService = async (adminId: number): Promise<TloginResponse> => {

   const getAdmin = await Admin.findByPk(adminId);

   const admin:TloginResponse = adminResponse.parse(getAdmin);

   return admin
};

export default getLoginService;
