import { Request, Response } from "express";
import { TLoginRequest, Ttoken } from "../../interfaces/login/login.interfaces";
import createToken from "../../services/login/createToken.services";

const loginPost = async (
   req:Request,
   res: Response
   ):Promise<Response> => {

   const bodyData: TLoginRequest = req.body;

   const newToken: Ttoken = await createToken(bodyData);

   return res.status(200).json(newToken);
};

export default loginPost;
