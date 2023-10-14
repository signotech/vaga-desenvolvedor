import { controllerCall } from "@/utils/controllerCall";
import { NextApiRequest, NextApiResponse } from "next";
import CandidatureServices from "../services/CandidatureService";

class CandidatureController {
  candidature(req: NextApiRequest, res: NextApiResponse) {
    const { id, user } = req.body;
    const params = {
      service: () => CandidatureServices.candidature(id, user.id),
      message: "Faz parte da concorrência da vaga.",
    };

    controllerCall(res, params);
  }

  removeCandidature(req: NextApiRequest, res: NextApiResponse) {
    const { id, user } = req.body;
    const params = {
      service: () => CandidatureServices.removeCandidature(id, user.id),
      message: "Não faz mais parte da concorrência da vaga.",
    };

    controllerCall(res, params);
  }
}

const CandidatureControllers = new CandidatureController();
export default CandidatureControllers;
