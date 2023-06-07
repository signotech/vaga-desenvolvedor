import { Router } from "express";
import loginPost from "../../controllers/login/login.controllers";
import validBodySchema from "../../middlewares/validBodySchemas";
import { loginSchemas } from "../../schemas/login/login.schemas";
import getAdmin from "../../controllers/login/getAdmin.controllers";

const loginRoutes: Router = Router();

loginRoutes.post("", validBodySchema(loginSchemas), loginPost);
loginRoutes.get("/:id",getAdmin)

export default loginRoutes;
