import { prisma } from "@/lib/prisma";

// Search user by email
async function findByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

async function create(data) {
  return await prisma.user.create({ data });
}

// Export all functions as an object
export const userRepository = {
  findByEmail,
  create,
};
