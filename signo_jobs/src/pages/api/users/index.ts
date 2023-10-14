import { validateApi } from "@/server/config/validateApi";
import UserControllers from "@/server/controllers/UserController";

export default validateApi(UserControllers.getAll, "GET");
