const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 1) Czyścimy dane w bezpiecznej kolejności (aukcje -> kategorie)
  await prisma.auction.deleteMany();
  await prisma.category.deleteMany();

  // 2) Kategorie
  const elektronika = await prisma.category.create({
    data: { name: "Elektronika" },
  });

  const sport = await prisma.category.create({
    data: { name: "Sport" },
  });

  // 3) Aukcje
  await prisma.auction.createMany({
    data: [
      {
        title: "Słuchawki WOŚP",
        description: "Nowe, zaplombowane",
        status: "ACTIVE",
        currentPrice: 0,
        categoryId: elektronika.id,
      },
      {
        title: "Koszulka WOŚP",
        description: "Limitowana edycja",
        status: "DRAFT",
        currentPrice: 0,
        categoryId: sport.id,
      },
    ],
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
