import JobsModel from "../models/JobsModel";
import UserModel from "../models/UserModel";

class CandidatureService {
  async candidature(job_id: string, user_id: string) {
    const user = await this.addJobToUser(user_id, job_id);
    const job = await this.addUserToJob(user_id, job_id);
    return { user, job };
  }

  async removeCandidature(job_id: string, user_id: string) {
    const job = await this.removeUserOfJob(user_id, job_id);
    const user = await this.removeJobOfUser(user_id, job_id);
    return { user, job };
  }

  private async addUserToJob(user_id: string, job_id: string) {
    const job = await JobsModel.findOne({
      where: {
        id: job_id,
      },
      attributes: {
        exclude: ["user_id"],
      },
    });

    const jobArray = job?.toJSON().candidates || [];

    if (jobArray?.includes(user_id.toString()))
      throw Error("Já é candidato dessa vaga.");
    jobArray.push(user_id.toString());

    const filterArray = new Set<string>(jobArray);
    job?.set({ candidates: Array.from(filterArray) }).save();

    return job;
  }

  private async addJobToUser(user_id: string, job_id: string) {
    const user = await UserModel.findOne({
      where: {
        id: user_id,
      },
      attributes: {
        exclude: ["password", "email", "name"],
      },
    });

    const userJobs = user?.toJSON().jobs || [];
    userJobs.push(job_id);
    const filterArray = new Set<string>(userJobs);
    user?.set({ jobs: Array.from(filterArray) }).save();

    return user;
  }

  private async removeUserOfJob(user_id: string, job_id: string) {
    const job = await JobsModel.findOne({
      where: {
        id: job_id,
      },
      attributes: {
        exclude: ["user_id"],
      },
    });

    const jobArray = job?.toJSON().candidates;
    if (!jobArray?.includes(user_id.toString()))
      throw Error("Não é candidato dessa vaga.");

    const indexJob = jobArray?.indexOf(user_id.toString()) as number;
    jobArray.splice(indexJob, 1);

    const filterArray = new Set<string>(jobArray);
    job?.set({ candidates: Array.from(filterArray) }).save();

    return job;
  }

  private async removeJobOfUser(user_id: string, job_id: string) {
    const user = await UserModel.findOne({
      where: {
        id: user_id,
      },
      attributes: {
        exclude: ["password", "email", "name"],
      },
    });

    const userArray = user?.toJSON().jobs;
    const indexUser: any = userArray?.indexOf(job_id);
    userArray?.splice(indexUser, 1);

    const filterArray = new Set<string>(userArray);
    user?.set({ jobs: Array.from(filterArray) }).save();

    return user;
  }
}

const CandidatureServices = new CandidatureService();
export default CandidatureServices;
