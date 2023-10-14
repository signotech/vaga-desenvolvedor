import UserControllers from "@/server/controllers/UserController";
import { validateApi } from "@/server/config/validateApi";

export default validateApi(UserControllers.getByJob, "POST", "ADMIN");
