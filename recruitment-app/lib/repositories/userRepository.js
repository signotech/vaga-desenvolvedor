import prisma from "@/lib/db/prisma";

// Search user by email
async function findByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

async function create(data) {
  return await prisma.user.create({ data });
}

async function updateById(id, data) {
  return await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: data,
  });
}

async function findById(id) {
  return await prisma.user.findUnique({ where: { id: Number(id) } });
}

async function deleteById(id) {
  // Delete all job applications from user
  await prisma.jobApplication.deleteMany({
    where: { id: Number(id) },
  });

  // Update user to inactive
  return await prisma.user.update({
    where: { id: Number(id) },
    data: { active: false },
  });
}

// Export all functions as an object
export const userRepository = {
  findByEmail,
  create,
  updateById,
  findById,
  deleteById,
};
