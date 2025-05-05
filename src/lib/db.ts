import { PrismaClient } from '@prisma/client';
import { ServiceInput, ServiceUpdateInput } from './validation/service-schema';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Service-specific database functions

/**
 * Get all services
 */
export async function getAllServices() {
  return prisma.service.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

/**
 * Get a service by ID
 */
export async function getServiceById(id: number) {
  return prisma.service.findUnique({
    where: { id },
  });
}

/**
 * Get a service by slug
 */
export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({
    where: { slug },
  });
}

/**
 * Create a new service
 */
export async function createService(data: ServiceInput) {
  return prisma.service.create({
    data,
  });
}

/**
 * Update an existing service
 */
export async function updateService(id: number, data: ServiceUpdateInput) {
  return prisma.service.update({
    where: { id },
    data,
  });
}

/**
 * Delete a service
 */
export async function deleteService(id: number) {
  return prisma.service.delete({
    where: { id },
  });
} 