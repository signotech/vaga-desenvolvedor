import { Request, Response } from "express";
import { TLoginRequest, TloginResponse, Ttoken } from "../../interfaces/login/login.interfaces";
import getLoginService from "../../services/login/getLoginUser.services";

const getAdmin = async (
   req:Request,
   res: Response
   ):Promise<Response> => {

   const adminId:number = parseInt(req.params.id)
      console.log(adminId)
   const admin: TloginResponse = await getLoginService(adminId);

   return res.status(200).json(admin);
};

export default getAdmin;
