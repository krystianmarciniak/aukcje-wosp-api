const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding...");

  // 1) Kategorie (findFirst -> create)
  const cat1 =
    (await prisma.category.findFirst({ where: { name: "Elektronika" } })) ??
    (await prisma.category.create({ data: { name: "Elektronika" } }));

  const cat2 =
    (await prisma.category.findFirst({ where: { name: "Ubrania" } })) ??
    (await prisma.category.create({ data: { name: "Ubrania" } }));

  // 2) Aukcje (tworzymy tylko jeśli nie istnieją)
  const auctions = [
    {
      title: "Słuchawki WOŚP",
      description: "Nowe, zaplombowane",
      status: "ACTIVE",
      currentPrice: 0,
      categoryId: cat1.id,
    },
    {
      title: "Koszulka WOŚP",
      description: "Limitowana edycja",
      status: "DRAFT",
      currentPrice: 0,
      categoryId: cat2.id,
    },
  ];

  for (const a of auctions) {
    const exists = await prisma.auction.findFirst({
      where: { title: a.title },
    });
    if (!exists) await prisma.auction.create({ data: a });
  }

  console.log("✅ Seed done.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
