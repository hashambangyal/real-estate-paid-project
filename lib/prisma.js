import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis;

if (!globalForPrisma.pgPool) {
  globalForPrisma.pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 300000, // 5 minutes keepalive
    connectionTimeoutMillis: 10000,
  });
}

if (!globalForPrisma.prisma) {
  const adapter = new PrismaPg(globalForPrisma.pgPool);
  globalForPrisma.prisma = new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma;