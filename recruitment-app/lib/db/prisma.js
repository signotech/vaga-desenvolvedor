import { PrismaClient } from "@prisma/client";

// Avoid multiple instances of PrismaClient in development
const globalForPrisma = globalThis;

// create a singleton instance of PrismaClient or use existing instance
const prisma = globalForPrisma.prisma || new PrismaClient();

// In development, store in global scope
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
