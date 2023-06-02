import { Router } from "express";
import loginPost from "../../controllers/login/login.controllers";
import validBodySchema from "../../middlewares/validBodySchemas";
import { loginSchemas } from "../../schemas/login/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post("", validBodySchema(loginSchemas), loginPost);

export default loginRoutes;
