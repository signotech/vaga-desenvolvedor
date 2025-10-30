import { prisma } from "@/lib/prisma";

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
      id: id,
    },
    data: data,
  });
}

async function findById(id) {
  return await prisma.user.findUnique({ where: { id } });
}

// Export all functions as an object
export const userRepository = {
  findByEmail,
  create,
  updateById,
  findById,
};
