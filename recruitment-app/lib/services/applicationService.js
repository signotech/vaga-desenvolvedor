import { applicationRepository } from "../repositories/applicationRepository";
import { jobRepository } from "../repositories/jobRepository";
import { Prisma } from "@prisma/client";

async function createApplication(candidateId, jobId) {
  if (!candidateId || !jobId) {
    throw new Error("Campos candidato e vaga são obrigatórios");
  }
  const job = await jobRepository.findById(jobId);

  if (!job || !job.active || job.status !== "IN_PROGRESS") {
    throw new Error("Vaga pausada, cancelada ou inexistente");
  }

  try {
    return await applicationRepository.create({ candidateId: Number(candidateId), jobId: Number(jobId) });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Candidato já inscrito nesta vaga");
    }
    throw error;
  }
}

async function listApplications() {
  return await applicationRepository.findAll();
}

async function findApplicationById(id) {
  const application = await applicationRepository.findById(id);
  if (!application) {
    throw new Error("Inscrição não encontrada");
  }
  return application;
}

async function deleteApplication(id) {
  console.log("Deletando inscrição com id: ", id);
  const application = await applicationRepository.findById(id);
  console.log("Resultado do findById: ", application);
  if (!application) {
    throw new Error("Inscrição não encontrada");
  }
  console.log("Deletando inscrição com id: ", id);
  return await applicationRepository.deleteById(id);
}

export const applicationService = {
  createApplication,
  listApplications,
  findApplicationById,
  deleteApplication,
};
