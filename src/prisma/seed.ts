import { PrismaClient } from "@prisma/client";
import seedBranches from "./seeds/branch_seed";

const prisma = new PrismaClient();

async function main() {
  console.log("Ejecutando seeding...");

  await seedBranches(); // Poblar sucursales

  console.log("Seeding completado.");
}

main()
  .catch((error) => {
    console.error("Error en el seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
