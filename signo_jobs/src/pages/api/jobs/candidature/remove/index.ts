import { validateApi } from "@/server/config/validateApi";
import CandidatureControllers from "@/server/controllers/CandidatureController";

export default validateApi(
  CandidatureControllers.removeCandidature,
  "PUT",
  "USER"
);
