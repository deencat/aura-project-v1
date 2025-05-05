import { PrismaClient } from '@prisma/client';
import { mockServices } from '../src/app/admin/services/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding the database...');

  // Clear existing data
  await prisma.service.deleteMany();
  console.log('Cleared existing services data');

  // Insert mock services data
  for (const service of mockServices) {
    // Convert mockService data to match our Prisma schema
    const serviceData = {
      id: service.id,
      name: service.name,
      slug: service.slug,
      category: service.category,
      price: service.price,
      duration: service.duration,
      status: service.status,
      short_description: service.short_description,
      long_description: service.long_description,
      benefits: service.benefits,
      suitable_for: service.suitable_for,
      contraindications: service.contraindications,
      preparation: service.preparation,
      aftercare: service.aftercare,
    };

    await prisma.service.create({
      data: serviceData,
    });
    console.log(`Created service: ${service.name}`);
  }

  console.log('Seeding finished successfully');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 