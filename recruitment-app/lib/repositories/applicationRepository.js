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
  return await prisma.jobApplication.delete({
    where: {
      id: Number(id),
    },
  });
};

async function findApplicationsByJobId(id) {
  return await prisma.jobApplication.findMany({
    where: {
      jobId: Number(id),
    },
    include: {
      job: true,
      candidate: true,
    },
  });
}

async function findApplicationsByCandidateId(id) {
  return await prisma.jobApplication.findMany({
      where: { candidateId: Number(id) },
      select: {
        id: true,
        jobId: true,
        candidateId: true,
        status: true,
        appliedAt: true,
      },
    });
}

export const applicationRepository = {
  create,
  findAll,
  findById,
  deleteById,
  findApplicationsByJobId,
  findApplicationsByCandidateId
};
