import { JobStatus } from "@prisma/client"
import prisma from "../db/prisma"

async function findJobsByIds({ search, page, limit, userId }) {
  const jobs = await prisma.job.findMany({
    where: {
      active: true,
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
    },
    include: {
      candidates: userId
        ? {
            where: { candidateId: Number(userId) },
            select: { id: true },
          }
        : false,
    },
    skip: (page - 1) * limit,
    take: Number(limit),
    orderBy: { createdAt: "desc" },
  });

  return jobs.map((job) => ({
    ...job,
    applied: job.candidates?.length > 0,
  }));
}

async function create(data) {
  return await prisma.job.create({
    data: data,
  })
}

async function deleteByIds(ids) {
  return await prisma.job.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      active: false, // Logic delete
      status: JobStatus.CANCELLED,
    },
  });
}

async function updateStatusById(id, status) {
  // Update status of a job
  const updatedJob = await prisma.job.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  // Update status of applications related to the job
  await prisma.jobApplication.updateMany({
    where: {
      jobId: Number(id),
    },
    data: {
      status: status,
    },
  });

  return updatedJob;
}

async function updateById(id, data) {
  return await prisma.job.update({
    where: {
      id: id,
    },
    data: data,
  });
}

async function findById(id) {
  return await prisma.job.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export const jobRepository = {
  findJobsByIds,
  deleteByIds,
  create,
  updateStatusById,
  updateById,
  findById,
};
