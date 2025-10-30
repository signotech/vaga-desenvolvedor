import { prisma } from "@/lib/prisma";
import { JobStatus } from "@prisma/client";

async function findJobs({ search, page, limit }) {
  return await prisma.job.findMany({
    where: {
      active: true,
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
    },
    skip: (page - 1) * limit,
    take: Number(limit),
  });
}

async function deleteJobs(ids) {
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

async function updateStatus(id, status) {
  return await prisma.job.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
}

async function updateJob(id, data) {
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
  findJobs,
  deleteJobs,
  updateStatus,
  updateJob,
  findById,
};
