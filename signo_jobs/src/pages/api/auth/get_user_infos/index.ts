import { validateApi } from "@/server/config/validateApi";
import AuthControllers from "@/server/controllers/AuthController";

export default validateApi(AuthControllers.getInfosFromToken, "GET", "BOTH");
