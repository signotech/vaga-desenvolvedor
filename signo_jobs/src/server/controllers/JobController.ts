import { controllerCall } from "@/utils/controllerCall";
import { NextApiRequest, NextApiResponse } from "next";
import JobServices from "../services/JobService";
import { Job } from "@/interfaces/Job";
import { JobCreateSchema, JobDeleteSchema } from "@/schemas/JobSchemas";

class JobController {
  getAll(req: NextApiRequest, res: NextApiResponse) {
    const urlParams = req.query;
    const params = {
      service: () => JobServices.getAll(urlParams),
      message: "Lista de vagas.",
    };

    controllerCall(res, params);
  }

  create(req: NextApiRequest, res: NextApiResponse) {
    const job = {
      user_id: req.body.user.id,
      ...req.body,
    };
    const params = {
      service: () => JobServices.create(job),
      message: "Vaga criada com sucesso.",
      schema: JobCreateSchema,
      schemaData: job,
    };

    controllerCall(res, params);
  }

  delete(req: NextApiRequest, res: NextApiResponse) {
    const { user, id } = req.body;
    const params = {
      service: () => JobServices.delete(parseInt(id), user.id),
      message: "Vaga deletada com sucesso.",
      schema: JobDeleteSchema,
      schemaData: { id, user_id: user.id },
    };

    controllerCall(res, params);
  }

  update(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.body;
    const job = req.body as Job;

    const params = {
      service: () => JobServices.update(job, user.id),
      message: "Vaga modificada com sucesso.",
    };

    controllerCall(res, params);
  }

  pauseOrPlayJob(req: NextApiRequest, res: NextApiResponse) {
    const { user, id } = req.body;

    const params = {
      service: () => JobServices.pauseOrPlayJob(id, user.id),
      message: "Vaga modificada com sucesso.",
    };

    controllerCall(res, params);
  }
}

const JobControllers = new JobController();
export default JobControllers;
