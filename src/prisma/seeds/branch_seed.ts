import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedBranches() {
  try {
    console.log("Poblando sucursales...");

    const branches = [
      {
        name: "Sucursal Quito",
        address: "",
        city: "Quito",
        country: "Ecuador",
      },
      {
        name: "Sucursal Guayaquil",
        address: "",
        city: "Guayaquil",
        country: "Ecuador",
      },
      {
        name: "Sucursal Cuenca",
        address: "",
        city: "Cuenca",
        country: "Ecuador",
      },
    ];

    for (const branch of branches) {
      await prisma.branch.upsert({
        where: { name: branch.name }, // Evita duplicados
        update: {}, // No actualiza si ya existe
        create: branch,
      });
    }

    console.log("Sucursales insertadas correctamente.");
  } catch (error) {
    console.error("Error al poblar sucursales:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export default seedBranches();
