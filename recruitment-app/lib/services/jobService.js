import { jobRepository } from "../repositories/jobRepository";

async function listJobs({ search, page, limit }) {
  return await jobRepository.findJobsByIds({ search, page, limit });
}

async function createJob(data) {
  const { title, type, description, requirements, location, salaryRange } =
    data;

  const newJob = await jobRepository.create({
    title,
    type,
    description,
    requirements,
    location,
    salaryRange,
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
};
