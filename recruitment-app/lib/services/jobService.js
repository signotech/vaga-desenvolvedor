import { jobRepository } from "../repositories/jobRepository";

async function listJobs({ search, page, limit, userId }) {
  return await jobRepository.findJobsByIds({ search, page, limit, userId });
}


async function createJob(data) {
  console.log("DATA RECEBIDO NO SERVICE: ", data)
  const { title, type, description, requirements, location, salaryRange, userId } =
    data;
  console.log("USER ID NO SERVICE: ". userId)

  if (!userId) {
    throw new Error("Usuário não encontrado");
  }

  const newJob = await jobRepository.create({
    title,
    type,
    description,
    requirements,
    location,
    salaryRange,
    userId,
  });

  return newJob;
}

async function deleteJobs(ids) {
  if (!ids || ids.length === 0) {
    throw new Error("Nenhuma vaga selecionada");
  }
  return await jobRepository.deleteByIds(ids);
}

async function updateJob(id, data) {
  // Verify if exists
  const existsJob = await jobRepository.findById(id);
  if (!existsJob) {
    throw new Error("Vaga não encontrada");
  }
  return await jobRepository.updateById(id, data);
}

async function updateStatus(id, status) {
  const job = await jobRepository.findById(id);
  if (!job) {
    throw new Error("Vaga não encontrada");
  }
  return await jobRepository.updateStatusById(id, status);
}

async function getJobById(id) {
  const job = await jobRepository.findById(id);
  if (!job) {
    throw new Error("Vaga não encontrada");
  }
  return job;
}

export const jobService = {
  listJobs,
  createJob,
  deleteJobs,
  updateJob,
  getJobById,
  updateStatus
};
