import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

const testServices = [
  {
    name: "Classic Facial",
    slug: "classic-facial",
    category: "Facial Treatments",
    price: "$99",
    duration: "60 minutes",
    status: "Active",
    short_description: "A deep cleansing facial treatment",
    long_description: "Our classic facial includes cleansing, exfoliation, extraction, and mask treatment.",
    benefits: "Improves skin texture, removes impurities, promotes relaxation",
    suitable_for: "All skin types",
    contraindications: "Active acne, recent sunburn",
    preparation: "Arrive with clean skin, avoid sun exposure",
    aftercare: "Use sunscreen, avoid heavy makeup for 24 hours",
  },
  {
    name: "Deep Tissue Massage",
    slug: "deep-tissue-massage",
    category: "Body Treatments",
    price: "$120",
    duration: "90 minutes",
    status: "Active",
    short_description: "Intensive massage therapy",
    long_description: "Targets deep layers of muscle and connective tissue",
    benefits: "Relieves chronic muscle tension, improves circulation",
    suitable_for: "Adults with muscle tension or pain",
    contraindications: "Recent injuries, blood clots",
    preparation: "Stay hydrated, arrive 10 minutes early",
    aftercare: "Drink plenty of water, rest if needed",
  }
];

async function main() {
  console.log('Start seeding the database...');

  // Clear existing data
  await prisma.service.deleteMany();
  console.log('Cleared existing services data');

  // Insert test services data
  for (const service of testServices) {
    await prisma.service.create({
      data: service,
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