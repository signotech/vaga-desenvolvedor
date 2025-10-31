import { JobStatus } from "@prisma/client"
import prisma from "../db/prisma"

async function findJobsByIds({ search, page, limit }) {
  return await prisma.job.findMany({
    where: {
      active: true,
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
    },
    skip: (page - 1) * limit,
    take: Number(limit),
  });
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
  updateStatusById,
  updateById,
  findById,
};
