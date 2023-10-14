import { Job } from "@/interfaces/Job";
import JobsModel from "../models/JobsModel";
import UserModel from "../models/UserModel";
import { Op } from "sequelize";
import { UrlJobParamsProps } from "@/interfaces/UrlParamsProps";

class JobService {
  async getAll(urlParams: Partial<UrlJobParamsProps>) {
    let { page, limit, order, search } = urlParams;
    limit = limit || 20;
    search = search || "";
    page = ((page || 1) - 1) * limit;

    const qty = await this.countActiveJobs();
    const jobs = await this.getJobs({
      page,
      limit,
      order,
      search,
    });

    return { jobs, qty };
  }

  private async getJobs(params: UrlJobParamsProps) {
    const { search, limit, page, order } = params;
    return await JobsModel.findAll({
      where: {
        status: "JOB",
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
          { type: { [Op.iLike]: `%${search}%` } },
          { salary: { [Op.iLike]: `%${search}%` } },
        ],
      },
      attributes: { exclude: ["user_id"] },
      limit,
      offset: page,
      order: order ? [[order, "ASC"]] : undefined,
    });
  }

  private async countActiveJobs() {
    return await JobsModel.count({
      where: {
        status: "JOB",
      },
    });
  }

  async create(jobInfos: Job): Promise<JobsModel> {
    const { user_id } = jobInfos;

    const user = await UserModel.findOne({
      where: {
        id: user_id,
      },
    });

    const job = await JobsModel.create({
      ...jobInfos,
      user_id: jobInfos.user_id,
      status: jobInfos.status || "JOB",
    });

    const userJobsArray = user?.toJSON().jobs || [];
    userJobsArray?.push(job?.toJSON().id.toString());
    const filterArray = new Set(userJobsArray);
    user
      ?.set({
        jobs: Array.from(filterArray),
      })
      .save();

    return job;
  }

  async delete(id: number, user_id: number): Promise<number> {
    return await JobsModel.destroy({
      where: {
        id,
        user_id,
      },
    });
  }

  async update(jobInfos: Job, user_id: number): Promise<JobsModel | null> {
    const jobRequested = await JobsModel.findOne({
      where: {
        id: jobInfos.id,
        user_id,
      },
      attributes: { exclude: ["candidates", "status", "user_id"] },
    });
    jobRequested?.set({
      ...jobInfos,
    });
    jobRequested?.save();

    return jobRequested;
  }

  async pauseOrPlayJob(id: number, user_id: number) {
    const job = await JobsModel.findOne({
      where: {
        id,
        user_id,
      },
    });

    const status = job?.toJSON().status === "JOB" ? "PAUSED" : "JOB";
    job
      ?.set({
        status,
      })
      .save();

    return job;
  }
}

const JobServices = new JobService();
export default JobServices;
