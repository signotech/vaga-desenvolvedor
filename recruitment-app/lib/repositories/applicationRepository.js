import prisma from "../db/prisma";
import { JobStatus } from "@prisma/client";

async function create(data) {
  return await prisma.jobApplication.create({ 
    data: {
      candidateId: Number(data.candidateId),
      jobId: Number(data.jobId),
      status: JobStatus.IN_PROGRESS
    }
   });
}

async function findAll() {
  return await prisma.jobApplication.findMany({
    include: {
      job: true,
      candidate: true,
    },
  });
}

async function findById(id) {
  return await prisma.jobApplication.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      job: true,
      candidate: true,
    },
  });
}

async function deleteById(id) {
  return await prisma.jobApplication.update({
    where: {
      id: Number(id),
    },
    data: {
        status: JobStatus.CANCELLED
    }
  });
}

export const applicationRepository = {
  create,
  findAll,
  findById,
  deleteById,
};
