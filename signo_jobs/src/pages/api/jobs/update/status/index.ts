import { validateApi } from "@/server/config/validateApi";
import JobControllers from "@/server/controllers/JobController";

export default validateApi(JobControllers.pauseOrPlayJob, "PUT", "ADMIN");
