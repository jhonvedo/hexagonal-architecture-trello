import { PrismaClient } from '@prisma/client';
import { EventEmitter } from 'events';

const globalForPrisma = global as unknown as { prisma: PrismaClient,emitter: EventEmitter }
export const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
export default prisma